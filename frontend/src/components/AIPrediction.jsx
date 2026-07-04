import { Brain, Activity, ShieldCheck } from "lucide-react";


function AIPrediction(){


return(

<div className="bg-white rounded-xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold mb-6 flex gap-3 items-center">

<Brain className="text-blue-600"/>

AI Land Prediction Engine

</h2>



<div className="grid grid-cols-3 gap-6">



<div className="border rounded-xl p-5">


<Activity 
className="text-green-600"
/>


<p className="text-gray-500 mt-3">

Suitability Score

</p>


<h1 className="text-3xl font-bold">

94.7%

</h1>


</div>





<div className="border rounded-xl p-5">


<ShieldCheck
className="text-blue-600"
/>


<p className="text-gray-500 mt-3">

Risk Analysis

</p>


<h1 className="text-3xl font-bold text-green-600">

LOW

</h1>


</div>





<div className="border rounded-xl p-5">


<Brain
className="text-purple-600"
/>


<p className="text-gray-500 mt-3">

AI Confidence

</p>


<h1 className="text-3xl font-bold">

91%

</h1>


</div>



</div>





<div className="mt-8 bg-green-50 p-5 rounded-xl">


<h3 className="font-bold text-green-700">

AI Recommendation

</h3>


<p className="mt-2">

This government land parcel is highly suitable for future 
industrial and infrastructure development.

</p>


</div>




</div>


)

}


export default AIPrediction;