import StatCard from "../components/common/StatCard";
import MapView from "../components/gis/MapView";
import AnalyticsChart from "../components/analytics/AnalyticsChart";
import AlertPanel from "../components/dashboard/AlertPanel";

import { dashboardStats } from "../data/dummyData";
import { Link } from "react-router-dom";

import {
  Map,
  Factory,
  Activity,
  Landmark
} from "lucide-react";

function Dashboard() {

  const icons = [
    <Map />,
    <Factory />,
    <Landmark />,
    <Activity />
  ];

  return (

    <div className="space-y-10">

      {/* Header */}

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-md">

        <p className="uppercase tracking-widest text-green-400">

          Government Command Center

        </p>

        <h1 className="text-3xl lg:text-5xl font-bold mt-3">

          National Land Intelligence Dashboard

        </h1>

        <p className="text-slate-400 mt-4 text-lg">

          Real-time GIS monitoring, AI prediction,
          land records management and government analytics platform.

        </p>

        <div className="flex flex-wrap gap-3 lg:gap-4 mt-8">

          <div className="bg-green-600 px-5 py-3 rounded-xl">

            System Online

          </div>

          <div className="bg-slate-800/80 border border-slate-700 px-5 py-3 rounded-xl text-slate-100">

            AI Engine Active

          </div>

          <div className="bg-slate-800/80 border border-slate-700 px-5 py-3 rounded-xl text-slate-100">

            GIS Connected

          </div>

        </div>

      </div>

      {/* Statistics */}

      <section>

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">

              Platform Statistics

            </h2>

            <p className="text-slate-400">

              Live Government Intelligence Metrics

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {

            dashboardStats.map((item, index) => (

              <StatCard

                key={index}

                title={item.title}

                value={item.value}

                percentage={item.percentage}

                icon={icons[index]}

              />

            ))

          }

        </div>

      </section>

      {/* GIS */}

      <section>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            GIS Intelligence Center
          </h2>
          <Link to="/gis" className="bg-[#0F2942] hover:bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm">
            Launch Full Cadastral Intelligence View ➔
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-md p-4 sm:p-6">

          <MapView />

        </div>

      </section>

      {/* Analytics Summary */}

      <section>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            National Analytics
          </h2>
          <Link to="/analytics" className="bg-[#0F2942] hover:bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm">
            View Detailed Reports ➔
          </Link>
        </div>

        <AnalyticsChart />

      </section>

      {/* Alerts */}

      <section>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">

          Monitoring & Alerts

        </h2>

        <AlertPanel />

      </section>

    </div>

  )

}

export default Dashboard;