import { useState, useEffect } from "react";
import { Share2, Users, PenTool } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import WhiteboardPanel from "@/components/whiteboard-panel";
import ParticipantVideo from "@/components/participant-video";
import videoRecording from "@/assets/icons/video-recording.png";
import videoRec from "@/assets/icons/videoRec.png";
import shareScreenOn from "@/assets/icons/share-screen2.png";
import clock from "@/assets/icons/clock.png";
import videoOn from "@/assets/icons/video-On.png";
import videoOff from "@/assets/icons/video-off.png";
import micOn from "@/assets/icons/micOn.png";
import micOff from "@/assets/icons/mic-off.png";
import closeCall from "@/assets/icons/call-end.png";
import shareScreen from "@/assets/icons/share-screen.png";
import SidebarPanel from "@/components/sidebar-panel";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import Link from "next/link";

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
  const [activeParticipant, setActiveParticipant] =
    useState<Participant | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isShareScreen, setIsShareScreen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [meetingTime, setMeetingTime] = useState(0);
  const [currentUser] = useState<Participant>(mockParticipants[0]);
  const [thumbnailCount, setThumbnailCount] = useState(8);
  const isMobile = useMobile();
  const isTablet = useWindowSize(1280);
  const isSmallScreen = useWindowSize(640);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [sidebarOpenedFromParticipants, setSidebarOpenedFromParticipants] =
    useState(false);

  // Check if current user is host or co-host
  const isHost = currentUser.role === "host" || currentUser.role === "co-host";

  // Add this at the top of the component
  useEffect(() => {
    // Fix for mobile browsers where 100vh includes the address bar
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  // Update meeting time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update thumbnail count based on screen size and active participant
  useEffect(() => {
    if (isSmallScreen) {
      if (activeParticipant) {
        setThumbnailCount(7);
      } else {
        setThumbnailCount(7);
      }
    } else if (isMobile) {
      if (activeParticipant) {
        setThumbnailCount(6);
      } else {
        setThumbnailCount(7);
      }
    } else if (isTablet) {
      if (activeParticipant) {
        setThumbnailCount(4);
      } else {
        setThumbnailCount(7);
      }
    } else {
      if (activeParticipant) {
        setThumbnailCount(4);
      } else {
        setThumbnailCount(8);
      }
    }
  }, [isMobile, isTablet, isSmallScreen, activeParticipant]);

  // Format meeting time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (activeParticipant) {
      setIsVideoOn(activeParticipant.videoOn);
    }
  }, [activeParticipant]);

  // Toggle participant video (in a real app, this would interact with WebRTC)
  const toggleParticipantVideo = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, videoOn: !p.videoOn } : p))
    );

    if (activeParticipant && activeParticipant.id === id) {
      setActiveParticipant((prev) =>
        prev ? { ...prev, videoOn: !prev.videoOn } : null
      );
      setIsVideoOn(!activeParticipant.videoOn);
    }
  };

  // Add a function to toggle participant audio
  const toggleParticipantAudio = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, audioOn: !p.audioOn } : p))
    );

    if (activeParticipant && activeParticipant.id === id) {
      setActiveParticipant((prev) =>
        prev ? { ...prev, audioOn: !prev.audioOn } : null
      );
      setIsMicOn(!activeParticipant.audioOn);
    }
  };

  useEffect(() => {
    if (activeParticipant) {
      setIsMicOn(activeParticipant.audioOn);
    }
  }, [activeParticipant]);

  // Set a participant as the main active view
  const setAsActive = (participant: Participant) => {
    if (activeParticipant && activeParticipant.id === participant.id) {
      setActiveParticipant(null);
    } else {
      setActiveParticipant(participant);
      setIsVideoOn(participant.videoOn);
      setIsMicOn(participant.audioOn);
    }
  };

  // Close the main view and return to grid
  const closeMainView = () => {
    setActiveParticipant(null);
  };

  // Get participants to display in the grid
  const getGridParticipants = () => {
    const sortedParticipants = [...participants].sort((a, b) => {
      if (a.role === "host") return -1;
      if (b.role === "host") return 1;

      const roleOrder = {
        "co-host": 1,
        member: 2,
        participant: 3,
        guest: 4,
      };
      return (
        roleOrder[a.role as keyof typeof roleOrder] -
        roleOrder[b.role as keyof typeof roleOrder]
      );
    });

    if (activeParticipant) {
      const activeParticipantIndex = sortedParticipants.findIndex(
        (p) => p.id === activeParticipant.id
      );

      if (activeParticipantIndex >= thumbnailCount) {
        const activeParticipantObj = sortedParticipants.splice(
          activeParticipantIndex,
          1
        )[0];
        sortedParticipants.splice(thumbnailCount - 1, 0, activeParticipantObj);
      }
    }

    return sortedParticipants.slice(0, thumbnailCount);
  };

  const gridParticipants = getGridParticipants();
  const remainingParticipantsCount =
    participants.length - gridParticipants.length;

  // Handle participant selection from sidebar
  const handleParticipantSelect = (participant: Participant) => {
    setActiveParticipant(participant);
    setIsSidebarOpen(false);
  };

  // Determine grid columns based on number of participants and screen size
  const getGridColumns = () => {
    const count = gridParticipants.length;
    let maxCols = 3;
    if (isSmallScreen) maxCols = 1;
    else if (isTablet) maxCols = 2;
    else if (gridParticipants.length === 4) maxCols = 2;

    // If there's an active participant, always use 5 columns for thumbnails
    if (activeParticipant) {
      return "grid-cols-5";
    }

    // Original logic for when no active participant
    if (count === 1) return "";
    const cols = Math.min(count, maxCols);
    return `grid-cols-${cols}`;
  };

  // Toggle whiteboard
  const toggleWhiteboard = () => {
    if (isHost) {
      setIsWhiteboardOpen(!isWhiteboardOpen);
    }
  };

  // If whiteboard is open, render the whiteboard layout
  // if (isWhiteboardOpen) {
  //   return (
  //     <WhiteboardPanel
  //       isOpen={isWhiteboardOpen}
  //       onClose={() => setIsWhiteboardOpen(false)}
  //       participants={participants}
  //       onParticipantSelect={setAsActive}
  //       activeParticipant={activeParticipant}
  //       remainingParticipantsCount={remainingParticipantsCount}
  //       onOpenSidebar={() => setIsSidebarOpen(true)}
  //     />
  //   )
  // }

  return (
    <div
      className={`bg-[#F7FFF8] lg:h-auto  flex px-2 sm:px-5 mx-auto ${
        isTablet ? "" : ""
      }`}
    >
      <div className="flex w-full h-full flex-row-reverse">
        {/* Sidebar with tabs */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isTablet ? 0 : 320, opacity: 1, zIndex: 100 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden z-50"
              style={{ minWidth: 0 }}
            >
              <SidebarPanel
                participants={participants}
                onClose={() => {
                  setIsSidebarOpen(false);
                  setSidebarOpenedFromParticipants(false);
                }}
                isMobile={isTablet}
                onParticipantSelect={handleParticipantSelect}
                part={
                  sidebarOpenedFromParticipants ? "participants" : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div
          key="main-content"
          className="flex-1 flex flex-col w-full mx-auto max-w-[1920px]"
          animate={{
            width: isTablet
              ? "100vw"
              : isSidebarOpen
              ? "calc(100% - 320px)"
              : "100%",
            transition: { type: "spring", stiffness: 300, damping: 30 },
          }}
          style={{ minWidth: 0 }}
        >
          {/* Header */}
          <header className="border border-light-green rounded-2xl my-4 bg-white px-2 sm:px-4 py-1 flex justify-between items-center flex-shrink-0">
            <Link
              href="/"
              className="hidden md:flex items-center cursor-pointer space-x-1"
            >
              <img
                src={videoRecording || "/placeholder.svg"}
                alt="video recorder icon"
                className="w-5 h-5 sm:w-auto sm:h-auto"
              />
              <p className="font-inter-700 text-medium-green text-sm sm:text-base">
                OakPark
              </p>
            </Link>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className=" md:flex w-48 sm:w-[60%] xl:w-[80%] justify-center items-center">
                  <h1 className="text-center w-48 sm:w-[60%] xl:w-[80%] text-header-text-primary font-inter-700 truncate">
                    Workshop: An introduction to Artificial Intelligence and
                    Machine Learning
                  </h1>
                </TooltipTrigger>
                <TooltipContent>
                  Workshop: An introduction to Artificial Intelligence and
                  Machine Learning
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-red-500 justify-center items-center flex rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-8 sm:size-12">
                <img
                  src={videoRec || "/placeholder.svg"}
                  alt="video recorder icon"
                  className="w-4 sm:w-7"
                />
              </div>
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-btn-primary text-xs sm:text-sm font-inter-700 text-gray-700 rounded-xl px-2 sm:px-5 py-1 sm:py-3">
                <img
                  src={clock || "/placeholder.svg"}
                  alt="clock icon"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                {formatTime(meetingTime)}
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex flex-1 min-h-[86vh] overflow-hidden ">
            {/* Video grid or Whiteboard */}
            {isWhiteboardOpen ? (
              <WhiteboardPanel
                isOpen={isWhiteboardOpen}
                onClose={() => setIsWhiteboardOpen(false)}
                participants={participants}
                onParticipantSelect={setAsActive}
                activeParticipant={activeParticipant}
                remainingParticipantsCount={remainingParticipantsCount}
                onOpenSidebar={() => setIsSidebarOpen(true)}
              />
            ) : (
              <div className="flex-1 flex flex-col min-h-0 max-h-full overflow-hidden">
                {/* Main active participant (only shown when a participant is selected) */}
                <AnimatePresence>
                  {activeParticipant && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: 40 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="flex-1 relative bg-black/10 rounded-2xl min-h-0 overflow-hidden mb-4 shadow-2xl shadow-green-200"
                    >
                      <div className="font-inter-500 absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/50 text-white px-3 sm:px-5 py-1 rounded-2xl text-xs sm:text-sm z-10">
                        {activeParticipant.name}
                      </div>

                      {/* Close button */}
                      <button
                        onClick={closeMainView}
                        className="absolute top-2 sm:top-4 cursor-pointer right-2 sm:right-4 bg-black/50 text-white p-1 rounded-full z-10 hover:bg-black/70"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      <div className="h-full lg:h-[90vh] w-full">
                        <ParticipantVideo
                          onToggleVideo={toggleParticipantVideo}
                          participant={activeParticipant}
                          isVideoOn={() => setIsVideoOn(!isVideoOn)}
                          isMain={true}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Grid of participants */}
                <div
                  className={`flex-1 overflow-y-auto mb-1 ${
                    activeParticipant ? "max-h-[30vh] " : ""
                  }`}
                >
                  <div
                    className={` ${
                      gridParticipants.length === 1 && !activeParticipant
                        ? "flex justify-center items-center h-full"
                        : activeParticipant
                        ? `flex flex-nowrap gap-3 sm:gap-4 w-full h-full overflow-x-auto`
                        : `grid ${getGridColumns()} gap-3 sm:gap-4 w-full h-full auto-rows-fr`
                    } ${activeParticipant ? "" : "h-full"}`}
                  >
                    {gridParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className={cn(
                          gridParticipants.length === 1 && !activeParticipant
                            ? "w-full h-full"
                            : "",
                          activeParticipant
                            ? "flex-shrink-0 w-full sm:w-1/2 xl:w-1/5 "
                            : "",
                          "relative transition-all rounded-[20px]",
                          participant.id === activeParticipant?.id
                            ? "border-4 border-green-500"
                            : "",
                          participants.length >= 4
                            ? "cursor-pointer"
                            : "cursor-default"
                        )}
                        onClick={
                          participants.length >= 4
                            ? () => setAsActive(participant)
                            : undefined
                        }
                      >
                        <ParticipantVideo
                          participant={participant}
                          isVideoOn={() => setIsVideoOn(!isVideoOn)}
                          isMain={gridParticipants.length === 1}
                          width={
                            gridParticipants.length === 1 ? undefined : 100
                          }
                          isTablet={isTablet}
                          height={
                            gridParticipants.length === 1 ? undefined : 100
                          }
                        />
                        <div className="absolute top-2 left-2 px-2 bg-black/50 w-auto rounded-2xl text-white text-xs p-1 truncate font-inter-500">
                          {participant.name}
                        </div>
                      </div>
                    ))}

                    {/* "+X participants" indicator - always show when there are more participants */}
                    {remainingParticipantsCount > 0 && (
                      <div
                        className={`${
                          activeParticipant ? "w-1/5" : ""
                        } rounded-2xl relative cursor-pointer bg-green-100 flex  items-center justify-center text-green-800 font-medium`}
                        onClick={() => {
                          setSidebarOpenedFromParticipants(true);
                          setIsSidebarOpen(true);
                        }}
                      >
                        <div className="text-center">
                          <div className="text-base sm:text-lg font-bold">
                            +{remainingParticipantsCount}
                          </div>
                          <div className="text-xs">participants</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          {/* <div className="p-1 fixed bg-white w-full lg:bottom-auto left-0 right-0 lg:left-auto lg:right-auto bottom-0 lg:relative mt-5 flex justify-center items-center gap-1 sm:gap-2 flex-wrap flex-shrink-0"> */}
            <div className="p-1 fixed bg-btn-primary/30 rounded-4xl z-50 backdrop-blur-lg mx-auto w-auto sm:w-[500px] bottom-5 left-0 right-0   mt-5 flex justify-center items-center gap-2 py-2 sm:gap-2 flex-wrap ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14 ${
                      isMicOn ? "bg-medium-green " : "bg-btn-primary"
                    }`}
                    onClick={() => {
                      setIsMicOn(!isMicOn);
                      if (activeParticipant) {
                        toggleParticipantAudio(activeParticipant.id);
                      }
                    }}
                    disabled={!activeParticipant}
                  >
                    {isMicOn ? (
                      <img
                        src={micOn}
                        alt="mic on icon"
                        className="w-4 sm:w-5"
                      />
                    ) : (
                      <img
                        src={micOff}
                        alt="mic off icon"
                        className="w-4 sm:w-5"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Microphone</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14 ${
                      isVideoOn ? "bg-medium-green " : "bg-btn-primary"
                    }`}
                    onClick={() => {
                      setIsVideoOn(!isVideoOn);
                      if (activeParticipant) {
                        toggleParticipantVideo(activeParticipant.id);
                      }
                    }}
                    disabled={!activeParticipant}
                  >
                    {isVideoOn ? (
                      <img
                        src={videoOn || "/placeholder.svg"}
                        alt="video on icon"
                        className="w-4 sm:w-5"
                      />
                    ) : (
                      <img
                        src={videoOff || "/placeholder.svg"}
                        alt="video off icon"
                        className="w-4 sm:w-5"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Video</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14 ${
                      isShareScreen ? "bg-medium-green " : "bg-btn-primary"
                    }`}
                    onClick={() => setIsShareScreen(!isShareScreen)}
                  >
                    {isShareScreen ? (
                      <img
                        src={shareScreenOn || "/placeholder.svg"}
                        alt="share screen icon"
                        className="w-4 sm:w-5"
                      />
                    ) : (
                      <img
                        src={shareScreen || "/placeholder.svg"}
                        alt="share screen icon"
                        className="w-4 sm:w-5"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share Your Screen</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isHost && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14",
                        isWhiteboardOpen ? "bg-medium-green" : "bg-btn-primary"
                      )}
                      onClick={toggleWhiteboard}
                    >
                      <PenTool
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          isWhiteboardOpen ? "text-white" : "text-medium-green"
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Teaching Whiteboard</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-3xl hover:bg- bg-medium-green cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14`}
                  >
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5 hover:text-medium-green text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14",
                      isSidebarOpen ? "bg-medium-green" : "bg-btn-primary"
                    )}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <Users
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isSidebarOpen ? "text-white" : "text-medium-green"
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open side bar</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14"
                  >
                    <img
                      src={closeCall || "/placeholder.svg"}
                      className="w-4 sm:w-5"
                      alt="call end icon"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>End call</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      </div>
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

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, [breakpoint]);

  return isBelow;
}



















