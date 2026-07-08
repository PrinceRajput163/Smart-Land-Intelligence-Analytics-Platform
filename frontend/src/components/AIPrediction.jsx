import { Brain, TrendingUp, AlertTriangle } from "lucide-react";


function AIPrediction(){


return(

<div className="bg-white rounded-xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

<Brain/>

AI Land Prediction

</h2>



<div className="grid grid-cols-3 gap-6">


<div className="p-5 bg-green-100 rounded-xl">

<TrendingUp 
size={35}
/>

<h3 className="font-bold mt-3">
Development Growth
</h3>

<p className="text-3xl font-bold mt-2">

87%

</p>

</div>



<div className="p-5 bg-yellow-100 rounded-xl">

<AlertTriangle
size={35}
/>

<h3 className="font-bold mt-3">

Mining Risk Zone

</h3>


<p className="text-3xl font-bold mt-2">

Medium

</p>

</div>



<div className="p-5 bg-blue-100 rounded-xl">


<Brain
size={35}
/>


<h3 className="font-bold mt-3">

AI Confidence

</h3>


<p className="text-3xl font-bold mt-2">

94%

</p>


</div>


</div>


</div>


)


}


export default AIPrediction;