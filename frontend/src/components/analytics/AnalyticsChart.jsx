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
ResponsiveContainer,
CartesianGrid
} from "recharts";

const landDistribution=[

{name:"Government",value:45},
{name:"Private",value:25},
{name:"Forest",value:20},
{name:"Mining",value:10}

];

const COLORS=[

"#16A34A",
"#2563EB",
"#065F46",
"#FACC15"

];

const regionData=[

{region:"Noida",land:80},
{region:"Greater Noida",land:65},
{region:"Jewar",land:75},
{region:"Dadri",land:90}

];

const growthData=[

{year:"2022",value:40},
{year:"2023",value:55},
{year:"2024",value:70},
{year:"2025",value:85}

];

const infraData=[

{year:"2022",score:50},
{year:"2023",score:65},
{year:"2024",score:78},
{year:"2025",score:90}

];

function AnalyticsChart(){

return(

<div className="space-y-6 lg:space-y-8 mt-6 lg:mt-10">

<div>

<p className="uppercase tracking-widest text-emerald-400 font-semibold">

Government Analytics

</p>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mt-2">

National Land Intelligence Dashboard

</h1>

<p className="text-slate-400 mt-2">

Real-time analytical insights for intelligent land management.

</p>

</div>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">

{/* PIE */}

<div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-md p-4 sm:p-6">

<h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-slate-100">

Land Distribution

</h2>

<ResponsiveContainer width="100%" height= {320}>

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

{/* BAR */}

<div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-md p-6">

<h2 className="text-xl font-semibold mb-6 text-slate-100">

Region Wise Land Availability

</h2>

<ResponsiveContainer width="100%" height={320}>

<BarChart data={regionData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="region"/>

<YAxis stroke="#94a3b8"/>

<Tooltip/>

<Bar

dataKey="land"

fill="#2563EB"

radius={[10,10,0,0]}

/>

</BarChart>

</ResponsiveContainer>

</div>

{/* LINE */}

<div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-md p-6">

<h2 className="text-xl font-semibold mb-6 text-slate-100">

Mining Growth Trend

</h2>

<ResponsiveContainer width="100%" height={320}>

<LineChart data={growthData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="year"/>

<YAxis stroke="#94a3b8"/>

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

{/* AREA */}

<div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-md p-6">

<h2 className="text-xl font-semibold mb-6 text-slate-100">

Infrastructure Development

</h2>

<ResponsiveContainer width="100%" height={320}>

<AreaChart data={infraData}>

<defs>

<linearGradient id="infra" x1="0" y1="0" x2="0" y2="1">

<stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>

<stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>

</linearGradient>

</defs>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="year"/>

<YAxis stroke="#94a3b8"/>

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