// import { useState, useEffect } from "react";
// import { Share2, Users, PenTool } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { AnimatePresence, motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import WhiteboardPanel from "@/components/whiteboard-panel";
// import ParticipantVideo from "@/components/participant-video";
// import videoRecording from "@/assets/icons/video-recording.png";
// import videoRec from "@/assets/icons/videoRec.png";
// import shareScreenOn from "@/assets/icons/share-screen2.png";
// import clock from "@/assets/icons/clock.png";
// import videoOn from "@/assets/icons/video-On.png";
// import videoOff from "@/assets/icons/video-off.png";
// import micOn from "@/assets/icons/micOn.png";
// import micOff from "@/assets/icons/mic-off.png";
// import closeCall from "@/assets/icons/call-end.png";
// import shareScreen from "@/assets/icons/share-screen.png";
// import SidebarPanel from "@/components/sidebar-panel";
// import { Button } from "@/components/ui/button";
// import { useMobile } from "@/hooks/use-mobile";
// import { useWebcam } from "@/hooks/useWebcam";
// import Link from "next/link";

// // Types for participants
// type Role = "host" | "co-host" | "member" | "participant" | "guest";

// interface Participant {
//   id: string;
//   name: string;
//   email: string;
//   role: Role;
//   videoOn: boolean;
//   audioOn: boolean;
// }

