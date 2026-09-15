import {
  Search,
  Bell,
  ShieldCheck,
  UserCircle,
  Activity,
  CalendarDays,
  Clock,
  ChevronRight
} from "lucide-react";

function Navbar() {

  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (

    <div className="space-y-4 w-full relative">
      
      {/* Official Tricolor Accent Ribbon */}
      <div className="absolute -top-6 left-0 right-0 h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-t-xl z-50"></div>

      {/* Government Ribbon */}

      <div className="bg-[#0F2942] text-white rounded-2xl px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-md">

        <div>

          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#FF9933] font-semibold">
            Government Land Information System — Analytics Platform
          </p>

          <h2 className="font-bold text-sm sm:text-base text-gray-200">
            Ministry of Coal, Government of India · SIH1318
          </h2>

        </div>

        <div className="flex items-center gap-4 sm:gap-6">

          <div className="hidden sm:flex items-center gap-2 text-sm">

            <CalendarDays size={18} />

            {date}

          </div>

          <div className="flex items-center gap-2 bg-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-semibold shadow-sm">

            <Activity size={16} />

            SYSTEM ACTIVE

          </div>

        </div>

      </div>

      {/* Main Navbar */}

      <div className="bg-slate-900/80 rounded-2xl shadow-md border border-slate-800 px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        {/* Left */}

        <div>

          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">

            Dashboard

            <ChevronRight size={16} />

            GLIS Analytics

          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 mt-1 sm:mt-2">

            GLIS Analytics Command Center

          </h1>

        </div>

        {/* Search */}

        <div className="hidden xl:flex items-center bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-3 w-[420px] focus-within:ring-2 ring-blue-500 transition-all text-slate-100">

          <Search size={20} className="text-slate-500" />

          <input

            type="text"

            placeholder="Search Parcel ID, Khasra, Owner..."

            className="bg-transparent outline-none ml-3 flex-1 text-slate-100 placeholder-slate-400"

          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-3 sm:gap-4">

          <div className="hidden sm:flex bg-slate-800 text-blue-400 border border-slate-700 px-3 sm:px-4 py-2 rounded-xl items-center gap-2 text-sm">

            <ShieldCheck size={18} />

            Secure

          </div>

          <div className="relative bg-slate-800 p-2.5 sm:p-3 rounded-xl border border-slate-700 text-slate-400">

            <Bell size={20} />

            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

              3

            </span>

          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <UserCircle

              size={36}

              className="text-slate-400"

            />

            <div className="hidden sm:block">

              <h3 className="font-bold text-sm text-slate-100">

                Administrator

              </h3>

              <p className="text-xs text-slate-400">

                Government Officer

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Navbar;