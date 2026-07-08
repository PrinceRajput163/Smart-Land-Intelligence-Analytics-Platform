import { motion } from "framer-motion";
import { Map } from "lucide-react";


function Loader(){


return(

<div className="h-screen bg-[#071A2D] flex items-center justify-center text-white">


<div className="text-center">


<motion.div

animate={{
rotate:360
}}

transition={{
duration:2,
repeat:Infinity
}}

className="flex justify-center"

>


<Map size={60}/>


</motion.div>



<h1 className="text-3xl font-bold mt-6">

Smart Land Intelligence

</h1>


<p className="text-gray-300 mt-3">

Initializing GIS Analytics Engine...

</p>


</div>


</div>

)

}


export default Loader;