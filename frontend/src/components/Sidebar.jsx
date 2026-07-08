import { useState } from "react";


import {

Home,
Map,
BarChart3,
Database,
Brain,
FileText,
Settings,
Menu,
Globe

} from "lucide-react";


import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";



function Sidebar(){



const [open,setOpen]=useState(true);




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



<motion.div


animate={{

width: open ? 260 : 90

}}


className="min-h-screen bg-[#071A2D] text-white p-5"


>





{/* Header */}



<div className="flex justify-between items-center mb-10">



{


open &&


<h2 className="text-2xl font-bold">


Smart Land AI


</h2>


}




<button

onClick={()=>setOpen(!open)}

className="bg-white/10 p-2 rounded-lg"


>


<Menu/>


</button>



</div>








{/* Menu */}



<div className="space-y-3">



{


menu.map((item)=>(




<NavLink


key={item.name}


to={item.path}


className={({isActive})=>


`flex items-center gap-4 p-3 rounded-xl transition


${


isActive


?


"bg-blue-600"


:


"hover:bg-white/10"



}`


}


>




<div>


{item.icon}


</div>





{


open &&


<span>


{item.name}


</span>



}





</NavLink>




))


}



</div>





</motion.div>


)


}



export default Sidebar;