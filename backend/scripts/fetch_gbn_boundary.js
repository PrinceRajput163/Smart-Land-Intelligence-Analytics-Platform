const https = require('https');
const fs = require('fs');
const path = require('path');

// Anchor output to the repo root (this script lives in <repo>/backend/scripts),
// so the boundary lands in the real frontend/public the app fetches from — not
// the stray backend/scripts/frontend/public folder the old __dirname path created.
const REPO_ROOT = path.resolve(__dirname, '..', '..');

const url = "https://nominatim.openstreetmap.org/search?q=Gautam+Buddha+Nagar+District&format=geojson&polygon_geojson=1";

console.log(`Fetching genuine Gautam Buddha Nagar boundary from ${url}...`);

https.get(url, { headers: { 'User-Agent': 'GLIS-DSS-Academic-Project/1.0 (NodeJS)' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const geojson = JSON.parse(data);
            if (!geojson.features || geojson.features.length === 0) {
                console.error("Nominatim returned no polygon features for GBN.");
                process.exit(1);
            }
            const frontendOut = path.join(REPO_ROOT, 'frontend', 'public', 'gbn_boundary.geojson');

            fs.mkdirSync(path.dirname(frontendOut), { recursive: true });
            fs.writeFileSync(frontendOut, JSON.stringify(geojson));

            console.log(`Real curved GBN boundary saved successfully -> ${frontendOut}`);
        } catch(e) {
            console.error("Failed to parse JSON:", e);
            process.exit(1);
        }
    });
}).on('error', err => {
    console.error(err);
    process.exit(1);
});
