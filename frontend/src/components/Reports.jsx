import {
  FileText,
  Download,
  Brain,
  CheckCircle,
  Clock,
  Leaf
} from "lucide-react";

import { motion } from "framer-motion";

import { reportsData } from "../data/dummyData";

function Reports() {

  const getIcon = (title) => {

    if (title.includes("Land")) return <FileText />;

    if (title.includes("Mining")) return <Leaf />;

    if (title.includes("Environmental")) return <Clock />;

    return <Brain />;

  };

  return (

    <div className="space-y-8 mt-10">

      {/* Header */}

      <div className="bg-[#071A2D] text-white rounded-2xl p-8 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Government Report Center
          </h1>

          <p className="text-gray-300 mt-2">
            AI Generated GIS Intelligence Reports
          </p>

        </div>

        <button className="bg-[#16A34A] px-6 py-3 rounded-xl flex gap-2 items-center">

          <Brain size={20} />

          Generate AI Report

        </button>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">

          <FileText className="text-blue-600" />

          <h2 className="text-3xl font-bold mt-4">
            {reportsData.length}
          </h2>

          <p>Total Reports</p>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <CheckCircle className="text-green-600" />

          <h2 className="text-3xl font-bold mt-4">
            98%
          </h2>

          <p>Accuracy Rate</p>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <Download className="text-purple-600" />

          <h2 className="text-3xl font-bold mt-4">
            450
          </h2>

          <p>Downloads</p>

        </div>

      </div>

      {/* Reports */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {

          reportsData.map((item,index)=>(

            <motion.div

              key={index}

              whileHover={{scale:1.03}}

              className="bg-white rounded-xl shadow p-6"

            >

              <div className="flex justify-between">

                <div>

                  <div className="text-blue-600">

                    {getIcon(item.title)}

                  </div>

                  <h2 className="font-bold text-xl mt-4">

                    {item.title}

                  </h2>

                  <p className="text-gray-500">

                    {item.date}

                  </p>

                </div>

                <span

                  className={`h-fit px-3 py-1 rounded-full text-sm

                  ${

                    item.status==="Completed"

                    ?

                    "bg-green-100 text-green-700"

                    :

                    "bg-yellow-100 text-yellow-700"

                  }`}

                >

                  {item.status}

                </span>

              </div>

              <button className="mt-6 bg-gray-100 hover:bg-gray-200 transition px-5 py-2 rounded-lg flex gap-2 items-center">

                <Download size={18}/>

                Download PDF

              </button>

            </motion.div>

          ))

        }

      </div>

    </div>

  )

}

export default Reports;