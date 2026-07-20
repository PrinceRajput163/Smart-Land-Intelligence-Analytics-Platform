import { motion } from "framer-motion";

import {

Bell,
ShieldCheck,
Brain,
Map,
Database,
FileText,
Clock

} from "lucide-react";

const updates=[

{
title:"Mining boundary successfully updated",
time:"10 Minutes Ago",
icon:<Map size={20}/>
},

{
title:"AI land suitability prediction completed",
time:"25 Minutes Ago",
icon:<Brain size={20}/>
},

{
title:"Government land database synchronized",
time:"40 Minutes Ago",
icon:<Database size={20}/>
},

{
title:"Forest protection layer verified",
time:"1 Hour Ago",
icon:<ShieldCheck size={20}/>
},

{
title:"Monthly intelligence report generated",
time:"Today",
icon:<FileText size={20}/>
}

];

function LatestUpdates(){

return(

<section className="bg-[#F8FAFC] py-20">

<div className="max-w-7xl mx-auto px-8">

<div className="flex justify-between items-center">

<div>

<h2 className="text-4xl font-bold text-[#071A2D]">

Latest Intelligence Updates

</h2>

<p className="text-gray-500 mt-3">

Real-time monitoring updates from the national land intelligence platform.

</p>

</div>

<div className="bg-green-100 text-green-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-2">

<Bell size={18}/>

LIVE

</div>

</div>

<div className="mt-12 space-y-6">

{

updates.map((item,index)=>(

<motion.div

key={index}

initial={{

opacity:0,

x:-30

}}

whileInView={{

opacity:1,

x:0

}}

viewport={{

once:true

}}

transition={{

duration:0.4,

delay:index*0.1

}}

className="bg-white border rounded-2xl shadow hover:shadow-lg transition p-6 flex justify-between items-center"

>

<div className="flex items-center gap-5">

<div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

{item.icon}

</div>

<div>

<h3 className="font-bold text-lg text-[#071A2D]">

{item.title}

</h3>

<p className="text-gray-500 mt-1">

Status: Successfully Verified

</p>

</div>

</div>

<div className="flex items-center gap-2 text-gray-500">

<Clock size={18}/>

{item.time}

</div>

</motion.div>

))

}

</div>

</div>

</section>

)

}

export default LatestUpdates;