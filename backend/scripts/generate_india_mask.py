"""
Generate frontend/public/india_mask.geojson — the "sovereign India" overlay that
darkens every non-India area on the map.

The mask is derived from the SAME reconciled State/UT layer the map draws
(india_states.geojson), so the masked region and the drawn boundaries can never
disagree (see Section 4 synchronization requirement). It intentionally does NOT
pull a second, differently-sourced national outline.

Northern-boundary caveat: india_states.geojson is built from GADM 4.1 + OSM, both
of which depict India's northern extent short of the full official Survey of India
claim (they reach ~35.5 deg N, i.e. excluding Aksai Chin / northern PoK /
Gilgit-Baltistan). This mask therefore reflects that same real-data extent. The
official full-claim depiction is not present in the open datasets used here and is
NOT fabricated. See backend/data/boundary_provenance.json.

Run:  py backend/scripts/generate_india_mask.py   (after ingest_states.py)
"""
import json
import os
import sys

from shapely.geometry import shape, mapping, Polygon
from shapely.ops import unary_union

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PUBLIC_DIR = os.path.join(REPO_ROOT, "frontend", "public")
states_path = os.path.join(PUBLIC_DIR, "india_states.geojson")

if not os.path.exists(states_path):
    sys.exit(
        "ERROR: frontend/public/india_states.geojson not found. "
        "Run `py backend/scripts/ingest_states.py` first to produce the real "
        "State/UT boundaries. This script will NOT fall back to a different source."
    )

with open(states_path, "r", encoding="utf-8") as f:
    india_data = json.load(f)

geoms = [shape(feat["geometry"]).buffer(0) for feat in india_data["features"] if feat.get("geometry")]
india_boundary = unary_union(geoms)

world_box = Polygon([(-180, -90), (180, -90), (180, 90), (-180, 90), (-180, -90)])
inverted_mask = world_box.difference(india_boundary)

mask_geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {"name": "India-exclusive mask (derived from india_states.geojson)"},
            "geometry": mapping(inverted_mask),
        }
    ],
}

out = os.path.join(PUBLIC_DIR, "india_mask.geojson")
with open(out, "w", encoding="utf-8") as f:
    json.dump(mask_geojson, f)

print(f"SUCCESS: wrote {out} from {len(geoms)} State/UT geometries.")
print("India outline bounds: %.2f,%.2f .. %.2f,%.2f" % india_boundary.bounds)
