import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatFileLastViewed } from "@/constants/constants"
import { MoreHorizontal } from "lucide-react"
import linkIcon from '@/assets/icons/linkIcon.png'
import viewLinkIcon from '@/assets/icons/viewLinkIcon.png'
import { Link } from "react-router"

function LinkTab({links}: { links: { linkName: string,  link:string, sharedBy: { name: string, email: string }, numberOfViews: number, lastViewed: string }[] }) {
  return (
    <>
    <div className="w-full  mx-auto bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs  font-inter-500 text-inActive-green uppercase tracking-wider w-16">
              
              </th>
              <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">NAME</th>
             <th></th>
              <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">
                Views
              </th>
              <th className="px-4 py-3 text-left text-sm font-inter-500 text-inActive-green uppercase tracking-wider">Last Viewed</th>
              <th className="px-4 py-3 text-left text-xs font-inter-500 text-gray-500 uppercase tracking-wider w-16"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.isArray(links) && links.map((link) => {
              const { formattedDate, formattedTime } = formatFileLastViewed(link.lastViewed);
              return (
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-inActive-green font-inter-500 ">
                  <div className="bg-green-light size-14 rounded-xl flex justify-center  items-center">
                          <img
                            className="h-8 w-8  rounded-xl object-cover"
                            // src={user.avatar || "/placeholder.svg"}
                            src={linkIcon}
                            alt='link Icon'
                            width={40}
                            height={40}
                          />
                        </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center   h-full gap-[20%]">

                        {/* <div className="bg-green-light size-14 rounded-xl flex justify-center  items-center">
                          <img
                            className="h-8 w-8  rounded-xl object-cover"
                            // src={user.avatar || "/placeholder.svg"}
                            src={linkIcon}
                            alt='link Icon'
                            width={40}
                            height={40}
                          />
                        </div> */}

                      <div className="ml-4">
                        <p className="text-sm font-medium text-text-primary font-inter-500">{link.linkName}</p>
                        <p className="text-sm text-inActive-green font-inter-500">{link.link}</p>
                      </div>
                      {/* <Link to={link.link} className="inline-flex items-center">
                        <p  className="font-inter-600 text-medium-green text-base uppercase">view</p>
                        <img src={viewLinkIcon} className="size-5" />
                      </Link> */}
                    </div>
                  </td>
                  <td>
                    <a href={link.link} target="_blank" rel="noopener noreferrer" className="inline-flex gap-1 items-center">
                        <p  className="font-inter-600 text-medium-green text-base uppercase">view</p>
                        <img src={viewLinkIcon} className="size-4" />
                    </a>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm flex text-inActive-green font-inter-500">
                      <img src='https://placehold.co/400' className='size-10 rounded-full' />
                      <div className="ml-4">
                        <p className="text-sm  text-text-primary font-inter-500">{link.sharedBy.name}</p>
                        <p className="text-sm  text-inActive-green font-inter-500">{link.sharedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-inter-500">
                    <div className="text-sm text-inActive-green  font-inter-500">{link.numberOfViews}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={"  text-inActive-green uppercase px-2 py-1 rounded-full"}
                    >
                      <p className="text-text-primary font-inter-500">{formattedDate}</p>
                      <p className="text-xs font-inter-500 ">{formattedTime}</p>
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger className='border-[#cccccc] border-2 cursor-pointer' asChild>
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
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
    <p className='font-inter-400 text-xs text-[#d0d0d0] text-center mt-4'>You have reached the end of this list.</p>
  </>
  )
}

export default LinkTab