import { motion } from "framer-motion";

import {
Brain,
Map,
Database,
BarChart3,
FileText,
ShieldCheck,
ArrowRight
} from "lucide-react";

const features=[

{
title:"AI Decision Support",
icon:<Brain size={36}/>,
color:"text-purple-600",
bg:"bg-purple-50",
description:"Artificial Intelligence powered land suitability analysis and prediction for government planning."
},

{
title:"GIS Intelligence",
icon:<Map size={36}/>,
color:"text-green-600",
bg:"bg-green-50",
description:"Interactive GIS mapping with spatial intelligence and real-time land monitoring."
},

{
title:"Land Records",
icon:<Database size={36}/>,
color:"text-blue-600",
bg:"bg-blue-50",
description:"Centralized government land records with ownership verification and search."
},

{
title:"Analytics Dashboard",
icon:<BarChart3 size={36}/>,
color:"text-yellow-600",
bg:"bg-yellow-50",
description:"Data visualization and analytical insights for strategic land management."
},

{
title:"Government Reports",
icon:<FileText size={36}/>,
color:"text-red-600",
bg:"bg-red-50",
description:"Generate official reports for planning, monitoring and policy making."
},

{
title:"Enterprise Security",
icon:<ShieldCheck size={36}/>,
color:"text-cyan-600",
bg:"bg-cyan-50",
description:"Secure access with government-grade authentication and role based permissions."
}

];

function FeaturesSection(){

return(

<section className="py-20 bg-white">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<p className="uppercase tracking-widest text-green-600 font-semibold">

Platform Modules

</p>

<h2 className="text-4xl font-bold text-[#071A2D] mt-3">

Government Intelligence Services

</h2>

<p className="text-gray-500 mt-4">

Integrated modules for intelligent land governance, GIS monitoring and AI-assisted decision support.

</p>

</div>

<div className="grid lg:grid-cols-3 gap-8 mt-14">

{

features.map((item,index)=>(

<motion.div

key={index}

initial={{
opacity:0,
y:40
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
y:-8
}}

className="border rounded-3xl bg-white shadow hover:shadow-2xl transition overflow-hidden"

>

<div className={`${item.bg} p-8`}>

<div className={`${item.color}`}>

{item.icon}

</div>

</div>

<div className="p-8">

<h2 className="text-2xl font-bold text-[#071A2D]">

{item.title}

</h2>

<p className="text-gray-500 leading-8 mt-5">

{item.description}

</p>

<button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all">

Learn More

<ArrowRight size={18}/>

</button>

</div>

</motion.div>

))

}

</div>

</div>

</section>

)

}

export default FeaturesSection;