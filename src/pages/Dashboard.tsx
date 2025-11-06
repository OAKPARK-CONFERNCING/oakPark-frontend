"use client";
import SessionCard from "@/components/SessionCard";
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import MeetingList from "../components/MeetingList";
import data from "../data/data.json";
import { useState, useRef, useEffect } from "react";
import SessionCardFade from "@/components/SessionCardFade";
import viewIcon from "../assets/icons/viewIcon.png";
import { useAppSelector } from '../redux/store';
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import UserProfileCard from "@/components/UserProfileCard";
import { useDispatch } from 'react-redux';
import { hideProfileCard } from '../redux/userSlice';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const maskImage = useScrollOverflowMask(scrollXProgress);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);


    const { currentUser, isProfileCardVisible } = useAppSelector((state) => state.user);
  const typedData = data as unknown as AppData;


// const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
//   const typedData = data as unknown as AppData;

//   const currentUser = {
//     name: "Emmanuel A.",
//     email: "emmanuel@example.com",
//     avatar: "/path/to/avatar.jpg", // Replace with actual path to avatar
//     role: "Admin",
//     joinDate: "June 2023",
//     additionalInfo: {
//       "Total Sessions": "24",
//       "Time Spent": "20 hours"
//     }
//   };

//   const toggleProfileCard = () => {
//     setIsProfileCardVisible(!isProfileCardVisible);
//   };

//   // Close profile card if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (isProfileCardVisible && 
//           event.target instanceof Element && 
//           !event.target.closest('.profile-card') && 
//           !event.target.closest('.profile-image-container')) {
//         setIsProfileCardVisible(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isProfileCardVisible]);

  const [cards] = useState<CardData[]>(
    typedData.cardData.map((card) => ({
      ...card,
      id: card.id.toString(),
      instructor: {
        ...card.instructor,
        avatar: card.instructor.avatar || viewIcon,
      },
    }))
  );

  // Process all meetings data
  const allMeetingsData = typedData.meetings.map((meeting) => ({
    ...meeting,
    participants: meeting.participants.map((participant) => ({
      ...participant,
      id: participant.id.toString(),
    })),
  }));

  // Filter to get only completed meetings and limit to 3
  const completedMeetings = allMeetingsData
    .filter((meeting) => meeting.status === "Completed")
    .slice(0, 3);

  // Handle scroll buttons visibility
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Width of one card
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const dispatch = useDispatch();
  return (
    <motion.div 
    //  initial= {{ opacity: 0, y: 20 }}
    //  animate= {{ opacity: 1, y: 0 }}
    //  exit= {{ opacity: 0, y: -20 }}
    //   transition= { {duration: 0.3} }
    className="overflow-x-hidden px-4 md:px-6 max-w-[1400px] mx-auto relative">
        {/* Add UserProfileCard component */}
      <UserProfileCard 
         isVisible={isProfileCardVisible} 
        onClose={() => dispatch(hideProfileCard())} 
        user={currentUser} 
      />
      
      {/* search and input */}
      <div className="bg-fade-bg flex flex-row mt-4 border border-gray-200 rounded-2xl p-3 md:p-4 w-full gap-3">
        <SearchIcon className="text-inActive-green" />
        <input
          type="text"
          placeholder="Enter a Session title"
          className="w-full focus:outline-none"
        />
      </div>

      {/* banner */}
      <div className="h-auto md:h-[287px] w-full md:bg-gradient-to-r bg-gradient-to-b from-[#5856D6] to-medium-green rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row my-6">
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
          <img
            src="/rightreal.png"
            className="object-contain h-[150px] md:h-full"
            alt="Conference monitor"
          />
        </div>
      </div>

      {/* ongoing sessions */}
      <div className="mt-8">
        <h2 className="font-inter-600 text-lg text-inActive-green mb-6">
          Ongoing Sessions
        </h2>

        {/* Horizontal scroll for mobile to md, grid for lg and up */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            style={{ maskImage }}
            className="flex lg:hidden overflow-x-auto pb-4 space-x-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
          >
            {cards.slice(0, 3).map((card, index) => (
              <motion.div
                key={card.id}
                className="min-w-[300px] max-w-[320px] flex-shrink-0 snap-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SessionCard
                  title={card.title}
                  imageUrl={card.topimg}
                  category={card.category}
                  progress={card.progress}
                  timeRemaining={card.timeRemaining}
                  instructor={{
                    name: card.instructor.name,
                    email: card.instructor.email,
                    avatar: card.instructor.avatar,
                  }}
                  cardIndex={index}
                />
              </motion.div>
            ))}

            <motion.div
              className="min-w-[300px] max-w-[320px] flex-shrink-0 snap-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SessionCardFade />
            </motion.div>
          </motion.div>

          {/* Scroll Buttons */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showLeftButton ? 1 : 0 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 p-2 rounded-full shadow-lg z-10 lg:hidden"
            onClick={() => scroll("left")}
            style={{ pointerEvents: showLeftButton ? "auto" : "none" }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showRightButton ? 1 : 0 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 p-2 rounded-full shadow-lg z-10 lg:hidden"
            onClick={() => scroll("right")}
            style={{ pointerEvents: showRightButton ? "auto" : "none" }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Grid layout for lg screens and up */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.slice(0, 3).map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SessionCard
                title={card.title}
                imageUrl={card.topimg}
                category={card.category}
                progress={card.progress}
                timeRemaining={card.timeRemaining}
                instructor={{
                  name: card.instructor.name,
                  email: card.instructor.email,
                  avatar: card.instructor.avatar,
                }}
                cardIndex={index}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SessionCardFade />
          </motion.div>
        </div>

        {/* completed sessions - limited to 3 */}
        <div className="flex justify-between items-center mt-12 mb-6">
          <h2 className="font-inter-600 text-lg text-inActive-green">
            Completed Sessions
          </h2>
          {completedMeetings.length > 0 && (
            <a
              href="/history"
              className="text-sm text-header-text-primary hover:underline"
            >
              View All
            </a>
          )}
        </div>

        <div>
          <MeetingList
            data={{ meetings: completedMeetings as any }}
            statusFilter="Completed"
            status="Completed"
            buttonText="View"
            buttonIcon={viewIcon}
            buttonAction="view"
          />
        </div>
      </div>
    </motion.div>
  );
};

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress: any) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

export default Dashboard;
