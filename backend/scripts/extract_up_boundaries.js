const fs = require('fs');
const https = require('https');
const path = require('path');

// Anchor all output to the repository root regardless of the current working
// directory. This script lives in <repo>/backend/scripts, so the repo root is
// two levels up. (Previously this used __dirname directly, which wrote the data
// into the stray backend/scripts/frontend/public and backend/scripts/backend/data
// folders and never reached the real frontend/public the app fetches from.)
const REPO_ROOT = path.resolve(__dirname, '..', '..');

const url = "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson";

// Deterministic seeded RNG so re-running the pipeline yields stable metrics.
function seededRandom(seedStr) {
    let h = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
        h ^= seedStr.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return () => {
        h += 0x6D2B79F5;
        let t = h;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Canonical spellings so MapView's `DISTRICT === "Gautam Buddha Nagar"` match holds.
const CANONICAL_DISTRICT = {
    "gautam buddh nagar": "Gautam Buddha Nagar",
    "gautam budh nagar": "Gautam Buddha Nagar",
    "gautam buddha nagar": "Gautam Buddha Nagar"
};

console.log(`Fetching districts from ${url}...`);

https.get(url, { headers: { 'User-Agent': 'GLIS-DSS/1.0 (NodeJS)' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const geojson = JSON.parse(data);
            const upDistricts = geojson.features.filter(f => {
                const state = f.properties.NAME_1 || f.properties.ST_NM || "";
                return state.toLowerCase() === "uttar pradesh";
            });

            const outGeoJSON = {
                type: "FeatureCollection",
                features: upDistricts.map(f => {
                    // Normalize the district name for MapView, then canonicalize known variants.
                    let name = f.properties.NAME_2 || f.properties.DISTRICT || "Unknown";
                    const key = String(name).toLowerCase().trim();
                    if (CANONICAL_DISTRICT[key]) name = CANONICAL_DISTRICT[key];
                    f.properties.DISTRICT = name;

                    // Attach deterministic administrative land metrics (demo values over real geometry).
                    const rand = seededRandom(name);
                    if (!f.properties.total_govt_land_ha) {
                        f.properties.total_govt_land_ha = Math.floor(rand() * (85000 - 12000) + 12000);
                        f.properties.active_encroachment_alerts = Math.floor(rand() * 150);
                        f.properties.avg_suitability_score = Math.floor(rand() * (95 - 40) + 40);
                        f.properties.land_bank_utilization_pct = parseFloat((rand() * (85 - 20) + 20).toFixed(1));
                    }
                    return f;
                })
            };

            const frontendOut = path.join(REPO_ROOT, 'frontend', 'public', 'up_districts.geojson');
            const backendOut = path.join(REPO_ROOT, 'backend', 'data', 'real_up_75_districts.geojson');

            fs.mkdirSync(path.dirname(frontendOut), { recursive: true });
            fs.mkdirSync(path.dirname(backendOut), { recursive: true });

            fs.writeFileSync(frontendOut, JSON.stringify(outGeoJSON));
            fs.writeFileSync(backendOut, JSON.stringify(outGeoJSON));

            const hasGBN = outGeoJSON.features.some(f => f.properties.DISTRICT === "Gautam Buddha Nagar");
            console.log(`Successfully extracted ${upDistricts.length} UP districts.`);
            console.log(`Gautam Buddha Nagar present: ${hasGBN}`);
            console.log(`Wrote: ${frontendOut}`);
            console.log(`Wrote: ${backendOut}`);
        } catch(e) {
            console.error("Failed to parse JSON:", e);
            process.exit(1);
        }
    });
}).on('error', err => {
    console.error(err);
    process.exit(1);
});
