# Development Guidelines

## 1. Naming Conventions
- **Components:** `PascalCase.jsx` (e.g., `MapView.jsx`)
- **Pages:** `PascalCasePage.jsx` or `PascalCase.jsx` (e.g., `Dashboard.jsx`, `GISPage.jsx`)
- **Functions / Hooks / Utils:** `camelCase.js` (e.g., `useResize.js`, `fetchData.js`)
- **Directories:** `kebab-case` (e.g., `land-records/`)

## 2. Responsive Design Rules
- Follow a "Mobile First, Desktop Enhanced" approach.
- Use standard Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px).
- Never use fixed dimensions that break layouts on mobile (e.g., `w-[500px]`). Instead use max-width or percentages (e.g., `w-full max-w-lg`).
- Ensure grids gracefully degrade on smaller screens (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
- Avoid `window.innerWidth` for reactivity in React components; use responsive Tailwind classes or resize event listeners where absolutely necessary.

## 3. Data Integrity
- Do NOT present dummy/mock data as real government data.
- Maintain dummy data in `frontend/src/data/dummyData.js` and keep components clean of hardcoded inline data to facilitate future API integration.

## 4. GIS Guidelines
- Ensure all map data uses the `EPSG:4326` coordinate reference system unless specifically projected otherwise.
- Never duplicate the `india.geojson` asset; it should remain in `/public/` and be fetched at runtime.
