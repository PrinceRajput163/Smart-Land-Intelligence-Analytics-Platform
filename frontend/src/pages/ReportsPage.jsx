import { useState } from "react";
import { FileText, Download, CheckCircle, Clock, ShieldCheck, Printer } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      title: "Gautam Buddha Nagar Cadastral Encroachment Audit (2020–2026)",
      subtitle: "Satellite Delta Verification • 14 Parcels Flagged • Verified by Sentinel-2",
      status: "Completed (Official)",
      isCompleted: true
    },
    {
      title: "Yamuna Expressway Corridor Land Suitability Assessment",
      subtitle: "MCDA-AHP Scoring • Infrastructure Proximity Matrix",
      status: "Ready for Revenue Board Review",
      isCompleted: true
    },
    {
      title: "Jewar Airport Peri-Urban Expansion Forecast (2026–2031)",
      subtitle: "GeoAI Machine Learning Spatial Growth Model",
      status: "Predictive Model Output",
      isCompleted: false
    },
    {
      title: "Gram Sabha & Vacant Public Land Asset Valuation",
      subtitle: "Tehsil-wise Land Bank Monetization Register",
      status: "Updated Q3 2026",
      isCompleted: true
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
        <div>
          <p className="uppercase tracking-widest text-emerald-400 font-semibold mb-1 text-xs">
            Government Reports Center
          </p>
          <h1 className="text-3xl font-bold text-slate-100">
            Official Audit & Dossiers
          </h1>
          <p className="text-slate-400 mt-2">
            Secure digital repository for administrative land audits and GeoAI reports.
          </p>
        </div>
        <button 
          onClick={() => alert("Printing Executive Dossier...")}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white transition px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Printer size={20} />
          Generate Instant Brief Note / PDF
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-slate-900/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="text-blue-400 bg-slate-800 p-3 rounded-lg">
                  <FileText size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${report.isCompleted ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800' : 'bg-amber-900/40 text-amber-400 border border-amber-800'}`}>
                  {report.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2 leading-snug">
                {report.title}
              </h2>
              <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
                {report.subtitle}
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <ShieldCheck size={18} /> Verified Report
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 transition px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold border border-slate-700">
                <Download size={16} /> Download PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}