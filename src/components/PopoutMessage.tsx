// components/SessionModal.tsx
import React from 'react';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg dark:bg-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h2 className="text-xl font-bold">Fast, reliable and secure confc</h2>
          <p className="text-sm opacity-90 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipis nectus nulla vitae nec odio eu magna aliqua.
          </p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Join Session Section */}
          <div className="border-r pr-6 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Join a session</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Enter the session key to participate in this session
            </p>
            <input
              type="text"
              placeholder="Enter the session key"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
              Join Session
            </button>
          </div>

          {/* Create Session Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Create a session</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Conflicte with google</span>
              </li>
            </ul>
            <button className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
              Create New Session
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 flex justify-end dark:bg-gray-700">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;