# AI Handoff & Instructions

Welcome to the Smart Land Intelligence & Analytics Platform.

## 1. Core Rule: Update Progress
**CRITICAL RULE:**
Follow the 3-step sequence for every prompt:
1. **Pre-Execution:** Read `PROGRESS.md` and mark targeted task as In-Progress `[/]`.
2. **Execution:** Modify code, install packages, write tests, verify builds.
3. **Post-Execution (MANDATORY BEFORE FINISHING):** 
   - Move completed tasks to `[x]` in `PROGRESS.md`.
   - Add newly discovered next steps to Pending `[ ]`.
   - Update `AI_HANDOFF.md` (this file) with the new handoff state.
   - Update `CHANGELOG.md` with a bulleted summary.

## 2. Context Memory for Next Session

**⚠️ Do NOT revert `frontend/vite.config.js` `optimizeDeps.exclude: ['maplibre-gl']`.**
MapLibre GL v6.7.0 loads its tile/geometry web worker from `dist/maplibre-gl-worker.mjs`.
Vite's dep pre-bundler does not emit that worker chunk, so it 404s and the map goes
**completely blank** (no basemap tiles, no GeoJSON features — the map object still constructs,
which makes it look like a data bug when it isn't). Excluding maplibre-gl from pre-bundling is
the fix. If you touch dep optimization, clear `frontend/node_modules/.vite` and re-verify the
map renders before moving on.

**Most recent milestone — P1 (real 36 State/UT boundaries), done & verified 2026-09-12:**
- `backend/scripts/ingest_states.py` produces `frontend/public/india_states.geojson` (+ copy in
  `backend/data/`): **28 States + 8 Union Territories**, the current administration. Seed = GADM
  4.1 level-1, dissolved by current name (`shapely.unary_union`, `buffer(0)` repair); DNH + DD
  merged; current **J&K UT + Ladakh UT from OpenStreetMap/Nominatim** (GADM predates the 2019
  split). Feature props: `state_name`, `admin_type`, `source`. `backend/data/boundary_provenance.json`
  documents source/date/CRS/license/limitations. **No geometry fabricated** (documented fallback
  if OSM fails). Northern extent reaches ~35.5°N (GADM+OSM don't depict Aksai Chin / northern PoK /
  Gilgit-Baltistan — real-data limitation, not fabricated to the full official claim).
- `generate_india_mask.py` now derives `india_mask.geojson` from that same states layer, so mask
  and boundaries can never disagree.
- `MapView.jsx` fetches `/india_states.geojson`; `loadNationalLayer` is idempotent (StrictMode-safe).
- Verified in-browser: worker serves `200`, GeoJSON source `loaded()`, 35/36 units render, UP
  highlighted, mask present, zero console errors; `npm run build` passes.
- Deleted the outdated tracked `frontend/public/india.geojson` (superseded).

**Summary of the earlier state of the codebase (still largely true):**
- Frontend: Fully refactored to a unified High-Contrast Dark Command Center theme (`bg-slate-950`).
- Map Engine: **MIGRATED from Leaflet to MapLibre GL JS (WebGL-accelerated).** The entire `MapView.jsx` has been rewritten from scratch. No Leaflet code runs (dead `leaflet`/`react-leaflet` deps still linger in `package.json` — flagged for removal).
- Map Hierarchy: 3-tier drill-down (National → Uttar Pradesh → Gautam Buddha Nagar) with `flyTo` animated transitions.
- India Masking: `india_mask.geojson` is loaded as a MapLibre GeoJSON fill layer with `fill-opacity: 0.97`, fully hiding all foreign territories.
- GLIS Layer Panel: Collapsible panel with toggle controls for Government Land, Forest, Mining, Industrial, Infrastructure, and Encroachment Risk layers.
- **Authentic data pipeline (repaired 2026-09-11):** All generator scripts now anchor to `REPO_ROOT = path.resolve(__dirname, '..', '..')` (Node) / `os.path.dirname(...x3)` (Python), fixing a `__dirname` bug that had been writing assets into a stray nested `backend/scripts/frontend/public` folder.
  - `extract_up_boundaries.js` → 70 real UP districts from **geohacker/india** (LIVE; Datameet URLs are dead/404) into `frontend/public/up_districts.geojson` + `backend/data/real_up_75_districts.geojson`, with seeded intelligence metrics. GBN is a genuine 308-vertex curved polygon.
  - `fetch_gbn_boundary.js` → GBN outline from Nominatim into `frontend/public/gbn_boundary.geojson`.
  - `generate_india_mask.py` → `frontend/public/india_mask.geojson` (shapely `unary_union` of India states differenced from a world box).
  - `fetch_authentic_data.py` (needs geopandas + osmnx) → `backend/data/real_gbn_parcels.geojson` (885 real OSM land-use parcels) + `real_gbn_highways.geojson` (287 OSM motorway/trunk/primary edges). Parcel intelligence is baked in at generation time from `ai-model/model_service.get_parcel_intelligence`.
- **Schema single source of truth:** `model_service.get_parcel_intelligence(parcel_id)` defines the contract — `suitability_score`, `risk_score`, `ml_growth_prob`, `temporal_delta{builtup_2020_pct,builtup_2026_pct,encroachment_flag}`, `shap_drivers{positive[],negative[]}`, `official_recommendation`. It is used BOTH to bake parcel properties and to serve `/api/parcels/{id}/intelligence`, so the choropleth fill, click-card, and API always agree. `MapView` flat-spreads `...intelligence` onto clicked-parcel properties (idempotent, since parcels already carry the fields). `DecisionSupportCard.jsx` reads them directly (missing `Activity` lucide import fixed).

**Server running status:**
- Frontend (Vite): `npm run dev` on port 5173. `npm run build` verified passing with **zero errors** (2026-09-11).
- Backend (FastAPI): Offline by default; start manually with `py backend/main.py` on port 8000. Booted & curl-verified this session — `/api/health`, `/api/up/districts` (70), `.../gautam-buddha-nagar/parcels` (885), `.../highways` (287), `/api/parcels/UP-GBN-REAL-0/intelligence` (full nested schema) all return correctly.

**Known bugs or pending edge cases:**
- ML is a deterministic **seeded mock** (`random.Random(parcel_id)`), not a trained model. `scikit-learn`/`shap` are listed in requirements but unused; no real XGBoost/TreeSHAP yet.
- `temporal_delta` built-up percentages are synthesized, not derived from real Sentinel-2 / ESA WorldCover imagery. Khasra numbers, tehsil, department, and declared_status are demo cadastral attributes layered over 100% real OSM geometry.
- Dead `leaflet` / `react-leaflet` dependencies remain in `frontend/package.json`.

**Exact next command/action for whoever picks up the task:**
- **Next milestone is P2: all *current* UP districts.** The existing `up_districts.geojson` carries
  ~70 districts with outdated names — reconcile to the current UP district list (GADM level-2 →
  current names/splits; source any missing districts from OSM; **never fabricate** a polygon).
  Keep the pipeline **generic** (every district uses the same path — Gautam Buddh Nagar is just one
  district, not a default/hardcoded case). Then P3 (generic country→state→district API), P4 (generic
  MapLibre drill-down), and P8 (replace the seeded-random metrics with a transparent real-feature
  index — do not call it ML).
- Regenerate P1 assets: `py backend/scripts/ingest_states.py` then `py backend/scripts/generate_india_mask.py`.
- Dev server: `.claude/launch.json` runs Vite on **port 5180** for the in-app preview
  (`npm --prefix frontend run dev -- --port 5180 --strictPort`); a bare `npm run dev` uses Vite's
  default 5173. Backend (FastAPI): start with `py backend/main.py` on :8000.
