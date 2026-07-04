function Navbar(){

return (

<div className="bg-white h-20 rounded-xl shadow flex items-center justify-between px-8">


<div>

<h2 className="text-2xl font-bold">
Coal Land Analytics
</h2>

<p className="text-gray-500">
Ministry of Coal • GLIS Platform
</p>

</div>


<div className="flex items-center gap-4">


<input
className="border rounded-lg px-4 py-2"
placeholder="Search land records..."
/>


<div className="bg-blue-600 text-white px-4 py-2 rounded-lg">

Admin

</div>


</div>


</div>

)

}

export default Navbar;