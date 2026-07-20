import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {

ArrowRight,
Map,
BarChart3,
ShieldCheck

} from "lucide-react";

function CTASection(){

return(

<section className="py-20 bg-[#071A2D] text-white">

<div className="max-w-7xl mx-auto px-8">

<motion.div

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
duration:0.6
}}

className="rounded-3xl border border-white/10 bg-white/5 p-14"

>

<div className="grid lg:grid-cols-2 gap-12 items-center">

{/* Left */}

<div>

<div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-5 py-2 rounded-full">

<ShieldCheck size={18}/>

Government Enterprise Platform

</div>

<h2 className="text-5xl font-bold mt-8 leading-tight">

Ready To Explore

<br/>

Smart Land Intelligence

Platform

</h2>

<p className="text-gray-300 text-lg mt-8 leading-8">

Access GIS intelligence, land records, analytics dashboards,
AI-powered prediction modules and enterprise reporting
through a unified government platform.

</p>

<div className="flex flex-wrap gap-5 mt-10">

<Link

to="/dashboard"

className="bg-[#16A34A] hover:bg-green-700 transition px-8 py-4 rounded-xl flex items-center gap-3 font-semibold"

>

Explore Dashboard

<ArrowRight size={20}/>

</Link>

<Link

to="/gis"

className="border border-white hover:bg-white hover:text-[#071A2D] transition px-8 py-4 rounded-xl flex items-center gap-3 font-semibold"

>

<Map size={20}/>

Open GIS

</Link>

</div>

</div>

{/* Right */}

<div className="grid grid-cols-2 gap-6">

<div className="bg-white text-[#071A2D] rounded-2xl p-8">

<Map className="text-green-600"/>

<h3 className="font-bold text-xl mt-5">

GIS Intelligence

</h3>

<p className="text-gray-500 mt-3">

Interactive mapping

and geospatial monitoring.

</p>

</div>

<div className="bg-white text-[#071A2D] rounded-2xl p-8">

<BarChart3 className="text-blue-600"/>

<h3 className="font-bold text-xl mt-5">

Analytics

</h3>

<p className="text-gray-500 mt-3">

Enterprise reporting

and visualization.

</p>

</div>

<div className="col-span-2 bg-green-600 rounded-2xl p-8">

<h3 className="text-3xl font-bold">

Unified Government

Decision Support

</h3>

<p className="text-green-100 mt-5 leading-8">

Designed for intelligent land monitoring,

GIS analytics,

AI prediction,

and strategic planning.

</p>

</div>

</div>

</div>

</motion.div>

</div>

</section>

)

}

export default CTASection;