// // Mock data for participants with various roles
// const mockParticipants: Participant[] = [
//   {
//     id: "1",
//     name: "Micheal Mbasa",
//     email: "micheal.mbasa@gmail.com",
//     role: "host",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "2",
//     name: "Mariam Chen",
//     email: "mariam.chen@gmail.com",
//     role: "co-host",
//     videoOn: false,
//     audioOn: true,
//   },
//   {
//     id: "3",
//     name: "Norman Heisch",
//     email: "norman.chen@gmail.com",
//     role: "member",
//     videoOn: true,
//     audioOn: false,
//   },
//   {
//     id: "4",
//     name: "Kate Moore",
//     email: "kate.moore@gmail.com",
//     role: "member",
//     videoOn: false,
//     audioOn: false,
//   },
//   {
//     id: "5",
//     name: "Rajesh Sanoramui",
//     email: "rajesh.sanoramui@gmail.com",
//     role: "member",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "6",
//     name: "Isabel Alfonso",
//     email: "isabel.alfonso@gmail.com",
//     role: "participant",
//     videoOn: false,
//     audioOn: true,
//   },
//   {
//     id: "7",
//     name: "Jordan Heathrobe",
//     email: "jordan.heathrobe@gmail.com",
//     role: "participant",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "8",
//     name: "Sarah Johnson",
//     email: "sarah.johnson@gmail.com",
//     role: "participant",
//     videoOn: false,
//     audioOn: true,
//   },
//   {
//     id: "9",
//     name: "David Kim",
//     email: "david.kim@gmail.com",
//     role: "participant",
//     videoOn: true,
//     audioOn: false,
//   },
//   {
//     id: "10",
//     name: "Emma Watson",
//     email: "emma.watson@gmail.com",
//     role: "participant",
//     videoOn: false,
//     audioOn: true,
//   },
//   {
//     id: "11",
//     name: "Carlos Rodriguez",
//     email: "carlos.rodriguez@gmail.com",
//     role: "guest",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "12",
//     name: "Priya Patel",
//     email: "priya.patel@gmail.com",
//     role: "guest",
//     videoOn: false,
//     audioOn: false,
//   },
//   {
//     id: "13",
//     name: "Ahmed Hassan",
//     email: "ahmed.hassan@gmail.com",
//     role: "guest",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "14",
//     name: "Olivia Smith",
//     email: "olivia.smith@gmail.com",
//     role: "guest",
//     videoOn: false,
//     audioOn: true,
//   },
//   {
//     id: "15",
//     name: "Liam Wilson",
//     email: "liam.wilson@gmail.com",
//     role: "guest",
//     videoOn: true,
//     audioOn: false,
//   },
//   {
//     id: "16",
//     name: "Sophia Chen",
//     email: "sophia.chen@gmail.com",
//     role: "guest",
//     videoOn: false,
//     audioOn: true,
//   },
//   {
//     id: "17",
//     name: "Noah Garcia",
//     email: "noah.garcia@gmail.com",
//     role: "guest",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "18",
//     name: "Ava Brown",
//     email: "ava.brown@gmail.com",
//     role: "guest",
//     videoOn: false,
//     audioOn: false,
//   },
//   {
//     id: "19",
//     name: "Ethan Davis",
//     email: "ethan.davis@gmail.com",
//     role: "guest",
//     videoOn: true,
//     audioOn: true,
//   },
//   {
//     id: "20",
//     name: "Isabella Martinez",
//     email: "isabella.martinez@gmail.com",
//     role: "guest",
//     videoOn: false,
//     audioOn: true,
//   },
// ];

