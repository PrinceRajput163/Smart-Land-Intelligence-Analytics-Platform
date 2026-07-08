import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Brain,
  Map,
  Database,
  Building2,
  Leaf,
  ShieldCheck
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
title:"Government Decision Support",
icon:<ShieldCheck/>
}

];



return(

<div className="min-h-screen bg-gray-50">



{/* Hero */}


<section className="bg-[#071A2D] text-white px-20 py-24">



<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

>


<h1 className="text-5xl font-bold max-w-4xl">


Smart Land Intelligence & Analytics Platform


</h1>



<p className="text-xl mt-6 max-w-3xl text-gray-300">


AI-powered GIS analytics platform for intelligent government
land monitoring, planning and decision making.


</p>




<div className="flex gap-5 mt-10">


<Link

to="/dashboard"

className="bg-[#16A34A] px-6 py-3 rounded-xl"

>


Explore Dashboard


</Link>



<Link

to="/analytics"

className="border px-6 py-3 rounded-xl"

>


View Analytics


</Link>


</div>



</motion.div>


</section>





{/* Stats */}


<section className="grid grid-cols-4 gap-6 p-10">


{

[

"50K+ Land Parcels",

"120+ Mining Regions",

"95% Prediction Accuracy",

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






{/* Features */}


<section className="grid grid-cols-3 gap-8 p-10">


{

features.map((item)=>(


<div

className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition"


>


<div className="text-blue-600">


{item.icon}


</div>


<h2 className="font-bold text-xl mt-5">


{item.title}


</h2>


</div>


))

}



</section>



</div>


)


}


export default Home;