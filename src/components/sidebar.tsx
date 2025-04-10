import videoIcon from "../assets/icons/video-recording.png";
import { ChevronRight } from "lucide-react";
// import { useState } from 'react';
import { NavLink } from "react-router"; // Make sure to import NavLink
import dashboard from "../assets/icons/dashboard.png";
import contacts from "../assets/icons/contacts.png";
import history from "../assets/icons/history.png";
import historyColored from "../assets/icons/historyColored.png";
import dashboardColored from "../assets/icons/dashboardColored.png";
import contactsColored from "../assets/icons/contactsColored.png";
// import Video from "../assets/icons/video.png";
// import Loader from "../loader/loader";

function Sidebar() {
    // const navigation = useNavigation();
    // const isNavigating = navigation.state === 'loading'; // or 'submitting' if applicable
    const navigationItems = [
        {
            id: "dashboard",
            url: "/dashboard",
            label: "Dashboard",
            icon: dashboard,
            iconColored: dashboardColored,
        },
        {
            id: "history",
            url: "/history",
            label: "History",
            icon: history,
            iconColored: historyColored,
        },
        {
            id: "contacts",
            url: "/contacts",
            label: "Contacts",
            icon: contacts,
            iconColored: contactsColored,
        },
    ];

    return (
        <div className="flex flex-row">
            <aside className=" left w-[250px] h-screen border-r border-gray-200 bg-white flex flex-col  shadow-lg">
                <div className=" logo flex flex-row h-[70px]  border-b border-gray-200 pl-3 bg-white items-center justify-start ">
                    <div className=" items-center justify-center mr-2">
                        <img
                            src={videoIcon}
                            alt="Video recording icon"
                            width={20}
                            height={20}
                        />
                    </div>
                    <span className="text-lg font-bold uppercase text-medium-green items-center">
                        OakPark
                    </span>
                </div>
                {/* <p className='h-2 bg-grey'></p> */}
                <div className="bg-fade-bg flex items-center mx-2 justify-between p-2  border-gray-200 rounded-2xl mt-6">
                    <div className="flex items-center ">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-2">
                            <img
                                src="https://picsum.photos/300/200"
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-gray-800 font-medium">Emmanuel A.</div>
                            <div className="text-xs text-gray-500">
                                adelakunmanuel@gmail.com
                            </div>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-900" />
                </div>

                <nav className="mt-4 mx-2 flex-1">
                    <ul>
                        {navigationItems.map((item) => (
                            <li
                                key={item.id}
                                className={``}
                            >
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        `flex items-center w-full px-5 py-3 font-inter-700 hover:scale-105 transition-all duration-300 ease-in-out text-left ${isActive
                                            ? "text-medium-green bg-medium-green/15 rounded-2xl"
                                            : "text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="mr-3">
                                                <img
                                                    src={isActive ? item.iconColored : item.icon}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                />
                                            </span>
                                            {item.label}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>


        </div>
    );
}

export default Sidebar;

// import React from 'react';
// import videoIcon from '../assets/icons/video-recording.png';
// import { ChevronRight,ChevronDown } from 'lucide-react';
// // import { useState } from 'react';
// import { NavLink, Outlet } from 'react-router'; // Make sure to import NavLink
// import dashboard from '../assets/icons/dashboard.png';
// import contacts from '../assets/icons/contacts.png';
// import history from '../assets/icons/history.png';
// import historyColored from '../assets/icons/historyColored.png';
// import dashboardColored from '../assets/icons/dashboardColored.png';
// import contactsColored from '../assets/icons/contactsColored.png';
// import Video from '../assets/icons/video.png'

// function Sidebar({children}: { children: React.ReactNode }) {
//     const navigationItems = [
//         { id: 'dashboard', url: '/dashboard', label: 'Dashboard', icon: dashboard, iconColored: dashboardColored },
//         { id: 'history', url: '/history', label: 'History', icon: history, iconColored: historyColored },
//         { id: 'contacts', url: '/contacts', label: 'Contacts', icon: contacts, iconColored: contactsColored },
//     ];

//     return (
//         <div className="flex flex-row">
//             <aside className=" left w-[250px] h-screen border-r border-gray-200 bg-white flex flex-col  shadow-lg">
//                 <div className=" logo flex flex-row h-[70px]  border-b border-gray-200 pl-3 bg-white items-center justify-start ">
//                     <div className=" items-center justify-center mr-2">
//                         <img src={videoIcon} alt="Video recording icon" width={20} height={20} />
//                     </div>
//                     <span className="text-lg font-bold uppercase text-medium-green items-center">OakPark</span>
//                 </div>
//                 {/* <p className='h-2 bg-grey'></p> */}
//                 <div className="bg-fade-bg flex items-center mx-2 justify-between p-2  border-gray-200 rounded-2xl mt-6">
//                     <div className="flex items-center ">
//                         <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-2">
//                             <img
//                                 src="https://picsum.photos/300/200"
//                                 alt="User avatar"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                         <div>
//                             <div className="text-gray-800 font-medium">Emmanuel A.</div>
//                             <div className="text-xs text-gray-500">adelakunmanuel@gmail.com</div>
//                         </div>
//                     </div>
//                     <ChevronRight size={16} className="text-gray-900" />
//                 </div>

//                 <nav className="mt-4 mx-2 flex-1">
//                     <ul>
//                         {navigationItems.map((item) => (
//                             <li key={item.id} className={` ${window.location.pathname === item.url ? '' : ''}`}>
//                                 <NavLink
//                                     to={item.url}
//                                     // For React Router v6, use a function to access isActive
//                                     className={({ isActive }) =>
//                                         `flex items-center w-full px-5 py-3 font-inter-700 text-left ${isActive ? 'text-medium-green bg-medium-green/15 rounded-2xl' : 'text-gray-500 hover:text-gray-700'
//                                         }`
//                                     }
//                                 >
//                                     <span className="mr-3">
//                                         {/* Conditionally display the colored icon if active */}
//                                         <img
//                                             src={item.iconColored && window.location.pathname === item.url ? item.iconColored : item.icon}
//                                             alt={item.label}
//                                             width={20}
//                                             height={20}
//                                         />
//                                     </span>
//                                     {item.label}
//                                 </NavLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </aside>

//             <div className="h-screen w-full">
//                 <header className="flex flex-row h-[70px] border-b border-grey w-full ">
//                     <div className="flex items-center justify-between w-full px-4">
//                         <h1 className='font-inter-600 text-inActive-green'>Session history </h1>

//                         <button className='w-auto bg-medium-green hover:bg-medium-green/20 rounded-2xl flex items-center px-4 h-10'>
//                             <img src={Video} alt="video icon" className='mr-2 w-4' />
//                             <p className='font-inter-700 text-[12px] mr-3 text-white border-r h-full flex justify-center items-center pr-3'>New session</p>
//                             <ChevronDown size={20} className="text-white " />
//                         </button>
//                     </div>

//                 </header>
//                 <main className='flex-1 relative'>
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;
