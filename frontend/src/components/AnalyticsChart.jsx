import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const data = [

  {
    name:"Coal",
    value:70
  },

  {
    name:"Forest",
    value:45
  },

  {
    name:"Govt Land",
    value:90
  },

  {
    name:"Unused",
    value:30
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
/>


</BarChart>


</ResponsiveContainer>


</div>

)

}


export default AnalyticsChart;