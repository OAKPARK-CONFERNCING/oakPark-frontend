import { useState, useEffect } from "react";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Users,


} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ParticipantVideo from "@/components/participant-video";
import SidebarPanel from "@/components/sidebar-panel";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import videoRecording from '@/assets/icons/video-recording.png'
import videoRec from '@/assets/icons/videoRec.png'
import shareScreenOn from '@/assets/icons/share-screen2.png'
import clock from '@/assets/icons/clock.png'
import videoOn from '@/assets/icons/video-On.png'
import videoOff from '@/assets/icons/video-off.png'
import micOn from '@/assets/icons/micOn.png'
import micOff from '@/assets/icons/mic-off.png'
import closeCall from '@/assets/icons/call-end.png'
import shareScreen from '@/assets/icons/share-screen.png'
import { ToastProvider } from "@radix-ui/react-toast";


// Types for participants
type Role = "host" | "co-host" | "member" | "participant" | "guest";

interface Participant {
  id: string;
  name: string;
  email: string;
  role: Role;
  videoOn: boolean;
  audioOn: boolean;
}

// Mock data for participants with various roles
const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Micheal Mbasa",
    email: "micheal.mbasa@gmail.com",
    role: "host",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "2",
    name: "Mariam Chen",
    email: "mariam.chen@gmail.com",
    role: "co-host",
    videoOn: false,
    audioOn: true,
  },
  {
    id: "3",
    name: "Norman Heisch",
    email: "norman.chen@gmail.com",
    role: "member",
    videoOn: true,
    audioOn: false,
  },
  {
    id: "4",
    name: "Kate Moore",
    email: "kate.moore@gmail.com",
    role: "member",
    videoOn: false,
    audioOn: false,
  },
  {
    id: "5",
    name: "Rajesh Sanoramui",
    email: "rajesh.sanoramui@gmail.com",
    role: "member",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "6",
    name: "Isabel Alfonso",
    email: "isabel.alfonso@gmail.com",
    role: "participant",
    videoOn: false,
    audioOn: true,
  },
  {
    id: "7",
    name: "Jordan Heathrobe",
    email: "jordan.heathrobe@gmail.com",
    role: "participant",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "8",
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    role: "participant",
    videoOn: false,
    audioOn: true,
  },
  {
    id: "9",
    name: "David Kim",
    email: "david.kim@gmail.com",
    role: "participant",
    videoOn: true,
    audioOn: false,
  },
  {
    id: "10",
    name: "Emma Watson",
    email: "emma.watson@gmail.com",
    role: "participant",
    videoOn: false,
    audioOn: true,
  },
  {
    id: "11",
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@gmail.com",
    role: "guest",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "12",
    name: "Priya Patel",
    email: "priya.patel@gmail.com",
    role: "guest",
    videoOn: false,
    audioOn: false,
  },
  {
    id: "13",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@gmail.com",
    role: "guest",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "14",
    name: "Olivia Smith",
    email: "olivia.smith@gmail.com",
    role: "guest",
    videoOn: false,
    audioOn: true,
  },
  {
    id: "15",
    name: "Liam Wilson",
    email: "liam.wilson@gmail.com",
    role: "guest",
    videoOn: true,
    audioOn: false,
  },
  {
    id: "16",
    name: "Sophia Chen",
    email: "sophia.chen@gmail.com",
    role: "guest",
    videoOn: false,
    audioOn: true,
  },
  {
    id: "17",
    name: "Noah Garcia",
    email: "noah.garcia@gmail.com",
    role: "guest",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "18",
    name: "Ava Brown",
    email: "ava.brown@gmail.com",
    role: "guest",
    videoOn: false,
    audioOn: false,
  },
  {
    id: "19",
    name: "Ethan Davis",
    email: "ethan.davis@gmail.com",
    role: "guest",
    videoOn: true,
    audioOn: true,
  },
  {
    id: "20",
    name: "Isabella Martinez",
    email: "isabella.martinez@gmail.com",
    role: "guest",
    videoOn: false,
    audioOn: true,
  },
];

