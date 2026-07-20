import { motion } from "framer-motion";

import {

Brain,
Map,
Database,
Building2,
Leaf,
ShieldCheck

} from "lucide-react";

const features=[

{
title:"AI Land Intelligence",
description:"AI powered prediction and suitability analysis for government land planning.",
icon:<Brain size={34}/>,
color:"text-blue-600",
bg:"bg-blue-50"
},

{
title:"GIS Mapping System",
description:"Interactive geospatial visualization with multi-layer GIS intelligence.",
icon:<Map size={34}/>,
color:"text-green-600",
bg:"bg-green-50"
},

{
title:"Land Records",
description:"Centralized government land records with intelligent search capabilities.",
icon:<Database size={34}/>,
color:"text-yellow-600",
bg:"bg-yellow-50"
},

{
title:"Infrastructure Planning",
description:"Support infrastructure development using AI assisted land analytics.",
icon:<Building2 size={34}/>,
color:"text-purple-600",
bg:"bg-purple-50"
},

{
title:"Environmental Monitoring",
description:"Monitor forests, mining regions and environmentally sensitive zones.",
icon:<Leaf size={34}/>,
color:"text-green-700",
bg:"bg-green-100"
},

{
title:"Decision Support",
description:"Enterprise dashboard for planning, monitoring and strategic decisions.",
icon:<ShieldCheck size={34}/>,
color:"text-red-600",
bg:"bg-red-50"
}

];

function FeaturesSection(){

return(

<section className="py-20 bg-white">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<h2 className="text-4xl font-bold text-[#071A2D]">

Platform Capabilities

</h2>

<p className="text-gray-500 text-lg mt-4">

Integrated modules supporting intelligent land management and government decision making.

</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

{

features.map((item,index)=>(

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
delay:index*0.1
}}

whileHover={{
y:-8
}}

className="bg-white border rounded-2xl shadow hover:shadow-xl transition p-8"

>

<div className={`${item.bg} ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center`}>

{item.icon}

</div>

<h3 className="text-2xl font-bold text-[#071A2D] mt-6">

{item.title}

</h3>

<p className="text-gray-600 leading-7 mt-4">

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

export default FeaturesSection;