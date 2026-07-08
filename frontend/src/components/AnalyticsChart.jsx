import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";


const data = [

  {
    name:"Coal",
    value:70,
    color:"#FACC15"
  },

  {
    name:"Forest",
    value:45,
    color:"#16A34A"
  },

  {
    name:"Govt Land",
    value:90,
    color:"#2563EB"
  },

  {
    name:"Unused",
    value:30,
    color:"#94A3B8"
  }

];


function AnalyticsChart(){


return (

<div className="bg-white rounded-xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold mb-5">

Land Usage Analytics

</h2>


<ResponsiveContainer width="100%" height={300}>


<BarChart data={data}>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar
dataKey="value"
radius={[10,10,0,0]}
>

{

data.map((item,index)=>(


<Cell

key={index}

fill={item.color}

/>


))

}


</Bar>


</BarChart>


</ResponsiveContainer>


</div>

)

}


export default AnalyticsChart;