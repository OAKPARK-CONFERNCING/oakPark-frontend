// AppLayout.tsx

import { Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Loader from '../loader/loader';
import { ChevronDown } from "lucide-react";
import Video from "../assets/icons/video.png";

function AppLayout() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        // Simulate a small delay for the loader - adjust the delay (e.g., 300ms) as needed.
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="flex flex-row h-screen">
            <Sidebar />
            <div className="h-screen w-full">
                <header className="flex flex-row h-[70px] border-b border-grey w-full ">
                    <div className="flex items-center justify-between w-full px-4">
                        <h1 className="font-inter-600 text-inActive-green">
                            Session history{" "}
                        </h1>

                        <button className="w-auto bg-medium-green hover:bg-medium-green/20 rounded-2xl flex items-center px-4 h-10">
                            <img src={Video} alt="video icon" className="mr-2 w-4" />
                            <p className="font-inter-700 text-[12px] mr-3 text-white border-r h-full flex justify-center items-center pr-3">
                                New session
                            </p>
                            <ChevronDown size={20} className="text-white " />
                        </button>
                    </div>
                </header>
                <main className="flex-1 relative">
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                            <Loader />
                        </div>
                    )}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
