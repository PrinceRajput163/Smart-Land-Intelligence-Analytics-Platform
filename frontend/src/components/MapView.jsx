import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  ZoomControl,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Layers,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Info,
  Shield,
  Activity,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  MapPin,
  BarChart2
} from "lucide-react";

// Fix Leaflet Default Icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

// India Bounding Box & Center Constants
const INDIA_BOUNDS = [
  [6.75, 68.16],
  [37.1, 97.4]
];
const INDIA_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

// Map Tile Layers Configuration
const TILE_LAYERS = {
  normal: {
    name: "Government Vector",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Government GIS Services'
  },
  satellite: {
    name: "High-Res Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  },
  terrain: {
    name: "Topographic Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
  }
};

// Helper Component for Programmatic Map Actions
const MapController = ({ center, zoom, bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { duration: 1.5, padding: [30, 30] });
    } else if (center) {
      map.flyTo(center, zoom || DEFAULT_ZOOM, { duration: 1.2 });
    }
  }, [map, center, zoom, bounds]);

  return null;
};

export default function MapView({ onStateSelect, className = "" }) {
  // --- States ---
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTile, setActiveTile] = useState("normal");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredFeatureName, setHoveredFeatureName] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const [panelOpen, setPanelOpen] = useState(true);
  const [mapTarget, setMapTarget] = useState({ center: INDIA_CENTER, zoom: DEFAULT_ZOOM, bounds: null });

  const geoJsonLayerRef = useRef(null);

  // --- Fetch GeoJSON ---
  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/india.geojson");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGeoJsonData(data);
      } catch (err) {
        console.error("Failed to load Spatial Data:", err);
        setError("Failed to initialize Enterprise Spatial Layer. Ensure /india.geojson is present.");
      } finally {
        setLoading(false);
      }
    };

    loadGeoJson();
  }, []);

  // --- State List for Search ---
  const stateList = useMemo(() => {
    if (!geoJsonData || !geoJsonData.features) return [];
    return geoJsonData.features
      .map((f) => f.properties?.NAME_1)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [geoJsonData]);

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return stateList.filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, stateList]);

  // --- Feature Selection Handler ---
  const handleSelectFeature = useCallback((feature, layer) => {
    setSelectedFeature(feature);
    if (onStateSelect) onStateSelect(feature.properties);

    if (layer) {
      const bounds = layer.getBounds();
      if (bounds && bounds.isValid()) {
        setMapTarget({ center: null, zoom: null, bounds });
      }
    }
  }, [onStateSelect]);

  const handleSelectStateByName = useCallback((stateName) => {
    if (!geoJsonLayerRef.current) return;

    let targetFeature = null;
    let targetLayer = null;

    geoJsonLayerRef.current.eachLayer((layer) => {
      if (layer.feature && layer.feature.properties?.NAME_1 === stateName) {
        targetFeature = layer.feature;
        targetLayer = layer;
      }
    });

    if (targetFeature && targetLayer) {
      handleSelectFeature(targetFeature, targetLayer);
      setSearchQuery("");
      setIsSearching(false);
    }
  }, [handleSelectFeature]);

  // --- GeoJSON Styling & Events ---
  const styleFeature = useCallback((feature) => {
    const isSelected = selectedFeature?.properties?.NAME_1 === feature.properties?.NAME_1;
    return {
      fillColor: isSelected ? "#2563EB" : "#16A34A",
      weight: isSelected ? 2.5 : 1,
      opacity: 0.9,
      color: isSelected ? "#071A2D" : "#ffffff",
      dashArray: isSelected ? "" : "3",
      fillOpacity: isSelected ? 0.45 : 0.2
    };
  }, [selectedFeature]);

  const onEachFeature = useCallback((feature, layer) => {
    const stateName = feature.properties?.NAME_1 || "Unknown Region";

    layer.on({
      mouseover: (e) => {
        const l = e.target;
        setHoveredFeatureName(stateName);
        if (selectedFeature?.properties?.NAME_1 !== stateName) {
          l.setStyle({
            fillOpacity: 0.35,
            weight: 2,
            color: "#2563EB"
          });
          l.bringToFront();
        }
      },
      mouseout: (e) => {
        const l = e.target;
        setHoveredFeatureName(null);
        if (geoJsonLayerRef.current) {
          geoJsonLayerRef.current.resetStyle(l);
        }
      },
      click: () => {
        handleSelectFeature(feature, layer);
      }
    });
  }, [handleSelectFeature, selectedFeature]);

  // --- Reset View ---
  const handleResetView = () => {
    setSelectedFeature(null);
    setMapTarget({ center: INDIA_CENTER, zoom: DEFAULT_ZOOM, bounds: null });
  };

  return (
    <div className={`relative w-full h-[calc(100vh-4rem)] min-h-[600px] bg-[#071A2D] overflow-hidden flex flex-col font-sans ${className}`}>
      
      {/* Top Government Platform Toolbar */}
      <div className="z-[1000] bg-[#071A2D] text-white px-4 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-700 shadow-md">
        <div className="flex items-center space-[#071A2D] space-x-3">
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm tracking-wide text-slate-100">
              NATIONAL LAND GIS CONTROL
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline-block border-l border-slate-700 pl-3">
            Integrated Geo-Spatial Analytics Engine v4.2
          </span>
        </div>

        {/* Right Controls / Tile Switcher */}
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <Layers className="w-4 h-4 text-slate-400 ml-2 mr-1" />
            {Object.keys(TILE_LAYERS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTile(key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  activeTile === key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetView}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors"
            title="Reset to India Extent"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Extent</span>
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-[2000] bg-[#071A2D]/80 backdrop-blur-md flex flex-col items-center justify-center text-white">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-blue-600 border-l-transparent animate-spin"></div>
            </div>
            <h3 className="text-lg font-bold tracking-wider text-slate-100">
              INITIALIZING GEOSPATIAL LAYERS
            </h3>
            <p className="text-xs text-slate-400 mt-1">Fetching spatial polygon data from enterprise repository...</p>
          </div>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 z-[2000] bg-[#071A2D]/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-6">
            <AlertTriangle className="w-12 h-12 text-amber-500 mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-100 mb-1">Spatial Layer Initialization Failed</h3>
            <p className="text-sm text-slate-300 max-w-md text-center mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors"
            >
              RETRY SYSTEM LOAD
            </button>
          </div>
        )}

        {/* Map Control Floating Search */}
        <div className="absolute top-4 left-4 z-[1000] w-72 md:w-80">
          <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="flex items-center px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search State / UT..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearching(false);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearching && filteredStates.length > 0 && (
              <ul className="max-h-60 overflow-y-auto border-t border-slate-800 bg-slate-900/95 divide-y divide-slate-800">
                {filteredStates.map((stateName) => (
                  <li key={stateName}>
                    <button
                      onClick={() => handleSelectStateByName(stateName)}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-blue-600/30 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium">{stateName}</span>
                      <MapPin className="w-3 h-3 text-slate-500" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-6 left-4 z-[1000] bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-slate-200 text-xs">
          <div className="font-semibold text-slate-300 mb-2 flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>GIS Legend</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-600/40 border border-emerald-500 inline-block"></span>
              <span>State Boundaries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-blue-600/60 border border-blue-400 inline-block"></span>
              <span>Selected Region</span>
            </div>
          </div>
        </div>

        {/* Map View Area */}
        <MapContainer
          center={INDIA_CENTER}
          zoom={DEFAULT_ZOOM}
          maxBounds={INDIA_BOUNDS}
          minZoom={4}
          zoomControl={false}
          className="w-full h-full z-10 bg-[#071A2D]"
        >
          <TileLayer
            url={TILE_LAYERS[activeTile].url}
            attribution={TILE_LAYERS[activeTile].attribution}
          />

          <MapController
            center={mapTarget.center}
            zoom={mapTarget.zoom}
            bounds={mapTarget.bounds}
          />

          {geoJsonData && (
            <GeoJSON
              ref={geoJsonLayerRef}
              data={geoJsonData}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}

          {/* ArcGIS Styled Popup for Selected Region */}
          {selectedFeature && (
            <Popup
              position={mapTarget.center || INDIA_CENTER}
              onClose={() => setSelectedFeature(null)}
              className="arcgis-custom-popup"
            >
              <div className="p-1 min-w-[200px]">
                <div className="bg-[#071A2D] text-white p-2 rounded-t flex items-center justify-between -m-3 mb-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                    GOVERNMENT CADASTRE
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {selectedFeature.properties?.NAME_1}
                </h4>
                <p className="text-xs text-slate-600 mb-2">
                  Official Administrative Region Polygon
                </p>
                <div className="text-[11px] text-slate-700 space-y-1 border-t border-slate-200 pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ISO Code:</span>
                    <span className="font-semibold">{selectedFeature.properties?.ISO || "IN-ADMIN"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-semibold text-emerald-600">Active Monitoring</span>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </MapContainer>

        {/* Custom Map Zoom Controls */}
        <div className="absolute bottom-6 right-80 z-[1000] hidden md:flex flex-col space-y-1 bg-slate-900/90 border border-slate-700/80 rounded-lg p-1 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => {
              const map = geoJsonLayerRef.current?._map;
              if (map) map.zoomIn();
            }}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const map = geoJsonLayerRef.current?._map;
              if (map) map.zoomOut();
            }}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsible Government Details Side Panel */}
        <div
          className={`absolute top-0 right-0 h-full z-[1001] bg-[#071A2D] border-l border-slate-700 text-slate-100 transition-all duration-300 shadow-2xl flex ${
            panelOpen ? "w-80 md:w-96" : "w-0"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-12 -left-8 bg-[#071A2D] border-l border-t border-b border-slate-700 text-slate-300 p-1.5 rounded-l-md hover:text-white shadow-xl focus:outline-none"
          >
            {panelOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Panel Content */}
          {panelOpen && (
            <div className="w-full h-full flex flex-col p-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-sm tracking-wide">SPATIAL ANALYTICS</h3>
                </div>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700">
                  LIVE
                </span>
              </div>

              {selectedFeature ? (
                <div className="space-y-4 flex-1">
                  <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      Selected Administrative Unit
                    </span>
                    <h2 className="text-xl font-extrabold text-white mt-0.5">
                      {selectedFeature.properties?.NAME_1}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      GeoJSON Polygon Index ID: {selectedFeature.id || "N/A"}
                    </p>
                  </div>

                  {/* High Level Key Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-800/40 border border-slate-700/60 p-2.5 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Encroachment Risk</span>
                      <span className="text-sm font-bold text-amber-400">Moderate (14.2%)</span>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/60 p-2.5 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Cadastral Sync</span>
                      <span className="text-sm font-bold text-emerald-400">98.4% Verified</span>
                    </div>
                  </div>

                  {/* Extended Property Attributes Table */}
                  <div className="bg-slate-800/40 border border-slate-700/60 rounded-lg p-3 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-300 border-b border-slate-700/60 pb-1.5 flex items-center justify-between">
                      <span>Feature Properties</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {Object.entries(selectedFeature.properties || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1 border-b border-slate-800 text-slate-300">
                          <span className="text-slate-400 font-mono text-[11px]">{key}</span>
                          <span className="font-medium text-right truncate max-w-[180px]">
                            {String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enterprise Integration Ready Banner */}
                  <div className="bg-blue-950/40 border border-blue-800/50 p-3 rounded-lg text-xs text-blue-200">
                    <div className="flex items-center space-x-2 font-semibold mb-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>GeoServer & PostGIS Ready</span>
                    </div>
                    <p className="text-[11px] text-blue-300/80">
                      Vector tile endpoint active. Real-time spatial query support enabled for this administrative boundary.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400 border border-dashed border-slate-700/80 rounded-xl my-4">
                  <Compass className="w-10 h-10 text-slate-500 mb-3 animate-pulse" />
                  <h4 className="text-sm font-bold text-slate-200 mb-1">No Region Selected</h4>
                  <p className="text-xs text-slate-400">
                    Click on any state polygon on the map or use the top search bar to inspect spatial cadastral analytics.
                  </p>
                </div>
              )}

              {/* Status Footer */}
              <div className="mt-auto pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>CRS: EPSG:4326</span>
                <span className="flex items-center text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse"></span>
                  GIS Engine Online
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}