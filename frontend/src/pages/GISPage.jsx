import MapView from "../components/gis/MapView";


function GISPage() {

  return (

    <div>

      <h1 className="text-2xl sm:text-4xl font-bold text-slate-100">

        GIS Intelligence Map

      </h1>

      <p className="text-slate-400 mt-3">

        Advanced GLIS Geospatial Monitoring System

      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md p-4 sm:p-6 mt-6 sm:mt-10">

        <MapView />

      </div>

    </div>

  )

}


export default GISPage;