// export default function VideoConference() {
//   const [participants, setParticipants] =
//     useState<Participant[]>(mockParticipants);
//   const [activeParticipant, setActiveParticipant] =
//     useState<Participant | null>(null);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isShareScreen, setIsShareScreen] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [meetingTime, setMeetingTime] = useState(0);
//   const [currentUser] = useState<Participant>(mockParticipants[0]);
//   const [thumbnailCount, setThumbnailCount] = useState(8);
//   const isMobile = useMobile();
//   const isTablet = useWindowSize(1280);
//   const isSmallScreen = useWindowSize(640);
//   const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
//   const [sidebarOpenedFromParticipants, setSidebarOpenedFromParticipants] =
//     useState(false);

//   // NEW: Webcam integration
//   const {
//     stream: webcamStream,
//     isStreaming: isWebcamStreaming,
//     error: webcamError,
//     startStream: startWebcam,
//     stopStream: stopWebcam,
//     toggleStream: toggleWebcam,
//     hasPermission: hasWebcamPermission,
//     isRequesting: isWebcamRequesting
//   } = useWebcam();

//   // Check if current user is host or co-host
//   const isHost = currentUser.role === "host" || currentUser.role === "co-host";

//   // NEW: Auto-start webcam when component mounts
//   useEffect(() => {
//     if (isVideoOn && !isWebcamStreaming && !isWebcamRequesting) {
//       startWebcam();
//     }
//   }, [isVideoOn, isWebcamStreaming, isWebcamRequesting, startWebcam]);

