import { Outlet, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Loader from '../loader/loader';
import Video from "../assets/icons/video.png";
import { AnimatePresence, motion } from 'framer-motion';
import UserProfileCard from '../components/UserProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProfileCard } from '../redux/userSlice';
import Toasts from '../components/Toasts';
import { addToast } from '../redux/toastSlice';

function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { currentUser, isProfileCardVisible } = useSelector((state: any) => state.user);

    useEffect(() => {
        setLoading(true);
        setIsSidebarOpen(false);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const dynamicHeaderText = {
        "/dashboard": "Welcome to your Dashboard",
        "/history": "Sessions History",
        "/ongoing": "Live Session",
        "/contacts": "Contacts"
    };

    // Page transition variants
    const pageVariants = {
        dashboard: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.3 }
        },
        history: {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.3 }
        },
        ongoing: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 1.05 },
            transition: { duration: 0.3 }
        },
        contacts: {
            initial: { opacity: 0, rotateX: -10 },
            animate: { opacity: 1, rotateX: 0 },
            exit: { opacity: 0, rotateX: 10 },
            transition: { duration: 0.3 }
        }
    };

    // Get the appropriate animation based on the current route
    const getPageAnimation = () => {
        const path = location.pathname;
        if (path === '/dashboard') return pageVariants.dashboard;
        if (path === '/history') return pageVariants.history;
        if (path === '/ongoing') return pageVariants.ongoing;
        if (path === '/contacts') return pageVariants.contacts;
        return pageVariants.dashboard; // default
    };

    const handleNewSessionClick = () => {
        navigate('/new-session');
    };

    return (
        <div className="flex flex-row flex-1">
            <div className="hidden sm:block">
                <Sidebar onClose={() => {}} isSidebarOpen={false} />
            </div>
            <Toasts />
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
                        className={`ml-2 sm:ml-0 sm:hidden ham-menu z-[50] ${isSidebarOpen ? "active2" : ""}`}
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
                        <button className="z-10 w-auto bg-medium-green hover:bg-medium-green/20 rounded-2xl flex items-center px-2 md:px-4 h-10" onClick={handleNewSessionClick}>
                            <img src={Video} alt="video icon" className="mr-2 w-4" />
                            <p className="font-inter-700 text-[12px] text-white">
                                New session
                            </p>
                        </button>
                    </div>
                </header>
                <main className="ml-0 sm:ml-[100px] lg:ml-[250px] relative mt-[70px] h-[calc(100vh-70px)] overflow-y-auto">
                    {loading ? (
                        <div className="absolute h-full left-0 right-0 z-10 flex items-center justify-center bg-white">
                            <Loader />
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                {...getPageAnimation()}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    )}
                    <UserProfileCard
                        isVisible={isProfileCardVisible}
                        onClose={() => dispatch(toggleProfileCard())}
                        user={currentUser}
                    />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;



