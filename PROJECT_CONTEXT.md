# Smart Land Intelligence & Analytics Platform — Project Context & Handoff

**WARNING TO AI ASSISTANTS:** Read this entire document before modifying any code. This project has been heavily audited and restructured. Follow these rules implicitly.

## 1. Project Identity
- **Project Name:** Smart Land Intelligence & Analytics Platform
- **SIH Problem Code:** SIH1318
- **Organization:** Ministry of Coal, Government of India
- **Objective:** Build an AI-enabled Enterprise GIS platform unifying land records, spatial mapping, and predictive analytics into a single command center.
- **Theme:** High-Contrast Dark Command Center (`bg-slate-950`). Do not introduce white/light components.

> **CRITICAL BRANDING RULE:** This is a national platform for the Ministry of Coal. Do NOT introduce branding for "Govt of Uttar Pradesh" or "District Magistrate, Gautam Buddha Nagar". While UP/GBN is used as a **demonstration region** for the GIS drill-down, the application shell must remain branded for the Ministry of Coal.

## 2. Technology Stack & Rules
- **Frontend:** React (Vite), Tailwind CSS v4, Framer Motion, Lucide React
- **GIS:** MapLibre GL JS (WebGL-accelerated).
  - *Rule:* **Leaflet is DEAD.** Do not use Leaflet, React-Leaflet, or try to import them.
- **Analytics:** Recharts
- **Routing:** React Router DOM v7
- **Backend (Optional/Local):** FastAPI (Python) running on port 8000.

## 3. MapLibre / Vite Build Caveat
> **CRITICAL:** `frontend/vite.config.js` contains `optimizeDeps.exclude: ['maplibre-gl']`. **DO NOT REVERT THIS.** MapLibre GL v6 loads its web worker from `dist/maplibre-gl-worker.mjs`. Vite's dependency pre-bundler breaks this, causing a 404 on the worker and resulting in a completely blank map (no tiles, no GeoJSON).

## 4. Current Data Strategy (Read Carefully)
The application currently runs as a **Demonstration Prototype**. Be strictly honest about what is real and what is a mock:

- **REAL DATA:**
  - **India State/UT Boundaries (36 units):** Generated from GADM 4.1 + OSM via `backend/scripts/ingest_states.py`.
  - **UP Districts (70 units):** Extracted from geohacker/india.
  - **Gautam Buddha Nagar Parcels:** 885 real OSM land-use parcels.
  - **GBN Highways:** 287 OSM motorway edges.

- **FAKE / MOCK DATA (Do not claim this is live):**
  - All AI/ML Intelligence Metrics (`suitability_score`, `risk_score`, `ml_growth_prob`, SHAP drivers). These are deterministically synthesized in `ai-model/model_service.py` via `random.Random()`. There is no real XGBoost model currently trained.
  - All Cadastral attributes (Khasra numbers, owners, departments) in `frontend/src/data/dummyData.js`.
  - All Dashboard aggregate numbers (e.g., 52,430 total records).

## 5. Directory Structure & Architecture
- `frontend/src/App.jsx` — Core React Router configuration
- `frontend/src/components/layout/AppLayout.jsx` — The main dark-theme shell wrapping all routes
- `frontend/src/components/gis/MapView.jsx` — The core MapLibre GIS engine
- `frontend/public/` — Contains the compiled `.geojson` assets fetched by the frontend
- `backend/scripts/` — Python/JS scripts for ingesting and processing authentic spatial data

## 6. Development Workflow
1. If modifying dependencies, run `npm install` and verify `npm run build` passes.
2. If modifying the map, ensure you test the drill-down sequence (India -> UP -> GBN).
3. If adding new UI components, use Tailwind classes compatible with the existing `slate-900` dark theme.
4. Update `CHANGELOG.md` with significant architectural changes.
