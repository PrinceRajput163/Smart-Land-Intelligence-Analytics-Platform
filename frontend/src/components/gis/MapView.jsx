import React, { useState, useEffect, useRef, useCallback } from "react";
import { Map as MapLibreMap, Popup, AttributionControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Layers,
  ChevronRight,
  Clock,
  Home,
  Map as MapIcon,
  TreePine,
  Factory,
  AlertTriangle,
  Pickaxe,
  Building2,
  Route,
  Eye,
  EyeOff
} from "lucide-react";

import DecisionSupportCard from "./DecisionSupportCard";

// ─── View Hierarchy ─────────────────────────────────────────────
const VIEWS = {
  NATIONAL: { center: [78.9629, 22.5937], zoom: 4.5, name: "India" },
  STATE_UP: { center: [80.9462, 26.8467], zoom: 6.5, name: "Uttar Pradesh" },
  DISTRICT_GBN: { center: [77.55, 28.35], zoom: 10.5, name: "Gautam Buddha Nagar" }
};

// ─── India Sovereign Bounds [sw, ne] in [lng, lat] ──────────────
const INDIA_BOUNDS = [
  [68.1097, 6.4627],
  [97.3955, 37.0841]
];

// ─── Free Basemap Styles (100% No API Key) ──────────────────────
const BASEMAPS = {
  dark: {
    name: "Dark Sovereign",
    style: {
      version: 8,
      sources: {
        "esri-dark": {
          type: "raster",
          tiles: [
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          ],
          tileSize: 256,
          attribution: "Tiles &copy; Esri"
        }
      },
      layers: [
        { id: "esri-dark-layer", type: "raster", source: "esri-dark" }
      ]
    }
  },
  satellite: {
    name: "High-Res Satellite",
    style: {
      version: 8,
      sources: {
        "esri-satellite": {
          type: "raster",
          tiles: [
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          ],
          tileSize: 256,
          attribution: "Tiles &copy; Esri"
        }
      },
      layers: [
        { id: "esri-satellite-layer", type: "raster", source: "esri-satellite" }
      ]
    }
  },
  osm: {
    name: "Standard Vector",
    style: {
      version: 8,
      sources: {
        "osm-tiles": {
          type: "raster",
          tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap contributors"
        }
      },
      layers: [
        { id: "osm-layer", type: "raster", source: "osm-tiles" }
      ]
    }
  }
};

// ─── GLIS Layer Definitions ─────────────────────────────────────
const GLIS_LAYERS = [
  { id: "govt-land", label: "Government Land", icon: Building2, color: "#0ea5e9", defaultOn: true },
  { id: "forest", label: "Forest Cover", icon: TreePine, color: "#22c55e", defaultOn: false },
  { id: "mining", label: "Mining Zones", icon: Pickaxe, color: "#a855f7", defaultOn: false },
  { id: "industrial", label: "Industrial Areas", icon: Factory, color: "#6366f1", defaultOn: false },
  { id: "infrastructure", label: "Infrastructure", icon: Route, color: "#f59e0b", defaultOn: true },
  { id: "encroachment", label: "Encroachment Risk", icon: AlertTriangle, color: "#ef4444", defaultOn: true }
];

