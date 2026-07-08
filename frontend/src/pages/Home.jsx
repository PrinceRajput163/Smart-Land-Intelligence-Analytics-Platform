import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {

Brain,
Map,
Database,
Building2,
Leaf,
ShieldCheck,
Activity,
ArrowRight

} from "lucide-react";




function Home(){



const features=[


{
title:"AI Land Intelligence",
icon:<Brain/>
},


{
title:"GIS Mapping System",
icon:<Map/>
},


{
title:"Ownership Analytics",
icon:<Database/>
},


{
title:"Infrastructure Planning",
icon:<Building2/>
},


{
title:"Environmental Monitoring",
icon:<Leaf/>
},


{
title:"Decision Support System",
icon:<ShieldCheck/>
}


];




return(



<div className="min-h-screen bg-gray-50">






{/* HERO */}



<section className="bg-[#071A2D] text-white px-20 py-24 overflow-hidden">



<div className="grid grid-cols-2 gap-10 items-center">







<motion.div


initial={{
opacity:0,
x:-50
}}


animate={{
opacity:1,
x:0
}}



>


<div className="inline-flex items-center gap-2 bg-green-500/20 px-5 py-2 rounded-full text-green-400 mb-6">


<Activity size={18}/>


AI GIS System Online


</div>






<h1 className="text-6xl font-bold leading-tight">


Smart Land Intelligence & Analytics Platform


</h1>






<p className="text-xl mt-6 text-gray-300">


AI powered GIS analytics system for land monitoring,
planning and intelligent decision making.


</p>







<div className="flex gap-5 mt-10">



<Link

to="/dashboard"

className="bg-[#16A34A] px-8 py-4 rounded-xl flex gap-2 items-center"


>


Explore Dashboard


<ArrowRight/>


</Link>






<Link

to="/analytics"

className="border px-8 py-4 rounded-xl"


>


View Analytics


</Link>





</div>





</motion.div>








{/* Dashboard Preview */}



<motion.div

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}


className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl"


>




<div className="bg-white text-black rounded-2xl p-6">



<h2 className="font-bold text-xl">


Live Land Monitoring


</h2>




<div className="grid grid-cols-2 gap-4 mt-6">



<div className="bg-green-100 p-5 rounded-xl">


Government Land


<h1 className="text-3xl font-bold">


52K+


</h1>



</div>






<div className="bg-yellow-100 p-5 rounded-xl">


Mining Zones


<h1 className="text-3xl font-bold">


342


</h1>



</div>





</div>






<div className="h-32 bg-blue-100 rounded-xl mt-6 flex items-center justify-center">


GIS MAP PREVIEW


</div>





</div>



</motion.div>





</div>


</section>









{/* STATS */}



<section className="grid grid-cols-4 gap-6 p-12">



{


[

"50K+ Land Parcels",

"120+ Mining Regions",

"95% AI Accuracy",

"24/7 Monitoring"



].map((item)=>(



<div className="bg-white shadow rounded-xl p-6 text-center">



<h2 className="text-3xl font-bold text-blue-600">


{item.split(" ")[0]}


</h2>


<p>


{item.substring(item.indexOf(" "))}


</p>



</div>



))


}




</section>








{/* FEATURES */}



<section className="grid grid-cols-3 gap-8 p-12">


{


features.map((item)=>(



<motion.div


whileHover={{
scale:1.05
}}


className="bg-white rounded-2xl shadow p-8"



>



<div className="text-blue-600">


{item.icon}


</div>



<h2 className="font-bold text-xl mt-5">


{item.title}


</h2>




</motion.div>



))


}




</section>






</div>


)


}




export default Home;