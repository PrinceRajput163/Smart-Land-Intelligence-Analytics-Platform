import { motion } from "framer-motion";

import {
Database,
Map,
Landmark,
Brain,
Layers,
FileText
} from "lucide-react";

const stats=[

{
title:"Land Records",
value:"52,430",
icon:<Database size={34}/>,
color:"text-blue-600",
bg:"bg-blue-50"
},

{
title:"Government Land",
value:"18,200 Ha",
icon:<Landmark size={34}/>,
color:"text-green-600",
bg:"bg-green-50"
},

{
title:"Mining Zones",
value:"342",
icon:<Map size={34}/>,
color:"text-yellow-600",
bg:"bg-yellow-50"
},

{
title:"AI Accuracy",
value:"94%",
icon:<Brain size={34}/>,
color:"text-purple-600",
bg:"bg-purple-50"
},

{
title:"GIS Layers",
value:"18",
icon:<Layers size={34}/>,
color:"text-cyan-600",
bg:"bg-cyan-50"
},

{
title:"Reports Generated",
value:"450+",
icon:<FileText size={34}/>,
color:"text-red-600",
bg:"bg-red-50"
}

];

function StatsSection(){

return(

<section className="py-20 bg-[#F8FAFC]">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<p className="uppercase tracking-widest text-green-600 font-semibold">

National Platform Statistics

</p>

<h2 className="text-4xl font-bold text-[#071A2D] mt-3">

Government Land Intelligence Overview

</h2>

<p className="text-gray-500 mt-4">

Real-time statistics from the Smart Land Intelligence & Analytics Platform.

</p>

</div>

<div className="grid lg:grid-cols-3 gap-8 mt-14">

{

stats.map((item,index)=>(

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

className="bg-white border rounded-2xl shadow hover:shadow-xl transition p-7"

>

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

{item.title}

</p>

<h2 className="text-4xl font-bold text-[#071A2D] mt-4">

{item.value}

</h2>

</div>

<div className={`${item.bg} ${item.color} p-5 rounded-2xl`}>

{item.icon}

</div>

</div>

<div className="mt-8">

<div className="w-full h-2 bg-gray-200 rounded-full">

<div className="w-4/5 h-2 rounded-full bg-[#16A34A]"></div>

</div>

<p className="text-green-600 font-medium mt-3">

Updated Today

</p>

</div>

</motion.div>

))

}

</div>

</div>

</section>

)

}

export default StatsSection;