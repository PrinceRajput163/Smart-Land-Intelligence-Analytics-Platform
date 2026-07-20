import { useState } from "react";

import { landRecords } from "../data/dummyData";

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

<div className="bg-white rounded-3xl border shadow-lg p-8 mt-10">

{/* Header */}

<div className="flex justify-between items-center">

<div>

<p className="uppercase tracking-widest text-green-600 font-semibold">

Government Database

</p>

<h2 className="text-3xl font-bold text-[#071A2D] mt-2">

GLIS Land Records

</h2>

<p className="text-gray-500 mt-2">

Centralized Government Land Information System

</p>

</div>

<div className="flex gap-3">

<button className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-xl">

<Filter size={18}/>

Filter

</button>

<button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl">

<Download size={18}/>

Export

</button>

</div>

</div>

{/* Search */}

<div className="mt-8 flex items-center border rounded-2xl px-5">

<Search className="text-gray-500"/>

<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search by Land ID or Location"

className="flex-1 p-4 outline-none"

/>

</div>

{/* Summary */}

<div className="grid grid-cols-4 gap-6 mt-8">

<div className="bg-blue-50 rounded-2xl p-5">

<Database className="text-blue-600"/>

<p className="text-gray-500 mt-3">

Records

</p>

<h2 className="text-3xl font-bold">

{landRecords.length}

</h2>

</div>

<div className="bg-green-50 rounded-2xl p-5">

<MapPin className="text-green-600"/>

<p className="text-gray-500 mt-3">

Districts

</p>

<h2 className="text-3xl font-bold">

28

</h2>

</div>

<div className="bg-yellow-50 rounded-2xl p-5">

<p className="text-gray-500">

Verified

</p>

<h2 className="text-3xl font-bold">

98%

</h2>

</div>

<div className="bg-red-50 rounded-2xl p-5">

<p className="text-gray-500">

Pending

</p>

<h2 className="text-3xl font-bold">

12

</h2>

</div>

</div>

{/* Table */}

<div className="overflow-x-auto mt-10">

<table className="w-full">

<thead>

<tr className="bg-[#071A2D] text-white">

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

className="border-b hover:bg-gray-50 transition"

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

<div className="flex justify-between items-center mt-8">

<p className="text-gray-500">

Showing

<strong className="mx-2">

{filteredData.length}

</strong>

records

</p>

<div className="flex gap-3">

<button className="px-5 py-2 rounded-xl bg-gray-100">

Previous

</button>

<button className="px-5 py-2 rounded-xl bg-blue-600 text-white">

1

</button>

<button className="px-5 py-2 rounded-xl bg-gray-100">

Next

</button>

</div>

</div>

</div>

)

}

export default LandRecords;