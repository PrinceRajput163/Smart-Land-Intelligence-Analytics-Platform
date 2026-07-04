import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  LayersControl
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


const { Overlay } = LayersControl;


function MapView(){


return(

<MapContainer

center={[23.6102,85.2799]}

zoom={7}

className="h-96 w-full rounded-xl"

>



<TileLayer

url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

/>



<LayersControl position="topright">


{/* Government Land */}

<Overlay checked name="Government Land">

<Circle

center={[23.6,85.3]}

radius={25000}

pathOptions={{

color:"green"

}}

>

<Popup>

<h3>

Land ID: GLIS-1001

</h3>

<p>

Ownership: Government

</p>

<p>

Area: 240 Hectare

</p>

<p>

Risk Score: Low

</p>

</Popup>


</Circle>

</Overlay>





{/* Mining */}

<Overlay checked name="Mining Zone">


<Circle

center={[23.8,86.4]}

radius={20000}

pathOptions={{

color:"orange"

}}

>


<Popup>


<h3>

Coal Mining Region

</h3>


<p>

Status: Active

</p>


<p>

Resource Score: 89%

</p>


</Popup>


</Circle>


</Overlay>





{/* Forest */}

<Overlay checked name="Forest Region">


<Circle

center={[22.9,85.1]}

radius={22000}

pathOptions={{

color:"darkgreen"

}}

>


<Popup>


Protected Forest Area


</Popup>


</Circle>


</Overlay>





{/* Restricted */}


<Overlay checked name="Restricted Area">


<Circle

center={[24.1,85.8]}

radius={15000}

pathOptions={{

color:"red"

}}

>


<Popup>


Restricted Development Zone


</Popup>



</Circle>


</Overlay>




</LayersControl>




<Marker position={[23.6102,85.2799]}>

<Popup>

Ministry Coal Monitoring Point

</Popup>

</Marker>




</MapContainer>


)


}


export default MapView;