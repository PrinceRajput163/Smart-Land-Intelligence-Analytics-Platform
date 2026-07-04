import StatCard from "../components/StatCard";
import MapView from "../components/MapView";
import AnalyticsChart from "../components/AnalyticsChart";
import AIPrediction from "../components/AIPrediction";
import LandRecords from "../components/LandRecords";
import Reports from "../components/Reports";


function Dashboard(){


return(

<>


<h1 className="text-4xl font-bold">

Land Intelligence Dashboard

</h1>


<p className="text-gray-600 mt-3">

AI Based GLIS Analytics Platform

</p>



<div className="grid grid-cols-3 gap-6 mt-10">


<StatCard title="Mining Zones" value="342"/>

<StatCard title="Land Records" value="12K"/>

<StatCard title="Development Score" value="87%"/>


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