//   // NEW: Sync webcam state with video toggle
//   useEffect(() => {
//     if (!isVideoOn && isWebcamStreaming) {
//       stopWebcam();
//     }
//   }, [isVideoOn, isWebcamStreaming, stopWebcam]);

//   // NEW: Show webcam error if any
//   useEffect(() => {
//     if (webcamError) {
//       console.error('Webcam error:', webcamError);
//       // You could show a toast notification here
//     }
//   }, [webcamError]);

//   // Add this at the top of the component
//   useEffect(() => {
//     // Fix for mobile browsers where 100vh includes the address bar
//     const setVh = () => {
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };

//     setVh();
//     window.addEventListener("resize", setVh);

//     return () => {
//       window.removeEventListener("resize", setVh);
//     };
//   }, []);

//   // Update meeting time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setMeetingTime((prev) => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Update thumbnail count based on screen size and active participant
//   useEffect(() => {
//     if (isSmallScreen) {
//       if (activeParticipant) {
//         setThumbnailCount(7);
//       } else {
//         setThumbnailCount(7);
//       }
//     } else if (isMobile) {
//       if (activeParticipant) {
//         setThumbnailCount(6);
//       } else {
//         setThumbnailCount(7);
//       }
//     } else if (isTablet) {
//       if (activeParticipant) {
//         setThumbnailCount(4);
//       } else {
//         setThumbnailCount(7);
//       }
//     } else {
//       if (activeParticipant) {
//         setThumbnailCount(4);
//       } else {
//         setThumbnailCount(8);
//       }
//     }
//   }, [isMobile, isTablet, isSmallScreen, activeParticipant]);

//   // Format meeting time as HH:MM:SS
//   const formatTime = (seconds: number) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   useEffect(() => {
//     if (activeParticipant) {
//       setIsVideoOn(activeParticipant.videoOn);
//     }
//   }, [activeParticipant]);

//   // Toggle participant video (in a real app, this would interact with WebRTC)
//   const toggleParticipantVideo = (id: string) => {
//     setParticipants((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, videoOn: !p.videoOn } : p))
//     );

//     if (activeParticipant && activeParticipant.id === id) {
//       setActiveParticipant((prev) =>
//         prev ? { ...prev, videoOn: !prev.videoOn } : null
//       );
//       setIsVideoOn(!activeParticipant.videoOn);
//     }
//   };

//   // Add a function to toggle participant audio
//   const toggleParticipantAudio = (id: string) => {
//     setParticipants((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, audioOn: !p.audioOn } : p))
//     );

//     if (activeParticipant && activeParticipant.id === id) {
//       setActiveParticipant((prev) =>
//         prev ? { ...prev, audioOn: !prev.audioOn } : null
//       );
//       setIsMicOn(!activeParticipant.audioOn);
//     }
//   };

//   useEffect(() => {
//     if (activeParticipant) {
//       setIsMicOn(activeParticipant.audioOn);
//     }
//   }, [activeParticipant]);

//   // Set a participant as the main active view
//   const setAsActive = (participant: Participant) => {
//     if (activeParticipant && activeParticipant.id === participant.id) {
//       setActiveParticipant(null);
//     } else {
//       setActiveParticipant(participant);
//       setIsVideoOn(participant.videoOn);
//       setIsMicOn(participant.audioOn);
//     }
//   };

