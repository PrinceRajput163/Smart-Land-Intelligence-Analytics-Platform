import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // MapLibre GL v6 loads its WebGL/geometry work off the main thread from a
  // sibling ESM file (dist/maplibre-gl-worker.mjs) resolved via import.meta.url.
  // Vite's dependency pre-bundler inlines maplibre-gl.js but does NOT emit that
  // worker chunk into .vite/deps/, so the runtime request for
  // /node_modules/.vite/deps/maplibre-gl-worker.mjs 404s — the worker never
  // starts, and the map renders no basemap tiles and parses no GeoJSON (blank
  // canvas). Excluding it from pre-bundling makes Vite serve maplibre-gl as
  // source ESM, so the worker resolves to the real dist file that exists.
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
})