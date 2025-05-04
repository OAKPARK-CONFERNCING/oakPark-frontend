import SessionCard from "@/components/SessionCard";
import { SearchIcon } from "lucide-react";
import MeetingList from '../components/MeetingList';
import data from '../data/data.json';
import { useState } from "react";
import SessionCardFade from "@/components/SessionCardFade";
import viewIcon from '../assets/icons/viewIcon.png';

// Define types
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

interface AppData {
  cardData: CardData[];
  meetings: Meeting[];
}

interface CardData {
  id: string | number;
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

const Dashboard = () => {
  const typedData = data as unknown as AppData;
  
  const [cards] = useState<CardData[]>(typedData.cardData.map(card => ({
    ...card,
    id: card.id.toString(),
    instructor: {
      ...card.instructor,
      avatar: card.instructor.avatar || viewIcon,
    },
  })));
  
  // Process all meetings data
  const allMeetingsData: Meeting[] = typedData.meetings.map(meeting => ({
    ...meeting,
    participants: meeting.participants.map(participant => ({
      ...participant,
      id: participant.id.toString(),
    })),
  }));
  
  // Filter to get only completed meetings and limit to 3
  const completedMeetings = allMeetingsData
    .filter(meeting => meeting.status === "Complete")
    .slice(0, 3); // Limit to 3 meetings

  return (
    <div className="overflow-x-hidden px-4 md:px-6 max-w-[1400px] mx-auto">
      {/* search and input */}
      <div className="bg-fade-bg  flex flex-row mt-4 border border-gray-200 rounded-2xl p-3 md:p-4 w-full gap-3">
        <SearchIcon className="text-inActive-green" />
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
        <h2 className="font-inter-600 text-lg text-inActive-green mb-6 ">Ongoing Sessions</h2>
        
        {/* Horizontal scroll for mobile to md, grid for lg and up */}
        <div className="flex lg:hidden overflow-x-auto pb-4 space-x-4 -mx-4 px-4">
          {cards.slice(0,1).map((card,index) => (
            <div key={card.id} className="min-w-[280px] max-w-[320px] flex-shrink-0">
              <SessionCard
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
                cardIndex={index}
              />
            </div>
          ))}
          
          <div className="min-w-[280px] max-w-[320px] flex-shrink-0">
            <SessionCardFade />
          </div>
        </div>
        
        {/* Grid layout for lg screens and up */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.slice(0,3).map(card => (
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
              cardIndex={cards.indexOf(card)}
            />
          ))}
          
          <SessionCardFade />
        </div>
        
        {/* completed sessions - limited to 3 */}
        <div className="flex justify-between items-center mt-12 mb-6">
          <h2 className="font-inter-600 text-lg text-inActive-green">Completed Sessions</h2>
          {completedMeetings.length > 0 && (
            <a href="/history" className="text-sm text-header-text-primary hover:underline">
              View All
            </a>
          )}
        </div>

        <div>
          <MeetingList 
            data={{ meetings: completedMeetings }}
            statusFilter="Complete"     
            status="Complete"
            buttonText="View"
            buttonIcon={viewIcon}
            buttonAction="view"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import SessionCard from "@/components/SessionCard";
// import { SearchIcon, Eye as ViewIcon } from "lucide-react";
// import MeetingList from '../components/MeetingList';
// import data from '../data/data.json';
// import { useState } from "react";
// import SessionCardFade from "@/components/SessionCardFade";
// import viewIcon from '../assets/icons/viewIcon.png'

// // Define missing types
// interface Participant {
//   id: string;
//   name: string;
//   email: string;
// }

// interface Meeting {
//   id: number;
//   meetingTitle: string;
//   date: string;
//   status: string;
//   duration: string;
//   participants: Participant[];
// }

// interface DataMeet {
//   meetings: Meeting[];
// }

// interface CardData {
//   id: string;
//   title: string;
//   topimg: string;
//   category: string;
//   progress: number;
//   timeRemaining: string;
//   instructor: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }

// interface CardDataResponse {
//   cardData: CardData[];
// }

// const Dashboard = () => {
//   // Fixed the typing for cardData
//   const [cards] = useState<CardData[]>((data as CardDataResponse).cardData || []);

//   const meetingsData = data as DataMeet;

//   return (
//     <div className="overflow-x-hidden px-4 md:px-6 max-w-[1400px] mx-auto">
//       {/* search and input */}
//       <div className="flex flex-row mt-4 border border-gray-200 rounded-full p-3 md:p-4 w-full gap-3">
//         <SearchIcon className="text-gray-400" />
//         <input
//           type="text"
//           placeholder="Enter a Session title"
//           className="w-full focus:outline-none"
//         />
//       </div>
      
//       {/* banner */}
//       <div className="h-auto md:h-[287px] w-full bg-gradient-to-r from-blue-600 to-green-500 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row my-6">
//         <div className="w-full md:w-3/4 p-6 md:p-0">
//           <h1 className="text-2xl md:text-[40px] text-white font-bold mb-3 md:pl-[60px] md:mt-[25px]">
//             Fast, reliable and secure conferencing
//           </h1>
//           <p className="text-base text-white opacity-90 w-full md:w-[547px] md:h-[75px] md:pl-[60px] md:mt-[25px]">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat.
//           </p>
//         </div>

//         <div className="w-full md:w-1/4 flex justify-center items-center p-4 md:p-0">
//           <img src="/rightreal.png" className="object-contain h-[150px] md:h-full" alt="Conference monitor" />
//         </div>
//       </div>
      
//       {/* ongoing sessions */}
//       <div className="mt-8">
//         <h2 className="font-semibold text-lg text-[#8FA48F] mb-6 ml-2">Ongoing Sessions</h2>
        
//         {/* Changed to grid for better responsiveness */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {cards.map(card => (
//             <SessionCard
//               key={card.id}
//               title={card.title}
//               imageUrl={card.topimg} 
//               category={card.category}
//               progress={card.progress}
//               timeRemaining={card.timeRemaining}
//               instructor={{
//                 name: card.instructor.name,
//                 email: card.instructor.email,
//                 avatar: card.instructor.avatar
//               }}
//             />
//           ))}

//           <SessionCardFade />
//         </div>
        
//         {/* completed sessions */}
//         <h2 className="font-semibold text-lg text-[#8FA48F] mt-12 mb-6 ml-2">Completed Sessions</h2>

//         <div>
//           <MeetingList 
//             data={meetingsData}
//             statusFilter="Complete"     
//             status='Complete'
//             buttonText="View"
//             buttonIcon={viewIcon } // Fixed viewIcon reference
//             buttonAction="view"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;