//   // Close the main view and return to grid
//   const closeMainView = () => {
//     setActiveParticipant(null);
//   };

//   // Get participants to display in the grid
//   const getGridParticipants = () => {
//     const sortedParticipants = [...participants].sort((a, b) => {
//       if (a.role === "host") return -1;
//       if (b.role === "host") return 1;

//       const roleOrder = {
//         "co-host": 1,
//         member: 2,
//         participant: 3,
//         guest: 4,
//       };
//       return (
//         roleOrder[a.role as keyof typeof roleOrder] -
//         roleOrder[b.role as keyof typeof roleOrder]
//       );
//     });

//     if (activeParticipant) {
//       const activeParticipantIndex = sortedParticipants.findIndex(
//         (p) => p.id === activeParticipant.id
//       );

//       if (activeParticipantIndex >= thumbnailCount) {
//         const activeParticipantObj = sortedParticipants.splice(
//           activeParticipantIndex,
//           1
//         )[0];
//         sortedParticipants.splice(thumbnailCount - 1, 0, activeParticipantObj);
//       }
//     }

//     return sortedParticipants.slice(0, thumbnailCount);
//   };

//   const gridParticipants = getGridParticipants();
//   const remainingParticipantsCount =
//     participants.length - gridParticipants.length;

//   // Handle participant selection from sidebar
//   const handleParticipantSelect = (participant: Participant) => {
//     setActiveParticipant(participant);
//     setIsSidebarOpen(false);
//   };

//   // Determine grid columns based on number of participants and screen size
//   const getGridColumns = () => {
//     const count = gridParticipants.length;
    
//     // If there's an active participant, use horizontal scroll layout
//     if (activeParticipant) {
//       return "grid-cols-5";
//     }

//     // For single participant, use full screen
//     if (count === 1) return "";
   
//     // For multiple participants, use responsive grid
//     if (isSmallScreen) return "grid-cols-1"; // Mobile: 1 column
//     if (isTablet) return "grid-cols-2"; // Tablet: 2 columns
//     return "grid-cols-3"; // Desktop: 3 columns
//   };

//   // Toggle whiteboard
//   const toggleWhiteboard = () => {
//     if (isHost) {
//       setIsWhiteboardOpen(!isWhiteboardOpen);
//     }
//   };

//   // If whiteboard is open, render the whiteboard layout
//   // if (isWhiteboardOpen) {
//   //   return (
//   //     <WhiteboardPanel
//   //       isOpen={isWhiteboardOpen}
//   //       onClose={() => setIsWhiteboardOpen(false)}
//   //       participants={participants}
//   //       onParticipantSelect={setAsActive}
//   //       activeParticipant={activeParticipant}
//   //       remainingParticipantsCount={remainingParticipantsCount}
//   //       onOpenSidebar={() => setIsSidebarOpen(true)}
//   //     />
//   //   )
//   // }

//   return (
//     <div
//       className={`bg-[#F7FFF8] lg:h-auto  flex px-2 sm:px-5 mx-auto ${
//         isTablet ? "" : ""
//       }`}
//     >
//       <div className="flex w-full h-full flex-row-reverse">
//         {/* Sidebar with tabs */}
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               key="sidebar"
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: isTablet ? 0 : 320, opacity: 1, zIndex: 100 }}
//               exit={{ width: 0, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="overflow-hidden z-50"
//               style={{ minWidth: 0 }}
//             >
//               <SidebarPanel
//                 participants={participants}
//                 onClose={() => {
//                   setIsSidebarOpen(false);
//                   setSidebarOpenedFromParticipants(false);
//                 }}
//                 isMobile={isTablet}
//                 onParticipantSelect={handleParticipantSelect}
//                 part={
//                   sidebarOpenedFromParticipants ? "participants" : undefined
//                 }
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <motion.div
//           key="main-content"
//           className="flex-1 flex flex-col w-full mx-auto max-w-[1920px]"
//           animate={{
//             width: isTablet
//               ? "100vw"
//               : isSidebarOpen
//               ? "calc(100% - 320px)"
//               : "100%",
//             transition: { type: "spring", stiffness: 300, damping: 30 },
//           }}
//           style={{ minWidth: 0 }}
//         >
//           {/* Header */}
//           <header className="border border-light-green rounded-2xl my-4 bg-white px-2 sm:px-4 py-1 flex justify-between items-center flex-shrink-0">
//             <Link
//               href="/"
//               className="hidden md:flex items-center cursor-pointer space-x-1"
//             >
//               <img
//                 src={videoRecording || "/placeholder.svg"}
//                 alt="video recorder icon"
//                 className="w-5 h-5 sm:w-auto sm:h-auto"
//               />
//               <p className="font-inter-700 text-medium-green text-sm sm:text-base">
//                 OakPark
//               </p>
//             </Link>

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger className=" md:flex w-48 sm:w-[60%] xl:w-[80%] justify-center items-center">
//                   <h1 className="text-center w-48 sm:w-[60%] xl:w-[80%] text-header-text-primary font-inter-700 truncate">
//                     Workshop: An introduction to Artificial Intelligence and
//                     Machine Learning
//                   </h1>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   Workshop: An introduction to Artificial Intelligence and
//                   Machine Learning
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <div className="flex items-center gap-2 sm:gap-4">
//               <div className="bg-red-500 justify-center items-center flex rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-8 sm:size-12">
//                 <img
//                   src={videoRec || "/placeholder.svg"}
//                   alt="video recorder icon"
//                   className="w-4 sm:w-7"
//                 />
//               </div>
//               <div className="inline-flex items-center gap-1 sm:gap-2 bg-btn-primary text-xs sm:text-sm font-inter-700 text-gray-700 rounded-xl px-2 sm:px-5 py-1 sm:py-3">
//                 <img
//                   src={clock || "/placeholder.svg"}
//                   alt="clock icon"
//                   className="w-4 h-4 sm:w-5 sm:h-5"
//                 />
//                 {formatTime(meetingTime)}
//               </div>
//             </div>
//           </header>

