import  { useState } from 'react';

const NewSession = ({onClose}:{onClose:()=>void}) => {
  const [privacy, setPrivacy] = useState('Private');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                // transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-bg-secondary/36" 
                onClick={onClose}
            />
      <div className="relative z-10 bg-white rounded-2xl shadow-md p-8 w-[600px] max-w-full border border-gray-100">
        <h1 className="text-center text-2xl font-semibold mb-8">Create a new Session</h1>
        <form className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title <span className="text-xs text-gray-400">required</span></label>
            <input type="text" placeholder="" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none" />
          </div>
          {/* Duration */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Duration <span className="text-xs text-gray-400">(optional)</span></label>
            <select className="w-20 px-3 py-2 border border-gray-200 rounded-md focus:outline-none">
              <option value="">--</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
            </select>
          </div>
          {/* Image upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Add Image<span className="text-xs text-gray-400">(optional)</span></label>
            <div className="flex gap-2">
              <input type="text" placeholder="" className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none" disabled />
              <button type="button" className="w-10 h-10 rounded-full bg-[#E6F4EA] text-[#4CAF50] flex items-center justify-center text-2xl font-bold">+</button>
            </div>
          </div>
          {/* Privacy */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Would you like your session to be private or public? <span className="text-xs text-gray-400">required</span></label>
            <div className="flex gap-8 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="privacy" value="Private" checked={privacy === 'Private'} onChange={() => setPrivacy('Private')} className="accent-[#4CAF50]" />
                <span>Private</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="privacy" value="Public" checked={privacy === 'Public'} onChange={() => setPrivacy('Public')} className="accent-[#4CAF50]" />
                <span>Public</span>
              </label>
            </div>
          </div>
          {/* Create Session button */}
          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-[#4CAF50] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Create Session</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSession;