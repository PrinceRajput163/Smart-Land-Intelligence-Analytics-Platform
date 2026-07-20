import {
Building2,
Phone,
Mail,
MapPin,
ShieldCheck,
Database,
Brain,
Globe
} from "lucide-react";

function FooterSection(){

return(

<footer className="bg-[#071A2D] text-white">

<div className="max-w-7xl mx-auto px-8 py-16">

<div className="grid lg:grid-cols-4 gap-10">

{/* Platform */}

<div>

<div className="flex items-center gap-3">

<div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center">

<Building2 size={28}/>

</div>

<div>

<h2 className="text-2xl font-bold">

Smart Land Intelligence

</h2>

<p className="text-gray-400">

Government GIS Platform

</p>

</div>

</div>

<p className="text-gray-300 mt-6 leading-8">

Enterprise platform for intelligent land monitoring,
GIS analytics,
AI prediction,
government reporting
and strategic decision support.

</p>

<div className="flex gap-4 mt-8">

<div className="bg-white/10 p-3 rounded-xl">

<Brain/>

</div>

<div className="bg-white/10 p-3 rounded-xl">

<Database/>

</div>

<div className="bg-white/10 p-3 rounded-xl">

<ShieldCheck/>

</div>

<div className="bg-white/10 p-3 rounded-xl">

<Globe/>

</div>

</div>

</div>

{/* Quick Links */}

<div>

<h2 className="text-xl font-bold">

Quick Links

</h2>

<div className="space-y-4 mt-6 text-gray-300">

<p>Home</p>

<p>Dashboard</p>

<p>GIS Intelligence</p>

<p>Analytics</p>

<p>Land Records</p>

<p>Reports</p>

<p>Settings</p>

</div>

</div>

{/* Government Services */}

<div>

<h2 className="text-xl font-bold">

Platform Services

</h2>

<div className="space-y-4 mt-6 text-gray-300">

<p>GIS Monitoring</p>

<p>AI Prediction</p>

<p>Land Verification</p>

<p>Spatial Analytics</p>

<p>Government Reports</p>

<p>Decision Support</p>

<p>Database Management</p>

</div>

</div>

{/* Contact */}

<div>

<h2 className="text-xl font-bold">

Contact Information

</h2>

<div className="space-y-5 mt-6">

<div className="flex gap-3">

<MapPin className="text-green-400"/>

<div>

<p>National Informatics Centre</p>

<p className="text-gray-400">

New Delhi, India

</p>

</div>

</div>

<div className="flex gap-3">

<Phone className="text-green-400"/>

<div>

<p>1800-000-0000</p>

<p className="text-gray-400">

Help Desk

</p>

</div>

</div>

<div className="flex gap-3">

<Mail className="text-green-400"/>

<div>

<p>support@gov.in</p>

<p className="text-gray-400">

Official Support

</p>

</div>

</div>

</div>

</div>

</div>

<hr className="border-white/10 my-12"/>

<div className="flex justify-between items-center">

<div>

<p className="text-gray-400">

© 2026 Smart Land Intelligence & Analytics Platform

</p>

<p className="text-gray-500 mt-2">

Government Enterprise GIS Solution

</p>

</div>

<div className="flex items-center gap-3 bg-green-600 px-5 py-3 rounded-xl">

<ShieldCheck size={18}/>

<span>

System Secure | Version 2.0

</span>

</div>

</div>

</div>

</footer>

)

}

export default FooterSection;