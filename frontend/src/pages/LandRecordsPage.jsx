import LandRecords from "../components/land-records/LandRecords";


function LandRecordsPage() {

  return (

    <div>

      <h1 className="text-2xl sm:text-4xl font-bold text-slate-100">

        GLIS Land Records

      </h1>

      <p className="text-slate-400 mt-3">

        Centralized Government Land Information System

      </p>

      <LandRecords />

    </div>

  )

}


export default LandRecordsPage;