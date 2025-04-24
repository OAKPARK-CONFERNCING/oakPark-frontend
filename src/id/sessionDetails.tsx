import { useParams } from "react-router"
import data from "../data/data.json"
import FormatDates from '../constants/constants';
import people from '../assets/icons/people.png'
import replay from '../assets/icons/replay.png'

function sessionDetails() {
    const { id } = useParams<{ id: string }>();
    const meeting = data.meetings.find(meeting => String(meeting.id) === id);
    const role = meeting?.participants.find(participant => participant.role === "Host") ?? null;

    return (
        <>
            {meeting && (
                <div>
                    <h1 className="text-4xl font-bold  font-inter-500">{meeting.meetingTitle}</h1>
                    <div className="flex flex-row flex-wrap  mt-10 justify-between gap-10 ">
                        <div className="flex items-center gap-20">
                            <div className="flex items-center  gap-5 ">
                                <img src='https://picsum.photos/300/200' className='size-20 rounded-full' />
    
                                {role && (
                                    <div className="">
                                        <p className="text-sm 1xl:text-base font-inter-600 text-text-primary uppercase">{role.name}</p>
                                        <p className="1xl:text-base text-sm font-inter-500 text-inActive-green">{role.email}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>
                                    participants
                                </h2>
                                <p className='1xl:text-base text-sm font-inter-500 text-text-primary'>
                                    {meeting.participants.length}
                                </p>
                            </div>
                            <div>
                                <h2 className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>
                                    Date
                                </h2>
                                <p className='1xl:text-base text-sm font-inter-500 text-text-primary'>
                                    {FormatDates(meeting.date)}
                                </p>
                            </div>
                            <div>
                                <h2 className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>
                                    Duration
                                </h2>
                                <p className='1xl:text-base text-sm font-inter-500 text-text-primary'>
                                    {meeting.duration}
                                </p>
                            </div>
                            <p className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>{meeting.status}</p>
    
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
                        <button className="items-center justify-between border-medium-green border-2 text-medium-green font-inter-600 rounded-2xl p-4  flex gap-1">
                            <div className="bg-medium-green size-1 rounded-full "></div>
                            <div className="bg-medium-green size-1 rounded-full "></div>
                            <div className="bg-medium-green size-1 rounded-full "></div>
                        </button>
                    </div>
                    </div>
                </div>


            )}
        </>
    )
}

export default sessionDetails