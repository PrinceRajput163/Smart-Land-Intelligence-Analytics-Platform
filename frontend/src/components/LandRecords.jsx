const records = [

{
id:"GLIS-1001",
location:"Dhanbad",
owner:"Government",
area:"240 Ha",
category:"Coal Zone",
risk:"Low",
status:"Available"
},

{
id:"GLIS-1002",
location:"Ranchi",
owner:"Private",
area:"120 Ha",
category:"Forest",
risk:"Medium",
status:"Restricted"
},

{
id:"GLIS-1003",
location:"Korba",
owner:"Government",
area:"340 Ha",
category:"Mining",
risk:"Low",
status:"Active"
},

{
id:"GLIS-1004",
location:"Singrauli",
owner:"Government",
area:"520 Ha",
category:"Industrial",
risk:"High",
status:"Review"
}

];


function LandRecords(){


return(

<div className="bg-white rounded-xl shadow p-6 mt-10">


<div className="flex justify-between items-center">


<h2 className="text-2xl font-bold">

GLIS Land Records

</h2>


<input

placeholder="Search land..."

className="border px-4 py-2 rounded-lg"

/>


</div>



<table className="w-full mt-6">


<thead>


<tr className="bg-gray-100">


<th className="p-3 text-left">
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
Risk
</th>

<th>
Status
</th>


</tr>


</thead>



<tbody>


{

records.map((item)=>(


<tr 
key={item.id}
className="border-b text-center"
>


<td className="p-3 font-semibold">

{item.id}

</td>


<td>{item.location}</td>

<td>{item.owner}</td>

<td>{item.area}</td>

<td>{item.category}</td>


<td>


<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">


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


)

}


export default LandRecords;