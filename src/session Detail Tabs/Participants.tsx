import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

function Participants({
  users,
}: {
  users: {
    id: number;
    name: string;
    email: string;
    minutes: number;
    messages: number;
    role: string;
  }[];
}) {
  return (
    <>
      <div className="w-full  mx-auto bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-sm  font-inter-500 text-inActive-green uppercase tracking-wider w-16">
                  S/N
                </th>
                <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                  TIME SPENT
                </th>
                <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                  MESSAGES
                </th>
                <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                  ROLE
                </th>
                <th className="px-4 py-3 text-left text-xs font-inter-500 text-gray-500 uppercase tracking-wider w-16"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {Array.isArray(users) &&
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-inActive-green font-inter-500 ">
                      #{user.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex  items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-grey">
                          {/* <img
                            className="h-10 w-10 rounded-full object-cover"
                            // src={user.avatar || "/placeholder.svg"}
                            src="https://placehold.co/400"
                            alt={user.name}
                            width={40}
                            height={40}
                          /> */}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary font-inter-500">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-inActive-green font-inter-500">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-inActive-green font-inter-500">
                        {user.minutes} Minutes
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-inter-500">
                      <div className="text-sm text-inActive-green  font-inter-500">
                        {user.messages}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={
                          "inline-flex text-xs font-inter-500 text-inActive-green uppercase px-2 py-1 rounded-full"
                        }
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="border-[#cccccc] border-2 cursor-pointer"
                          asChild
                        >
                          <button className="p-1 rounded-full border-[#cccccc] border-2">
                            <MoreHorizontal className="h-5 w-5 text-[#cccccc]" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="font-inter-400 text-xs text-[#d0d0d0] text-center mt-4">
        You have reached the end of this list.
      </p>
    </>
  );
}

export default Participants;
