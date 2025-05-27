import { Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Loader from '../loader/loader';
import Video from "../assets/icons/video.png";
import { AnimatePresence } from 'framer-motion';

function AppLayout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setIsSidebarOpen(false); // Close the sidebar when the route changes
        // Simulate a small delay for the loader - adjust the delay (e.g., 300ms) as needed.
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const dynamicHeaderText = 
        {
            "/dashboard":"Welcome to your Dashboard",
             "/history": "Sessions History",
              "/ongoing": "Live Session",
               "/contacts": "Contacts "
        }
    
    return (
        <div className="flex flex-row flex-1 ">
            {/* Desktop sidebar - always visible on desktop, hidden on mobile */}
            <div className="hidden sm:block">
                <Sidebar onClose={() => {}} isSidebarOpen={false} />
            </div>
            
            {/* Mobile sidebar - only visible when isSidebarOpen is true */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <div className="block sm:hidden">
                        <Sidebar onClose={() => setIsSidebarOpen(false)} isSidebarOpen={isSidebarOpen} />
                    </div>
                )}
            </AnimatePresence>
            
            <div className="w-full">
                <header className="fixed top-0 left-0 sm:left-[100px] lg:left-[250px] right-0 h-[70px] bg-white border-b border-gray-200 z-10 flex items-center justify-between">
                    <div
                        className={`ml-2 sm:ml-0  sm:hidden ham-menu z-[50] ${isSidebarOpen ? "active2" : ""}`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        role="button"
                        aria-label="Menu button"
                    >
                        <span className="span-1"></span>
                        <span className="span-2"></span>
                        <span className="span-3"></span>
                    </div>
                    <div className="flex flex-row border-l border-grey ml-2 sm:ml-0 items-center justify-between p-4 w-full">
                        <h1 className="sm:w-auto text-xs md:text-base font-inter-600 text-inActive-green">
                            {dynamicHeaderText[location.pathname as keyof typeof dynamicHeaderText] || "Session History"}
                        </h1>
                        <button className="z-10 w-auto bg-medium-green hover:bg-medium-green/20 rounded-2xl flex items-center px-2 md:px-4 h-10">
                            <img src={Video} alt="video icon" className="mr-2 w-4" />
                            <p className="font-inter-700 text-[12px] text-white">
                                New session
                            </p>
                        </button>
                    </div>
                </header>
                <main className="ml-0 sm:ml-[100px] lg:ml-[250px] relative mt-[70px] h-[calc(100vh-70px)] overflow-y-auto">
                    {loading ? (
                        <div className="absolute h-full  left-0 right-0 z-10 flex items-center justify-center bg-white">
                            <Loader />
                        </div>
                    
                    ):(<Outlet />)}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;



