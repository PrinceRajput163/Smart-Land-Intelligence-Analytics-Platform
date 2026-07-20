import {
Brain,
Activity,
ShieldAlert,
TrendingUp,
Database,
Map,
CheckCircle2,
Cpu
} from "lucide-react";

import { motion } from "framer-motion";

function AIPrediction(){

const steps=[

{
title:"GIS Data Collection",
icon:<Database size={32}/>
},

{
title:"Spatial Processing",
icon:<Map size={32}/>
},

{
title:"AI Analysis",
icon:<Brain size={32}/>
},

{
title:"Prediction",
icon:<Activity size={32}/>
}

];

return(

<div className="space-y-8 mt-10">

{/* Header */}

<div className="bg-[#071A2D] rounded-3xl text-white p-8 shadow">

<div className="flex justify-between items-center">

<div>

<p className="uppercase tracking-widest text-green-400">

Artificial Intelligence

</p>

<h1 className="text-4xl font-bold mt-2">

Government AI Prediction Engine

</h1>

<p className="text-gray-300 mt-3">

Machine Learning based land suitability analysis and decision support.

</p>

</div>

<motion.div

animate={{
scale:[1,1.1,1]
}}

transition={{
repeat:Infinity,
duration:2
}}

className="bg-white/10 p-5 rounded-2xl"

>

<Cpu size={55}/>

</motion.div>

</div>

</div>

{/* Statistics */}

<div className="grid lg:grid-cols-3 gap-6">

<div className="bg-white rounded-2xl border shadow p-6">

<Brain className="text-blue-600"/>

<p className="text-gray-500 mt-5">

Model Accuracy

</p>

<h2 className="text-5xl font-bold mt-2">

94.7%

</h2>

</div>

<div className="bg-white rounded-2xl border shadow p-6">

<TrendingUp className="text-green-600"/>

<p className="text-gray-500 mt-5">

Confidence Score

</p>

<h2 className="text-5xl font-bold mt-2">

91%

</h2>

</div>

<div className="bg-white rounded-2xl border shadow p-6">

<ShieldAlert className="text-yellow-500"/>

<p className="text-gray-500 mt-5">

Risk Level

</p>

<h2 className="text-5xl font-bold mt-2">

LOW

</h2>

</div>

</div>

{/* Prediction */}

<div className="bg-green-50 border border-green-200 rounded-3xl p-8">

<div className="flex items-center gap-3">

<CheckCircle2 className="text-green-600"/>

<h2 className="text-3xl font-bold text-green-700">

Prediction Result

</h2>

</div>

<h1 className="text-5xl font-bold mt-8 text-[#071A2D]">

Highly Suitable For Development

</h1>

<p className="text-gray-600 mt-5 leading-8">

The selected land parcel has high infrastructure potential,
low environmental risk,
verified government ownership,
and strong AI confidence for future development.

</p>

</div>

{/* Pipeline */}

<div className="bg-white rounded-3xl border shadow p-8">

<h2 className="text-3xl font-bold mb-8">

AI Processing Pipeline

</h2>

<div className="grid lg:grid-cols-4 gap-6">

{

steps.map((item,index)=>(

<div

key={index}

className="bg-gray-50 rounded-2xl p-6 text-center border"

>

<div className="flex justify-center">

<div className="w-16 h-16 rounded-full bg-[#071A2D] text-white flex items-center justify-center">

{item.icon}

</div>

</div>

<h3 className="font-bold mt-5">

{item.title}

</h3>

</div>

))

}

</div>

</div>

</div>

)

}

export default AIPrediction;