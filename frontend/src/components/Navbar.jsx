import {
Search,
Bell,
ShieldCheck,
UserCircle,
Activity,
CalendarDays,
Clock,
ChevronRight
} from "lucide-react";

function Navbar(){

const today = new Date();

const date = today.toLocaleDateString("en-IN",{
day:"2-digit",
month:"long",
year:"numeric"
});

return(

<div className="space-y-4">

{/* Government Ribbon */}

<div className="bg-[#071A2D] text-white rounded-2xl px-6 py-3 flex justify-between items-center">

<div>

<p className="text-sm uppercase tracking-widest text-green-400">

Government Enterprise Platform

</p>

<h2 className="font-bold text-xl">

Smart Land Intelligence & Analytics Platform

</h2>

</div>

<div className="flex items-center gap-6">

<div className="flex items-center gap-2">

<CalendarDays size={18}/>

{date}

</div>

<div className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full">

<Activity size={18}/>

ONLINE

</div>

</div>

</div>

{/* Main Navbar */}

<div className="bg-white rounded-2xl shadow px-6 py-5 flex justify-between items-center">

{/* Left */}

<div>

<div className="flex items-center gap-2 text-gray-500">

Dashboard

<ChevronRight size={16}/>

Command Center

</div>

<h1 className="text-3xl font-bold text-[#071A2D] mt-2">

National Command Center

</h1>

</div>

{/* Search */}

<div className="hidden xl:flex items-center bg-gray-100 rounded-xl px-5 py-3 w-[420px]">

<Search size={20} className="text-gray-500"/>

<input

type="text"

placeholder="Search Land ID, District, Owner..."

className="bg-transparent outline-none ml-3 flex-1"

/>

</div>

{/* Right */}

<div className="flex items-center gap-4">

<div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl flex items-center gap-2">

<ShieldCheck size={18}/>

Secure

</div>

<div className="relative bg-gray-100 p-3 rounded-xl">

<Bell size={22}/>

<span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

3

</span>

</div>

<div className="flex items-center gap-3">

<UserCircle

size={42}

className="text-[#071A2D]"

/>

<div>

<h3 className="font-bold">

Administrator

</h3>

<p className="text-sm text-gray-500">

Government Officer

</p>

</div>

</div>

</div>

</div>

</div>

)

}

export default Navbar;