import { useState } from "react";


import {

MapContainer,
TileLayer,
Circle,
Popup

} from "react-leaflet";


import {

MapPin,
Brain

} from "lucide-react";


import { gisZones } from "../data/dummyData";


import "leaflet/dist/leaflet.css";





function MapView(){


const [mode,setMode]=useState("normal");


const [selected,setSelected]=useState(null);





const layers={


normal:
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",


satellite:
"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",


terrain:
"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"


};






return(

<div>





{/* Layer Buttons */}


<div className="flex gap-3 mb-5">



<button

onClick={()=>setMode("normal")}

className="bg-blue-600 text-white px-4 py-2 rounded-xl"

>

Map

</button>





<button

onClick={()=>setMode("satellite")}

className="bg-green-600 text-white px-4 py-2 rounded-xl"

>

Satellite

</button>





<button

onClick={()=>setMode("terrain")}

className="bg-yellow-500 text-white px-4 py-2 rounded-xl"

>

Terrain

</button>



</div>








<div className="grid grid-cols-4 gap-5">






{/* MAP */}


<div className="col-span-3">


<MapContainer

center={[23.6102,85.2799]}

zoom={7}

className="h-[500px] rounded-xl"


>


<TileLayer

key={mode}

url={layers[mode]}

/>






{

gisZones.map((zone)=>(



<Circle

key={zone.id}

center={zone.position}

radius={30000}

pathOptions={{

color:zone.color

}}



eventHandlers={{

click:()=>setSelected(zone)

}}


>


<Popup>


{zone.name}


</Popup>



</Circle>



))


}




</MapContainer>


</div>









{/* DETAILS PANEL */}



<div className="bg-white rounded-xl shadow p-5">



<h2 className="font-bold flex gap-2">


<MapPin/>


Land Details


</h2>






{


selected ? (


<div className="mt-5 space-y-4">


<h2 className="text-xl font-bold">


{selected.name}


</h2>



<p>ID: {selected.id}</p>


<p>Area: {selected.area}</p>


<p>Risk: {selected.risk}</p>





<div>


<p className="flex gap-2">


<Brain/>


AI Score


</p>



<h1 className="text-3xl font-bold text-green-600">


{selected.score}


</h1>



</div>




</div>


)

:

(

<p className="text-gray-500 mt-5">


Click any land zone


</p>

)


}




</div>





</div>




</div>


)


}



export default MapView;