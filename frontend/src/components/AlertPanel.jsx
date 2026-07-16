import {
  AlertTriangle,
  CheckCircle,
  Bell,
  Activity
} from "lucide-react";

import { motion } from "framer-motion";

import { alertsData } from "../data/dummyData";

function AlertPanel() {

  return (

    <div className="bg-white rounded-2xl shadow p-6 mt-10">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold flex items-center gap-2">

          <Bell className="text-blue-600"/>

          Intelligence Alerts

        </h2>

        <div className="flex items-center gap-2 text-green-600">

          <Activity size={20}/>

          <span className="font-semibold">
            LIVE
          </span>

        </div>

      </div>

      {/* Alerts */}

      <div className="space-y-5 mt-6">

        {

          alertsData.map((item,index)=>(

            <motion.div

              key={index}

              initial={{opacity:0,x:-20}}

              animate={{opacity:1,x:0}}

              whileHover={{scale:1.02}}

              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition p-5 rounded-xl"

            >

              <div className="flex items-center gap-3">

                {

                  item.color==="green"

                  ?

                  <CheckCircle className="text-green-600"/>

                  :

                  <AlertTriangle

                    className={

                      item.color==="yellow"

                      ?

                      "text-yellow-500"

                      :

                      "text-red-600"

                    }

                  />

                }

                <p className="font-semibold">

                  {item.msg}

                </p>

              </div>

              <span

                className={`px-4 py-1 rounded-full text-sm font-medium

                ${

                  item.color==="red"

                  ?

                  "bg-red-100 text-red-700"

                  :

                  item.color==="yellow"

                  ?

                  "bg-yellow-100 text-yellow-700"

                  :

                  "bg-green-100 text-green-700"

                }`}

              >

                {item.type}

              </span>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

}

export default AlertPanel;