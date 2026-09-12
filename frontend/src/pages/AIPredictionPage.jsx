import { useState } from "react";
import { Brain, Activity, ShieldAlert, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function AIPredictionPage() {
  const [selectedParcel, setSelectedParcel] = useState("UP-GBN-JWR-0412 (Jewar)");

  const shapFactors = [
    { name: "Distance to Yamuna Expressway (<800m)", impact: "+24.2 pts", color: "bg-emerald-500", width: "80%" },
    { name: "Distance to Jewar International Airport (<5km)", impact: "+18.5 pts", color: "bg-emerald-500", width: "65%" },
    { name: "Topographic Slope (<1.5% flat)", impact: "+12.0 pts", color: "bg-emerald-500", width: "45%" },
    { name: "Wetland / Canal Hydrology Buffer Conflict", impact: "-8.4 pts", color: "bg-red-500", width: "35%", isNegative: true },
    { name: "High-Tension Transmission Corridor Buffer", impact: "-5.1 pts", color: "bg-amber-500", width: "20%", isNegative: true }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <p className="uppercase tracking-widest text-emerald-400 font-semibold text-xs mb-1">
            GeoAI Decision Support Model
          </p>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <Brain className="text-purple-400" />
            GeoAI-XGBoost Expansion Regressor v2.4
          </h2>
          <div className="mt-3 space-y-1 text-sm text-slate-400">
            <p><strong className="text-slate-300">Training Data:</strong> Multi-Temporal Sentinel-2 (2020-2026) + OSM Infrastructure Layers</p>
            <p><strong className="text-slate-300">Test Region:</strong> Gautam Buddha Nagar (Jewar / YEIDA Corridor)</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4 text-center">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400">ROC-AUC</p>
            <p className="text-lg font-bold text-slate-100">0.912</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400">Kappa Score</p>
            <p className="text-lg font-bold text-slate-100">0.84</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400">Mean Abs Error</p>
            <p className="text-lg font-bold text-slate-100">0.042</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Parcel Predictor Form */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Parcel Predictor</h3>
          
          <label className="block text-sm text-slate-400 mb-2">Select Target Parcel</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg p-3 mb-6 outline-none focus:border-blue-500 transition-colors"
            value={selectedParcel}
            onChange={(e) => setSelectedParcel(e.target.value)}
          >
            <option>UP-GBN-JWR-0412 (Jewar)</option>
            <option>UP-GBN-DDR-0189 (Dadri)</option>
            <option>UP-GBN-DNK-0305 (Dankaur)</option>
          </select>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400 text-sm">Urban Growth Pressure Score</span>
                <span className="text-emerald-400 font-bold">89%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <motion.div initial={{ width: 0 }} animate={{ width: "89%" }} transition={{ duration: 1 }} className="bg-emerald-500 h-2 rounded-full"></motion.div>
              </div>
              <p className="text-xs text-slate-500 mt-1">High Probability of Urban Expansion</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400 text-sm">Suitability Index</span>
                <span className="text-blue-400 font-bold">86/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <motion.div initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ duration: 1, delay: 0.2 }} className="bg-blue-500 h-2 rounded-full"></motion.div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Prime for Logistics / Industrial Hub</p>
            </div>

            <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-4 mt-6">
              <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                <AlertTriangle size={18} /> Encroachment Vulnerability
              </div>
              <p className="text-sm text-slate-300">High Risk - 28.4% Unauthorized Built-up Growth</p>
            </div>
          </div>
        </div>

        {/* Explainable AI Factor Attribution */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Activity className="text-blue-400" /> Explainable AI (TreeSHAP) Factor Attribution
            </h3>
            <p className="text-slate-400 text-sm mb-6">Visual breakdown of model decision drivers.</p>
            
            <div className="space-y-4">
              {shapFactors.map((factor, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{factor.name}</span>
                    <span className={factor.isNegative ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                      {factor.impact}
                    </span>
                  </div>
                  <div className={`w-full bg-slate-800 rounded-full h-2 flex ${factor.isNegative ? 'justify-start' : 'justify-end'}`}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: factor.width }} 
                      transition={{ duration: 0.8, delay: idx * 0.1 }} 
                      className={`${factor.color} h-2 rounded-full`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h3 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <CheckCircle size={20} /> Official Recommendation
            </h3>
            <p className="text-slate-200 text-lg">
              "Sanctioned for planned logistics warehousing with mandatory 50m hydrological buffer zone enforcement."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}