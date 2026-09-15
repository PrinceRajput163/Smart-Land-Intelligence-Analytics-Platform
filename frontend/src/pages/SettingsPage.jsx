import { useState } from "react";
import { User, Shield, Server, Database, Map, Brain, HardDrive } from "lucide-react";

export default function SettingsPage() {
  const [encroachmentThreshold, setEncroachmentThreshold] = useState(15);
  const [highwayBuffer, setHighwayBuffer] = useState(50);
  const [satelliteProvider, setSatelliteProvider] = useState("esa");
  const [highContrast, setHighContrast] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">
          System Configuration
        </h1>
        <p className="text-slate-400 mt-2">
          Administrative control panel for GLIS GeoAI preferences and access control.
        </p>
      </div>

      {/* Profile & Authority Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
        <div className="flex gap-5 items-center">
          <div className="bg-slate-800 p-4 rounded-full border border-slate-700">
            <User size={40} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Administrator
            </h1>
            <p className="text-slate-400 mt-2">
              Ministry of Coal, Government of India
            </p>
            <p className="text-sm font-semibold text-emerald-400 mt-1">
              Role: System Administrator
            </p>
            <p className="text-emerald-400 text-xs font-mono mt-2 bg-emerald-900/30 px-2 py-1 rounded inline-block">
              GLIS Central Gateway (UP-DILRMP Node 04)
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 bg-emerald-900/40 border border-emerald-800 text-emerald-400 font-bold px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Shield size={16} /> Admin Access Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Spatial Analytics Thresholds */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Map className="text-blue-400" />
            <h2 className="text-xl font-bold text-slate-100">Spatial Analytics Thresholds</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Encroachment Alert Threshold (Built-up Delta)</label>
                <span className="text-emerald-400 font-bold">{encroachmentThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={encroachmentThreshold} 
                onChange={(e) => setEncroachmentThreshold(e.target.value)}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Highway Proximity Buffer Weight</label>
                <span className="text-blue-400 font-bold">{highwayBuffer}m</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="10"
                value={highwayBuffer} 
                onChange={(e) => setHighwayBuffer(e.target.value)}
                className="w-full accent-blue-500"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-800">
              <label className="text-sm font-medium text-slate-300 block mb-3">Satellite Feed Provider</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-slate-400 cursor-pointer">
                  <input type="radio" name="satellite" value="esa" checked={satelliteProvider === 'esa'} onChange={() => setSatelliteProvider('esa')} className="accent-emerald-500 w-4 h-4" />
                  ESA 10m WorldCover (Active)
                </label>
                <label className="flex items-center gap-3 text-slate-400 cursor-pointer">
                  <input type="radio" name="satellite" value="sentinel" checked={satelliteProvider === 'sentinel'} onChange={() => setSatelliteProvider('sentinel')} className="accent-emerald-500 w-4 h-4" />
                  Sentinel-2 Optical (Active)
                </label>
                <label className="flex items-center gap-3 text-slate-400 cursor-pointer">
                  <input type="radio" name="satellite" value="isro" checked={satelliteProvider === 'isro'} onChange={() => setSatelliteProvider('isro')} className="accent-emerald-500 w-4 h-4" />
                  ISRO Bhuvan (Mirror)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Theme & Database */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Server className="text-amber-400" />
              <h2 className="text-xl font-bold text-slate-100">System Preferences</h2>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <p className="text-slate-200 font-medium">High-Contrast Mode</p>
                <p className="text-slate-500 text-sm">Force strict contrast UI</p>
              </div>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${highContrast ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => alert("Local GeoJSON cache purged successfully.")}
                className="w-full bg-slate-800 hover:bg-slate-700 text-red-400 transition border border-slate-700 rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-bold"
              >
                <HardDrive size={18} /> Purge Local GeoJSON Cache
              </button>
              <p className="text-center text-xs text-slate-500 mt-2">Clears 142MB of cached vector tiles.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}