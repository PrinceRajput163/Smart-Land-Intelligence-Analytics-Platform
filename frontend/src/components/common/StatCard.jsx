import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

function StatCard({
title,
value,
icon,
percentage
}){

return(

<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

whileHover={{
y:-8,
scale:1.02
}}

transition={{duration:0.3}}

className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-md hover:shadow-2xl hover:shadow-slate-900/50 transition overflow-hidden text-slate-100"

>

<div className="h-2 bg-[#16A34A]"></div>

<div className="p-6">

<div className="flex justify-between items-start">

<div>

<p className="text-slate-400 uppercase text-xs tracking-widest">

{title}

</p>

<h2 className="text-4xl font-extrabold text-slate-100 mt-4">

{value}

</h2>

</div>

<div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center text-blue-400">

{icon}

</div>

</div>

<div className="mt-8">

<div className="flex justify-between text-sm">

<span className="text-slate-400">

Growth

</span>

<span className="font-semibold text-emerald-400 flex items-center gap-2">

<TrendingUp size={16}/>

{percentage}

</span>

</div>

<div className="w-full h-2 bg-slate-700 rounded-full mt-4">

<motion.div

initial={{width:0}}

animate={{width:"82%"}}

transition={{duration:1.5}}

className="h-2 bg-[#16A34A] rounded-full"

/>

</div>

</div>

</div>

</motion.div>

)

}

export default StatCard;