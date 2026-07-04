import { FileText, Download, Sparkles } from "lucide-react";


const reports = [

{
title:"Land Utilization Report",
date:"July 2026",
type:"GIS Analytics"
},

{
title:"Mining Impact Report",
date:"July 2026",
type:"Coal Region"
},

{
title:"Environmental Analysis Report",
date:"June 2026",
type:"Risk Model"
},

{
title:"Development Planning Report",
date:"June 2026",
type:"AI Forecast"
}

];


function Reports(){


return(

<div className="bg-white rounded-xl shadow p-6 mt-10">


<div className="flex justify-between items-center">


<h2 className="text-2xl font-bold flex gap-3 items-center">

<FileText className="text-blue-600"/>

Government Reports

</h2>



<button className="bg-[#16A34A] text-white px-5 py-2 rounded-lg flex gap-2">


<Sparkles size={20}/>

Generate AI Report


</button>


</div>





<div className="grid grid-cols-2 gap-6 mt-8">


{

reports.map((item,index)=>(


<div

key={index}

className="border rounded-xl p-5 hover:shadow-lg transition"

>


<h3 className="font-bold text-lg">

{item.title}

</h3>


<p className="text-gray-500 mt-2">

{item.type}

</p>


<p className="text-sm text-gray-400">

{item.date}

</p>



<button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2">


<Download size={18}/>

Download PDF


</button>



</div>


))

}


</div>


</div>


)


}


export default Reports;