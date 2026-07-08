import {

  PieChart,
  Pie,
  Cell,

  BarChart,
  Bar,

  LineChart,
  Line,

  AreaChart,
  Area,

  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer

} from "recharts";



// Land Distribution Data

const landDistribution = [

  {
    name:"Government Land",
    value:45
  },

  {
    name:"Private Land",
    value:25
  },

  {
    name:"Forest Area",
    value:20
  },

  {
    name:"Mining Zone",
    value:10
  }

];



// GIS Zone Colors

const COLORS = [

  "#16A34A", // Government Green

  "#2563EB", // Private Blue

  "#065F46", // Forest Dark Green

  "#FACC15"  // Mining Yellow

];




// Region Data

const regionData=[

  {
    region:"Jharkhand",
    land:80
  },

  {
    region:"Odisha",
    land:65
  },

  {
    region:"MP",
    land:75
  },

  {
    region:"CG",
    land:90
  }

];




// Mining Growth

const growthData=[

  {
    year:"2022",
    value:40
  },

  {
    year:"2023",
    value:55
  },

  {
    year:"2024",
    value:70
  },

  {
    year:"2025",
    value:85
  }

];




// Infrastructure

const infraData=[

  {
    year:"2022",
    score:50
  },

  {
    year:"2023",
    score:65
  },

  {
    year:"2024",
    score:78
  },

  {
    year:"2025",
    score:90
  }

];





function AnalyticsChart(){


return(


<div className="mt-10">



<h1 className="text-3xl font-bold mb-8">

Land Intelligence Analytics

</h1>




<div className="grid grid-cols-2 gap-8">





{/* PIE CHART */}


<div className="bg-white rounded-xl shadow p-6">


<h2 className="font-bold mb-5">

Land Distribution

</h2>



<ResponsiveContainer width="100%" height={280}>


<PieChart>


<Pie

data={landDistribution}

dataKey="value"

nameKey="name"

outerRadius={90}

label

>


{

landDistribution.map((item,index)=>(


<Cell

key={index}

fill={COLORS[index]}

/>


))

}


</Pie>



<Tooltip/>


<Legend/>



</PieChart>


</ResponsiveContainer>



</div>









{/* BAR CHART */}


<div className="bg-white rounded-xl shadow p-6">


<h2 className="font-bold mb-5">

Region Wise Land Availability

</h2>



<ResponsiveContainer width="100%" height={280}>


<BarChart data={regionData}>


<XAxis dataKey="region"/>


<YAxis/>


<Tooltip/>



<Bar

dataKey="land"

fill="#2563EB"

radius={[10,10,0,0]}


/>



</BarChart>


</ResponsiveContainer>



</div>









{/* LINE CHART */}


<div className="bg-white rounded-xl shadow p-6">


<h2 className="font-bold mb-5">

Mining Growth Potential

</h2>



<ResponsiveContainer width="100%" height={280}>


<LineChart data={growthData}>


<XAxis dataKey="year"/>


<YAxis/>


<Tooltip/>




<Line

type="monotone"

dataKey="value"

stroke="#16A34A"

strokeWidth={4}

/>



</LineChart>


</ResponsiveContainer>



</div>









{/* AREA CHART */}


<div className="bg-white rounded-xl shadow p-6">


<h2 className="font-bold mb-5">

Infrastructure Development

</h2>



<ResponsiveContainer width="100%" height={280}>


<AreaChart data={infraData}>


<defs>

<linearGradient id="infra" x1="0" y1="0" x2="0" y2="1">


<stop

offset="5%"

stopColor="#2563EB"

stopOpacity={0.8}

/>


<stop

offset="95%"

stopColor="#2563EB"

stopOpacity={0}

/>


</linearGradient>

</defs>



<XAxis dataKey="year"/>


<YAxis/>


<Tooltip/>




<Area

type="monotone"

dataKey="score"

stroke="#2563EB"

fill="url(#infra)"


/>



</AreaChart>


</ResponsiveContainer>



</div>





</div>


</div>


)

}


export default AnalyticsChart;