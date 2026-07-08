import { useState } from "react";

import {

Brain,
Send,
Sparkles

} from "lucide-react";

import { motion } from "framer-motion";



function AIAssistant(){


const [query,setQuery]=useState("");

const [result,setResult]=useState(false);



function analyze(){


if(query.trim() !== ""){


setResult(true);


}


}





return(


<div className="bg-white rounded-2xl shadow p-6 mt-10">





<h2 className="text-2xl font-bold flex gap-3 items-center">


<Brain className="text-blue-600"/>


AI Land Intelligence Assistant


</h2>





<p className="text-gray-500 mt-2">


Ask AI about land suitability, mining impact and development potential.


</p>







<div className="flex gap-3 mt-6">



<input

value={query}

onChange={(e)=>setQuery(e.target.value)}

placeholder="Example: Find suitable land in Jharkhand"

className="flex-1 border rounded-xl px-5 outline-none"


/>





<button

onClick={analyze}

className="bg-blue-600 text-white px-6 py-3 rounded-xl flex gap-2"


>


<Send size={18}/>


Analyze


</button>




</div>








{


result && (



<motion.div


initial={{

opacity:0,

y:20

}}


animate={{

opacity:1,

y:0

}}



className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200"


>





<h3 className="font-bold text-xl flex gap-2 text-green-700">


<Sparkles/>


AI Recommendation


</h3>





<div className="grid grid-cols-3 gap-5 mt-5">



<div>


<p className="text-gray-500">


Best Region


</p>



<h2 className="font-bold">


Dhanbad Region


</h2>



</div>







<div>


<p className="text-gray-500">


Suitability


</p>


<h2 className="font-bold">


94%


</h2>



</div>







<div>


<p className="text-gray-500">


Risk


</p>



<h2 className="font-bold text-green-600">


LOW


</h2>



</div>






</div>






<p className="mt-5">


Recommended for infrastructure and industrial development based on GIS parameters.


</p>





</motion.div>




)

}




</div>


)


}



export default AIAssistant;