import MapView from "../components/gis/MapView";


function GISPage() {

  return (

    <div>

      <h1 className="text-2xl sm:text-4xl font-bold">

        GIS Intelligence Map

      </h1>

      <p className="text-gray-600 mt-3">

        Advanced GLIS Geospatial Monitoring System

      </p>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6 sm:mt-10">

        <MapView />

      </div>

    </div>

  )

}


export default GISPage;