import React from 'react';
import { Link } from 'react-router';
import {motion, AnimatePresence} from "framer-motion"

interface UserProfileCardProps {
  isVisible: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    role?: string;
    description?: string;
    skills?: string[];
    talkTime?: string;
    sessionsCount?: number;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ isVisible, onClose, user }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{  x: 100 }}
          animate={{  x: 0 }}
          exit={{  x: 500 }}
          transition={{ duration: 0.3, ease: "easeInOut", type: "spring", stiffness: 300, damping: 25 }}
          className="fixed right-0 top-16 w-96 rounded-3xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col"
        >
          {/* Background image placeholder */}
          <div className="h-32 w-full bg-[url('/profilecardtopimg.png')] bg-cover bg-center flex items-center justify-center relative">
            {/* Close button */}
            <div className="absolute right-4 top-4 cursor-pointer" onClick={onClose}>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            {/* Avatar */}
            <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center overflow-hidden">
                <img src="/Ellipse .png" alt="avatar" className='w-full h-full object-cover' />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center pt-16 pb-6 px-6 bg-white">
            {/* Name, role, verified */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-[#2B3A29]">{user.name || 'Stephen Joe'}</h2>
                {/* Verified badge */}
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#4CAF50" />
                  <path d="M7.5 10.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="text-[#5B6D5B] text-base font-medium mt-1">{user.role || 'Senior Tutor'}</div>
            </div>
            {/* Skills/tags */}
            <div className="flex flex-wrap gap-2 justify-center mt-4 mb-4 cursor-pointer">
              {(user.skills || ['ADVANCE AI', 'MACHINE LEARNING', 'IOTs', 'DATA ANALYSIS', 'ROBOTICS']).map(skill => (
                <span key={skill} className="px-4 py-1 rounded-full border border-[#B7C9B7] text-[#5B6D5B] text-sm font-medium bg-[#F9FAF9]">{skill}</span>
              ))}
            </div>
            {/* Talk time and sessions */}
            <div className="flex justify-center items-center w-full border-y border-gray-200 py-4 mb-4 gap-8 cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[#7A8B7A]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#7A8B7A" strokeWidth="2" fill="none" />
                    <path d="M12 6v6l4 2" stroke="#7A8B7A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="font-semibold text-lg">{user.talkTime || '20 hours'}</span>
                </div>
                <span className="text-xs text-[#7A8B7A] mt-1">talk time</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[#7A8B7A]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="#7A8B7A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="font-semibold text-lg">{user.sessionsCount || 6}</span>
                </div>
                <span className="text-xs text-[#7A8B7A] mt-1">sessions</span>
              </div>
            </div>
            {/* Description */}
            <div className="w-full mt-4">
              <div className="text-[#2B3A29] font-semibold mb-1">Personal Description</div>
              <div className="text-[#5B6D5B] text-sm leading-relaxed">
                {user.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'}
              </div>
            </div>
            {/* Email */}
            <div className="w-full mt-4">
              <div className="text-[#2B3A29] font-semibold mb-1">Email Address</div>
              <div className="text-[#5B6D5B] text-sm">{user.email || 'staff@oauife.edu.ng'}</div>
            </div>
            {/* Edit Profile Button */}
            <button className="mt-6 w-full py-3 bg-[#4CAF50] text-white rounded-2xl text-lg font-semibold hover:bg-[#43a047] transition"><Link to="/edit-profile"> Edit your Profile</Link></button>
            {/* Footer */}
            <div className="flex justify-center items-center gap-4 mt-6 w-full text-xs text-[#7A8B7A] border-t border-gray-200 pt-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileCard;