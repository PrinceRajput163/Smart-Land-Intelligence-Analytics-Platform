import { motion } from "framer-motion";

import {

ShieldCheck,
Database,
Brain,
Globe,
Activity,
Lock,
Layers,
Server

} from "lucide-react";

const highlights=[

{
title:"Enterprise Security",
description:"Government grade security with protected access.",
icon:<ShieldCheck size={32}/>,
color:"text-green-600",
bg:"bg-green-50"
},

{
title:"GIS Intelligence",
description:"Multi-layer geospatial mapping and visualization.",
icon:<Layers size={32}/>,
color:"text-blue-600",
bg:"bg-blue-50"
},

{
title:"AI Decision Support",
description:"AI powered land suitability and planning assistance.",
icon:<Brain size={32}/>,
color:"text-purple-600",
bg:"bg-purple-50"
},

{
title:"National Database",
description:"Centralized land records and analytics platform.",
icon:<Database size={32}/>,
color:"text-yellow-600",
bg:"bg-yellow-50"
},

{
title:"Real-Time Monitoring",
description:"Continuous monitoring of land intelligence systems.",
icon:<Activity size={32}/>,
color:"text-red-600",
bg:"bg-red-50"
},

{
title:"Secure Access",
description:"Role-based authentication for authorized officials.",
icon:<Lock size={32}/>,
color:"text-indigo-600",
bg:"bg-indigo-50"
},

{
title:"Nationwide Coverage",
description:"Scalable architecture supporting multiple regions.",
icon:<Globe size={32}/>,
color:"text-cyan-600",
bg:"bg-cyan-50"
},

{
title:"System Availability",
description:"Reliable enterprise infrastructure with high uptime.",
icon:<Server size={32}/>,
color:"text-orange-600",
bg:"bg-orange-50"
}

];

function PlatformHighlights(){

return(

<section className="py-20 bg-white">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<h2 className="text-4xl font-bold text-[#071A2D]">

Platform Highlights

</h2>

<p className="text-gray-500 mt-4 text-lg">

Enterprise capabilities designed for intelligent land governance and decision support.

</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

{

highlights.map((item,index)=>(

<motion.div

key={index}

initial={{

opacity:0,

y:30

}}

whileInView={{

opacity:1,

y:0

}}

viewport={{

once:true

}}

transition={{

duration:0.5,

delay:index*0.08

}}

whileHover={{

y:-6

}}

className="bg-white border rounded-2xl shadow hover:shadow-xl transition p-6"

>

<div className={`${item.bg} ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center`}>

{item.icon}

</div>

<h3 className="text-xl font-bold text-[#071A2D] mt-6">

{item.title}

</h3>

<p className="text-gray-600 mt-4 leading-7">

{item.description}

</p>

</motion.div>

))

}

</div>

</div>

</section>

)

}

export default PlatformHighlights;