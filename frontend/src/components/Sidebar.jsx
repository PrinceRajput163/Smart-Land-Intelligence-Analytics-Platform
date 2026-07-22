import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Map,
  Database,
  BarChart3,
  Brain,
  FileText,
  Settings,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Activity,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {

    const handleResize = () => {

      const width = window.innerWidth;

      setIsMobile(width < 768);

      setIsTablet(width >= 768 && width < 1280);

      if (width < 1280) {

        setCollapsed(true);

      } else {

        setCollapsed(false);

      }

      if (width >= 768) {

        setMobileOpen(false);

      }

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const menu = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={22} />
    },

    {
      name: "GIS Intelligence",
      path: "/gis",
      icon: <Map size={22} />
    },

    {
      name: "Land Records",
      path: "/records",
      icon: <Database size={22} />
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={22} />
    },

    {
      name: "AI Prediction",
      path: "/ai",
      icon: <Brain size={22} />
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={22} />
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={22} />
    }

  ];

  const sidebarWidth = collapsed ? 90 : 290;

  const SidebarContent = () => (

    <motion.div

      animate={{

        width: sidebarWidth

      }}

      transition={{

        duration: 0.25

      }}

      className="h-screen bg-[#071A2D] text-white flex flex-col shadow-2xl"

    >

      {/* Header */}

      <div className="border-b border-white/10 p-6">

        <div className="flex justify-between items-center">

          {

            !collapsed && (

              <div>

                <p className="uppercase text-green-400 text-xs tracking-widest">

                  Government Platform

                </p>

                <h2 className="text-2xl font-bold mt-2">

                  Smart Land AI

                </h2>

                <p className="text-sm text-slate-400 mt-1">

                  Version 2.0

                </p>

              </div>

            )

          }

          {

            !isMobile && (

              <button

                onClick={() => setCollapsed(!collapsed)}

                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-xl"

              >

                <Menu size={22} />

              </button>

            )

          }

          {

            isMobile && (

              <button

                onClick={() => setMobileOpen(false)}

                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-xl"

              >

                <X size={22} />

              </button>

            )

          }

        </div>

      </div>

      {/* Navigation starts here in Part 2 */}

            {/* Navigation */}

      <div className="flex-1 px-4 py-6 overflow-y-auto">

        {

          !collapsed && (

            <p className="text-xs uppercase tracking-widest text-slate-400 mb-5 px-3">

              Navigation

            </p>

          )

        }

        <div className="space-y-2">

          {

            menu.map((item) => (

              <NavLink

                key={item.name}

                to={item.path}

                onClick={() => {

                  if (isMobile) {

                    setMobileOpen(false);

                  }

                }}

                className={({ isActive }) =>

                  `flex items-center justify-between rounded-xl px-4 py-4 transition-all duration-200

                  ${

                    isActive

                      ? "bg-blue-600 shadow-lg"

                      : "hover:bg-white/10"

                  }`

                }

              >

                <div

                  className={`flex items-center ${

                    collapsed

                      ? "justify-center w-full"

                      : "gap-4"

                  }`}

                >

                  {item.icon}

                  {

                    !collapsed && (

                      <span className="font-medium">

                        {item.name}

                      </span>

                    )

                  }

                </div>

                {

                  !collapsed && (

                    <ChevronRight size={18} />

                  )

                }

              </NavLink>

            ))

          }

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-5">

        {

          !collapsed ? (

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Activity

                    size={18}

                    className="text-green-400"

                  />

                  <span>System</span>

                </div>

                <span className="text-green-400 font-semibold">

                  ONLINE

                </span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <ShieldCheck

                    size={18}

                    className="text-blue-400"

                  />

                  <span>Security</span>

                </div>

                <span className="text-blue-400 font-semibold">

                  ACTIVE

                </span>

              </div>

              <div className="bg-green-600 rounded-xl text-center py-3 font-semibold">

                Government Ready

              </div>

            </div>

          ) : (

            <div className="flex flex-col items-center gap-5">

              <Activity

                className="text-green-400"

                size={20}

              />

              <ShieldCheck

                className="text-blue-400"

                size={20}

              />

            </div>

          )

        }

      </div>

    </motion.div>

  );

  if (isMobile) {

    return (

      <>

        <button

          onClick={() => setMobileOpen(true)}

          className="fixed top-5 left-5 z-[1000] bg-[#071A2D] text-white p-3 rounded-xl shadow-xl md:hidden"

        >

          <Menu size={22} />

        </button>

        <AnimatePresence>

          {

            mobileOpen && (

              <>

                <motion.div

                  initial={{ opacity: 0 }}

                  animate={{ opacity: 1 }}

                  exit={{ opacity: 0 }}

                  onClick={() => setMobileOpen(false)}

                  className="fixed inset-0 bg-black/50 z-[999]"

                />

                <motion.div

                  initial={{ x: -320 }}

                  animate={{ x: 0 }}

                  exit={{ x: -320 }}

                  transition={{ duration: 0.25 }}

                  className="fixed left-0 top-0 z-[1000]"

                >

                  <SidebarContent />

                </motion.div>

              </>

            )

          }

        </AnimatePresence>

      </>

    );

  }

  return <SidebarContent />;

}

export default Sidebar;