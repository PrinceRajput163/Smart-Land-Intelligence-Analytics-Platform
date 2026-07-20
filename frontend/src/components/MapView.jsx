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

<div className="flex justify-between items-center mb-6">

<div className="flex gap-3">

<button

onClick={()=>setMode("normal")}

className={`px-5 py-2 rounded-xl font-semibold transition

${

mode==="normal"

?

"bg-blue-600 text-white"

:

"bg-gray-100"

}`}

>

Standard

</button>

<button

onClick={()=>setMode("satellite")}

className={`px-5 py-2 rounded-xl font-semibold transition

${

mode==="satellite"

?

"bg-green-600 text-white"

:

"bg-gray-100"

}`}

>

Satellite

</button>

<button

onClick={()=>setMode("terrain")}

className={`px-5 py-2 rounded-xl font-semibold transition

${

mode==="terrain"

?

"bg-yellow-500 text-white"

:

"bg-gray-100"

}`}

>

Terrain

</button>

</div>

<div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

Live GIS

</div>

</div>

<div className="grid grid-cols-4 gap-6">

{/* MAP */}

<div className="col-span-3">

<MapContainer

center={[23.6102,85.2799]}

zoom={7}

className="h-[650px] rounded-2xl border"

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

color:zone.color,

fillOpacity:0.35

}}

eventHandlers={{

click:()=>setSelected(zone)

}}

>

<Popup>

<strong>{zone.name}</strong>

</Popup>

</Circle>

))

}

</MapContainer>

</div>

{/* DETAILS */}

<div className="bg-white rounded-2xl border shadow-lg p-6">

<h2 className="font-bold text-xl flex items-center gap-2">

<MapPin/>

Government Land Details

</h2>

{

selected ? (

<div className="mt-6">

<h2 className="text-2xl font-bold">

{selected.name}

</h2>

<div className="space-y-4 mt-6">

<div className="flex justify-between">

<span className="text-gray-500">

Land ID

</span>

<strong>

{selected.id}

</strong>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

Area

</span>

<strong>

{selected.area}

</strong>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

Risk Level

</span>

<strong className="text-red-600">

{selected.risk}

</strong>

</div>

</div>

<div className="mt-8">

<p className="font-semibold flex items-center gap-2">

<Brain size={18}/>

Government AI Suitability Score

</p>

<h1 className="text-5xl font-bold text-green-600 mt-3">

{selected.score}

</h1>

</div>

<div className="border-t mt-8 pt-6">

<h3 className="font-bold">

Recommendations

</h3>

<ul className="space-y-3 mt-4 text-gray-600">

<li>✔ Suitable for development</li>

<li>✔ GIS verified location</li>

<li>✔ Government records available</li>

<li>✔ AI confidence high</li>

</ul>

</div>

</div>

)

:

(

<div className="mt-10 text-center">

<p className="text-gray-500">

Select any land parcel on the map.

</p>

</div>

)

}

</div>

</div>

</div>

)

}

export default MapView;