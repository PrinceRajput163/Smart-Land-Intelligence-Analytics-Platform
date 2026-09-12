import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "./components/common/Loader";
import AppLayout from "./components/layout/AppLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GISPage from "./pages/GISPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LandRecordsPage from "./pages/LandRecordsPage";
import AIPredictionPage from "./pages/AIPredictionPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";


function App() {

  // Loader State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show loader
  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>

      {/* Landing Page — no sidebar/navbar */}
      <Route path="/" element={<Home />} />

      {/* Dashboard Layout — sidebar + navbar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gis" element={<GISPage />} />
        <Route path="/records" element={<LandRecordsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ai" element={<AIPredictionPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

    </Routes>
  );

}

export default App;