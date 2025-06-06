import React from 'react';

export default function NewSession() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create a new Session</h2>
        <div className="w-20 h-1 bg-green-400 rounded-full mb-6" />
        <form className="space-y-7 w-full">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title <span className="text-red-500 text-xs">required</span></label>
            <input type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Enter session title" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration <span className="text-gray-400 text-xs">(optional)</span></label>
            <input type="number" min="0" className="w-32 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Minutes" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Add Image <span className="text-gray-400 text-xs">(optional)</span></label>
            <div className="flex items-center gap-2">
              <input type="text" className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Image URL" />
              <button type="button" className="bg-green-100 hover:bg-green-200 rounded-full p-2 text-green-600 font-bold text-lg shadow-sm transition">+</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Would you like your session to be private or public? <span className="text-red-500 text-xs">required</span></label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="privacy" value="private" className="accent-green-500 w-4 h-4" required />
                <span className="text-gray-700 font-medium">Private</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="privacy" value="public" className="accent-green-500 w-4 h-4" required />
                <span className="text-gray-700 font-medium">Public</span>
              </label>
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold text-lg shadow hover:bg-green-600 transition">Create Session</button>
        </form>
      </div>
    </div>
  );
} 