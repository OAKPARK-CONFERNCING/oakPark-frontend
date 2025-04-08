// components/SessionModal.tsx
import React from 'react';
import closeBtn from '../assets/icons/closeBtn.png';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Transparent overlay (click to close) - completely transparent */}
      <div 
        className="absolute inset-0 bg-bg-secondary/36"
        onClick={onClose}
      />
      
      {/* Modal content with opaque white/dark background */}
      <div className="relative z-10 w-96 max-w-2xl rounded-xl bg-white shadow text-text-primary overflow-hidden  dark:border-gray-700">

        <div className="p-6 flex flex-col ">
          {/* Join Session Section */}
          <div className="">
           <div className='flex justify-between items-center mb-4'>
              <h3 className="text-[20px] font-semibold  text-text-primary font-inter-500">Join a session</h3>
              <button onClick={onClose} className="text-text-primary size-4 cursor-pointer">
                <img src={closeBtn} alt="close" className=''/>
              </button>
           </div>
              <p className="text-sm text-text-primary font-inter-500 mb-4">
              Enter the session key to participate in this session
            </p>
            <input
              type="text"
              placeholder="Enter the session key"
              className="w-full px-4 py-2 bg-grey rounded-lg focus:ring-2 bg-gray "
            />
            <button className="mt-4 w-full bg-[#4CAF50] hover:bg-medium-green-100 cursor-pointer text-white py-2 px-4 rounded-lg transition">
              Join Session
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SessionModal;