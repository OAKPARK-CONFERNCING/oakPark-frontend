import React from 'react';

const Edit = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAF9]">
      <div className="bg-white rounded-2xl shadow-md p-8 w-[600px] max-w-full border border-gray-100">
        <h1 className="text-center text-2xl font-bold mb-8">Edit your Profile</h1>
        <form className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Username */}
          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-2">Provide Username <span className="text-xs">(Firstly, enter your first name)</span></label>
            <div className="flex gap-2">
              <input type="text" placeholder="Stephen" className="w-1/2 px-3 py-2 border border-gray-200 rounded-md focus:outline-none" />
              <input type="text" placeholder="Joe" className="w-1/2 px-3 py-2 border border-gray-200 rounded-md focus:outline-none" />
            </div>
          </div>
          {/* Email */}
          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-2">Email address</label>
            <input type="email" placeholder="staff@oauife.edu.ng.com" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none" />
          </div>
          {/* Role */}
          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-2">Employment <span className="text-xs">(role)</span> <span className="inline-flex items-center ml-2 text-green-600 font-medium"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#4CAF50"/><path d="M7.5 10.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Get verified</span></label>
            <input type="text" placeholder="Senior Tutor" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none" />
          </div>
          {/* Avatar upload */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <label className="block text-sm text-gray-600 mb-2">Select new image:</label>
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              <img src="/Ellipse .png" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-gray-500 mb-2">Future Avatar.jpg</span>
            <input type="file" className="hidden" id="avatar-upload" />
            <label htmlFor="avatar-upload" className="text-xs text-green-600 cursor-pointer underline">Change</label>
          </div>
          {/* Interests */}
          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-2">Add Interests</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Advance AI, Machine Learning, IOTs, Data Analysis" className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none" />
              <button type="button" className="w-10 h-10 rounded-full bg-[#E6F4EA] text-[#4CAF50] flex items-center justify-center text-2xl font-bold">+</button>
            </div>
            <span className="text-xs text-gray-400 ml-1">(Advance AI, Machine Learning, IOTs, Data Analysis)</span>
          </div>
          {/* About me */}
          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-2">About me</label>
            <textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none resize-none" rows={3}></textarea>
          </div>
          {/* Update button */}
          <div className="col-span-2 flex justify-end mt-4">
            <button type="submit" className="bg-[#4CAF50] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;