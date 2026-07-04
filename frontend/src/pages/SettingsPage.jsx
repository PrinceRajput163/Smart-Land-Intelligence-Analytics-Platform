import { User, Palette, Database, Map } from "lucide-react";


function SettingsPage(){


return(

<div>


<h1 className="text-4xl font-bold">

System Settings

</h1>


<p className="text-gray-600 mt-3">

Configure GIS, user and analytics preferences

</p>



<div className="grid grid-cols-2 gap-6 mt-10">



<div className="bg-white rounded-xl shadow p-6">


<User className="text-blue-600"/>


<h2 className="text-xl font-bold mt-4">

Profile Settings

</h2>


<p className="text-gray-500 mt-2">

Government user account configuration

</p>


</div>




<div className="bg-white rounded-xl shadow p-6">


<Palette className="text-green-600"/>


<h2 className="text-xl font-bold mt-4">

Theme Settings

</h2>


<p className="text-gray-500 mt-2">

Dashboard appearance controls

</p>


</div>





<div className="bg-white rounded-xl shadow p-6">


<Database className="text-purple-600"/>


<h2 className="text-xl font-bold mt-4">

Data Preferences

</h2>


<p className="text-gray-500 mt-2">

GLIS data synchronization settings

</p>


</div>





<div className="bg-white rounded-xl shadow p-6">


<Map className="text-red-600"/>


<h2 className="text-xl font-bold mt-4">

GIS Configuration

</h2>


<p className="text-gray-500 mt-2">

Layers and map controls

</p>


</div>




</div>


</div>

)

}


export default SettingsPage;