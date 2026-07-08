import {

Search,
Bell,
ShieldCheck,
UserCircle,
Activity

} from "lucide-react";



function Navbar(){


return(


<div className="bg-white/80 backdrop-blur-xl shadow rounded-2xl px-6 py-4 flex items-center justify-between">



{/* Left Section */}


<div>


<h1 className="text-2xl font-bold text-[#071A2D]">


Smart Land Intelligence


</h1>


<p className="text-sm text-gray-500">


Government GIS Analytics Command Center


</p>


</div>







{/* Search */}


<div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-xl w-96">


<Search

size={20}

className="text-gray-500"

/>



<input

type="text"

placeholder="Search land ID, district, mining zone..."

className="bg-transparent outline-none w-full text-sm"


/>



</div>








{/* Right Section */}


<div className="flex items-center gap-5">





{/* Status */}


<div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl">


<Activity size={18}/>


<span className="text-sm font-semibold">


System Online


</span>


</div>






{/* Security */}


<div className="bg-blue-100 p-3 rounded-xl text-blue-600">


<ShieldCheck size={22}/>


</div>






{/* Notification */}


<div className="relative bg-gray-100 p-3 rounded-xl">


<Bell size={22}/>


<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">


3


</span>


</div>







{/* Profile */}


<div className="flex items-center gap-3">


<UserCircle

size={36}

className="text-[#071A2D]"


/>


<div>


<h3 className="font-bold text-sm">


Admin


</h3>


<p className="text-xs text-gray-500">


GIS Officer


</p>


</div>



</div>




</div>




</div>


)


}



export default Navbar;