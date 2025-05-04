import { useState } from 'react';

interface InstructorType {
  name: string;
  email: string;
  avatar: string;
}

interface SessionCardFadeProps {
  title?: string;
  imageUrl?: string;
  category?: string;
  instructor?: InstructorType;
}

const SessionCardFade = ({
  title = "Introduction to Artificial Intelligence and Machine Learning",
  imageUrl = "/card3.png",
  category = "ARTIFICIAL INTELLIGENCE",
  instructor = {
    name: "Emmanuel A.",
    email: "emmanuel.a@example.com",
    avatar: "/avatar.png"
  }
}: SessionCardFadeProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleSeeMore = () => {
    setExpanded(!expanded);
    // Here you would typically navigate to a page showing more courses
  };
  
  return (
    <div className="card bg-sky-50 rounded-lg overflow-hidden max-w-sm m-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`${title} thumbnail`} 
          className="w-full h-48 object-cover opacity-70"
        />
        <div className="absolute top-3 right-3 bg-blue-400 text-white px-2 py-1 rounded-md text-xs">
          {category}
        </div>
        <div className="absolute bottom-4 left-4">
          <button 
            onClick={handleSeeMore}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-gray-100 transition-colors"
          >
            <span className="flex items-center gap-1">
              <span>+</span>
              <span>See more</span>
            </span>
          </button>
        </div>
      </div>
      
      <div className="card-content p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-700">{title}</h3>
      </div>
      
      {/* instructor footer */}
      <div className="p-4 flex items-center gap-3 border-t border-gray-200">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm">
          {instructor.avatar ? (
            <img 
              src={instructor.avatar} 
              alt={`${instructor.name}'s profile`}
              className="w-10 h-10 rounded-full object-cover shadow-sm" 
            />
          ) : (
            instructor.name.split(' ').map(name => name[0]).join('').substring(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-700">{instructor.name}</h4>
          <p className="text-xs text-gray-500">{instructor.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionCardFade;