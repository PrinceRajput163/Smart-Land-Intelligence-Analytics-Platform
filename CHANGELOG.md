# Changelog

All notable changes to this project will be documented in this file.

> **Data-honesty note (2026-09-12):** Earlier entries below use words like "authentic",
> "100% real", and "single source of truth" for the *intelligence metrics*
> (`suitability_score`, `risk_score`, alerts, `temporal_delta`, `shap_drivers`,
> `official_recommendation`). Those metrics are still a **deterministic MOCK**
> (`random.Random(parcel_id)` in `ai-model/model_service.py`) — real geometry with
> fabricated numbers layered on top. They are scheduled to be replaced by a transparent
> real-feature index (Phase 8) and real recommendations (Phase 9). Only the **boundary
> geometry** is real. Treat those older claims as scope-of-geometry only.

## [2026-09-12] - Phase 1: Real current 36 State/UT boundaries + MapLibre worker fix

### Fixed
- **CRITICAL — blank map (MapLibre GL v6 worker 404).** MapLibre GL JS v6.7.0 runs its
  tile/geometry parsing in a sibling ESM web worker (`dist/maplibre-gl-worker.mjs`,
  resolved via `import.meta.url`). Vite's dependency pre-bundler inlined `maplibre-gl.js`
  into `.vite/deps/` but **never emitted the worker chunk**, so the runtime request for
  `/node_modules/.vite/deps/maplibre-gl-worker.mjs` returned **404**. With no worker, the
  map processed **no** tiles: the Esri basemap stayed blank AND every GeoJSON source
  reported `loaded() === false` (0 rendered features) — a fully blank canvas even though
  the map object constructed fine. Fixed by excluding `maplibre-gl` from Vite dep
  optimization (`optimizeDeps.exclude: ['maplibre-gl']` in `frontend/vite.config.js`) so
  Vite serves it as source ESM and the worker resolves to the real dist file. Verified
  in-browser: worker now serves `200`, GeoJSON source `loaded() === true`, 35/36 States/UTs
  render, Uttar Pradesh highlighted. Production `npm run build` still passes.

### Added
- **Real, current India State + Union Territory boundaries (36 units).** New
  `backend/scripts/ingest_states.py` builds `frontend/public/india_states.geojson`
  (+ a copy at `backend/data/india_states.geojson`) as **28 States + 8 Union Territories**
  — the *current* administrative reality. Seed geometry is GADM 4.1 level-1, reconciled to
  today's units: multipart features dissolved by name (`shapely.unary_union`), invalid
  geometry repaired with `buffer(0)`, Dadra & Nagar Haveli + Daman & Diu merged into the
  single 2020 UT, and the current Jammu & Kashmir UT + Ladakh UT sourced from
  **OpenStreetMap/Nominatim** (GADM 4.1 predates the 2019 reorganisation). Each feature
  carries `state_name`, `admin_type` (State/Union Territory), and a per-unit `source`.
  Validation exits non-zero unless exactly 36 units with valid geometry are produced.
- **Boundary provenance (`backend/data/boundary_provenance.json`).** Documents seed dataset,
  reconciliation source, retrieval date, CRS (EPSG:4326/CRS84), per-unit origin, license
  (GADM non-commercial + OSM ODbL), processing steps, and known limitations — per the
  real-data documentation requirement. **No geometry is fabricated**; if the OSM reconcile
  fails the script keeps GADM's combined J&K and records the gap honestly (Ladakh marked
  unavailable rather than invented).

### Changed
- **`MapView.jsx` now draws the real State/UT layer.** National layer fetches
  `/india_states.geojson` (was the outdated `/india.geojson`); `loadNationalLayer` made
  idempotent (guard + remove-before-add) to survive React StrictMode double-invoke without
  the "source already exists" throw.
- **India mask derived from the same states layer.** `generate_india_mask.py` now inverts
  `unary_union` of `india_states.geojson` (was a differently-sourced outline), so the mask
  and the drawn boundaries can never disagree. It errors out (no silent fallback) if the
  states file is missing. Northern-extent caveat (GADM+OSM reach ~35.5°N, i.e. Aksai Chin /
  northern PoK / Gilgit-Baltistan not depicted) is documented, not fabricated.

### Removed
- **Deleted the outdated tracked `frontend/public/india.geojson`** (22.97 MB, an older
  single-outline dataset) — superseded by `india_states.geojson`. This was the only
  git-tracked deletion made by this task.

## [2026-09-11] - Authentic Data Pipeline Repair & Schema Reconciliation

### Fixed
- **[v3.1] - Pipeline `__dirname` path bug**: `extract_up_boundaries.js` and `fetch_gbn_boundary.js` were resolving output paths relative to the script directory, silently writing real GeoJSON into a stray nested `backend/scripts/frontend/public/` folder — so `frontend/public/` kept serving a 1.4 KB, 5-rectangle mock. Both scripts (and the Python generators) now anchor to the true repo root, so authentic assets land in `frontend/public/`.
- **[v3.1] - Latent `DecisionSupportCard` crash**: `<Activity>` was rendered but never imported from `lucide-react`; the card would have thrown once real parcels rendered. Import corrected (added `Activity`, dropped unused `CheckCircle2`/`FileText`).

### Added
- **[v3.1] - 70 authentic UP districts**: `extract_up_boundaries.js` now harvests real district polygons from **geohacker/india** (LIVE) into `frontend/public/up_districts.geojson` + `backend/data/real_up_75_districts.geojson`, injecting seeded intelligence metrics (`total_govt_land_ha`, `active_encroachment_alerts`, `avg_suitability_score`, `land_bank_utilization_pct`). Gautam Buddha Nagar renders as a genuine 308-vertex curved boundary.
- **[v3.1] - 885 real GBN parcels + 287 OSM highways**: Installed `geopandas`/`osmnx` and ran `fetch_authentic_data.py` → `real_gbn_parcels.geojson` (real OSM land-use geometry with baked intelligence) and `real_gbn_highways.geojson` (motorway/trunk/primary edges). Nested properties (`temporal_delta`, `shap_drivers`) are built in pure Python + `json.dump` to sidestep OGR serialization issues.
- **[v3.1] - End-to-end endpoint verification**: Booted FastAPI (:8000) and curl-verified `/api/health`, `/api/up/districts`, `.../gautam-buddha-nagar/parcels`, `.../highways`, and `/api/parcels/{id}/intelligence` against the card's expected fields.

### Changed
- **[v3.1] - Single schema source of truth**: `ai-model/model_service.py` rewritten to define one intelligence contract (`suitability_score`, `risk_score`, `ml_growth_prob`, `temporal_delta`, `shap_drivers{positive,negative}`, `official_recommendation`) — deterministic via `random.Random(parcel_id)`, no more `time.sleep`. Used BOTH to bake parcel properties at generation time and to serve the `/intelligence` endpoint, guaranteeing the choropleth fill, click-card, and API agree. `MapView` parcel-click handler flat-spreads `...intelligence` onto properties so the card reads fields directly.
- **[v3.1] - Retired dead Datameet sources**: All Datameet URLs (404) removed from the ingestion path; district geometry now comes from geohacker/india, GBN outline from Nominatim.
- **[v3.1] - Build verified**: `npm run build` passes with zero errors (MapLibre GL JS engine intact; only a non-blocking chunk-size advisory remains).

## [Unreleased]

### Added
- Created comprehensive documentation suite (`PROJECT_CONTEXT.md`, `PROJECT_STATUS.md`, `ARCHITECTURE.md`, `DEVELOPMENT_GUIDELINES.md`, `ROADMAP.md`, `AI_HANDOFF.md`, `CHANGELOG.md`).
- Extracted `AppLayout.jsx` to cleanly handle nested route layouts separately from `App.jsx`.

