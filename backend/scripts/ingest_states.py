"""
PHASE 1 — Real, current India State + Union Territory boundaries.

Seed source : GADM 4.1 (level-1), https://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_IND_1.json
Reconciled  : to the *current* administrative reality (28 States + 8 UTs) because GADM 4.1
              (2022 vintage) does NOT match it:
                - it stores multipart states as several features   -> dissolve by name
                - it lacks Ladakh (Jammu & Kashmir still one unit)  -> sourced from OSM
                - Dadra & Nagar Haveli and Daman & Diu are separate -> merged (2020 UT)
                - NAME_1 values are space-stripped, ENGTYPE_1 is unreliable
NO geometry is fabricated. Where GADM cannot supply a current unit (Ladakh, current J&K UT)
the boundary is fetched from OpenStreetMap/Nominatim (real data). If that live fetch fails,
the script keeps GADM's combined Jammu & Kashmir and records the limitation honestly in the
provenance file — it never invents a polygon.

Outputs:
  frontend/public/india_states.geojson      (map layer, one feature per current State/UT)
  backend/data/india_states.geojson         (identical copy served by the API)
  backend/data/boundary_provenance.json     (source, date, CRS, processing, per-unit origin)

Run:  py backend/scripts/ingest_states.py
"""
import json
import os
import sys
import time
import urllib.request
from collections import defaultdict
from datetime import date

from shapely.geometry import shape, mapping
from shapely.ops import unary_union

# ── Paths (anchored to repo root; never write into a nested scripts/ folder) ──
SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(SCRIPTS_DIR))
PUBLIC_DIR = os.path.join(REPO_ROOT, "frontend", "public")
DATA_DIR = os.path.join(REPO_ROOT, "backend", "data")
CACHE_DIR = os.path.join(REPO_ROOT, "cache", "gadm")
for d in (PUBLIC_DIR, DATA_DIR, CACHE_DIR):
    os.makedirs(d, exist_ok=True)

GADM_URL = "https://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_IND_1.json"
GADM_RAW = os.path.join(CACHE_DIR, "gadm41_IND_1.json")

# ── Authoritative current classification (public constitutional fact, NOT geometry) ──
# 28 States + 8 Union Territories, effective since the 2019 J&K/Ladakh reorganisation
# and the 2020 merger of Dadra & Nagar Haveli with Daman & Diu.
STATES_28 = {
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
}
UTS_8 = {
    "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
}

# GADM (space-stripped) NAME_1 -> current clean display name.
# "__DNHDD__" is a sentinel: the two GADM features are unioned into the merged UT.
GADM_NAME_FIX = {
    "AndamanandNicobar": "Andaman and Nicobar Islands",
    "AndhraPradesh": "Andhra Pradesh",
    "ArunachalPradesh": "Arunachal Pradesh",
    "Assam": "Assam",
    "Bihar": "Bihar",
    "Chandigarh": "Chandigarh",
    "Chhattisgarh": "Chhattisgarh",
    "DadraandNagarHaveli": "Dadra and Nagar Haveli and Daman and Diu",
    "DamanandDiu": "Dadra and Nagar Haveli and Daman and Diu",
    "Goa": "Goa",
    "Gujarat": "Gujarat",
    "Haryana": "Haryana",
    "HimachalPradesh": "Himachal Pradesh",
    "JammuandKashmir": "Jammu and Kashmir",
    "Jharkhand": "Jharkhand",
    "Karnataka": "Karnataka",
    "Kerala": "Kerala",
    "Lakshadweep": "Lakshadweep",
    "MadhyaPradesh": "Madhya Pradesh",
    "Maharashtra": "Maharashtra",
    "Manipur": "Manipur",
    "Meghalaya": "Meghalaya",
    "Mizoram": "Mizoram",
    "NCTofDelhi": "Delhi",
    "Nagaland": "Nagaland",
    "Odisha": "Odisha",
    "Puducherry": "Puducherry",
    "Punjab": "Punjab",
    "Rajasthan": "Rajasthan",
    "Sikkim": "Sikkim",
    "TamilNadu": "Tamil Nadu",
    "Telangana": "Telangana",
    "Tripura": "Tripura",
    "UttarPradesh": "Uttar Pradesh",
    "Uttarakhand": "Uttarakhand",
    "WestBengal": "West Bengal",
}