// ─── Component ──────────────────────────────────────────────────
export default function MapView({ className = "" }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const tooltipRef = useRef(null);

  const [viewLevel, setViewLevel] = useState("NATIONAL");
  const [activeTile, setActiveTile] = useState("dark");
  const [activeYear, setActiveYear] = useState(2026);
  const [selectedCadastral, setSelectedCadastral] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [layerPanel, setLayerPanel] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState(
    GLIS_LAYERS.reduce((acc, l) => ({ ...acc, [l.id]: l.defaultOn }), {})
  );

  // ─── Initialize MapLibre ───────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return;

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: BASEMAPS[activeTile].style,
      center: VIEWS.NATIONAL.center,
      zoom: VIEWS.NATIONAL.zoom,
      maxBounds: INDIA_BOUNDS,
      minZoom: 4,
      maxZoom: 18,
      attributionControl: false,
      fadeDuration: 300
    });

    map.addControl(new AttributionControl({ compact: true }), "bottom-right");

    mapRef.current = map;
    // Dev-only introspection hook (tree-shaken out of production builds).
    if (import.meta.env.DEV) window.__glisMap = map;

    map.on("load", () => {
      setMapLoaded(true);
      loadIndiaMask(map);
      loadNationalLayer(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ─── Basemap Switching ─────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const newStyle = BASEMAPS[activeTile].style;

    // Preserve sources/layers we've added by re-adding after style change
    map.setStyle(newStyle);

    map.once("style.load", () => {
      loadIndiaMask(map);
      if (viewLevel === "NATIONAL") loadNationalLayer(map);
      if (viewLevel === "STATE_UP") {
        loadNationalLayer(map);
        loadUPDistricts(map);
      }
      if (viewLevel === "DISTRICT_GBN") {
        loadGBNLayer(map);
      }
    });
  }, [activeTile]);

  // ─── View Level Changes ────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const view = VIEWS[viewLevel];

    map.flyTo({
      center: view.center,
      zoom: view.zoom,
      duration: 1500,
      essential: true
    });

    // Clean up old layers before adding new ones
    removeLayerSafe(map, "india-states-fill");
    removeLayerSafe(map, "india-states-line");
    removeLayerSafe(map, "up-districts-fill");
    removeLayerSafe(map, "up-districts-line");
    removeLayerSafe(map, "up-districts-highlight");
    removeLayerSafe(map, "gbn-boundary-line");
    removeLayerSafe(map, "gbn-boundary-fill");
    removeLayerSafe(map, "gbn-highways");
    removeLayerSafe(map, "gbn-parcels-fill");
    removeLayerSafe(map, "gbn-parcels-line");
    removeSourceSafe(map, "india-states");
    removeSourceSafe(map, "up-districts");
    removeSourceSafe(map, "gbn-boundary");
    removeSourceSafe(map, "gbn-highways");
    removeSourceSafe(map, "gbn-parcels");

    if (viewLevel === "NATIONAL") loadNationalLayer(map);
    if (viewLevel === "STATE_UP") {
      loadNationalLayer(map);
      loadUPDistricts(map);
    }
    if (viewLevel === "DISTRICT_GBN") loadGBNLayer(map);
  }, [viewLevel, mapLoaded]);

  // ─── Helper: Safe Remove ───────────────────────────────────────
  const removeLayerSafe = (map, id) => {
    if (map.getLayer(id)) map.removeLayer(id);
  };
  const removeSourceSafe = (map, id) => {
    if (map.getSource(id)) map.removeSource(id);
  };

  // ─── Load: India Mask ──────────────────────────────────────────
  const loadIndiaMask = async (map) => {
    try {
      if (map.getSource("india-mask")) return;
      const res = await fetch("/india_mask.geojson");
      const data = await res.json();
      map.addSource("india-mask", { type: "geojson", data });
      map.addLayer({
        id: "india-mask-fill",
        type: "fill",
        source: "india-mask",
        paint: {
          "fill-color": "#020617",
          "fill-opacity": 0.97
        }
      });
    } catch (e) {
      console.warn("India mask not available:", e);
    }
  };

  // ─── Load: National (India States) ─────────────────────────────
  const loadNationalLayer = async (map) => {
    try {
      // Real current 28 States + 8 UTs (GADM 4.1 dissolved + OSM-reconciled J&K/Ladakh).
      // See backend/data/boundary_provenance.json. Generated by backend/scripts/ingest_states.py.
      const res = await fetch("/india_states.geojson");
      const data = await res.json();
      // The async fetch can outlive this map instance (React StrictMode remounts it,
      // or the view level changed): if the live map is no longer this one, abandon.
      if (mapRef.current !== map) return;
      // Idempotent (re)build — safe even if a concurrent/earlier load already added it.
      removeLayerSafe(map, "india-states-fill");
      removeLayerSafe(map, "india-states-line");
      removeSourceSafe(map, "india-states");

      map.addSource("india-states", { type: "geojson", data });

      map.addLayer({
        id: "india-states-fill",
        type: "fill",
        source: "india-states",
        paint: {
          "fill-color": [
            "case",
            ["any",
              ["==", ["get", "NAME_1"], "Uttar Pradesh"],
              ["==", ["get", "ST_NM"], "Uttar Pradesh"]
            ],
            "#0284c7",
            "#1e293b"
          ],
          "fill-opacity": [
            "case",
            ["any",
              ["==", ["get", "NAME_1"], "Uttar Pradesh"],
              ["==", ["get", "ST_NM"], "Uttar Pradesh"]
            ],
            0.45,
            0.2
          ]
        }
      });

      map.addLayer({
        id: "india-states-line",
        type: "line",
        source: "india-states",
        paint: {
          "line-color": [
            "case",
            ["any",
              ["==", ["get", "NAME_1"], "Uttar Pradesh"],
              ["==", ["get", "ST_NM"], "Uttar Pradesh"]
            ],
            "#38bdf8",
            "#475569"
          ],
          "line-width": [
            "case",
            ["any",
              ["==", ["get", "NAME_1"], "Uttar Pradesh"],
              ["==", ["get", "ST_NM"], "Uttar Pradesh"]
            ],
            2.5,
            0.8
          ]
        }
      });

      // Register interaction handlers once per map instance (they are keyed by layer
      // id and survive layer re-adds, so re-registering would stack duplicates).
      if (map.__nationalHandlers) return;
      map.__nationalHandlers = true;

      // Tooltip on mouse move
      map.on("mousemove", "india-states-fill", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const f = e.features[0];
        const name = f.properties.NAME_1 || f.properties.ST_NM || "State";
        const isUP = name === "Uttar Pradesh";

        if (tooltipRef.current) tooltipRef.current.remove();
        tooltipRef.current = new Popup({
          closeButton: false,
          closeOnClick: false,
          className: "glis-tooltip"
        })
          .setLngLat(e.lngLat)
          .setHTML(`<div class="glis-tt-inner"><strong>${name}</strong>${isUP ? "<br/><span style='color:#38bdf8;'>Click to inspect UP</span>" : ""}</div>`)
          .addTo(map);
      });

      map.on("mouseleave", "india-states-fill", () => {
        map.getCanvas().style.cursor = "";
        if (tooltipRef.current) { tooltipRef.current.remove(); tooltipRef.current = null; }
      });

      map.on("click", "india-states-fill", (e) => {
        const f = e.features[0];
        const name = f.properties.NAME_1 || f.properties.ST_NM || "";
        if (name === "Uttar Pradesh") {
          handleGoState();
        }
      });
    } catch (e) {
      console.error("Failed to load national layer:", e);
    }
  };

  // ─── Load: UP Districts ────────────────────────────────────────
  const loadUPDistricts = async (map) => {
    try {
      if (map.getSource("up-districts")) return;
      const res = await fetch("/up_districts.geojson");
      const data = await res.json();

      map.addSource("up-districts", { type: "geojson", data });

      map.addLayer({
        id: "up-districts-fill",
        type: "fill",
        source: "up-districts",
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "DISTRICT"], "Gautam Buddha Nagar"],
            "#f97316",
            "#1e293b"
          ],
          "fill-opacity": [
            "case",
            ["==", ["get", "DISTRICT"], "Gautam Buddha Nagar"],
            0.5,
            0.25
          ]
        }
      });

      map.addLayer({
        id: "up-districts-line",
        type: "line",
        source: "up-districts",
        paint: {
          "line-color": [
            "case",
            ["==", ["get", "DISTRICT"], "Gautam Buddha Nagar"],
            "#ea580c",
            "#475569"
          ],
          "line-width": [
            "case",
            ["==", ["get", "DISTRICT"], "Gautam Buddha Nagar"],
            2.5,
            1
          ]
        }
      });

      // GBN Boundary overlay
      try {
        const gbnRes = await fetch("/gbn_boundary.geojson");
        const gbnData = await gbnRes.json();
        if (!map.getSource("gbn-boundary")) {
          map.addSource("gbn-boundary", { type: "geojson", data: gbnData });
          map.addLayer({
            id: "gbn-boundary-fill",
            type: "fill",
            source: "gbn-boundary",
            paint: { "fill-color": "#f97316", "fill-opacity": 0.3 }
          });
          map.addLayer({
            id: "gbn-boundary-line",
            type: "line",
            source: "gbn-boundary",
            paint: { "line-color": "#f97316", "line-width": 2.5, "line-dasharray": [4, 3] }
          });
        }
      } catch (_) {}

      // Tooltip
      map.on("mousemove", "up-districts-fill", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const f = e.features[0];
        const d = f.properties.DISTRICT || f.properties.NAME_2 || "District";
        const isGBN = d === "Gautam Buddha Nagar";
        const land = f.properties.total_govt_land_ha?.toLocaleString() || "42,800";
        const alerts = f.properties.active_encroachment_alerts || (isGBN ? 4 : 1);
        const suit = f.properties.avg_suitability_score || 74;

        if (tooltipRef.current) tooltipRef.current.remove();
        tooltipRef.current = new Popup({
          closeButton: false, closeOnClick: false, className: "glis-tooltip"
        })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div class="glis-tt-inner">
              <strong style="color:${isGBN ? '#f97316' : '#38bdf8'}">${d}</strong><br/>
              <b>Govt Land:</b> ${land} Ha<br/>
              <b>Alerts:</b> ${alerts} · <b>Suitability:</b> ${suit}/100
              ${isGBN ? "<br/><span style='color:#f97316'>Click to enter cadastral view</span>" : ""}
            </div>`)
          .addTo(map);
      });

      map.on("mouseleave", "up-districts-fill", () => {
        map.getCanvas().style.cursor = "";
        if (tooltipRef.current) { tooltipRef.current.remove(); tooltipRef.current = null; }
      });

      map.on("click", "up-districts-fill", (e) => {
        const f = e.features[0];
        const d = f.properties.DISTRICT || f.properties.NAME_2 || "";
        if (d === "Gautam Buddha Nagar") {
          handleGoDistrict();
        }
      });
    } catch (e) {
      console.error("Failed to load UP districts:", e);
    }
  };

  // ─── Load: GBN Cadastral ───────────────────────────────────────
  const loadGBNLayer = async (map) => {
    // GBN boundary outline at district level
    try {
      const gbnRes = await fetch("/gbn_boundary.geojson");
      const gbnData = await gbnRes.json();
      if (!map.getSource("gbn-boundary")) {
        map.addSource("gbn-boundary", { type: "geojson", data: gbnData });
        map.addLayer({
          id: "gbn-boundary-fill",
          type: "fill",
          source: "gbn-boundary",
          paint: { "fill-color": "#f97316", "fill-opacity": 0.04 }
        });
        map.addLayer({
          id: "gbn-boundary-line",
          type: "line",
          source: "gbn-boundary",
          paint: { "line-color": "#f97316", "line-width": 2, "line-dasharray": [4, 3] }
        });
      }
    } catch (_) {}

    // Highways from backend
    try {
      const hwRes = await fetch("http://localhost:8000/api/up/districts/gautam-buddha-nagar/highways");
      const hwData = await hwRes.json();
      if (hwData?.features?.length > 0 && !map.getSource("gbn-highways")) {
        map.addSource("gbn-highways", { type: "geojson", data: hwData });
        map.addLayer({
          id: "gbn-highways",
          type: "line",
          source: "gbn-highways",
          paint: {
            "line-color": "#f59e0b",
            "line-width": 3.5,
            "line-opacity": 0.85,
            "line-dasharray": [6, 4]
          }
        });
      }
    } catch (_) {
      console.warn("Highway data not available from backend.");
    }

    // Parcels from backend
    try {
      const pRes = await fetch("http://localhost:8000/api/up/districts/gautam-buddha-nagar/parcels");
      const pData = await pRes.json();
      if (pData?.features?.length > 0 && !map.getSource("gbn-parcels")) {
        map.addSource("gbn-parcels", { type: "geojson", data: pData });

        map.addLayer({
          id: "gbn-parcels-fill",
          type: "fill",
          source: "gbn-parcels",
          paint: {
            "fill-color": [
              "case",
              ["<", ["coalesce", ["get", "suitability_score"], 50], 40], "#ef4444",
              ["<", ["coalesce", ["get", "suitability_score"], 50], 60], "#f59e0b",
              "#10b981"
            ],
            "fill-opacity": 0.5
          }
        });

        map.addLayer({
          id: "gbn-parcels-line",
          type: "line",
          source: "gbn-parcels",
          paint: {
            "line-color": "#ffffff",
            "line-width": 1
          }
        });

        // Click → select parcel → open DecisionSupportCard
        map.on("click", "gbn-parcels-fill", async (e) => {
          const feature = e.features[0];
          setSelectedCadastral({ properties: feature.properties, geometry: feature.geometry, type: "Feature" });

          try {
            const res = await fetch(`http://localhost:8000/api/parcels/${feature.properties.parcel_id}/intelligence`);
            if (res.ok) {
              const intelligence = await res.json();
              // Merge intelligence fields flat onto properties so DecisionSupportCard
              // reads suitability_score / risk_score / ml_growth_prob / temporal_delta /
              // shap_drivers / official_recommendation directly.
              setSelectedCadastral({
                type: "Feature",
                properties: { ...feature.properties, ...intelligence },
                geometry: feature.geometry
              });
            }
          } catch (_) {}
        });

        map.on("mousemove", "gbn-parcels-fill", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "gbn-parcels-fill", () => {
          map.getCanvas().style.cursor = "";
        });
      }
    } catch (_) {
      console.warn("Cadastral parcels not available from backend.");
    }
  };

  // ─── Navigation Handlers ───────────────────────────────────────
  const handleGoNational = useCallback(() => {
    setViewLevel("NATIONAL");
    setSelectedCadastral(null);
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
  }, []);

  const handleGoState = useCallback(() => {
    setViewLevel("STATE_UP");
    setSelectedCadastral(null);
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
  }, []);

  const handleGoDistrict = useCallback(() => {
    setViewLevel("DISTRICT_GBN");
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
  }, []);

  // ─── Toggle GLIS Layer ─────────────────────────────────────────
  const toggleLayer = (layerId) => {
    setLayerVisibility(prev => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className={`relative w-full h-[calc(100vh-6rem)] min-h-[600px] bg-slate-950 overflow-hidden flex flex-col font-sans rounded-2xl border border-slate-800 shadow-2xl ${className}`}>

      {/* ── Top Left: Breadcrumbs ── */}
      <div className="absolute top-4 left-4 z-20 pointer-events-auto">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl rounded-xl px-4 py-2 flex items-center space-x-2 text-xs font-medium text-slate-200">
          <button onClick={handleGoNational} className="hover:text-sky-400 flex items-center transition-colors font-semibold">
            <Home className="w-3.5 h-3.5 mr-1 text-slate-400" /> India
          </button>
          {(viewLevel === "STATE_UP" || viewLevel === "DISTRICT_GBN") && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button onClick={handleGoState} className="hover:text-sky-400 transition-colors font-semibold">
                Uttar Pradesh
              </button>
            </>
          )}
          {viewLevel === "DISTRICT_GBN" && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-amber-400 font-bold">Gautam Buddha Nagar</span>
            </>
          )}
        </div>
      </div>

      {/* ── Top Right: Basemap Switcher ── */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-1 shadow-xl flex items-center space-x-1">
          <Layers className="w-4 h-4 text-slate-400 ml-2 mr-1" />
          {Object.keys(BASEMAPS).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTile(key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTile === key
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {BASEMAPS[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Left: GLIS Layer Panel ── */}
      <div className="absolute top-16 left-4 z-20 pointer-events-auto">
        <button
          onClick={() => setLayerPanel(!layerPanel)}
          className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2 shadow-xl text-slate-400 hover:text-sky-400 transition-colors mb-2"
          title="GLIS Layers"
        >
          <MapIcon className="w-5 h-5" />
        </button>

        {layerPanel && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-2xl w-56 animate-in slide-in-from-left-2 duration-200">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              GLIS Data Layers
            </h4>
            <div className="space-y-1">
              {GLIS_LAYERS.map((layer) => {
                const Icon = layer.icon;
                const isOn = layerVisibility[layer.id];
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isOn
                        ? "bg-slate-800 text-slate-100"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: isOn ? layer.color : "#334155" }}
                    />
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="flex-1 text-left">{layer.label}</span>
                    {isOn
                      ? <Eye className="w-3 h-3 text-slate-400" />
                      : <EyeOff className="w-3 h-3 text-slate-600" />
                    }
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Center: Temporal Slider ── */}
      {viewLevel === "DISTRICT_GBN" && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-full px-5 py-2 shadow-2xl flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-slate-400 text-xs font-medium">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Temporal Observation:</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-950 rounded-full p-1 border border-slate-800">
              <button
                onClick={() => setActiveYear(2020)}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                  activeYear === 2020
                    ? "bg-slate-800 text-sky-400 shadow border border-slate-700"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                2020 Baseline
              </button>
              <button
                onClick={() => setActiveYear(2026)}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all flex items-center ${
                  activeYear === 2026
                    ? "bg-rose-950/80 text-rose-400 border border-rose-800/80 shadow"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {activeYear === 2026 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse mr-1.5" />}
                2026 Sentinel-2 Delta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── WebGL Map Canvas ── */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* ── Decision Support Drawer ── */}
      <DecisionSupportCard
        parcel={selectedCadastral}
        onClose={() => setSelectedCadastral(null)}
      />

      {/* ── Custom Styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .maplibregl-popup { z-index: 50; }
        .glis-tooltip .maplibregl-popup-content {
          background-color: #0f172a;
          border: 1px solid #334155;
          color: #f8fafc;
          border-radius: 10px;
          padding: 8px 12px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 11px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .glis-tooltip .maplibregl-popup-tip {
          border-top-color: #0f172a;
        }
        .glis-tt-inner strong { font-size: 12px; }
        .glis-tt-inner b { color: #94a3b8; }
        .maplibregl-ctrl-attrib { font-size: 9px !important; opacity: 0.5; }
        .maplibregl-ctrl-attrib a { color: #64748b !important; }
      `}} />
    </div>
  );
}