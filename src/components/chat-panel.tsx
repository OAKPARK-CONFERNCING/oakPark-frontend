"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock chat messages
const initialMessages = [
  {
    id: "1",
    sender: "Micheal Mbasa",
    role: "host",
    message: "Welcome everyone to our AI and Machine Learning workshop!",
    time: "10:02 AM",
  },
  {
    id: "2",
    sender: "Mariam Chen",
    role: "co-host",
    message: "If you have any questions, feel free to ask in the chat.",
    time: "10:03 AM",
  },
  {
    id: "3",
    sender: "Norman Heisch",
    role: "member",
    message: "Is there a recording of this session available afterwards?",
    time: "10:05 AM",
  },
  {
    id: "4",
    sender: "Micheal Mbasa",
    role: "host",
    message: "Yes, we'll share the recording with all participants after the session.",
    time: "10:06 AM",
  },
  {
    id: "5",
    sender: "Kate Moore",
    role: "member",
    message: "Great! Looking forward to the workshop.",
    time: "10:07 AM",
  },
]

export default function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      sender: "You",
      role: "participant",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto w-full">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col w-full">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{msg.sender}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
            <p className="text-sm mt-1 break-words">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-gray-200 w-full">
        <div className="flex gap-2 w-full">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
