import {
Activity,
Database,
Brain,
Map,
ShieldCheck,
Server
} from "lucide-react";

const status=[

{
title:"AI Engine",
value:"ONLINE",
icon:<Brain size={30}/>,
color:"text-green-600",
bg:"bg-green-50"
},

{
title:"GIS Server",
value:"ACTIVE",
icon:<Map size={30}/>,
color:"text-blue-600",
bg:"bg-blue-50"
},

{
title:"Database",
value:"CONNECTED",
icon:<Database size={30}/>,
color:"text-cyan-600",
bg:"bg-cyan-50"
},

{
title:"Security",
value:"PROTECTED",
icon:<ShieldCheck size={30}/>,
color:"text-purple-600",
bg:"bg-purple-50"
},

{
title:"Cloud Services",
value:"RUNNING",
icon:<Server size={30}/>,
color:"text-orange-600",
bg:"bg-orange-50"
},

{
title:"Monitoring",
value:"24×7",
icon:<Activity size={30}/>,
color:"text-red-600",
bg:"bg-red-50"
}

];

function SystemStatusSection(){

return(

<section className="py-20 bg-white">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<p className="uppercase tracking-widest text-green-600 font-semibold">

Platform Status

</p>

<h2 className="text-4xl font-bold text-[#071A2D] mt-3">

Enterprise System Health

</h2>

<p className="text-gray-500 mt-4">

Live operational status of platform infrastructure and services.

</p>

</div>

<div className="grid lg:grid-cols-3 gap-8 mt-14">

{

status.map((item,index)=>(

<div
key={index}
className="border rounded-2xl shadow bg-white p-7 hover:shadow-xl transition"
>

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

{item.title}

</p>

<h2 className="text-2xl font-bold mt-3">

{item.value}

</h2>

</div>

<div className={`${item.bg} ${item.color} p-4 rounded-2xl`}>

{item.icon}

</div>

</div>

<div className="mt-6">

<div className="w-full h-2 rounded-full bg-gray-200">

<div className="w-full h-2 rounded-full bg-[#16A34A]"></div>

</div>

</div>

</div>

))

}

</div>

</div>

</section>

)

}

export default SystemStatusSection;