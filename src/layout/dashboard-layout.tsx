import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";


const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Memoize toggle function to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    // <div className="font-inter h-screen bg-gray-50 flex overflow-hidden">
    //   {/* Sidebar - Hidden on mobile, toggleable */}
    //   <Sidebar
    //     isMobileSidebarOpen={isMobileSidebarOpen}
    //     setIsMobileSidebarOpen={setIsMobileSidebarOpen}
    //   />

    //   {/* Mobile Sidebar Overlay */}
    //   {isMobileSidebarOpen && (
    //     <div
    //       className="fixed inset-0 bg-black/50 z-[9] lg:hidden"
    //       onClick={closeSidebar}
    //       aria-hidden="true"
    //     />
    //   )}

    //   {/* Main Content Area */}
    //   <div className="flex-1 flex flex-col lg:ml-[280px] 2xl:ml-[350px]">
    //     {/* Fixed Navbar */}
    //     <Navbar
    //       isMobileSidebarOpen={isMobileSidebarOpen}
    //       toggleSidebar={toggleSidebar}
    //     />

    //     {/* Scrollable Content */}
    //     <main className="flex-1 overflow-y-auto mt-[84px] p-6 lg:p-8">
    //       <Outlet />
    //     </main>

        
    //   </div>
    // </div>

    <div className="font-inter h-screen relative bg-white flex items-center">
      {/* Sidebar - Hidden on mobile, toggleable */}
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />

      

        <div className="lg:max-w-[calc(100%_-_280px)] 2xl:max-w-[calc(100%_-_350px)] ml-auto w-full h-full relative min-h-fit">

             <Navbar
            isMobileSidebarOpen={isMobileSidebarOpen}
            toggleSidebar={toggleSidebar}
          />

           <div className="mt-[90px] h-[calc(100vh_-_84px)] overflow-y-auto p-[30px]">
        <Outlet />
        </div>

        </div>

  
     
    </div>
  );
};

export default DashboardLayout;