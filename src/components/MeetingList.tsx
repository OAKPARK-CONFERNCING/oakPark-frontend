import FormatDates from '../constants/constants';
import viewIcon from '../assets/icons/viewIcon.png'
import { Link } from 'react-router-dom';

interface Participant {
  id: number;
  name: string;
  email: string;
  messages: number;
  minutes: number;
  role: string;
}

interface Meeting {
  id: number;
  meetingTitle: string;
  date: string;
  status: string;
  duration: string;
  participants: Participant[];
}

interface Data {
  meetings: Meeting[];
}

interface MeetingListProps {
  data: Data;
  statusFilter: string;
  buttonText: string;
  buttonIcon: string;
  buttonAction: 'view' | 'join';
    status: 'Complete' | 'In Progress' ;
}

function MeetingList({ data, statusFilter, buttonText, buttonIcon, buttonAction,status }: MeetingListProps) {
  return (
    <>
      <div className='space-y-5'>
        {data.meetings.map((item: Meeting, index: number) => (
          item.status === statusFilter && (
            <div key={index} className='flex  items-center justify-around bg-white rounded-2xl p-5 border border-[#f4f4f4]'>
              <div className='flex gap-5 items-center justify-center'>
                <div className='w-44 '>
                  <img src='https://picsum.photos/300/200' className='w-full rounded-2xl' alt="meeting thumbnail" />
                </div>

                <div className='flex flex-col justify-center'>
                  <h2 className='text-sm font-inter-500 text-inActive-green uppercase'>
                    Title
                  </h2>
                  <p className='text-base font-inter-500 w-44 text-text-primary'> 
                    {item.meetingTitle}
                  </p>
                </div>
              </div>
              <div className='flex gap-10 2xl:gap-32 items-center justify-evenly'>
                <div>
                  <h2 className='text-sm font-inter-500 text-inActive-green uppercase'>
                    participants
                  </h2>
                  <p className='text-base font-inter-500 text-text-primary'>
                    {item.participants.length}
                  </p>
                </div>
                
                <div>
                  <h2 className='text-sm font-inter-500 text-inActive-green uppercase'>
                    Date
                  </h2>
                   <p className='text-base font-inter-500 text-text-primary'>
                    {FormatDates(item.date)}
                  </p>
                </div>
                <p className='text-sm font-inter-500 text-inActive-green uppercase'>{status} </p>
              </div>
              <div className='flex gap-2'>
                {buttonAction === 'view' ? (
                  <Link to={`/history/${item.id}`} className='flex gap-2 px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
                    <img src={buttonIcon} className='w-4' alt="button icon" />
                    <p>{buttonText}</p>
                  </Link>
                ) : (
                  <button className='flex gap-2 px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
                    <img src={buttonIcon} className='w-4' alt="button icon" />
                    <p>{buttonText}</p>
                  </button>
                )}
              </div>
            </div>
          )

        ))}      </div>
    </>
  )
}

export default MeetingList; 