import videoIcon from "../assets/icons/video-recording.png";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router"; // Make sure to import NavLink
import dashboard from "../assets/icons/dashboard.png";
import contacts from "../assets/icons/contacts.png";
import history from "../assets/icons/history.png";
import historyColored from "../assets/icons/historyColored.png";
import dashboardColored from "../assets/icons/dashboardColored.png";
import contactsColored from "../assets/icons/contactsColored.png";
import completedSessions from '../assets/icons/competed.png';
import CompletedSessionsColored from '../assets/icons/competedColored.png'


function Sidebar() {

    const navigationItems = [
        {
            id: "dashboard",
            url: "/dashboard",
            label: "Dashboard",
            icon: dashboard,
            iconColored: dashboardColored,
        },
        {
            id:'CompletedSessions',
            url:'/history',
            label:'Completed Sessions',
            icon:completedSessions,
            iconColored:CompletedSessionsColored,
        },
        {
            id: "ongoing",
            url: "/ongoing",
            label: "Ongoing Sessions",
            icon: history,
            iconColored: historyColored,
        },
        {
            id: "Groups",
            url: "/contacts",
            label: "Contacts",
            icon: contacts,
            iconColored: contactsColored,
        },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-[250px] bg-white  z-20">
            <aside className="h-screen border-r border-gray-200 bg-white flex flex-col  shadow-lg">
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
                                            ? "text-medium-green bg-tab-button-bg rounded-2xl"
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
