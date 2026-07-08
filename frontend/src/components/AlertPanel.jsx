import {

AlertTriangle,
CheckCircle,
Bell,
Activity

} from "lucide-react";


import { motion } from "framer-motion";



function AlertPanel(){


const alerts=[

{
msg:"Restricted forest activity detected",
type:"High",
color:"red"
},

{
msg:"Mining zone boundary updated",
type:"Medium",
color:"yellow"
},

{
msg:"Government land verified",
type:"Low",
color:"green"
}

];



return(


<div className="bg-white rounded-2xl shadow p-6 mt-10">


<div className="flex justify-between items-center">


<h2 className="text-2xl font-bold flex gap-2">

<Bell className="text-blue-600"/>

Intelligence Alerts

</h2>



<div className="flex gap-2 text-green-600">


<Activity/>

Live


</div>



</div>





<div className="space-y-5 mt-6">


{

alerts.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

className="flex justify-between items-center bg-gray-50 p-5 rounded-xl"


>


<div className="flex gap-3">


{

item.color==="green"

?

<CheckCircle className="text-green-600"/>

:

<AlertTriangle className="text-red-600"/>


}



<p className="font-semibold">

{item.msg}

</p>


</div>





<span

className={

`
px-4 py-1 rounded-full text-sm

${

item.color==="red"

?

"bg-red-100 text-red-600"

:

item.color==="yellow"

?

"bg-yellow-100 text-yellow-600"

:

"bg-green-100 text-green-600"

}

`

}

>


{item.type}


</span>



</motion.div>


))

}



</div>


</div>


)


}


export default AlertPanel;