def _download_gadm():
    if os.path.exists(GADM_RAW) and os.path.getsize(GADM_RAW) > 100_000:
        print(f"  using cached {GADM_RAW}")
        return
    print(f"  downloading {GADM_URL}")
    req = urllib.request.Request(GADM_URL, headers={"User-Agent": "GLIS-DSS/1.0 (real-data ingest)"})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    with open(GADM_RAW, "wb") as f:
        f.write(data)


def _clean(geom):
    """Return a valid shapely geometry (buffer(0) repairs self-intersections)."""
    g = shape(geom)
    if not g.is_valid:
        g = g.buffer(0)
    return g


def _fetch_osm_polygon(query):
    """Fetch a current admin boundary polygon from Nominatim (real OSM data)."""
    url = (
        "https://nominatim.openstreetmap.org/search?"
        + urllib.parse.urlencode({"q": query, "format": "json", "polygon_geojson": 1, "limit": 1})
    )
    req = urllib.request.Request(url, headers={"User-Agent": "GLIS-DSS/1.0 (boundary reconcile; contact: project maintainer)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        arr = json.loads(r.read().decode("utf-8"))
    if not arr or "geojson" not in arr[0]:
        raise ValueError(f"no polygon for '{query}'")
    return _clean(arr[0]["geojson"]), arr[0].get("osm_id")


import urllib.parse  # noqa: E402  (after stdlib import block for clarity)


def main():
    print("PHASE 1 — India State/UT boundary ingestion")
    _download_gadm()
    gadm = json.load(open(GADM_RAW, encoding="utf-8"))

    # 1) Dissolve GADM level-1 features by their current clean name.
    by_name = defaultdict(list)
    unmapped = set()
    for feat in gadm["features"]:
        raw = feat["properties"].get("NAME_1")
        clean = GADM_NAME_FIX.get(raw)
        if clean is None:
            unmapped.add(raw)
            continue
        by_name[clean].append(_clean(feat["geometry"]))
    if unmapped:
        print(f"  ! WARNING unmapped GADM NAME_1 values (skipped): {sorted(unmapped)}")

    dissolved = {name: unary_union(geoms) for name, geoms in by_name.items()}
    provenance_unit = {name: "GADM 4.1 level-1 (dissolved by name)" for name in dissolved}

    # 2) Reconcile J&K / Ladakh to the current UTs using real OSM boundaries.
    #    GADM 4.1 predates the 2019 bifurcation, so it has neither Ladakh nor the
    #    current (reduced) J&K UT. We replace the combined GADM unit with two real
    #    OSM polygons. On any failure we KEEP GADM's combined J&K and log the gap.
    reconciled_jk = False
    try:
        print("  reconciling Jammu & Kashmir / Ladakh from OpenStreetMap...")
        ladakh_geom, ladakh_osm = _fetch_osm_polygon("Ladakh, India")
        time.sleep(1.2)  # Nominatim usage policy
        jk_geom, jk_osm = _fetch_osm_polygon("Jammu and Kashmir, India")
        dissolved["Ladakh"] = ladakh_geom
        dissolved["Jammu and Kashmir"] = jk_geom
        provenance_unit["Ladakh"] = f"OpenStreetMap via Nominatim (osm_id={ladakh_osm})"
        provenance_unit["Jammu and Kashmir"] = f"OpenStreetMap via Nominatim (osm_id={jk_osm})"
        reconciled_jk = True
        print("    -> Ladakh + current J&K UT sourced from OSM")
    except Exception as e:
        print(f"    ! OSM reconcile failed ({e}); keeping GADM combined Jammu & Kashmir, Ladakh UNAVAILABLE (not fabricated)")

    # 3) Build the output FeatureCollection with a clean, generic schema.
    features = []
    for name in sorted(dissolved):
        if name in STATES_28:
            admin_type = "State"
        elif name in UTS_8:
            admin_type = "Union Territory"
        else:
            admin_type = "Unknown"
        features.append({
            "type": "Feature",
            "properties": {
                "state_name": name,
                "NAME_1": name,          # back-compat for current MapView highlight logic
                "admin_type": admin_type,
                "source": provenance_unit.get(name, "GADM 4.1"),
            },
            "geometry": mapping(dissolved[name]),
        })

    fc = {
        "type": "FeatureCollection",
        "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
        "features": features,
    }

    for out in (os.path.join(PUBLIC_DIR, "india_states.geojson"),
                os.path.join(DATA_DIR, "india_states.geojson")):
        with open(out, "w", encoding="utf-8") as f:
            json.dump(fc, f)
        print(f"  wrote {out}")

    # 4) Provenance (Section 36).
    states = sorted(n for n in dissolved if n in STATES_28)
    uts = sorted(n for n in dissolved if n in UTS_8)
    unknown = sorted(n for n in dissolved if n not in STATES_28 and n not in UTS_8)
    provenance = {
        "layer": "India States & Union Territories",
        "seed_dataset": "GADM 4.1, level-1 administrative areas (India)",
        "seed_url": GADM_URL,
        "reconciliation_source": "OpenStreetMap via Nominatim (Ladakh, current J&K UT)",
        "retrieved": date.today().isoformat(),
        "crs": "EPSG:4326 (WGS84 / CRS84)",
        "feature_count": len(features),
        "states_count": len(states),
        "union_territories_count": len(uts),
        "unknown_type": unknown,
        "ladakh_reconciled_from_osm": reconciled_jk,
        "license": "GADM data is free for academic and non-commercial use; commercial "
                   "redistribution requires permission (https://gadm.org/license.html). "
                   "OSM data © OpenStreetMap contributors, ODbL.",
        "processing_steps": [
            "Download GADM 4.1 level-1 GeoJSON for India.",
            "Dissolve multipart features by current state/UT name (shapely unary_union).",
            "Repair invalid geometries with buffer(0).",
            "Map GADM space-stripped NAME_1 to current clean display names.",
            "Merge Dadra & Nagar Haveli + Daman & Diu into the single 2020 UT.",
            "Replace GADM combined Jammu & Kashmir with real OSM polygons for the current "
            "J&K UT and Ladakh UT (no fabrication; documented fallback if OSM unavailable).",
            "Classify each unit as State / Union Territory via the authoritative 28+8 list.",
        ],
        "known_limitations": [
            "GADM 4.1 (2022 vintage) does not depict the 2019 J&K reorganisation; reconciled via OSM.",
            "GADM depicts disputed international boundaries per its own methodology, which may "
            "differ from the Survey of India's official depiction.",
            "No geometry simplification applied at state level (full GADM resolution retained).",
        ],
        "per_unit_source": provenance_unit,
    }
    prov_path = os.path.join(DATA_DIR, "boundary_provenance.json")
    with open(prov_path, "w", encoding="utf-8") as f:
        json.dump(provenance, f, indent=2)
    print(f"  wrote {prov_path}")

    # 5) Validation report.
    print("\n  VALIDATION")
    print(f"    total units      : {len(features)}  (target 36 = 28 States + 8 UTs)")
    print(f"    States           : {len(states)}")
    print(f"    Union Territories: {len(uts)}")
    if unknown:
        print(f"    ! UNKNOWN type   : {unknown}")
    missing_states = sorted(STATES_28 - set(states))
    missing_uts = sorted(UTS_8 - set(uts))
    if missing_states:
        print(f"    ! MISSING states : {missing_states}")
    if missing_uts:
        print(f"    ! MISSING UTs    : {missing_uts}")
    invalid = sum(0 if shape(f["geometry"]).is_valid else 1 for f in features)
    print(f"    invalid geometry : {invalid}")
    print("  DONE")
    # Non-zero exit if we did not reach the authoritative 36 with valid geometry.
    if len(features) != 36 or invalid > 0 or missing_states or missing_uts:
        print("  ! Result does not match the authoritative current administration; review above.")
        sys.exit(2)


if __name__ == "__main__":
    main()
