interface InstructorType {
  name: string;
  email: string;
  avatar: string;
}

interface SessionCardProps {
  title: string;
  imageUrl: string;
  category: string;
  progress?: number; // Made optional with ?
  timeRemaining?: string; // Made optional with ?
  instructor: InstructorType;
}

const SessionCard = ({ 
  title, 
  category, 
  imageUrl, 
  instructor,
  progress = 0,
  timeRemaining = "0 min"
}: SessionCardProps) => {
  return (
    <div className="card bg-white rounded-lg overflow-hidden max-w-sm m-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.16)] transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`${title} session thumbnail`} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
          {category}
        </div>
      </div>
      
      <div className="card-content p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        
        {progress > 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
                aria-label={`${progress}% complete`}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{timeRemaining} remaining</p>
          </div>
        )}
      </div>
      
      {/* instructor footer */}
      <div className="p-4 flex items-center gap-3 border-t border-gray-100">
        <img 
          src={instructor.avatar} 
          alt={`${instructor.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover shadow-sm" 
        />
        <div>
          <h4 className="font-medium text-sm">{instructor.name}</h4>
          <p className="text-xs text-gray-500">{instructor.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;