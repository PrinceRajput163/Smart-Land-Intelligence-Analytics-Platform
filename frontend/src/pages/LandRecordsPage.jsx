import LandRecords from "../components/land-records/LandRecords";


function LandRecordsPage() {

  return (

    <div>

      <h1 className="text-2xl sm:text-4xl font-bold">

        GLIS Land Records

      </h1>

      <p className="text-gray-600 mt-3">

        Centralized Government Land Information System

      </p>

      <LandRecords />

    </div>

  )

}


export default LandRecordsPage;