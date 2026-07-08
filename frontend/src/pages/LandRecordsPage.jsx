import { useState } from "react";

import { landRecords } from "../data/dummyData";


function LandRecords(){


const [search,setSearch]=useState("");



const filteredData = landRecords.filter(

(item)=>

item.location

.toLowerCase()

.includes(search.toLowerCase())

);



return(


<div className="bg-white rounded-xl shadow p-6 mt-10">



<div className="flex justify-between items-center">


<h2 className="text-2xl font-bold">

GLIS Land Records

</h2>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search location..."

className="border px-4 py-2 rounded-lg"

/>


</div>




<table className="w-full mt-6">


<thead>


<tr className="bg-gray-100">


<th className="p-3">

Land ID

</th>


<th>

Location

</th>


<th>

District

</th>


<th>

Owner

</th>


<th>

Area(Ha)

</th>


<th>

Category

</th>


<th>

Risk

</th>


<th>

Status

</th>


</tr>


</thead>



<tbody>


{


filteredData.map((item)=>(



<tr 

key={item.id}

className="border-b text-center"


>


<td className="p-3 font-bold">


{item.id}


</td>


<td>{item.location}</td>


<td>{item.district}</td>


<td>{item.owner}</td>


<td>{item.area}</td>


<td>{item.category}</td>


<td>


<span

className={`px-3 py-1 rounded-full

${

item.risk==="High"

?

"bg-red-100 text-red-700"

:

"bg-green-100 text-green-700"

}`}

>


{item.risk}


</span>


</td>



<td>


{item.status}


</td>



</tr>



))

}


</tbody>


</table>


</div>


)

}


export default LandRecords;