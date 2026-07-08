import {

Brain,
Activity,
ShieldAlert,
TrendingUp,
Database,
Map

} from "lucide-react";


import { motion } from "framer-motion";



function AIPrediction(){



const steps=[

"GIS Data Collection",

"Feature Extraction",

"ML Risk Analysis",

"Prediction Generated"

];




return(


<div className="mt-10 space-y-8">






{/* Prediction Header */}


<div className="bg-[#071A2D] text-white rounded-2xl p-8 shadow">



<div className="flex justify-between">



<div>


<h2 className="text-3xl font-bold flex gap-3">


<Brain/>


AI Land Suitability Prediction


</h2>



<p className="text-gray-300 mt-3">


Machine Learning based development intelligence system


</p>


</div>





<motion.div

animate={{scale:[1,1.2,1]}}

transition={{

repeat:Infinity,

duration:2

}}

>


<Activity size={45}/>


</motion.div>



</div>





</div>









{/* Scores */}


<div className="grid grid-cols-3 gap-6">






<div className="bg-white rounded-xl shadow p-6">



<Brain className="text-blue-600"/>



<p className="mt-5 text-gray-500">

Model Accuracy

</p>



<h1 className="text-4xl font-bold">


94.7%


</h1>



</div>







<div className="bg-white rounded-xl shadow p-6">


<TrendingUp className="text-green-600"/>


<p className="mt-5 text-gray-500">

Confidence Score

</p>


<h1 className="text-4xl font-bold">


91%


</h1>



</div>








<div className="bg-white rounded-xl shadow p-6">


<ShieldAlert className="text-yellow-500"/>


<p className="mt-5 text-gray-500">


Risk Level


</p>


<h1 className="text-4xl font-bold">


Low


</h1>


</div>





</div>








{/* Result */}


<div className="bg-green-100 rounded-xl p-8">



<h2 className="text-2xl font-bold">


Prediction Result


</h2>



<p className="text-3xl mt-5 text-green-700 font-bold">


Highly Suitable For Development


</p>



</div>









{/* Pipeline */}


<div className="bg-white rounded-xl shadow p-6">


<h2 className="text-2xl font-bold mb-6">


ML Processing Pipeline


</h2>





<div className="grid grid-cols-4 gap-5">



{

steps.map((item,index)=>(


<div

key={index}

className="bg-gray-100 rounded-xl p-5 text-center"


>


{


index===0 ? <Database/> :

index===1 ? <Map/> :

index===2 ? <Brain/> :

<Activity/>

}



<p className="mt-4 font-semibold">


{item}


</p>



</div>



))


}




</div>



</div>





</div>

)


}



export default AIPrediction;