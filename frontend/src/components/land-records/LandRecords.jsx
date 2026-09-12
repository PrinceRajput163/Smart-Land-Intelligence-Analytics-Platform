import { useState } from "react";

import { landRecords } from "../../data/dummyData";

import {
Search,
Database,
Download,
Filter,
MapPin
} from "lucide-react";

function LandRecords(){

const [search,setSearch]=useState("");

const filteredData=landRecords.filter(

(item)=>

item.location.toLowerCase().includes(search.toLowerCase()) ||

item.id.toLowerCase().includes(search.toLowerCase())

);

return(

<div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8 mt-6 lg:mt-10">

{/* Header */}

<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

<div>

<p className="uppercase tracking-widest text-emerald-400 font-semibold">

Government Database

</p>

<h2 className="text-2xl lg:text-3xl font-bold text-slate-100 mt-2">

GLIS Land Records

</h2>

<p className="text-slate-400 mt-2">

Centralized Government Land Information System

</p>

</div>

<div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

<button className="flex items-center justify-center gap-2 bg-slate-800/80 text-slate-100 px-5 py-3 rounded-xl w-full sm:w-auto hover:bg-slate-700 transition">

<Filter size={18}/>

Filter

</button>

<button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl w-full sm:w-auto">

<Download size={18}/>

Export

</button>

</div>

</div>

{/* Search */}

<div className="mt-8 flex items-center border border-slate-700 bg-slate-800/80 rounded-lg px-4 sm:px-5">

<Search className="text-gray-500"/>

<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search by Land ID or Location"

className="flex-1 p-4 outline-none bg-transparent text-slate-100 placeholder-slate-400"

/>

</div>

{/* Summary */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
<Database className="text-blue-600 mb-2"/>
<p className="text-xs font-semibold text-slate-400 uppercase">
Records
</p>
<h2 className="text-2xl font-bold text-slate-100 mt-1">
{landRecords.length}
</h2>
</div>

<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
<MapPin className="text-emerald-500 mb-2"/>
<p className="text-xs font-semibold text-slate-400 uppercase">
Districts
</p>
<h2 className="text-2xl font-bold text-slate-100 mt-1">
28
</h2>
</div>

<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
<div className="text-yellow-500 mb-2">●</div>
<p className="text-xs font-semibold text-slate-400 uppercase">
Verified
</p>
<h2 className="text-2xl font-bold text-slate-100 mt-1">
98%
</h2>
</div>

<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
<div className="text-red-500 mb-2">■</div>
<p className="text-xs font-semibold text-slate-400 uppercase">
Pending
</p>
<h2 className="text-2xl font-bold text-slate-100 mt-1">
12
</h2>
</div>

</div>

{/* Table */}

<div className="overflow-x-auto mt-10">

<table className="min-w-[1000px] w-full">

<thead>

<tr className="bg-slate-800 text-slate-200 font-semibold text-left">

<th className="p-4">Land ID</th>

<th>Location</th>

<th>District</th>

<th>Owner</th>

<th>Area</th>

<th>Category</th>

<th>Risk</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

filteredData.map((item)=>(

<tr

key={item.id}

className="border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors text-slate-200 font-medium"

>

<td className="p-4 font-bold">

{item.id}

</td>

<td>{item.location}</td>

<td>{item.district}</td>

<td>{item.owner}</td>

<td>{item.area}</td>

<td>{item.category}</td>

<td>

<span

className={`px-3 py-1 rounded-full text-sm

${

item.risk==="High"

?

"bg-red-100 text-red-700"

:

item.risk==="Medium"

?

"bg-yellow-100 text-yellow-700"

:

"bg-green-100 text-green-700"

}`}

>

{item.risk}

</span>

</td>

<td>

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

{item.status}

</span>

</td>

</tr>

))

}

</tbody>

</table>

</div>

{/* Footer */}

<div className="flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center mt-8">

<p className="text-slate-400">

Showing

<strong className="mx-2">

{filteredData.length}

</strong>

records

</p>

<div className="flex justify-center lg:justify-end gap-3 flex-wrap">

<button className="px-5 py-2 rounded-xl bg-slate-800/80 text-slate-100 hover:bg-slate-700 transition">

Previous

</button>

<button className="px-5 py-2 rounded-xl bg-blue-600 text-white">

1

</button>

<button className="px-5 py-2 rounded-xl bg-slate-800/80 text-slate-100 hover:bg-slate-700 transition">

Next

</button>

</div>

</div>

</div>

)

}

export default LandRecords;