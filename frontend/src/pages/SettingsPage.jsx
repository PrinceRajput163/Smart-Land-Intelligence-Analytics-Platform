import {

User,
Map,
Database,
Brain,
Shield,
Bell,
Server

} from "lucide-react";


function SettingsPage(){


return(


<div className="space-y-8">



{/* Header */}


<div>


<h1 className="text-4xl font-bold text-[#071A2D]">


System Configuration


</h1>



<p className="text-gray-500 mt-2">


Manage GIS platform, AI models and data preferences


</p>


</div>







{/* Profile */}


<div className="bg-[#071A2D] text-white rounded-2xl p-8 flex justify-between">



<div className="flex gap-5 items-center">


<User size={60}/>



<div>


<h2 className="text-2xl font-bold">


Government Administrator


</h2>



<p className="text-gray-300">


Land Intelligence Officer


</p>



</div>



</div>





<div className="bg-green-500 h-fit px-5 py-2 rounded-xl">


Active


</div>




</div>








{/* Settings Grid */}



<div className="grid grid-cols-3 gap-6">







{/* GIS */}


<div className="bg-white rounded-xl shadow p-6">



<Map className="text-green-600"/>



<h2 className="font-bold text-xl mt-5">


GIS Configuration


</h2>



<p className="text-gray-500 mt-2">


Layer controls and map preferences


</p>



<label className="flex justify-between mt-6">


Satellite Mode


<input type="checkbox"/>


</label>



<label className="flex justify-between mt-3">


Live Coordinates


<input defaultChecked type="checkbox"/>


</label>




</div>









{/* Data */}


<div className="bg-white rounded-xl shadow p-6">


<Database className="text-blue-600"/>


<h2 className="font-bold text-xl mt-5">


Data Management


</h2>



<p className="text-gray-500 mt-2">


GLIS synchronization controls


</p>



<label className="flex justify-between mt-6">


Auto Sync


<input defaultChecked type="checkbox"/>


</label>



<label className="flex justify-between mt-3">


Backup Enabled


<input defaultChecked type="checkbox"/>


</label>




</div>









{/* AI */}


<div className="bg-white rounded-xl shadow p-6">


<Brain className="text-purple-600"/>


<h2 className="font-bold text-xl mt-5">


AI Engine


</h2>


<p className="text-gray-500 mt-2">


Prediction model configuration


</p>




<label className="flex justify-between mt-6">


ML Prediction


<input defaultChecked type="checkbox"/>


</label>



<label className="flex justify-between mt-3">


Risk Analysis


<input defaultChecked type="checkbox"/>


</label>




</div>







{/* Security */}


<div className="bg-white rounded-xl shadow p-6">


<Shield className="text-red-600"/>


<h2 className="font-bold text-xl mt-5">


Security


</h2>


<p className="mt-3">


Role based access enabled


</p>


</div>








{/* Notification */}


<div className="bg-white rounded-xl shadow p-6">


<Bell className="text-yellow-500"/>


<h2 className="font-bold text-xl mt-5">


Alerts


</h2>



<p className="mt-3">


Real time notification active


</p>


</div>









{/* Server */}


<div className="bg-white rounded-xl shadow p-6">


<Server className="text-blue-500"/>


<h2 className="font-bold text-xl mt-5">


System Health


</h2>



<p className="mt-3 text-green-600">


All services operational


</p>



</div>





</div>




</div>


)


}



export default SettingsPage;