import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FormatDates from "../constants/constants";
import people from "../assets/icons/people.png";
import replay from "../assets/icons/replay.png";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Participants from "@/session Detail Tabs/Participants";
import Files from "@/session Detail Tabs/files";
import LinkTab from "@/session Detail Tabs/link";
import Conversation from "@/session Detail Tabs/conversation";
import { ChevronDown, Search } from "lucide-react";
import SortIcon from "../assets/icons/sort.png";
import filterIcon from "../assets/icons/filter.png";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRooms } from "../api/apiconfig";
import { addToast } from "../redux/toastSlice";
import type { Room } from "../types/room.types";

function SessionDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const result = await getRooms();
        
        if (result.success && result.data) {
          const roomsData = Array.isArray(result.data) ? result.data : result.data.rooms || [];
          const foundRoom = roomsData.find((r: Room) => r._id === id);
          
          if (foundRoom) {
            setRoom(foundRoom);
          } else {
            dispatch(addToast({
              id: Date.now().toString(),
              message: 'Room not found',
              type: 'error',
              open: true,
            }));
          }
        }
      } catch (error) {
        dispatch(addToast({
          id: Date.now().toString(),
          message: 'Failed to fetch room details',
          type: 'error',
          open: true,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id, dispatch]);

  const host = room?.participants.find(p => p._id === room.hostId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medium-green"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-lg font-inter-500 text-inActive-green">Room not found</p>
        <p className="text-sm font-inter-400 text-gray-400 mt-2">The session you're looking for doesn't exist</p>
      </div>
    );
  }

  // Calculate duration in hours and minutes
  const durationHours = Math.floor(room.durationInSeconds / 3600);
  const durationMinutes = Math.floor((room.durationInSeconds % 3600) / 60);
  const durationText = durationHours > 0 
    ? `${durationHours}h ${durationMinutes}m` 
    : `${durationMinutes}m`;

  return (
    <>
      <section className="">
        <div className="w-[98%] m-auto pt-10">
          <h1 className="text-4xl font-inter-500">{room.title}</h1>
          {room.description && (
            <p className="text-sm font-inter-400 text-inActive-green mt-2">{room.description}</p>
          )}
          <div className="flex flex-row flex-wrap mt-10 justify-between gap-10">
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-5">
                <div className="size-16 rounded-full bg-grey overflow-hidden">
                  {host?.profileImageString ? (
                    <img
                      src={host.profileImageString}
                      className="size-16 rounded-full object-cover"
                      alt={`${host.firstName} ${host.lastName}`}
                    />
                  ) : (
                    <div className="size-16 rounded-full bg-gradient-to-br from-medium-green to-green-600 flex items-center justify-center">
                      <span className="text-white text-xl font-inter-600">
                        {host ? `${host.firstName[0]}${host.lastName[0]}` : 'H'}
                      </span>
                    </div>
                  )}
                </div>

                {host && (
                  <div>
                    <p className="text-sm font-inter-600 text-text-primary uppercase">
                      {host.firstName} {host.lastName}
                    </p>
                    <p className="text-sm font-inter-500 text-inActive-green">
                      {host.email}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-sm font-inter-500 text-inActive-green uppercase">
                  participants
                </h2>
                <p className="text-base font-inter-500 text-text-primary">
                  {room.participants.length}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-inter-500 text-inActive-green uppercase">
                  Date
                </h2>
                <p className="text-base font-inter-500 text-text-primary">
                  {FormatDates(room.startTime || room.createdAt)}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-inter-500 text-inActive-green uppercase">
                  Duration
                </h2>
                <p className="text-base font-inter-500 text-text-primary">
                  {durationText}
                </p>
              </div>
              <p className="text-sm font-inter-500 flex justify-self-end self-end mb-2 text-inActive-green uppercase">
                {room.status}
              </p>
            </div>
            <div className="space-x-3 flex h-12">
              <button className="text-black bg-btn-primary font-inter-500 py-2 px-4 rounded-3xl">
                <img src={people} className="inline-block mr-2 size-7" />
                Create Group
              </button>
              <button className="text-black bg-btn-primary font-inter-500 py-2 px-4 rounded-3xl">
                <img src={replay} className="inline-block mr-2 size-7" />
                Replay Session
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-4 cursor-pointer" asChild>
                  <button className="bg-tab-button-bg border-medium-green rounded-[20px] border-2 text-medium-green">
                    <MoreHorizontal className="h-5 w-5 text-medium-green" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Delete Session</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <Separator className="bg-gray-100" />
        <Tabs defaultValue="participants" className="py-3 w-full">
          <div className="flex justify-between items-center px-5">
            <TabsList className="bg-white justify-start">
              <TabsTrigger value="participants" className="tabs">
                Participants
              </TabsTrigger>
              <TabsTrigger value="files" className="tabs">
                Files
              </TabsTrigger>
              <TabsTrigger value="link" className="tabs">
                Link
              </TabsTrigger>
              <TabsTrigger value="conversations" className="tabs">
                Conversation
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              <div className="flex w-full items-center gap-2 bg-fade-bg border-2 border-[#f4f4f4] rounded-2xl p-0.5">
                <Search className="text-medium-green ml-3 size-5" />
                <p className="sr-only">Search for participants</p>
                <input
                  placeholder="Search participants"
                  type="text"
                  className="focus:outline-none placeholder:text-[14px] font-inter-400 p-1 placeholder:text-inActive-green"
                />
              </div>
              <button className="h-9 px-2 cursor-pointer bg-tab-button-bg flex border-2 border-[#f4f4f4] rounded-2xl justify-center items-center">
                <img src={SortIcon} alt="sort" className="size-5 mr-2" />
                <p className="text-inActive-green text-[12px] font-inter-600 mr-6">Sort</p>
                <ChevronDown className="size-9 text-inActive-green font-bold" />
              </button>
              <button className="h-9 px-2 bg-tab-button-bg flex border-2 cursor-pointer border-[#f4f4f4] rounded-2xl justify-center items-center">
                <img src={filterIcon} alt="sort" className="size-5 mr-2" />
                <p className="text-inActive-green text-[12px] font-inter-600 mr-6">Filter</p>
                <ChevronDown className="size-9 text-inActive-green font-bold" />
              </button>
            </div>
          </div>
          <Separator className="bg-gray-100" />
          <TabsContent value="participants">
            <Participants 
              users={room?.participants.map(p => ({
                id: p._id,
                name: `${p.firstName} ${p.lastName}`,
                email: p.email,
                minutes: 0,
                messages: 0,
                role: p._id === room?.hostId ? 'Host' : 'Participant'
              })) || []} 
            />
          </TabsContent>
          <TabsContent value="files">
            <Files files={[]} />
          </TabsContent>
          <TabsContent value="link">
            <LinkTab links={[]}/>
          </TabsContent>
          <TabsContent value="conversations">
            <Conversation conversations={[]}/>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default SessionDetails;
