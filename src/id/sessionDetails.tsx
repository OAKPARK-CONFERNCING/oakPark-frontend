import { useParams } from "react-router"
import data from "../data/data.json"
import FormatDates from '../constants/constants';
import people from '../assets/icons/people.png'
import replay from '../assets/icons/replay.png'
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Participants from "@/session Detail Tabs/Participants";
import Files from "@/session Detail Tabs/files";
import Link from "@/session Detail Tabs/link";
import Conversation from "@/session Detail Tabs/conversation";
import { ChevronDown, Search } from "lucide-react";
import SortIcon from '../assets/icons/sort.png'
import filterIcon from '../assets/icons/filter.png'
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


function sessionDetails() {
    const { id } = useParams<{ id: string }>();
    const meeting = data.meetings.find(meeting => String(meeting.id) === id);
    const role = meeting?.participants.find(participant => participant.role === "Host") ?? null;

    return (
        <>
            {meeting && (
                <>
                    <section className="mt-10">
                        <h1 className="text-4xl   font-inter-500 ml-5">{meeting.meetingTitle}</h1>
                        <div className="flex flex-row flex-wrap  mt-10 justify-between gap-10 w-[95%] m-auto">
                            <div className="flex items-center gap-20 ">
                                <div className="flex items-center  gap-5 ">
                                    <img src='https://picsum.photos/300/200' className='size-16 rounded-full' />

                                    {role && (
                                        <div className="">
                                            <p className="text-sm  font-inter-600 text-text-primary uppercase">{role.name}</p>
                                            <p className=" text-sm font-inter-500 text-inActive-green">{role.email}</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className='text-sm  font-inter-500 text-inActive-green uppercase'>
                                        participants
                                    </h2>
                                    <p className=' text-base font-inter-500 text-text-primary'>
                                        {meeting.participants.length}
                                    </p>
                                </div>
                                <div>
                                    <h2 className='text-sm  font-inter-500 text-inActive-green uppercase'>
                                        Date
                                    </h2>
                                    <p className=' text-base font-inter-500 text-text-primary'>
                                        {FormatDates(meeting.date)}
                                    </p>
                                </div>
                                <div>
                                    <h2 className='text-sm  font-inter-500 text-inActive-green uppercase'>
                                        Duration
                                    </h2>
                                    <p className=' text-base font-inter-500 text-text-primary'>
                                        {meeting.duration}
                                    </p>
                                </div>
                                <p className='text-sm  font-inter-500 flex justify-self-end self-end mb-2 text-inActive-green uppercase'>{meeting.status}</p>

                            </div>
                            <div className="space-x-3 flex h-12">
                                <button className=" text-black bg-btn-primary  font-inter-500 py-2 px-4 rounded-3xl ">
                                    <img src={people} className="inline-block  mr-2 size-7" />
                                    Create Group
                                </button>
                                <button className=" text-black bg-btn-primary  font-inter-500 py-2 px-4 rounded-3xl ">
                                    <img src={replay} className="inline-block  mr-2 size-7" />
                                    Replay Session
                                </button>
                                {/* <button className="items-center justify-between border-medium-green border-2 text-medium-green font-inter-600 rounded-2xl p-4  flex gap-1">
                                <div className="bg-medium-green size-1 rounded-full "></div>
                                <div className="bg-medium-green size-1 rounded-full "></div>
                                <div className="bg-medium-green size-1 rounded-full "></div>
                            </button> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className=' p-4 rou cursor-pointer' asChild>
                                        <button className="bg-tab-button-bg border-medium-green rounded-[20px] border-2 text-medium-green ">
                                            <MoreHorizontal className="h-5 w-5 text-medium-green" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">Remove User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </section>
                    <section className="mt-10">
                        <Separator className="bg-gray-100" />
                        <Tabs defaultValue="participants" className="py-3 w-full">
                            <div className="flex justify-between items-center px-5">
                                <TabsList className="bg-white justify-start ">
                                    <TabsTrigger value="participants" className="tabs ">Participants</TabsTrigger>
                                    <TabsTrigger value="files" className="tabs">Files</TabsTrigger>
                                    <TabsTrigger value="link" className="tabs">Link</TabsTrigger>
                                    <TabsTrigger value="conversations" className="tabs">Conversation</TabsTrigger>
                                </TabsList>
                                <div className="flex items-center gap-3">
                                    <div className=" flex w-full items-center gap-2 bg-fade-bg border-2  border-[#f4f4f4] rounded-2xl p-0.5">
                                        <Search className="text-medium-green ml-3 size-5" />
                                        <p className="sr-only">Search for participants</p>
                                        <input placeholder="Search participants" type="text" name="" id="" className="focus:outline-none placeholder:text-[14px] font-inter-400  p-1 placeholder:text-inActive-green " />
                                    </div>
                                    <button className="h-9 px-2 cursor-pointer bg-tab-button-bg flex border-2  border-[#f4f4f4] rounded-2xl justify-center items-center">
                                        <img src={SortIcon} alt="sort" className="size-5 mr-2" />
                                        <p className="text-inActive-green text-[12px] font-inter-600 mr-6"> Sort</p>
                                        <ChevronDown className="size-9 text-inActive-green font-bold" />
                                    </button>
                                    <button className="h-9 px-2 bg-tab-button-bg flex border-2 cursor-pointer border-[#f4f4f4] rounded-2xl justify-center items-center">
                                        <img src={filterIcon} alt="sort" className="size-5 mr-2" />
                                        <p className="text-inActive-green text-[12px] font-inter-600 mr-6"> Filter</p>
                                        <ChevronDown className="size-9 text-inActive-green font-bold" />
                                    </button>
                                </div>
                            </div>
                            <Separator className="bg-gray-100" />
                            <TabsContent value="participants">
                                <Participants users={meeting.participants} />
                            </TabsContent>
                            <TabsContent value="files">
                                <Files />
                            </TabsContent>
                            <TabsContent value="link">
                                <Link />
                            </TabsContent>
                            <TabsContent value="conversations">
                                <Conversation />
                            </TabsContent>

                        </Tabs>
                    </section>
                </>


            )}
        </>
    )
}

export default sessionDetails