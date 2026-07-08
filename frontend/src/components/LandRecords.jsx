import { useState } from "react";

import {

Search,
Database,
Filter

} from "lucide-react";



const records=[


{
id:"GLIS-1001",
location:"Dhanbad",
district:"Jharkhand",
owner:"Government",
area:"240 Ha",
category:"Mining",
status:"Available",
risk:"Low"
},


{
id:"GLIS-1002",
location:"Korba",
district:"Chhattisgarh",
owner:"Government",
area:"520 Ha",
category:"Coal",
status:"Active",
risk:"Medium"
},


{
id:"GLIS-1003",
location:"Singrauli",
district:"Madhya Pradesh",
owner:"Private",
area:"310 Ha",
category:"Industrial",
status:"Review",
risk:"Low"
},


{
id:"GLIS-1004",
location:"Talcher",
district:"Odisha",
owner:"Government",
area:"600 Ha",
category:"Forest",
status:"Restricted",
risk:"High"
},


{
id:"GLIS-1005",
location:"Bokaro",
district:"Jharkhand",
owner:"Government",
area:"430 Ha",
category:"Development",
status:"Available",
risk:"Low"
}


];




function LandRecords(){



const [search,setSearch]=useState("");



const filtered=records.filter(

item=>

item.location

.toLowerCase()

.includes(search.toLowerCase())

||

item.id

.toLowerCase()

.includes(search.toLowerCase())

);




return(


<div className="bg-white rounded-2xl shadow p-6 mt-10">






{/* Header */}


<div className="flex justify-between items-center">



<h2 className="text-2xl font-bold flex gap-3">


<Database/>


GLIS Land Records Database


</h2>







<div className="flex gap-3">





<div className="flex items-center bg-gray-100 px-4 rounded-xl">


<Search size={18}/>



<input

placeholder="Search Land ID / Location"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="bg-transparent p-2 outline-none"


/>


</div>






<button className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl">


<Filter size={18}/>


Filter


</button>




</div>



</div>









<table className="w-full mt-8">



<thead>


<tr className="bg-gray-100 text-left">


<th className="p-4">

Land ID

</th>


<th>

Location

</th>


<th>

Owner

</th>


<th>

Area

</th>


<th>

Category

</th>


<th>

Status

</th>


<th>

Risk

</th>



</tr>


</thead>







<tbody>


{


filtered.map((item)=>(



<tr

key={item.id}

className="border-b hover:bg-gray-50"


>



<td className="p-4 font-bold">


{item.id}


</td>



<td>


{item.location}


</td>



<td>


{item.owner}


</td>



<td>


{item.area}


</td>



<td>


{item.category}


</td>





<td>


<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">


{item.status}


</span>



</td>





<td>


<span

className={`px-3 py-1 rounded-full

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



</tr>



))


}



</tbody>




</table>








{/* Pagination */}



<div className="flex justify-end gap-3 mt-6">



<button className="px-4 py-2 bg-gray-100 rounded-lg">


Previous


</button>



<button className="px-4 py-2 bg-blue-600 text-white rounded-lg">


1


</button>



<button className="px-4 py-2 bg-gray-100 rounded-lg">


Next


</button>



</div>






</div>


)


}



export default LandRecords;