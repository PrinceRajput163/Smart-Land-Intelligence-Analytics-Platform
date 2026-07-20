import { useState } from "react";

import {
LayoutDashboard,
Map,
Database,
BarChart3,
Brain,
FileText,
Settings,
Menu,
ChevronRight,
ShieldCheck,
Activity
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

function Sidebar(){

const [open,setOpen]=useState(true);

const menu=[

{
name:"Dashboard",
path:"/dashboard",
icon:<LayoutDashboard size={22}/>
},

{
name:"GIS Intelligence",
path:"/gis",
icon:<Map size={22}/>
},

{
name:"Land Records",
path:"/records",
icon:<Database size={22}/>
},

{
name:"Analytics",
path:"/analytics",
icon:<BarChart3 size={22}/>
},

{
name:"AI Prediction",
path:"/ai",
icon:<Brain size={22}/>
},

{
name:"Reports",
path:"/reports",
icon:<FileText size={22}/>
},

{
name:"Settings",
path:"/settings",
icon:<Settings size={22}/>
}

];

return(

<motion.div

animate={{

width:open?290:90

}}

className="min-h-screen bg-[#071A2D] text-white flex flex-col"

>

{/* Header */}

<div className="border-b border-white/10 p-6">

<div className="flex justify-between items-center">

{

open &&

<div>

<p className="uppercase text-green-400 text-xs tracking-widest">

Government Platform

</p>

<h2 className="text-2xl font-bold mt-2">

Smart Land AI

</h2>

<p className="text-sm text-gray-400 mt-1">

Version 2.0

</p>

</div>

}

<button

onClick={()=>setOpen(!open)}

className="bg-white/10 hover:bg-white/20 transition p-3 rounded-xl"

>

<Menu size={22}/>

</button>

</div>

</div>

{/* Navigation */}

<div className="flex-1 px-4 py-6">

{

open &&

<p className="text-xs uppercase tracking-widest text-gray-400 mb-5 px-3">

Navigation

</p>

}

<div className="space-y-2">

{

menu.map((item)=>(

<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`flex items-center justify-between rounded-xl px-4 py-4 transition

${

isActive

?

"bg-blue-600 shadow-lg"

:

"hover:bg-white/10"

}`

}

>

<div className="flex items-center gap-4">

{item.icon}

{

open &&

<span>

{item.name}

</span>

}

</div>

{

open &&

<ChevronRight size={18}/>

}

</NavLink>

))

}

</div>

</div>

{/* Footer */}

<div className="border-t border-white/10 p-5">

{

open &&

<div className="space-y-4">

<div className="flex items-center justify-between">

<div className="flex items-center gap-2">

<Activity

size={18}

className="text-green-400"

/>

<span>

System

</span>

</div>

<span className="text-green-400 font-semibold">

ONLINE

</span>

</div>

<div className="flex items-center justify-between">

<div className="flex items-center gap-2">

<ShieldCheck

size={18}

className="text-blue-400"

/>

<span>

Security

</span>

</div>

<span className="text-blue-400 font-semibold">

ACTIVE

</span>

</div>

<div className="bg-green-600 rounded-xl text-center py-3 font-semibold">

Government Ready

</div>

</div>

}

</div>

</motion.div>

)

}

export default Sidebar;