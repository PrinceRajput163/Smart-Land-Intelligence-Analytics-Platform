# Technical Architecture

## Folder Structure

```
SMART-LAND-INTELLIGENCE-ANALYTICS-PLATFORM/
├── frontend/             # React (Vite) + Tailwind CSS SPA
│   ├── public/           # Static assets (including india.geojson)
│   └── src/
│       ├── components/   # Feature-based subdirectories (common, layout, gis, etc.)
│       ├── pages/        # Route components (Dashboard, GISPage, etc.)
│       ├── data/         # Mock data (dummyData.js)
│       └── App.jsx       # Routing configuration
├── backend/              # [Planned] FastAPI REST API
├── database/             # [Planned] PostgreSQL + PostGIS schemas
├── ai-model/             # [Planned] Machine Learning pipelines
├── dataset/              # [Planned] Raw government data
└── documentation/        # Reference materials and presentations
```

## Component Architecture

The frontend uses a scalable feature-based component structure:
- `layout/`: Contains the AppLayout shell (`Sidebar`, `Navbar`) that wraps nested routes.
- `common/`: Shared UI components (`Loader`, `StatCard`).
- `gis/`: Map components (`MapView`).
- `analytics/`, `land-records/`, `ai/`, `reports/`, `dashboard/`: Dedicated feature components.

## Routing

Controlled by React Router DOM in `App.jsx`.
- `/` renders the standalone `Home.jsx` landing page.
- `/dashboard`, `/gis`, `/records`, etc., are nested inside the `AppLayout` component, rendering inside an `<Outlet />`.

## Data Flow

Presently, all data is loaded synchronously from `frontend/src/data/dummyData.js` and passed to components. Map boundaries are fetched asynchronously from `/india.geojson`.
