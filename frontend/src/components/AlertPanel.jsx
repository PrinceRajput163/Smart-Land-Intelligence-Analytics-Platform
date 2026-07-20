import {
AlertTriangle,
CheckCircle,
Bell,
Activity,
ShieldAlert
} from "lucide-react";

import { motion } from "framer-motion";

import { alertsData } from "../data/dummyData";

function AlertPanel(){

return(

<div className="bg-white rounded-3xl border shadow-lg p-8 mt-10">

{/* Header */}

<div className="flex justify-between items-center">

<div>

<p className="uppercase tracking-widest text-green-600 font-semibold">

Government Intelligence

</p>

<h2 className="text-3xl font-bold text-[#071A2D] mt-2">

National Alert Center

</h2>

<p className="text-gray-500 mt-2">

Real-time monitoring of GIS events and land intelligence alerts.

</p>

</div>

<div className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-full">

<Activity size={20}/>

LIVE

</div>

</div>

{/* Summary */}

<div className="grid grid-cols-3 gap-6 mt-10">

<div className="bg-red-50 rounded-2xl p-6">

<ShieldAlert className="text-red-600"/>

<h2 className="text-4xl font-bold mt-5">

03

</h2>

<p className="text-gray-500 mt-2">

Critical Alerts

</p>

</div>

<div className="bg-yellow-50 rounded-2xl p-6">

<AlertTriangle className="text-yellow-600"/>

<h2 className="text-4xl font-bold mt-5">

08

</h2>

<p className="text-gray-500 mt-2">

Warnings

</p>

</div>

<div className="bg-green-50 rounded-2xl p-6">

<CheckCircle className="text-green-600"/>

<h2 className="text-4xl font-bold mt-5">

24

</h2>

<p className="text-gray-500 mt-2">

Resolved Today

</p>

</div>

</div>

{/* Alert List */}

<div className="space-y-5 mt-10">

{

alertsData.map((item,index)=>(

<motion.div

key={index}

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

transition={{delay:index*0.1}}

whileHover={{scale:1.01}}

className="border rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition"

>

<div className="flex items-center gap-4">

{

item.color==="green"

?

<CheckCircle className="text-green-600"/>

:

item.color==="yellow"

?

<AlertTriangle className="text-yellow-600"/>

:

<ShieldAlert className="text-red-600"/>

}

<div>

<h3 className="font-bold">

{item.msg}

</h3>

<p className="text-gray-500 text-sm">

Government Monitoring Service

</p>

</div>

</div>

<span

className={`px-4 py-2 rounded-full font-semibold

${

item.color==="red"

?

"bg-red-100 text-red-700"

:

item.color==="yellow"

?

"bg-yellow-100 text-yellow-700"

:

"bg-green-100 text-green-700"

}`}

>

{item.type}

</span>

</motion.div>

))

}

</div>

{/* Footer */}

<div className="mt-10 bg-[#071A2D] rounded-2xl p-6 text-white flex justify-between items-center">

<div className="flex items-center gap-3">

<Bell/>

<span>

Government Monitoring Service Active

</span>

</div>

<div className="text-green-400 font-semibold">

24×7 Surveillance Enabled

</div>

</div>

</div>

)

}

export default AlertPanel;