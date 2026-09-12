import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AppLayout() {

  return (

    <div className="h-screen w-screen overflow-hidden flex flex-row bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex flex-col min-h-full">
            <div className="sticky top-0 z-30">
              <Navbar />
            </div>
            <div className="mt-6 lg:mt-10 flex-1">
                <Outlet />
            </div>
        </div>
      </main>
    </div>

  );

}

export default AppLayout;
