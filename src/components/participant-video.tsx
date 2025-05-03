"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParticipantVideoProps {
  participant: {
    id: string
    name: string
    role?: string
    videoOn: boolean
    audioOn: boolean
  }
  isMain?: boolean
  width?: number
  height?: number
  isTablet?: boolean
}

export default function ParticipantVideo({ participant, isMain = false, width, height,isTablet }: ParticipantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // In a real app, this would connect to WebRTC streams
  // For now, we'll simulate video with a placeholder
  useEffect(() => {
    if (participant.videoOn && videoRef.current) {
      // In a real app, you would connect the video element to the WebRTC stream
      // For this demo, we'll simulate a video with a placeholder
      setIsLoading(true)

      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [participant.videoOn])

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Preserve percentage-based sizing from original code
  const containerStyles = {
    width: width ? `${width}%` : isMain  ? "100%" : "100%",
    height: height ? `${height}%` : isTablet  ? "50vh" : "100%",
    aspectRatio: isMain ? undefined : undefined, // Remove aspect ratio constraint for main video
    maxHeight: isMain ? "90vh" : undefined, // Allow main video to take up to 90% of viewport height
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-800 rounded-2xl",
        isMain ? "w-full h-full max-h-full" : "w-full h-full",
      )}
      style={containerStyles}
    >
      {participant.videoOn ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
          <video
            ref={videoRef}
            className={cn("w-full h-full object-cover max-h-full", isLoading ? "opacity-0" : "opacity-100")}
            autoPlay
            playsInline
            muted
          >
            {/* In a real app, the source would be set via WebRTC */}
            <source src="/placeholder.svg?height=720&width=1280" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <div className="w-full xl:h-[90vh] h-full flex items-center justify-center bg-gray-700">
          <div
            className={cn(
              "flex items-center object-cover justify-center rounded-full bg-green-600 text-white",
              isMain ? "w-24 h-24 text-3xl" : "w-12 h-12 text-sm",
            )}
          >
            {getInitials(participant.name)}
          </div>
        </div>
      )}

      {/* Audio indicator */}
      {!participant.audioOn && (
        <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
