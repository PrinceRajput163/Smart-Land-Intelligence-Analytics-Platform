import StatCard from "../components/StatCard";
import MapView from "../components/MapView";
import AnalyticsChart from "../components/AnalyticsChart";
import AIPrediction from "../components/AIPrediction";
import AIAssistant from "../components/AIAssistant";
import AlertPanel from "../components/AlertPanel";
import LandRecords from "../components/LandRecords";
import Reports from "../components/Reports";

import { dashboardStats } from "../data/dummyData";

import {
Map,
Factory,
Activity,
Landmark
} from "lucide-react";

function Dashboard(){

const icons=[
<Map/>,
<Factory/>,
<Landmark/>,
<Activity/>
];

return(

<div className="space-y-10">

{/* Header */}

<div className="bg-[#071A2D] rounded-3xl text-white p-6 lg:p-10">

<p className="uppercase tracking-widest text-green-400">

Government Command Center

</p>

<h1 className="text-3xl lg:text-5xl font-bold mt-3">

National Land Intelligence Dashboard

</h1>

<p className="text-gray-300 mt-4 text-lg">

Real-time GIS monitoring, AI prediction,
land records management and government analytics platform.

</p>

<div className="flex flex-wrap gap-3 lg:gap-4 mt-8">

<div className="bg-green-600 px-5 py-3 rounded-xl">

System Online

</div>

<div className="bg-white/10 px-5 py-3 rounded-xl">

AI Engine Active

</div>

<div className="bg-white/10 px-5 py-3 rounded-xl">

GIS Connected

</div>

</div>

</div>

{/* Statistics */}

<section>

<div className="flex justify-between items-center mb-8">

<div>

<h2 className="text-3xl font-bold text-[#071A2D]">

Platform Statistics

</h2>

<p className="text-gray-500">

Live Government Intelligence Metrics

</p>

</div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

{

dashboardStats.map((item,index)=>(

<StatCard

key={index}

title={item.title}

value={item.value}

percentage={item.percentage}

icon={icons[index]}

/>

))

}

</div>

</section>

{/* GIS */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

GIS Intelligence Center

</h2>

<div className="bg-white rounded-3xl border shadow-lg p-6">

<MapView/>

</div>

</section>

{/* Analytics */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

National Analytics

</h2>

<AnalyticsChart/>

</section>

{/* AI Prediction */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

Artificial Intelligence

</h2>

<AIPrediction/>

</section>

{/* AI Assistant */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

AI Assistant

</h2>

<AIAssistant/>

</section>

{/* Alerts */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

Monitoring & Alerts

</h2>

<AlertPanel/>

</section>

{/* Land Records */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

Government Land Records

</h2>

<LandRecords/>

</section>

{/* Reports */}

<section>

<h2 className="text-3xl font-bold text-[#071A2D] mb-6">

Government Reports

</h2>

<Reports/>

</section>

</div>

)

}

export default Dashboard;