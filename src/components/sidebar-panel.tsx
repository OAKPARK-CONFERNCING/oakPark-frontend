
import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ParticipantsList from "@/components/participants-list"
import ChatPanel from "@/components/chat-panel"
import ConversationsPanel from "@/components/conversations-panel"
import { AnimatePresence, motion } from "framer-motion"

interface SidebarPanelProps {
  participants: any[]
  onClose: () => void
  isMobile: boolean
  onParticipantSelect?: (participant: any) => void
}

type TabId = "participants" | "chat" | "conversations"

interface TabData {
  id: TabId
  title: string
  count: number
  component: React.ReactNode
}

export default function SidebarPanel({ participants, onClose, isMobile,onParticipantSelect, }: SidebarPanelProps) {
  const [openTab, setOpenTab] = useState<TabId | null>("participants")

  // Define the tabs with their content
  const tabs: TabData[] = [
    {
      id: "participants",
      title: "Participants",
      count: participants.length,
      component: <ParticipantsList participants={participants} onParticipantSelect={onParticipantSelect} />,
    },
    {
      id: "chat",
      title: "Chat",
      count: 5, // Mock count
      component: <ChatPanel />,
    },
    {
      id: "conversations",
      title: "Conversations",
      count: 2, // Mock count
      component: <ConversationsPanel />,
    },
  ]

  const toggleTab = (tabId: TabId) => {
    setOpenTab(openTab === tabId ? null : tabId)
  }

  
  // Define fixed width based on mobile state
  const sidebarWidth = isMobile ? "75%" : "300px"

  return (
    <motion.aside
    initial={{ width: 0, opacity: 0, }}
    animate={{ width: "auto", opacity: 1, }}
    exit={{ width: 0, opacity: 0, }}
    transition={{ duration: 0.3, ease: "easeInOut",type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "bg-[#F7FFF8] border-gray-200 overflow-y-auto flex mt-5 ml-5 flex-col h-full",
        isMobile ? "fixed top-0 right-0 bottom-0 z-50 w-3/4 mt-0" : "",
      )}
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth,
      }}
    >
      {/* Close button for mobile */}
      {isMobile && (
        <div className="p-4 border-b border-gray-200 flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex-1  flex flex-col">
        {tabs.map((tab) => (
          <div key={tab.id} className="space-y-5 border mb-5 border-light-green cursor-pointer rounded-2xl">
            {/* Tab header */}
            <button
              className="w-full px-4 py-[18px] flex justify-between items-center text-left hover:bg-gray-50"
              onClick={() => toggleTab(tab.id)}
            >
              <div className="font-inter-700 text-header-text-primary text-lg">
                {tab.title} ({tab.count})
              </div>
              {openTab === tab.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            {/* Tab content with animation */}
            <AnimatePresence initial={false}>
              {openTab === tab.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-y-auto "
                >
                  <div className="  max-h-[calc(100vh-200px)] overflow-y-auto">{tab.component}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}