//           {/* Main content */}
//           <div className="flex flex-1 min-h-[86vh] overflow-hidden ">
//             {/* Video grid or Whiteboard */}
//             {isWhiteboardOpen ? (
//               <WhiteboardPanel
//                 isOpen={isWhiteboardOpen}
//                 onClose={() => setIsWhiteboardOpen(false)}
//                 participants={participants}
//                 onParticipantSelect={setAsActive}
//                 activeParticipant={activeParticipant}
//                 remainingParticipantsCount={remainingParticipantsCount}
//                 onOpenSidebar={() => setIsSidebarOpen(true)}
//               />
//             ) : (
//               <div className="flex-1 flex flex-col min-h-0 max-h-full overflow-hidden">
//                 {/* Main active participant (only shown when a participant is selected) */}
//                 <AnimatePresence>
//                   {activeParticipant && (
//                     <motion.div
//                       initial={{ height: 0 }}
//                       animate={{ opacity: 1, height: "80vh" }}
//                       exit={{ height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="relative bg-black/10 rounded-2xl overflow-hidden mb-4"
//                     >
//                       <div className="font-inter-500 absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/50 text-white px-3 sm:px-5 py-1 rounded-2xl text-xs sm:text-sm z-10">
//                         {activeParticipant.name}
//                       </div>

//                       {/* Close button */}
//                       <button
//                         onClick={closeMainView}
//                         className="absolute top-2 sm:top-4 cursor-pointer right-2 sm:right-4 bg-black/50 text-white p-1 rounded-full z-10 hover:bg-black/70"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <line x1="18" y1="6" x2="6" y2="18"></line>
//                           <line x1="6" y1="6" x2="18" y2="18"></line>
//                         </svg>
//                       </button>

//                       <div className="h-full w-full">
//                         <ParticipantVideo
//                           onToggleVideo={toggleParticipantVideo}
//                           participant={activeParticipant}
//                           isVideoOn={() => setIsVideoOn(!isVideoOn)}
//                           isMain={true}
//                           stream={activeParticipant.id === currentUser.id ? webcamStream : undefined}
//                         />
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Grid of participants */}
//                 <div
//                   className={`flex-1 overflow-y-auto mb-1 ${
//                     activeParticipant ? "h-[20vh]" : "h-full"
//                   }`}
//                 >
//                   <div
//                     className={` ${
//                       gridParticipants.length === 1 && !activeParticipant
//                         ? "flex justify-center items-center h-full"
//                         : activeParticipant
//                         ? `flex flex-nowrap gap-3 sm:gap-4 w-full h-full overflow-x-auto items-center`
//                         : `grid ${getGridColumns()} gap-3 sm:gap-4 w-full h-full auto-rows-fr`
//                     } ${activeParticipant ? "" : "h-full"}`}
//                   >
//                     {gridParticipants.map((participant) => (
//                       <div
//                         key={participant.id}
//                         className={cn(
//                           gridParticipants.length === 1 && !activeParticipant
//                             ? "w-full h-full"
//                             : "",
//                           activeParticipant
//                             ? "flex-shrink-0 w-full sm:w-1/2 xl:w-1/5 "
//                             : "aspect-square w-full h-full",
//                           "relative transition-all rounded-[20px]",
//                           participant.id === activeParticipant?.id
//                             ? "border-4 border-green-500"
//                             : "",
//                           participants.length >= 4
//                             ? "cursor-pointer"
//                             : "cursor-default"
//                         )}
//                         onClick={
//                           participants.length >= 4
//                             ? () => setAsActive(participant)
//                             : undefined
//                         }
//                       >
//                         <ParticipantVideo
//                           participant={participant}
//                           isVideoOn={() => setIsVideoOn(!isVideoOn)}
//                           isMain={gridParticipants.length === 1}
//                           width={
//                             gridParticipants.length === 1 ? undefined : 100
//                           }
//                           isTablet={isTablet}
//                           height={
//                             gridParticipants.length === 1 ? undefined : 100
//                           }
//                           stream={participant.id === currentUser.id ? webcamStream : undefined}
//                         />
//                         <div className="absolute top-2 left-2 px-2 bg-black/50 w-auto rounded-2xl text-white text-xs p-1 truncate font-inter-500">
//                           {participant.name}
//                         </div>
//                       </div>
//                     ))}

