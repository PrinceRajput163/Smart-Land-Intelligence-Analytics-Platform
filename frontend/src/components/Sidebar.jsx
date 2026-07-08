import {

Home,
Map,
BarChart3,
Database,
Brain,
FileText,
Settings,
Globe

} from "lucide-react";


import { NavLink } from "react-router-dom";



function Sidebar(){


const menu=[

{
name:"Home",
path:"/",
icon:<Globe/>
},


{
name:"Dashboard",
path:"/dashboard",
icon:<Home/>
},


{
name:"GIS Map",
path:"/gis",
icon:<Map/>
},


{
name:"Land Records",
path:"/records",
icon:<Database/>
},


{
name:"Analytics",
path:"/analytics",
icon:<BarChart3/>
},


{
name:"AI Prediction",
path:"/ai",
icon:<Brain/>
},


{
name:"Reports",
path:"/reports",
icon:<FileText/>
},


{
name:"Settings",
path:"/settings",
icon:<Settings/>
}


];




return(


<div className="w-64 min-h-screen bg-[#071A2D] text-white p-5">


<h2 className="text-2xl font-bold mb-10">

Smart Land AI

</h2>



<div className="space-y-3">


{

menu.map((item)=>(


<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`flex gap-3 p-3 rounded-xl transition

${

isActive

?

"bg-blue-600"

:

"hover:bg-white/10"

}`

}


>


{item.icon}

{item.name}



</NavLink>


))

}



</div>


</div>


)


}


export default Sidebar;