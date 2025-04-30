
import { MessageSquare } from "lucide-react"

// Mock conversations
const conversations = [
  {
    id: "1",
    title: "General Discussion",
    lastMessage: "Let's continue the conversation about AI models here.",
    participants: 15,
    unread: 3,
  },
  {
    id: "2",
    title: "Q&A",
    lastMessage: "Please post your questions about the workshop here.",
    participants: 8,
    unread: 0,
  },
]

export default function ConversationsPanel() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{conversation.title}</h3>
                  {conversation.unread > 0 && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{conversation.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-2">{conversation.participants} participants</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
