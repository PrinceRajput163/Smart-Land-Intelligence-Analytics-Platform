import os
import sys
import json
import random

import geopandas as gpd
import osmnx as ox

# ── Paths ────────────────────────────────────────────────────────────────────
# This script lives in <repo>/backend/scripts.
SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(SCRIPTS_DIR)
REPO_ROOT = os.path.dirname(BACKEND_DIR)
DATA_DIR = os.path.join(BACKEND_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

# Reuse the single source of truth for parcel intelligence so the map fill,
# the click-through Decision Support card, and the /intelligence API all agree.
sys.path.append(os.path.join(REPO_ROOT, "ai-model"))
from model_service import get_parcel_intelligence  # noqa: E402

PLACE = "Gautam Buddha Nagar, Uttar Pradesh, India"
ACRES_PER_SQM = 1.0 / 4046.8564224

# Cadastral identity vocab (demo attributes layered over 100% real OSM geometry).
TEHSILS = ["Dadri", "Jewar", "Sadar (Noida)", "Jewar Khadar"]
DEPARTMENTS = ["Revenue Department, GoUP", "YEIDA", "Forest Department, UP", "PWD, UP"]
STATUSES = ["Government Land", "Gram Sabha Land", "Nazul Land", "Acquired – YEIDA"]


def _stringify_list_cols(gdf, cols):
    """OSM tag columns are sometimes Python lists; flatten to strings for GeoJSON."""
    for c in cols:
        if c in gdf.columns:
            gdf[c] = gdf[c].apply(lambda v: ", ".join(v) if isinstance(v, list) else v)
    return gdf


def fetch_gbn_highways():
    print("Fetching authentic Road & Expressway geometries for GBN via osmnx...")
    try:
        G = ox.graph_from_place(
            PLACE,
            network_type="drive",
            custom_filter='["highway"~"motorway|trunk|primary"]',
        )
        _, gdf_edges = ox.graph_to_gdfs(G)
        gdf_edges = gdf_edges.reset_index()

        keep = [c for c in ["name", "highway", "ref", "geometry"] if c in gdf_edges.columns]
        gdf_e = gdf_edges[keep].copy()
        gdf_e = _stringify_list_cols(gdf_e, ["name", "highway", "ref"])

        gj = json.loads(gdf_e.to_json())
        out = os.path.join(DATA_DIR, "real_gbn_highways.geojson")
        with open(out, "w", encoding="utf-8") as f:
            json.dump(gj, f)
        print(f"  -> real_gbn_highways.geojson ({len(gj['features'])} edges)")
    except Exception as e:
        print(f"  ! Error fetching highways via osmnx: {e}")


def fetch_gbn_parcels():
    print("Fetching authentic Land-Use Revenue Boundaries (parcels) for GBN via osmnx...")
    try:
        tags = {"landuse": ["industrial", "commercial", "residential", "farmland", "greenfield"]}
        gdf = ox.features_from_place(PLACE, tags)
        gdf = gdf[gdf.geometry.type.isin(["Polygon", "MultiPolygon"])].copy()

        if gdf.empty:
            print("  ! No land-use polygons returned; writing empty collection.")
            _write_empty("real_gbn_parcels.geojson")
            return

        # Real area in acres via an appropriate UTM projection.
        areas_acres = None
        try:
            utm = gdf.estimate_utm_crs()
            areas_acres = (gdf.to_crs(utm).geometry.area * ACRES_PER_SQM).tolist()
        except Exception as e:
            print(f"  (area projection unavailable, synthesizing: {e})")

        # Keep only geometry, then rebuild GeoJSON and enrich per-feature so that
        # nested objects (temporal_delta, shap_drivers) serialize cleanly.
        gj = json.loads(gdf[["geometry"]].to_json())

        for i, feat in enumerate(gj["features"]):
            pid = f"UP-GBN-REAL-{i}"
            r = random.Random(pid)
            intel = get_parcel_intelligence(pid)
            area = (
                round(float(areas_acres[i]), 2)
                if areas_acres is not None
                else round(r.uniform(0.5, 25.0), 2)
            )
            feat["properties"] = {
                "parcel_id": pid,
                "khasra_no": f"{r.randint(1, 1200)}/{r.randint(1, 9)}",
                "tehsil": r.choice(TEHSILS),
                "department": r.choice(DEPARTMENTS),
                "declared_status": r.choice(STATUSES),
                "area_acres": area,
                # ── Intelligence fields (single source of truth) ──
                "suitability_score": intel["suitability_score"],
                "risk_score": intel["risk_score"],
                "ml_growth_prob": intel["ml_growth_prob"],
                "temporal_delta": intel["temporal_delta"],
                "shap_drivers": intel["shap_drivers"],
                "official_recommendation": intel["official_recommendation"],
            }

        out = os.path.join(DATA_DIR, "real_gbn_parcels.geojson")
        with open(out, "w", encoding="utf-8") as f:
            json.dump(gj, f)
        print(f"  -> real_gbn_parcels.geojson ({len(gj['features'])} parcels, real geometry + baked intelligence)")
    except Exception as e:
        print(f"  ! Error fetching parcels via osmnx: {e}")


def _write_empty(name):
    with open(os.path.join(DATA_DIR, name), "w", encoding="utf-8") as f:
        json.dump({"type": "FeatureCollection", "features": []}, f)


if __name__ == "__main__":
    # NOTE: UP district boundaries + the GBN outline are produced by the Node
    # scripts (extract_up_boundaries.js / fetch_gbn_boundary.js) from live
    # sources. The old Datameet URLs this script used (india_boundary.geojson,
    # UP_Districts.geojson) now return 404, so district fetching was removed here.
    fetch_gbn_highways()
    fetch_gbn_parcels()
    print("Real spatial data ingestion pipeline complete.")
