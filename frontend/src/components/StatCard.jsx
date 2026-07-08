import { motion } from "framer-motion";

import {

TrendingUp

} from "lucide-react";



function StatCard({

title,

value,

icon,

percentage

}){



return(



<motion.div


initial={{
opacity:0,
y:30
}}


animate={{
opacity:1,
y:0
}}


whileHover={{

scale:1.05,

y:-5

}}


className="
bg-white 
rounded-2xl 
shadow-lg 
p-6 
border
hover:shadow-2xl
transition
"


>





{/* Top */}



<div className="flex justify-between items-start">



<div>



<p className="text-gray-500 text-sm">


{title}


</p>





<h1 className="text-4xl font-bold mt-3 text-[#071A2D]">


{value}


</h1>




</div>





<div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">



{icon}



</div>




</div>









{/* Growth */}



<div className="flex items-center gap-2 mt-6 text-green-600">



<TrendingUp size={18}/>



<span className="font-semibold text-sm">



{percentage} Growth



</span>




</div>









{/* Progress */}



<div className="w-full bg-gray-200 rounded-full h-2 mt-5">



<motion.div


initial={{width:0}}


animate={{width:"80%"}}


transition={{

duration:1.5

}}


className="bg-[#16A34A] h-2 rounded-full"


/>



</div>






</motion.div>


)


}



export default StatCard;