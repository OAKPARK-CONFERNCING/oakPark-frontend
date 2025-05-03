"use client"

import { useState, useEffect } from "react"
import { Share2, Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import ParticipantVideo from "@/components/participant-video"
import SidebarPanel from "@/components/sidebar-panel"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import videoRecording from "@/assets/icons/video-recording.png"
import videoRec from "@/assets/icons/videoRec.png"
import shareScreenOn from "@/assets/icons/share-screen2.png"
import clock from "@/assets/icons/clock.png"
import videoOn from "@/assets/icons/video-On.png"
import videoOff from "@/assets/icons/video-off.png"
import micOn from "@/assets/icons/micOn.png"
import micOff from "@/assets/icons/mic-off.png"
import closeCall from "@/assets/icons/call-end.png"
import shareScreen from "@/assets/icons/share-screen.png"
import { Link } from "react-router"

// Types for participants
type Role = "host" | "co-host" | "member" | "participant" | "guest"

interface Participant {
  id: string
  name: string
  email: string
  role: Role
  videoOn: boolean
  audioOn: boolean
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
]

export default function VideoConference() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants)
  const [activeParticipant, setActiveParticipant] = useState<Participant>(
    // Default to host as the active participant
    mockParticipants.find((p) => p.role === "host") || mockParticipants[0],
  )
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isShareScreen, setIsShareScreen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [meetingTime, setMeetingTime] = useState(0)
  const [visibleThumbnails, setVisibleThumbnails] = useState(6)
  const isMobile = useMobile()
  const isTablet = useWindowSize(1280)
  const isSmallScreen = useWindowSize(640) // Added for very small screens

  // Add this at the top of the component
  useEffect(() => {
    // Fix for mobile browsers where 100vh includes the address bar
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)

    return () => {
      window.removeEventListener("resize", setVh)
    }
  }, [])

  // Update meeting time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Update visible thumbnails based on screen size
  useEffect(() => {
    if (isSmallScreen) {
      setVisibleThumbnails(2) // Show fewer thumbnails on very small screens
    } else if (isMobile) {
      setVisibleThumbnails(3)
    } else if (isTablet) {
      setVisibleThumbnails(5)
    } else {
      setVisibleThumbnails(6)
    }
  }, [isMobile, isTablet, isSmallScreen])

  const titleShort = (title: string) => {
    if (isMobile || isTablet) {
      return title.substring(0, 50) + "..."
    } else {
      return title
    }
  }

  // Format meeting time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (isSmallScreen) {
      setVisibleThumbnails(2) // Show fewer thumbnails on very small screens
    } else if (isMobile) {
      setVisibleThumbnails(3)
    } else if (isTablet) {
      setVisibleThumbnails(5)
    } else {
      setVisibleThumbnails(6)
    }
  }, [isMobile, isTablet, isSmallScreen])

  // Toggle participant video (in a real app, this would interact with WebRTC)
  const toggleParticipantVideo = (id: string) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, videoOn: !p.videoOn } : p)))

    if (activeParticipant.id === id) {
      setActiveParticipant((prev) => ({ ...prev, videoOn: !prev.videoOn }))
    }
  }

  // Set a participant as the main active view
  const setAsActive = (participant: Participant) => {
    setActiveParticipant(participant)
  }

  // Get thumbnails to display - MODIFIED to include active participant and ensure host is first
  const getThumbnailParticipants = () => {
    // Find the host participant
    const hostParticipant = participants.find((p) => p.role === "host")

    // Sort participants by role priority
    const sortedParticipants = [...participants].sort((a, b) => {
      // Skip the host as we'll add it first
      if (a.role === "host") return -1
      if (b.role === "host") return 1

      const roleOrder = {
        "co-host": 1,
        member: 2,
        participant: 3,
        guest: 4,
      }
      return roleOrder[a.role as keyof typeof roleOrder] - roleOrder[b.role as keyof typeof roleOrder]
    })

    // Make sure active participant is included in the thumbnails
    const activeParticipantIndex = sortedParticipants.findIndex((p) => p.id === activeParticipant.id)

    // If active participant is not the host and not in the first visibleThumbnails-1 participants,
    // we need to ensure it's included
    if (activeParticipant.role !== "host" && activeParticipantIndex >= visibleThumbnails) {
      // Replace the last visible thumbnail with the active participant
      sortedParticipants.splice(activeParticipantIndex, 1) // Remove active participant from its current position
      sortedParticipants.splice(visibleThumbnails - 1, 0, activeParticipant) // Insert it at the last visible position
    }

    // Return the visible thumbnails
    return sortedParticipants.slice(0, visibleThumbnails)
  }

  const thumbnailParticipants = getThumbnailParticipants()
  const remainingParticipantsCount = participants.length - thumbnailParticipants.length

  // Handle participant selection from sidebar
  const handleParticipantSelect = (participant: Participant) => {
    setActiveParticipant(participant)
    setIsSidebarOpen(false)
  }

  return (
    <div
      className={`bg-[#F7FFF8] flex  px-2  sm:px-5 mx-auto  ${isTablet ? "h-screen" : ""}`}
      // style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="flex flex-col w-full mx-auto max-w-[1920px] overflow-hidden">
        {/* Header */}
        <header className="border border-light-green rounded-2xl my-4 bg-white  py-1 flex justify-between items-center flex-shrink-0">
          <Link to="/" className="flex items-center cursor-pointer space-x-1">
            <img
              src={videoRecording || "/placeholder.svg"}
              alt="video recorder icon"
              className="w-5 h-5 sm:w-auto sm:h-auto"
            />
            <p className="font-inter-700 text-medium-green text-sm sm:text-base">OakPark</p>
          </Link>
          <h1 className="hidden md:inline text-header-text-primary font-inter-700 truncate ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {titleShort("Workshop: An introduction to Artificial Intelligence and Machine Learning")}
                </TooltipTrigger>
                <TooltipContent>
                  Workshop: An introduction to Artificial Intelligence and Machine Learning
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-red-500 justify-center items-center flex rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-8 sm:size-12">
              <img src={videoRec || "/placeholder.svg"} alt="video recorder icon" className="w-4 sm:w-7" />
            </div>
            <div className="inline-flex items-center gap-1 sm:gap-2 bg-btn-primary text-xs sm:text-sm font-inter-700 text-gray-700 rounded-xl px-2 sm:px-5 py-1 sm:py-3">
              <img src={clock || "/placeholder.svg"} alt="clock icon" className="w-4 h-4 sm:w-5 sm:h-5" />
              {formatTime(meetingTime)}
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 min-h-0  overflow-hidden">
          {/* Video grid */}
          <div className="flex-1 flex flex-col min-h-0 max-h-full overflow-hidden">
            {/* Main active participant */}
            <div className="flex-1 relative bg-black/10 rounded-2xl min-h-0 max-h-[calc(100vh)] overflow-hidden">
              <div className="font-inter-500 absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/50 text-white px-3 sm:px-5 py-1 rounded-2xl text-xs sm:text-sm z-10">
                {activeParticipant.name}
              </div>
              <div className="h-full w-full max-h-full">
                <ParticipantVideo participant={activeParticipant} isMain={true} />
              </div>
            </div>

            {/* Thumbnails at the bottom - NOT overlaid on main video */}
            <div
              className="pt-1 overflow-x-auto flex-shrink-0"
              // style={{ maxHeight: "45vh" }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 w-full">
                {thumbnailParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className={cn(
                      "relative cursor-pointer transition-all rounded-[20px]",
                      participant.id === activeParticipant.id ? "border-4 border-green-500" : "",
                    )}
                    onClick={() => setAsActive(participant)}
                    style={{ aspectRatio: "16/9" }}
                  >
                    <ParticipantVideo participant={participant} isMain={false} width={100} isTablet={isTablet} height={100} />
                    <div className="absolute top-2 left-2 px-2 bg-black/50 w-auto rounded-2xl text-white text-xs p-1 truncate font-inter-500">
                      {participant.name}
                    </div>
                  </div>
                ))}

                {/* "+X participants" indicator */}
                {remainingParticipantsCount > 0 && (
                  <div
                    className="rounded-2xl relative cursor-pointer bg-green-100 flex items-center justify-center text-green-800 font-medium"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold">+{remainingParticipantsCount}</div>
                      <div className="text-xs">participants</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="p-1 mt-5 flex justify-center items-center gap-1 sm:gap-2 flex-wrap flex-shrink-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-10 sm:size-14 ${isMicOn ? "bg-medium-green " : "bg-btn-primary"}`}
                      onClick={() => setIsMicOn(!isMicOn)}
                    >
                      {isMicOn ? (
                        <img src={micOn || "/placeholder.svg"} alt="mic on icon" className="w-4 sm:w-5" />
                      ) : (
                        <img src={micOff || "/placeholder.svg"} alt="mic off icon" className="w-4 sm:w-5" />
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
                      className={`rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-10 sm:size-14 ${isVideoOn ? "bg-medium-green " : "bg-btn-primary"}`}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? (
                        <img src={videoOn || "/placeholder.svg"} alt="video on icon" className="w-4 sm:w-5" />
                      ) : (
                        <img src={videoOff || "/placeholder.svg"} alt="video off icon" className="w-4 sm:w-5" />
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
                      className={`rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-10 sm:size-14 ${isShareScreen ? "bg-medium-green " : "bg-btn-primary"}`}
                      onClick={() => setIsShareScreen(!isShareScreen)}
                    >
                      {isShareScreen ? (
                        <img src={shareScreenOn || "/placeholder.svg"} alt="share screen icon" className="w-4 sm:w-5" />
                      ) : (
                        <img src={shareScreen || "/placeholder.svg"} alt="share screen icon" className="w-4 sm:w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share Your Screen</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-3xl hover:bg-btn-primary bg-medium-green cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-10 sm:size-14`}
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
                        "rounded-3xl hover:bg-btn-primary cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-10 sm:size-14",
                        isSidebarOpen ? "bg-medium-green" : "bg-btn-primary",
                      )}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <Users
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${isSidebarOpen ? "text-white" : "text-medium-green"}`}
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
                      className="rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out size-10 sm:size-14"
                    >
                      <img src={closeCall || "/placeholder.svg"} className="w-4 sm:w-5" alt="call end icon" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>End call</TooltipContent>
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
            onClose={() => setIsSidebarOpen(false)}
            isMobile={isTablet}
            onParticipantSelect={handleParticipantSelect}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Custom hook for additional screen size breakpoints
function useWindowSize(breakpoint: number) {
  const [isBelow, setIsBelow] = useState(false)

  useEffect(() => {
    const checkSize = () => {
      setIsBelow(window.innerWidth < breakpoint)
    }

    // Check on mount
    checkSize()

    // Add event listener
    window.addEventListener("resize", checkSize)

    // Clean up
    return () => window.removeEventListener("resize", checkSize)
  }, [breakpoint])

  return isBelow
}