### Changed
- Reorganized `frontend/src/components/` into feature-based subdirectories (`layout`, `common`, `dashboard`, `gis`, `analytics`, `land-records`, `ai`, `reports`).
- Fixed numerous responsive design issues across `Navbar`, `Sidebar`, `MapView`, `AnalyticsChart`, `LandRecords`, `Reports`, `AlertPanel`, `HeroSection`, and more.
- Consolidated duplicated chart data and components in `AnalyticsPage` and `LandRecordsPage`.
- Renamed page function names to avoid collision with component names (e.g., `AIPrediction` → `AIPredictionPage`).
- Fixed non-reactive `window.innerWidth` implementation in PieChart.

### Removed
- Deleted redundant root-level npm files (`package.json`, `node_modules`).
- Removed unused Vite assets (`vite.svg`, `hero.png`).
- Deleted outdated `PLAN.md` and `CLAUDE.md` in favor of new standardized documentation.

## [2026-09-05] - Backend & Theme Overhaul

### Added
- **[v3.0] - MapLibre GL JS Migration**: Completely replaced Leaflet with MapLibre GL JS (WebGL). All map rendering is now GPU-accelerated with 60fps pan/zoom. Zero Leaflet code remains.
- **[v3.0] - GLIS Layer Control Panel**: Added a collapsible layer panel with toggles for Government Land, Forest Cover, Mining Zones, Industrial Areas, Infrastructure, and Encroachment Risk.
- **[v3.0] - Sovereign India Masking (WebGL)**: India mask now renders as a native MapLibre fill layer with near-opaque coverage, completely hiding all foreign territories.
- **[v2.5] - Complete Global Masking**: Built `generate_india_mask.cjs` utilizing Turf.js to carve an exclusive, solid dark-themed mask from a global bounding box.
- **[v2.5] - Basemap Enhancement**: Replaced the watermark-heavy OSM basemap with a clean, high-contrast CARTO Voyager basemap.
- **[v2.4] - Genuine OSM Boundary Extraction**: Added `fetch_gbn_boundary.js` and `extract_up_boundaries.js` to harvest 100% real Nominatim and Datameet polygon arrays directly to the frontend `public` cache.
- **[v2.4] - Absolute Mock Deletion**: Permanently deleted all artificial rectangles and square bounding boxes from the rendering pipeline. The MapView now guarantees precise real-world polygon rendering with vibrant highlight styling.
- **[v2.3] - 100% Real Spatial Data Ingestion**: Built `backend/scripts/fetch_authentic_data.py` to harvest authentic boundaries from OSM (via `osmnx`) and Datameet.
- **[v2.3] - Highway & Infrastructure Rendering**: MapView now renders verified OSM motorway and trunk paths for Gautam Buddha Nagar dynamically over the cadastral plots.
- **[v2.2] - India Boundary Lockdown**: Locked spatial navigation and bounds exclusively to India (`maxBounds={INDIA_BOUNDS}`).
- **[v2.2] - UP 75-Districts Pipeline**: Built data ingestion scripts and seeded 75 district administrative boundaries with dynamic mock intelligence metrics.
- **[v2.2] - Multi-Tier Spatial Drill-Down**: Upgraded `MapView.jsx` to support a 3-tier camera hierarchy (National -> State (75 Districts) -> Cadastral (Gautam Buddha Nagar)).
- **[v2.1] - Added FastAPI Backend & Parcel Seed**: Created `/backend/main.py` exposing health, parcels, and intelligence endpoints.
- **[v2.1] - Added ML & SHAP Analytics Engine**: Built `ai-model/model_service.py` generating dynamic TreeSHAP attribution and suitability logic.
- **[v2.1] - Implemented Strict Documentation Protocol**: Automated `PROGRESS.md`, `AI_HANDOFF.md`, and `CHANGELOG.md` workflows.

### Changed
- **[v2.1] - Frontend Map Integration**: Modified `MapView.jsx` to fetch and render live parcel intelligence from the FastAPI backend.
- **[v2.1] - UI Overhaul**: Globally enforced High-Contrast Dark Theme (`bg-slate-950`) across `index.css`, `AlertPanel`, `AIPrediction`, `AIAssistant`, `Reports`, and `LandRecords`.
