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
  cardIndex:number
}

const SessionCard = ({ 
  title, 
  category, 
  imageUrl, 
  instructor,
  progress = 0,
  cardIndex=0,
  timeRemaining = "0 min"
}: SessionCardProps) => {

  const getProgressBarColor = (index: number) => {
    // You can define your own color logic based on index
    const colors = [
      'bg-medium-green',    // First card - green
      'bg-[#FFC107]',       // Second card - yellow
      'bg-[#FF5722]',        // Third card - orange
      'bg-[#04A69C',
    ];
    
    // Use modulo to handle cases where there are more cards than colors
    return colors[index % colors.length];
  };
  return (
    <div className="p-4 card bg-white rounded-2xl overflow-hidden   shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.16)] transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`${title} session thumbnail`} 
          className="w-full h-48 object-cover rounded-2xl"
        />
        <p className="text-sm text-[#30434A] px-2 rounded-xl font-inter-500 absolute bottom-5 right-5 py-1  bg-border-color-grey">{timeRemaining}</p>
      </div>
      
      <div className="card-content py-5">
      <div className="w-auto inline-flex border mb-3  border-inActive-green bg-light-green font-inter-500 text-text-primary  px-2 py-1 rounded-xl text-xs">
          {category}
        </div>
        <h3 className="font-inter-500 text-text-primary text-[15px] mb-2">{title}</h3>
        
        {progress > 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                // className="bg-blue-500 h-2 rounded-full" 
                className={`h-2 rounded-full ${getProgressBarColor(cardIndex)}`}
                style={{ width: `${progress}%` }}
                aria-label={`${progress}% complete`}
              ></div>
            </div>
            
          </div>
        )}
      </div>
      
      {/* instructor footer */}
      <div className="pt-5 flex items-center gap-3 border-t border-gray-100">
        <img 
          src={instructor.avatar} 
          alt={`${instructor.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover shadow-sm" 
        />
        <div>
          <h4 className="font-inter-700 text-text-primary text-sm ">{instructor.name}</h4>
          <p className=" text-xs  truncate text-inActive-green font-inter-500">{instructor.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;