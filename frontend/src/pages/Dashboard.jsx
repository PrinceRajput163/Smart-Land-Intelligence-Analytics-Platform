import StatCard from "../components/StatCard";

import MapView from "../components/MapView";
import AnalyticsChart from "../components/AnalyticsChart";
import AIPrediction from "../components/AIPrediction";
import LandRecords from "../components/LandRecords";
import Reports from "../components/Reports";

import { dashboardStats } from "../data/dummyData";


function Dashboard(){


return(

<>


<h1 className="text-4xl font-bold">

Smart Land Intelligence Dashboard

</h1>


<p className="text-gray-600 mt-3">

AI Powered GLIS Analytics Platform

</p>



<div className="grid grid-cols-4 gap-6 mt-10">


{


dashboardStats.map((item,index)=>(


<StatCard

key={index}

title={item.title}

value={item.value}

/>


))


}


</div>



<div className="bg-white rounded-xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold mb-5">

GIS Monitoring

</h2>


<MapView/>


</div>



<AnalyticsChart/>


<AIPrediction/>


<LandRecords/>


<Reports/>


</>

)

}


export default Dashboard;