import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ShieldCheck, AlertTriangle, TrendingUp, TrendingDown,
  Info, Activity, Download, Building
} from "lucide-react";

export default function DecisionSupportCard({ parcel, onClose }) {
  if (!parcel) return null;

  const { properties } = parcel;
  const isEncroached = properties.temporal_delta?.encroachment_flag;
  const builtUpGrowth = (properties.temporal_delta?.builtup_2026_pct - properties.temporal_delta?.builtup_2020_pct).toFixed(1);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#F8FAFC] border-l border-slate-200 shadow-2xl z-[2000] flex flex-col overflow-hidden"
      >
        {/* Header - State Emblem Style */}
        <div className="bg-[#0F2942] text-white p-4 relative flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 shadow-inner">
              <Building className="w-5 h-5 text-[#FF9933]" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#FF9933] uppercase">
                {properties.department}
              </p>
              <h2 className="text-lg font-bold">Khasra: {properties.khasra_no}</h2>
              <p className="text-xs text-slate-300">Tehsil: {properties.tehsil}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors absolute top-4 right-4 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          
          {/* Critical Alert Banner */}
          {isEncroached && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-50 border-l-4 border-red-600 p-3 rounded-r-lg shadow-sm flex items-start space-x-3"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              </motion.div>
              <div>
                <h4 className="text-sm font-bold text-red-800">Potential Unauthorized Construction Detected</h4>
                <p className="text-xs text-red-700 mt-1 font-medium">
                  +{builtUpGrowth}% Built-up expansion since 2020. Ground verification required.
                </p>
              </div>
            </motion.div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Area (Acres)</p>
              <p className="text-lg font-bold text-[#0F2942]">{properties.area_acres}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Status</p>
              <p className="text-sm font-bold text-[#0F2942] truncate">{properties.declared_status}</p>
            </div>
          </div>

          {/* Index Meters */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center tracking-wide">
              <Activity className="w-4 h-4 mr-1.5 text-blue-600" /> Assessment Indices
            </h3>
            
            {/* Suitability */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">Land Suitability Index</span>
                <span className="text-emerald-600 font-bold">{properties.suitability_score}/100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${properties.suitability_score}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-emerald-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Risk */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">Encroachment & Legal Risk</span>
                <span className="text-amber-600 font-bold">{properties.risk_score}/100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${properties.risk_score}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="bg-amber-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* AI Forecast */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">AI Future Growth Forecast</span>
                <span className="text-blue-600 font-bold">{(properties.ml_growth_prob * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${properties.ml_growth_prob * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Explainable AI (TreeSHAP) Factor Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center tracking-wide border-b border-slate-100 pb-2">
              <Info className="w-4 h-4 mr-1.5 text-indigo-600" /> Explainable AI Drivers
            </h3>
            
            <div className="space-y-2.5 pt-1">
              {properties.shap_drivers?.positive?.map((driver, idx) => (
                <div key={`pos-${idx}`} className="flex items-start space-x-2">
                  <div className="bg-emerald-100 text-emerald-700 p-1 rounded mt-0.5">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <div className="flex-1 text-xs">
                    <span className="text-slate-700 font-medium">{driver.name}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">
                    {driver.impact}
                  </span>
                </div>
              ))}

              {properties.shap_drivers?.negative?.map((driver, idx) => (
                <div key={`neg-${idx}`} className="flex items-start space-x-2">
                  <div className="bg-red-100 text-red-700 p-1 rounded mt-0.5">
                    <TrendingDown className="w-3 h-3" />
                  </div>
                  <div className="flex-1 text-xs">
                    <span className="text-slate-700 font-medium">{driver.name}</span>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 rounded">
                    {driver.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Decision Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-blue-900 uppercase flex items-center mb-2">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-blue-600" /> Official Recommendation
            </h3>
            <p className="text-sm text-blue-800 font-medium leading-relaxed mb-4">
              {properties.official_recommendation}
            </p>
            <button className="w-full bg-[#0F2942] hover:bg-blue-900 text-white text-sm font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Generate Brief Note (PDF)
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