export default function VideoConference() {
  const [participants, setParticipants] =
    useState<Participant[]>(mockParticipants);
  const [activeParticipant, setActiveParticipant] = useState<Participant>(
    // Default to host as the active participant
    mockParticipants.find((p) => p.role === "host") || mockParticipants[0]
  );
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isShareScreen, setIsShareScreen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [meetingTime, setMeetingTime] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(6);
  const isMobile = useMobile();
  const isTablet = useWindowSize(1286);

  // Update meeting time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update visible thumbnails based on screen size
  useEffect(() => {
    if (isMobile) {
      setVisibleThumbnails(3);
    } else if (isTablet) {
      setVisibleThumbnails(4);
    } else {
      setVisibleThumbnails(6);
    }
  }, [isMobile, isTablet]);

  const titleShort = (title: string) => {
    if (title.length > 50) {
      return title.substring(0, 50) + '...'
    }
  }

  // Format meeting time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle participant video (in a real app, this would interact with WebRTC)
  const toggleParticipantVideo = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, videoOn: !p.videoOn } : p))
    );

    if (activeParticipant.id === id) {
      setActiveParticipant((prev) => ({ ...prev, videoOn: !prev.videoOn }));
    }
  };

  // Set a participant as the main active view
  const setAsActive = (participant: Participant) => {
    setActiveParticipant(participant);
  };

  // Get thumbnails to display
  // Priority: host, co-host, members, then others
  const getThumbnailParticipants = () => {
    // Skip the active participant if they would be in thumbnails
    const filteredParticipants = participants.filter(
      (p) => p.id !== activeParticipant.id
    );

    // Sort by role priority
    const sortedParticipants = [...filteredParticipants].sort((a, b) => {
      const roleOrder = {
        host: 0,
        "co-host": 1,
        member: 2,
        participant: 3,
        guest: 4,
      };
      return roleOrder[a.role] - roleOrder[b.role];
    });

    return sortedParticipants.slice(0, visibleThumbnails);
  };

  const thumbnailParticipants = getThumbnailParticipants();
  const remainingParticipantsCount =
    participants.length - thumbnailParticipants.length - 1; // -1 for active participant

  return (
    <div className="  bg-[#F7FFF8] flex flex-1 px-5 mx-auto">
      <div className="flex flex-col min-h-screen w-[100%] mx-auto ">
        {/* Header */}
        <header className="border border-light-green rounded-2xl my-5  bg-white px-4 py-2  flex justify-between items-center">
          <div className='flex items-center space-x-1'>
            <img src={videoRecording} alt="video recorder icon" />
            <p className="font-inter-700 text-medium-green ">

              OakPark
            </p>
          </div>
          <h1 className="hidden md:inline text-header-text-primary font-inter-700">

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {titleShort('Workshop: An introduction to Artificial Intelligence and Machine Learning')}</TooltipTrigger>
                <TooltipContent >Workshop: An introduction to Artificial Intelligence and Machine Learning</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-red-500 justify-center items-center flex rounded-xl  cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12">
              {/* <Video className="h-5 w-5" /> */}
              <img src={videoRec} alt="video recorder icon" className="w-7" />
            </div>
            <div className="inline-flex items-center gap-2 bg-btn-primary  text-sm font-inter-700 text-gray-700 rounded-xl px-5 py-3">
              <img src={clock} alt="clock icon" className="w-5 h-5" />
              {formatTime(meetingTime)}
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 ">
          {/* Video grid */}
          <div className="flex-1 flex flex-col  ">
            {/* Main active participant */}
            <div className="flex-1 relative bg-black/10 rounded-2xl">
              <div className="font-inter-500 absolute top-4 left-4 bg-black/50 text-white px-5 py-1 rounded-2xl text-sm z-10">
                {activeParticipant.name}
              </div>
              <ParticipantVideo participant={activeParticipant} isMain={true} />
            </div>

            {/* Thumbnails at the bottom - NOT overlaid on main video */}
            <div className=" pt-5">
              <div className="grid grid-cols-7 gap-5 ">
                {thumbnailParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className={cn(
                      "relative cursor-pointer transition-all",
                      participant.id === activeParticipant.id
                        ? "border-2 border-green-500"
                        : ""
                    )}
                    onClick={() => setAsActive(participant)}
                  >
                    <ParticipantVideo
                      participant={participant}
                      isMain={false}
                      width={100}
                      height={100}
                    />
                    <div className="absolute top-5  left-5 px-3 bg-black/50 w-auto rounded-2xl text-white text-xs p-1 truncate font-inter-500">
                      {participant.name}
                    </div>
                  </div>
                ))}

                {/* "+X participants" indicator */}
                {remainingParticipantsCount > 0 && (
                  <div
                    className="rounded-2xl relative cursor-pointer bg-green-100 flex items-center justify-center text-green-800 font-medium"
                    style={{ width: "100%", height: "100%" }}
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        +{remainingParticipantsCount}
                      </div>
                      <div className="text-xs">participants</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className=" p-4 flex justify-center items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-16 ${isMicOn ? 'bg-medium-green ' : 'bg-btn-primary'}`}
                      onClick={() => setIsMicOn(!isMicOn)}
                    >
                      {isMicOn ? (
                        // <Mic className=" text-white " size={100} fontSize={100} />
                        <img src={micOn} alt="mic on icon" className="w-5" />
                      ) : (
                        // <MicOff className="h-5 w-5 text-medium-green" />
                        <img src={micOff} alt="mic off icon" className="w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent >Microphone</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-16 ${isVideoOn ? 'bg-medium-green ' : 'bg-btn-primary'}`}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? (
                        // <Video className="h-5 w-10 text-white" />
                        <img src={videoOn} alt="video on icon" className="w-5" />
                      ) : (
                        // <VideoOff className="h-5 w-5 text-medium-green" />
                        <img src={videoOff} alt="video off icon" className="w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent >Video</TooltipContent>
                </Tooltip>
              </TooltipProvider>


              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-16 ${isShareScreen ? 'bg-medium-green ' : 'bg-btn-primary'}`}
                      onClick={() => setIsShareScreen(!isShareScreen)}
                    >
                      {isShareScreen ? (

                        <img src={shareScreenOn} alt="share screen icon" className="w-5" />
                      ) : (

                        <img src={shareScreen} alt="share screen icon" className="w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share Your Screen</TooltipContent>
                </Tooltip>
              </TooltipProvider>


              <TooltipProvider>
                <Tooltip>

                  <TooltipTrigger>
                    <Button variant="outline" size="icon" className={`rounded-3xl hover:bg-btn-primary bg-medium-green cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-16 `}>
                      <Share2 className="h-5 w-5 hover:text-medium-green text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent >Share</TooltipContent>
                </Tooltip>
              </TooltipProvider>



              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>


                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-16",
                        isSidebarOpen ? "bg-medium-green" : "bg-btn-primary"
                      )}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <Users className={`h-5 w-5 ${isSidebarOpen ? 'text-white' : 'text-medium-green'}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent> Open side bar</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="destructive" size="icon" className="rounded-3xl  cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-16">
                      {/* <PhoneOff className="h-5 w-5" /> */}
                      <img src={closeCall} className="w-5" alt="call end icon" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent >End call</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>


        </div>
      </div>
      {/* Sidebar with tabs */}
      <AnimatePresence>
        {isSidebarOpen && (
          <SidebarPanel
            participants={participants}
            onClose={() => setIsSidebarOpen(isSidebarOpen)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom hook for additional screen size breakpoints
function useWindowSize(breakpoint: number) {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsBelow(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkSize();

    // Add event listener
    window.addEventListener("resize", checkSize);

    // Clean up
    return () => window.removeEventListener("resize", checkSize);
  }, [breakpoint]);

  return isBelow;
}
