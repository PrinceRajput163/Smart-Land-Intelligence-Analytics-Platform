import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Map,
  Brain,
  ShieldCheck,
  Database,
  Bell,
  FileText,
  Globe,
} from "lucide-react";

function HeroSection() {
  return (
    <section className="bg-[#071A2D] text-white overflow-hidden">

      {/* ================= Government Header ================= */}

      <div className="bg-[#04111D] border-b border-white/10">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div>

            <p className="text-sm tracking-[4px] uppercase text-green-400">

              Government of India

            </p>

            <h1 className="text-3xl font-bold mt-2">

              Smart Land Intelligence & Analytics Platform

            </h1>

            <p className="text-gray-300 mt-2">

              Ministry of Land Resources (Demo)

            </p>

            <p className="text-blue-300 text-sm mt-1">

              National Geospatial Decision Support System

            </p>

          </div>

          <div className="text-right">

            <div className="inline-flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full">

              <Activity size={16} />

              <span className="font-semibold">

                System Online

              </span>

            </div>

            <p className="text-gray-400 mt-4 text-sm">

              Last Updated

            </p>

            <p className="font-semibold">

              20 July 2026 | 10:45 AM IST

            </p>

          </div>

        </div>

      </div>

      {/* ================= Notice Bar ================= */}

      <div className="bg-[#16A34A]">

        <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">

          <div className="flex items-center gap-2">

            <Bell size={18} />

            <span>

              Official Notice : National GIS Database synchronized successfully.

            </span>

          </div>

          <span className="font-semibold">

            STATUS : ONLINE

          </span>

        </div>

      </div>

      {/* ================= Hero ================= */}

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >

            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-5 py-2 rounded-full">

              <ShieldCheck size={18} />

              Enterprise Government GIS Platform

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

              <span className="bg-white/10 px-4 py-2 rounded-full">

                AI Powered

              </span>

              <span className="bg-white/10 px-4 py-2 rounded-full">

                GIS Enabled

              </span>

              <span className="bg-white/10 px-4 py-2 rounded-full">

                Government Ready

              </span>

              <span className="bg-white/10 px-4 py-2 rounded-full">

                Secure Platform

              </span>

            </div>

            <h1 className="text-6xl font-bold leading-tight mt-8">

              Smart Land Intelligence

              <br />

              & Analytics Platform

            </h1>

            <p className="text-xl text-gray-300 leading-9 mt-8">

              Enterprise GIS platform for land monitoring,
              geospatial analytics,
              AI-powered prediction,
              government planning,
              and intelligent decision support.

            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/dashboard"
                className="bg-[#16A34A] hover:bg-green-700 transition px-8 py-4 rounded-xl flex items-center gap-3 font-semibold"
              >

                Explore Dashboard

                <ArrowRight size={20} />

              </Link>

              <Link
                to="/analytics"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#071A2D] transition font-semibold"
              >

                View Analytics

              </Link>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">

              <div>

                <p className="text-gray-400">

                  Coverage

                </p>

                <h2 className="text-3xl font-bold">

                  28 States

                </h2>

              </div>

              <div>

                <p className="text-gray-400">

                  Districts

                </p>

                <h2 className="text-3xl font-bold">

                  750+

                </h2>

              </div>

              <div>

                <p className="text-gray-400">

                  Land Records

                </p>

                <h2 className="text-3xl font-bold">

                  52,430

                </h2>

              </div>

              <div>

                <p className="text-gray-400">

                  AI Accuracy

                </p>

                <h2 className="text-3xl font-bold text-green-400">

                  94%

                </h2>

              </div>

            </div>

          </motion.div>

                    {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <div className="bg-white rounded-3xl shadow-2xl p-8 text-[#071A2D]">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">

                    National Command Center

                  </h2>

                  <p className="text-gray-500">

                    Government Monitoring Dashboard

                  </p>

                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                  LIVE

                </div>

              </div>

              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-blue-50 rounded-2xl p-5">

                  <Database className="text-blue-600"/>

                  <p className="text-gray-500 mt-4">

                    Government Land

                  </p>

                  <h2 className="text-3xl font-bold">

                    52,430

                  </h2>

                </div>

                <div className="bg-yellow-50 rounded-2xl p-5">

                  <Map className="text-yellow-600"/>

                  <p className="text-gray-500 mt-4">

                    Mining Zones

                  </p>

                  <h2 className="text-3xl font-bold">

                    342

                  </h2>

                </div>

                <div className="bg-green-50 rounded-2xl p-5">

                  <Brain className="text-green-600"/>

                  <p className="text-gray-500 mt-4">

                    AI Accuracy

                  </p>

                  <h2 className="text-3xl font-bold">

                    94%

                  </h2>

                </div>

                <div className="bg-gray-100 rounded-2xl p-5">

                  <h3 className="text-lg font-bold mb-4">

                    System Status

                  </h3>

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>System Health</span>

                      <span className="font-bold text-green-600">

                        98%

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>Today's Reports</span>

                      <span className="font-bold">

                        12

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>AI Engine</span>

                      <span className="font-bold text-green-600">

                        ONLINE

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>Alerts</span>

                      <span className="font-bold text-red-600">

                        03

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>GIS Layers</span>

                      <span className="font-bold">

                        18

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>Database</span>

                      <span className="font-bold text-green-600">

                        Connected

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* National Coverage */}

      <div className="bg-white py-10">

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid grid-cols-5 gap-6">

            <div className="rounded-xl shadow border p-6 text-center">

              <Globe className="mx-auto text-blue-600"/>

              <h2 className="text-3xl font-bold mt-4">

                28

              </h2>

              <p className="text-gray-500">

                States

              </p>

            </div>

            <div className="rounded-xl shadow border p-6 text-center">

              <Map className="mx-auto text-green-600"/>

              <h2 className="text-3xl font-bold mt-4">

                8

              </h2>

              <p className="text-gray-500">

                Union Territories

              </p>

            </div>

            <div className="rounded-xl shadow border p-6 text-center">

              <Database className="mx-auto text-blue-600"/>

              <h2 className="text-3xl font-bold mt-4">

                52K+

              </h2>

              <p className="text-gray-500">

                Land Records

              </p>

            </div>

            <div className="rounded-xl shadow border p-6 text-center">

              <Brain className="mx-auto text-purple-600"/>

              <h2 className="text-3xl font-bold mt-4">

                94%

              </h2>

              <p className="text-gray-500">

                AI Accuracy

              </p>

            </div>

            <div className="rounded-xl shadow border p-6 text-center">

              <FileText className="mx-auto text-orange-600"/>

              <h2 className="text-3xl font-bold mt-4">

                450+

              </h2>

              <p className="text-gray-500">

                Reports

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Live Information */}

      <div className="bg-[#071A2D] border-t border-white/10 py-4 overflow-hidden">

        <div className="whitespace-nowrap animate-pulse text-center text-white">

          ● AI Accuracy 94% &nbsp;&nbsp;&nbsp;

          ● Government Land 52,430 &nbsp;&nbsp;&nbsp;

          ● Mining Zones 342 &nbsp;&nbsp;&nbsp;

          ● GIS Database Connected &nbsp;&nbsp;&nbsp;

          ● AI Engine Online &nbsp;&nbsp;&nbsp;

          ● National Monitoring Active &nbsp;&nbsp;&nbsp;

          ● Reports Generated Successfully

        </div>

      </div>

    </section>

  );
}

export default HeroSection;