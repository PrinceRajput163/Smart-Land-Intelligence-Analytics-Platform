import {
FileText,
Download,
Brain,
CheckCircle,
Clock,
Leaf,
Calendar,
ShieldCheck
} from "lucide-react";

import { motion } from "framer-motion";

import { reportsData } from "../data/dummyData";

function Reports(){

const getIcon=(title)=>{

if(title.includes("Land")) return <FileText/>;

if(title.includes("Mining")) return <Leaf/>;

if(title.includes("Environmental")) return <Leaf/>;

return <Brain/>;

};

return(

<div className="space-y-8 mt-10">

{/* Header */}

<div className="bg-[#071A2D] rounded-3xl p-8 text-white">

<div className="flex justify-between items-center">

<div>

<p className="uppercase tracking-widest text-green-400">

Government Reports

</p>

<h1 className="text-4xl font-bold mt-2">

National Report Center

</h1>

<p className="text-gray-300 mt-3">

Official AI generated GIS intelligence reports for government authorities.

</p>

</div>

<button className="bg-[#16A34A] hover:bg-green-700 transition px-6 py-3 rounded-xl flex items-center gap-2">

<Brain size={20}/>

Generate Report

</button>

</div>

</div>

{/* Summary */}

<div className="grid lg:grid-cols-4 gap-6">

<div className="bg-white rounded-2xl border shadow p-6">

<FileText className="text-blue-600"/>

<h2 className="text-4xl font-bold mt-5">

{reportsData.length}

</h2>

<p className="text-gray-500 mt-2">

Total Reports

</p>

</div>

<div className="bg-white rounded-2xl border shadow p-6">

<CheckCircle className="text-green-600"/>

<h2 className="text-4xl font-bold mt-5">

98%

</h2>

<p className="text-gray-500 mt-2">

Accuracy

</p>

</div>

<div className="bg-white rounded-2xl border shadow p-6">

<Download className="text-purple-600"/>

<h2 className="text-4xl font-bold mt-5">

450

</h2>

<p className="text-gray-500 mt-2">

Downloads

</p>

</div>

<div className="bg-white rounded-2xl border shadow p-6">

<Calendar className="text-orange-600"/>

<h2 className="text-4xl font-bold mt-5">

2026

</h2>

<p className="text-gray-500 mt-2">

Current Session

</p>

</div>

{/* Reports */}

</div>

<div className="grid lg:grid-cols-2 gap-6">

{

reportsData.map((item,index)=>(

<motion.div

key={index}

whileHover={{y:-5}}

className="bg-white rounded-2xl border shadow-lg p-6"

>

<div className="flex justify-between">

<div>

<div className="text-blue-600">

{getIcon(item.title)}

</div>

<h2 className="text-2xl font-bold mt-4">

{item.title}

</h2>

<div className="flex items-center gap-2 mt-3 text-gray-500">

<Clock size={16}/>

{item.date}

</div>

</div>

<span

className={`h-fit px-4 py-2 rounded-full text-sm

${

item.status==="Completed"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}`}

>

{item.status}

</span>

</div>

<div className="mt-8 flex justify-between items-center">

<div className="flex items-center gap-2 text-green-600">

<ShieldCheck size={18}/>

Verified Report

</div>

<button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2">

<Download size={18}/>

Download PDF

</button>

</div>

</motion.div>

))

}

</div>

{/* Footer */}

<div className="bg-[#071A2D] rounded-2xl text-white p-6 flex justify-between items-center">

<div>

<h3 className="font-bold">

Government Digital Repository

</h3>

<p className="text-gray-300 mt-2">

All reports are digitally verified and securely stored.

</p>

</div>

<div className="bg-green-600 px-5 py-3 rounded-xl">

Repository Active

</div>

</div>

</div>

)

}

export default Reports;