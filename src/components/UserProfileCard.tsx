import React from 'react';

interface UserProfileCardProps {
  isVisible: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar: string;
    role?: string;
    joinDate?: string;
    additionalInfo?: {
      [key: string]: string;
    };
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ isVisible, onClose, user }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute right-0 top-16 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="relative p-5 border-b">
        <div className="absolute right-4 top-4 cursor-pointer" onClick={onClose}>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg">{user.name}</h4>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {user.role && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">Role</span>
            <p className="font-medium">{user.role}</p>
          </div>
        )}

        {user.joinDate && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">Member since</span>
            <p className="font-medium">{user.joinDate}</p>
          </div>
        )}

        {user.additionalInfo && Object.entries(user.additionalInfo).map(([key, value]) => (
          <div key={key} className="mb-4">
            <span className="text-sm text-gray-500">{key}</span>
            <p className="font-medium">{value}</p>
          </div>
        ))}

        <button 
          className="mt-2 w-full py-2 bg-medium-green text-white rounded-md hover:bg-opacity-90 transition"
        >
          View Profile
        </button>

        <button 
          className="mt-2 w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;