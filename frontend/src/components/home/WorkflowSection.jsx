import { motion } from "framer-motion";

import {
Database,
Map,
Brain,
ShieldCheck,
FileText,
CheckCircle,
ArrowDown
} from "lucide-react";

const workflow=[

{
title:"Data Collection",
icon:<Database size={36}/>,
description:"Collect land records, ownership and survey information."
},

{
title:"GIS Mapping",
icon:<Map size={36}/>,
description:"Visualize geospatial layers and land boundaries."
},

{
title:"AI Analysis",
icon:<Brain size={36}/>,
description:"Predict land suitability and identify potential risks."
},

{
title:"Land Verification",
icon:<ShieldCheck size={36}/>,
description:"Verify ownership, legal status and government records."
},

{
title:"Report Generation",
icon:<FileText size={36}/>,
description:"Generate official reports and analytical documents."
},

{
title:"Decision Support",
icon:<CheckCircle size={36}/>,
description:"Support government planning with intelligent insights."
}

];

function WorkflowSection(){

return(

<section className="py-20 bg-[#F8FAFC]">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<p className="uppercase tracking-widest text-green-600 font-semibold">

Government Workflow

</p>

<h2 className="text-4xl font-bold text-[#071A2D] mt-3">

Land Intelligence Processing Pipeline

</h2>

<p className="text-gray-500 mt-4">

Standard workflow for intelligent land management, GIS analytics and government decision support.

</p>

</div>

<div className="mt-16">

<div className="grid lg:grid-cols-6 gap-6">

{

workflow.map((item,index)=>(

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

className="relative bg-white rounded-2xl border shadow p-6 text-center"

>

<div className="flex justify-center">

<div className="w-20 h-20 rounded-full bg-[#071A2D] text-white flex items-center justify-center">

{item.icon}

</div>

</div>

<h3 className="font-bold text-xl text-[#071A2D] mt-6">

{item.title}

</h3>

<p className="text-gray-500 mt-4 leading-7">

{item.description}

</p>

{

index !== workflow.length-1 && (

<div className="hidden lg:block absolute -right-6 top-20 text-blue-600">

<ArrowDown className="-rotate-90"/>

</div>

)

}

</motion.div>

))

}

</div>

</div>

<div className="mt-16 bg-[#071A2D] rounded-3xl p-10 text-white">

<div className="grid lg:grid-cols-4 gap-8">

<div>

<h3 className="text-3xl font-bold">

6

</h3>

<p className="text-gray-300 mt-2">

Workflow Stages

</p>

</div>

<div>

<h3 className="text-3xl font-bold">

94%

</h3>

<p className="text-gray-300 mt-2">

AI Prediction Accuracy

</p>

</div>

<div>

<h3 className="text-3xl font-bold">

24×7

</h3>

<p className="text-gray-300 mt-2">

Monitoring

</p>

</div>

<div>

<h3 className="text-3xl font-bold">

100%

</h3>

<p className="text-gray-300 mt-2">

Government Ready

</p>

</div>

</div>

</div>

</div>

</section>

)

}

export default WorkflowSection;