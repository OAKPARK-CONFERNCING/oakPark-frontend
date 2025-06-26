"use client"
import { Excalidraw } from "@excalidraw/excalidraw"
import { useState } from "react";
import { X } from "lucide-react"
import "../../node_modules/@excalidraw/excalidraw/dist/dev/index.css";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {motion,AnimatePresence} from 'framer-motion'

interface WhiteboardPanelProps {
  isOpen: boolean
  onClose: () => void
  participants: any[]
  onParticipantSelect?: (participant: any) => void
  activeParticipant?: any
  remainingParticipantsCount?: number
  onOpenSidebar?: () => void
}

export default function WhiteboardPanel({
  isOpen,
  onClose,
  participants,
  onParticipantSelect,
  activeParticipant,
  remainingParticipantsCount = 0,
  onOpenSidebar,
}: WhiteboardPanelProps) {
  if (!isOpen) return null

  
const [isParticipants, setIsPaticipants] = useState(false)

  // Get first 5 participants for the overlay
  const overlayParticipants = participants.slice(0, 5)

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      {/* Excalidraw takes full screen */}
      <div className="flex-1 relative bg-white rounded-2xl overflow-hidden">
        <Excalidraw/>



        {/* Video Thumbnails Overlay Panel - Right Side */}
<AnimatePresence>
            {isParticipants && <motion.div 
            initial={{  opacity: 1,x:300 }}
            animate={{ opacity: 1,x:0 }}
            exit={{ opacity: 1,x:500 }}
            transition={{ duration: 0.3, ease: "easeInOut",type: "spring", stiffness: 300, damping: 25 }}
             className="absolute top-18 z-50 right-4 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-h-[calc(100%-10rem)] overflow-y-auto">
              {/* Close whiteboard button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Participants</h3>
                {/* <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button> */}
              </div>
    
              {/* Participants Grid */}
              <div className="space-y-3 max-h-[calc(100vh-8rem)] ">
                {overlayParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className={cn(
                      "relative cursor-pointer transition-all rounded-2xl overflow-hidden",
                      participant.id === activeParticipant?.id ? "border-4 border-green-500" : "border border-gray-200",
                    )}
                    onClick={() => onParticipantSelect && onParticipantSelect(participant)}
                    style={{ aspectRatio: "16/9" }}
                  >
                    {/* Participant Video Placeholder */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      {participant.videoOn ? (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 font-medium">
                            {participant.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .substring(0, 2)}
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                          {participant.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .substring(0, 2)}
                        </div>
                      )}
                    </div>
    
                    {/* Participant Name */}
                    <div className="absolute bottom-2 left-2 px-2 bg-black/50 rounded-xl text-white text-xs p-1 truncate font-inter-500">
                      {participant.name}
                    </div>
    
                    {/* Audio indicator */}
                    {!participant.audioOn && (
                      <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
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
                ))}
    
                {/* "+X participants" indicator */}
                {/* {remainingParticipantsCount > 0 && (
                  <div
                    className="rounded-2xl relative cursor-pointer bg-green-100 flex items-center justify-center text-green-800 font-medium border border-gray-200"
                    style={{ aspectRatio: "16/9" }}
                    onClick={onOpenSidebar}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold">+{remainingParticipantsCount}</div>
                      <div className="text-xs">participants</div>
                    </div>
                  </div>
                )} */}
              </div>
    
              {/* Hide Panel Button */}
              {/* <div className="mt-4 flex justify-center cursor-pointer">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {

                    setIsPaticipants(false)
                  }}
                >
                  Hide Panel
                </Button>
              </div> */}
            </motion.div>}
</AnimatePresence>
<div className="mt-4 flex  cursor-pointer justify-center z-50 absolute right-16 bottom-4">
            <Button
              variant="outline"

              className="text-xs cursor-pointer"
              onClick={() => setIsPaticipants(prev => !prev)}
            >{isParticipants ? "Hide " : " Show"} 
              Panel
            </Button>
          </div>
      </div>
    </div>
  )
}
