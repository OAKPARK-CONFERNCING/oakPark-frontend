import SessionCard from "@/components/SessionCard";
import { SearchIcon } from "lucide-react";
import cardData from '../data/data.json';
import { useState } from "react";

const Dashboard = () => {
  // Fix #1: Access the correct property from the imported JSON
  const [cards] = useState(cardData.cardData || []);

  return (
    <div className="overflow-x-hidden">
      {/* search and input */}
      <div className="flex flex-row mt-4 border border-gray-200 rounded-full p-4 w-full gap-3">
        <SearchIcon />
        <input
          type="text"
          placeholder="Enter a Session title"
          className="w-full"
        />
      </div>
      
      {/**banner */}
      <div className="h-[287px] w-full bg-gradient-to-r from-blue-600 to-green-500 rounded-lg overflow-hidden shadow-lg flex flex-row m-2">
        <div className="left w-3/4">
          <h1 className="text-2xl text-white font-bold mb-3 pl-[60px] text-[40px] mt-[25px]">
            Fast, reliable and secure conferencing
          </h1>
          <p className="text-base text-white opacity-90 w-[547px] h-[75px] pl-[60px] mt-[25px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="right w-1/4">
          <img src="/monitor.png" className="object-cover" alt="" />
        </div>
      </div>
      
      {/* ongoing */}
      <div className="mt-8">
        <h1 className="font-semibold font-inter-400 text-[#8FA48F] mb-4">Ongoing Sessions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fix #2: Map through cards array to render SessionCard components */}
          {cards.map(card => (
            <SessionCard
              key={card.id}
              title={card.title}
              imageUrl={card.topimg} // Fix #3: Match property names
              category={card.category}
              progress={card.progress}
              timeRemaining={card.timeRemaining}
              instructor={card.instructor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;