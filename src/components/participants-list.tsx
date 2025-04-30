import { Mic, MicOff, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ParticipantsListProps {
  participants: Array<{
    id: string
    name: string
    email: string
    role?: string
    videoOn: boolean
    audioOn: boolean
  }>
}

export default function ParticipantsList({ participants }: ParticipantsListProps) {
  // Group participants by role
  const groupedParticipants = participants.reduce(
    (acc, participant) => {
      const role = participant.role || "participant"
      if (!acc[role]) {
        acc[role] = []
      }
      acc[role].push(participant)
      return acc
    },
    {} as Record<string, typeof participants>,
  )

  // Order of roles to display
  const roleOrder = ["host", "co-host", "member", "participant", "guest"]

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    const displayNames: Record<string, string> = {
      host: "Host",
      "co-host": "Co-Host",
      member: "Member",
      participant: "Participant",
      guest: "Guest",
    }
    return displayNames[role] || role
  }

  return (
    <div className="divide-y divide-gray-100">
      {roleOrder.map((role) => {
        const roleParticipants = groupedParticipants[role] || []
        if (roleParticipants.length === 0) return null

        return (
          <div key={role} className="py-1">
            {roleParticipants.map((participant) => (
              <div key={participant.id} className="px-4 py-2 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 flex items-center">
                        {participant.name}
                        {participant.role === "host" && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Host</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{participant.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {participant.audioOn ? (
                      <Mic className="h-4 w-4 text-gray-400" />
                    ) : (
                      <MicOff className="h-4 w-4 text-red-500" />
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
