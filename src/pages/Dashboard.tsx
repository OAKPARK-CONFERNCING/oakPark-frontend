import videoIcon from '../assets/icons/video-recording.png';
import { Home, Clock, Users,ChevronRight  } from 'lucide-react';
import { useState } from 'react';
import React from 'react';


const Dashboard = () => {

    const [activeLink, setActiveLink] = useState('history');
  
    const navigationItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
      { id: 'history', label: 'History', icon: <Clock size={20} /> },
      { id: 'contacts', label: 'Contacts', icon: <Users size={20} /> }
    ];

  return (
    <div className="flex flex-row">
        <div className="left w-[250px]">
            <div className="logo flex flex-row h-[70px] w-[249px] items-center border border-[#eeeeee]">
                <div className='pl-8 items-center justify-center mr-2 '>
                <img src={videoIcon} alt="Video recording icon" width={20} height={20} className='pt-[25px]' />
                </div>
                <span className="text-lg font-bold uppercase text-green-500 items-center">Stellar</span>
            </div>

        
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-2xl mt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img 
                src="/api/placeholder/40/40" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-gray-800 font-medium">Emmanuel A.</div>
              <div className="text-xs text-gray-500">adelakunmanuel@gmail.com</div>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>

        <nav className="mt-4 flex-1">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveLink(item.id)}
                className={`flex items-center w-full px-5 py-3 text-left ${
                  activeLink === item.id 
                    ? 'text-green-500 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-3">
                  {React.cloneElement(item.icon, { 
                    className: activeLink === item.id ? 'text-green-500' : 'text-gray-400' 
                  })}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      </div>

      
        
        <div className="right">right</div>
    </div>
  )
}

export default Dashboard