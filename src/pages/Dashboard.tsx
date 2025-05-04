import SessionCard from "@/components/SessionCard";
import { SearchIcon, Eye as ViewIcon } from "lucide-react";
import MeetingList from '../components/MeetingList';
import data from '../data/data.json';
import { useState } from "react";
import SessionCardFade from "@/components/SessionCardFade";

// Define missing types
interface Participant {
  id: string;
  name: string;
  email: string;
}

interface Meeting {
  id: number;
  meetingTitle: string;
  date: string;
  status: string;
  duration: string;
  participants: Participant[];
}

interface Data {
  meetings: Meeting[];
}

interface CardData {
  id: string;
  title: string;
  topimg: string;
  category: string;
  progress: number;
  timeRemaining: string;
  instructor: {
    name: string;
    email: string;
    avatar: string;
  };
}

interface CardDataResponse {
  cardData: CardData[];
}

const Dashboard = () => {
  // Fixed the typing for cardData
  const [cards] = useState<CardData[]>((data as CardDataResponse).cardData || []);
  const meetingsData = data as Data;

  return (
    <div className="overflow-x-hidden px-4 md:px-6 max-w-[1400px] mx-auto">
      {/* search and input */}
      <div className="flex flex-row mt-4 border border-gray-200 rounded-full p-3 md:p-4 w-full gap-3">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          placeholder="Enter a Session title"
          className="w-full focus:outline-none"
        />
      </div>
      
      {/* banner */}
      <div className="h-auto md:h-[287px] w-full bg-gradient-to-r from-blue-600 to-green-500 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row my-6">
        <div className="w-full md:w-3/4 p-6 md:p-0">
          <h1 className="text-2xl md:text-[40px] text-white font-bold mb-3 md:pl-[60px] md:mt-[25px]">
            Fast, reliable and secure conferencing
          </h1>
          <p className="text-base text-white opacity-90 w-full md:w-[547px] md:h-[75px] md:pl-[60px] md:mt-[25px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="w-full md:w-1/4 flex justify-center items-center p-4 md:p-0">
          <img src="/rightreal.png" className="object-contain h-[150px] md:h-full" alt="Conference monitor" />
        </div>
      </div>
      
      {/* ongoing sessions */}
      <div className="mt-8">
        <h2 className="font-semibold text-lg text-[#8FA48F] mb-6 ml-2">Ongoing Sessions</h2>
        
        {/* Changed to grid for better responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map(card => (
            <SessionCard
              key={card.id}
              title={card.title}
              imageUrl={card.topimg} 
              category={card.category}
              progress={card.progress}
              timeRemaining={card.timeRemaining}
              instructor={{
                name: card.instructor.name,
                email: card.instructor.email,
                avatar: card.instructor.avatar
              }}
            />
          ))}

          <SessionCardFade />
        </div>
        
        {/* completed sessions */}
        <h2 className="font-semibold text-lg text-[#8FA48F] mt-12 mb-6 ml-2">Completed Sessions</h2>

        <div>
          <MeetingList 
            data={meetingsData}
            statusFilter="Complete"     
            status='Complete'
            buttonText="View"
            buttonIcon={<ViewIcon size={16} />} // Fixed viewIcon reference
            buttonAction="view"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;