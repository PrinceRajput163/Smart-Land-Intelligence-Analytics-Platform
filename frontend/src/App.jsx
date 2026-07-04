import { Routes, Route } from "react-router-dom";


import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";


import Dashboard from "./pages/Dashboard";
import GISPage from "./pages/GISPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LandRecordsPage from "./pages/LandRecordsPage";
import AIPredictionPage from "./pages/AIPredictionPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";


function App(){


return(

<div className="flex">


<Sidebar/>


<div className="flex-1 bg-gray-100 min-h-screen p-10">


<Navbar/>


<div className="mt-10">


<Routes>


<Route path="/" element={<Dashboard/>}/>

<Route path="/gis" element={<GISPage/>}/>

<Route path="/records" element={<LandRecordsPage/>}/>

<Route path="/analytics" element={<AnalyticsPage/>}/>

<Route path="/ai" element={<AIPredictionPage/>}/>

<Route path="/reports" element={<ReportsPage/>}/>

<Route path="/settings" element={<SettingsPage/>}/>


</Routes>


</div>


</div>


</div>


)

}


export default App;