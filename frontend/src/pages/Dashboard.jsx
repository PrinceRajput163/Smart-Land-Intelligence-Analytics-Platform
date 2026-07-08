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


<>



{/* Heading */}


<h1 className="text-4xl font-bold text-[#071A2D]">


Command Center Dashboard


</h1>



<p className="text-gray-600 mt-3">


Real-time land intelligence and GIS monitoring system


</p>







{/* Stats Cards */}


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">



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









{/* GIS + Activity */}


<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">





<div className="lg:col-span-2 bg-white rounded-xl shadow p-6">



<h2 className="text-2xl font-bold mb-5">


Live GIS Overview


</h2>



<MapView/>



</div>








<div className="bg-white rounded-xl shadow p-6">



<h2 className="text-xl font-bold">


Recent Activity


</h2>




<div className="space-y-5 mt-6">



<p>

🟢 New land parcel added

</p>


<p>

🟡 Mining boundary updated

</p>


<p>

🌲 Forest data synchronized

</p>


<p>

🔴 Restricted zone detected

</p>



</div>



</div>




</div>









{/* Analytics */}


<AnalyticsChart/>





{/* AI Prediction */}


<AIPrediction/>





{/* AI Assistant */}


<AIAssistant/>





{/* Alerts */}


<AlertPanel/>





{/* Records */}


<LandRecords/>





{/* Reports */}


<Reports/>





</>


)


}



export default Dashboard;