//                     {/* "+X participants" indicator - always show when there are more participants */}
//                     {remainingParticipantsCount > 0 && (
//                       <div
//                         className={`${
//                           activeParticipant ? "w-1/5" : ""
//                         } rounded-2xl relative cursor-pointer bg-green-100 flex  items-center justify-center text-green-800 font-medium`}
//                         onClick={() => {
//                           setSidebarOpenedFromParticipants(true);
//                           setIsSidebarOpen(true);
//                         }}
//                       >
//                         <div className="text-center">
//                           <div className="text-base sm:text-lg font-bold">
//                             +{remainingParticipantsCount}
//                           </div>
//                           <div className="text-xs">participants</div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Controls */}
//           <div className="p-1 fixed bg-white w-full lg:bottom-auto left-0 right-0 lg:left-auto lg:right-auto bottom-0 lg:relative mt-5 flex justify-center items-center gap-1 sm:gap-2 flex-wrap flex-shrink-0">
//             {/* <div className="p-1 fixed bg-btn-primary/30 rounded-4xl z-50 backdrop-blur-lg mx-auto w-auto sm:w-[500px] bottom-5 left-0 right-0   mt-5 flex justify-center items-center gap-2 py-2 sm:gap-2 flex-wrap "> */}
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className={`rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14 ${
//                       isMicOn ? "bg-medium-green " : "bg-btn-primary"
//                     }`}
//                     onClick={() => {
//                       setIsMicOn(!isMicOn);
//                       if (activeParticipant) {
//                         toggleParticipantAudio(activeParticipant.id);
//                       }
//                     }}
//                     disabled={!activeParticipant}
//                   >
//                     {isMicOn ? (
//                       <img
//                         src={micOn}
//                         alt="mic on icon"
//                         className="w-4 sm:w-5"
//                       />
//                     ) : (
//                       <img
//                         src={micOff}
//                         alt="mic off icon"
//                         className="w-4 sm:w-5"
//                       />
//                     )}
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Microphone</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className={`rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14 ${
//                       isVideoOn ? "bg-medium-green " : "bg-btn-primary"
//                     }`}
//                     onClick={() => {
//                       setIsVideoOn(!isVideoOn);
//                       if (activeParticipant) {
//                         toggleParticipantVideo(activeParticipant.id);
//                       }
//                     }}
//                     disabled={!activeParticipant}
//                   >
//                     {isVideoOn ? (
//                       <img
//                         src={videoOn || "/placeholder.svg"}
//                         alt="video on icon"
//                         className="w-4 sm:w-5"
//                       />
//                     ) : (
//                       <img
//                         src={videoOff || "/placeholder.svg"}
//                         alt="video off icon"
//                         className="w-4 sm:w-5"
//                       />
//                     )}
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Video</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className={`rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14 ${
//                       isShareScreen ? "bg-medium-green " : "bg-btn-primary"
//                     }`}
//                     onClick={() => setIsShareScreen(!isShareScreen)}
//                   >
//                     {isShareScreen ? (
//                       <img
//                         src={shareScreenOn || "/placeholder.svg"}
//                         alt="share screen icon"
//                         className="w-4 sm:w-5"
//                       />
//                     ) : (
//                       <img
//                         src={shareScreen || "/placeholder.svg"}
//                         alt="share screen icon"
//                         className="w-4 sm:w-5"
//                       />
//                     )}
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Share Your Screen</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             {isHost && (
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className={cn(
//                         "rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14",
//                         isWhiteboardOpen ? "bg-medium-green" : "bg-btn-primary"
//                       )}
//                       onClick={toggleWhiteboard}
//                     >
//                       <PenTool
//                         className={`h-4 w-4 sm:h-5 sm:w-5 ${
//                           isWhiteboardOpen ? "text-white" : "text-medium-green"
//                         }`}
//                       />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>Teaching Whiteboard</TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             )}

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-3xl hover:bg- bg-medium-green cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14"
//                   >
//                     <Share2 className="h-4 w-4 sm:h-5 sm:w-5 hover:text-medium-green text-white" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Share</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className={cn(
//                       "rounded-3xl hover:bg- cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14",
//                       isSidebarOpen ? "bg-medium-green" : "bg-btn-primary"
//                     )}
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                   >
//                     <Users
//                       className={`h-4 w-4 sm:h-5 sm:w-5 ${
//                         isSidebarOpen ? "text-white" : "text-medium-green"
//                       }`}
//                     />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Open side bar</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Button
//                     variant="destructive"
//                     size="icon"
//                     className="rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-12 sm:size-14"
//                   >
//                     <img
//                       src={closeCall || "/placeholder.svg"}
//                       className="w-4 sm:w-5"
//                       alt="call end icon"
//                     />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>End call</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // Custom hook for additional screen size breakpoints
// function useWindowSize(breakpoint: number) {
//   const [isBelow, setIsBelow] = useState(false);

//   useEffect(() => {
//     const checkSize = () => {
//       setIsBelow(window.innerWidth < breakpoint);
//     };

//     checkSize();
//     window.addEventListener("resize", checkSize);

//     return () => window.removeEventListener("resize", checkSize);
//   }, [breakpoint]);

//   return isBelow;
// }

//old




