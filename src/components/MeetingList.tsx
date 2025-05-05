import FormatDates from "../constants/constants"
import { Link } from "react-router-dom"

interface Participant {
  id: number
  name: string
  email: string
  messages: number
  minutes: number
  role: string
}

interface Meeting {
  id: number
  meetingTitle: string
  date: string
  status: string
  duration: string
  participants: Participant[]
}

interface Data {
  meetings: Meeting[]
}

interface MeetingListProps {
  data: Data
  statusFilter: string
  buttonText: string
  buttonIcon: string
  buttonAction: "view" | "join"
  status: "Completed" | "In Progress"
}

function MeetingList({ data, statusFilter, buttonText, buttonIcon, buttonAction, status }: MeetingListProps) {
  return (
    <>
      {/* <div className="1lg:space-y-5 "> */}
      <div className="1lg:space-y-5 grid grid-cols-1 md:grid-cols-2 gap-5 1lg:flex 1lg:flex-col">
        {data.meetings.map(
          (item: Meeting, index: number) =>
            item.status === statusFilter && (
              <div
                key={index}
                className=" flex gap-6 md:gap-10  1lg:gap-0 flex-col 1lg:flex-row items-center justify-between bg-white rounded-2xl p-4 md:p-5 border border-[#f4f4f4]"
              >
                {/* Meeting thumbnail and title - stacked on mobile, side by side on tablet/desktop */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center justify-between w-full 1lg:w-auto mb-4 md:mb-0">
                  {/* <div className="w-full sm:w-32 1lg:w-44">
                    <img src="https://picsum.photos/300/200" className="w-full rounded-2xl" alt="meeting thumbnail" />
                  </div> */}
                  <div className="rounded-2xl h-52 sm:h-22 w-full sm:w-32 1lg:w-44 bg-gray-300">

                  </div>

                  <div className="1lg:w-full w-auto sm:w-48 md:w-32 flex flex-col justify-center mt-2 sm:mt-0">
                    <h2 className="text-xs 1lg:text-sm font-inter-500 text-inActive-green uppercase">Title</h2>
                    <p className="text-sm truncate 1lg:overflow-visible 1lg:text-ellipsis 1lg:whitespace-normal
                    1lg:text-base font-inter-500 1lg:w-44 w-auto text-text-primary">{item.meetingTitle}</p>
                  </div>
                </div>

                {/* Meeting details - grid on mobile, flex on tablet/desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-4 md:gap-10 2xl:gap-32 items-start md:items-center justify-between w-full 1lg:w-auto mb-4 md:mb-0">
                  <div>
                    <h2 className="text-xs 1lg:text-sm font-inter-500 text-inActive-green uppercase">participants</h2>
                    <p className="1lg:text-base text-sm font-inter-500 text-text-primary">{item.participants.length}</p>
                  </div>

                  <div>
                    <h2 className="1lg:text-sm text-xs font-inter-500 text-inActive-green uppercase">Date</h2>
                    <p className="1lg:text-base text-sm font-inter-500 text-text-primary">{FormatDates(item.date)}</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <h2 className="text-xs 1lg:text-sm font-inter-500 text-inActive-green uppercase">Status</h2>
                    <p className="text-sm 1lg:text-base font-inter-500 text-text-primary">{status}</p>
                  </div>
                </div>

                {/* Action button - full width on mobile, auto width on tablet/desktop */}
                <div className="w-full 1lg:w-auto">
                  {buttonAction === "view" ? (
                    <Link
                      to={`/history/${item.id}`}
                      className="flex gap-2 justify-center md:justify-start px-4 md:px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-full md:w-auto"
                    >
                      <img src={buttonIcon || "/placeholder.svg"} className="w-4" alt="button icon" />
                      <p>{buttonText}</p>
                    </Link>
                  ) : (
                    <Link
                      to="/video"
                      role="button"
                      className="flex gap-2 justify-center md:justify-start px-4 md:px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-full md:w-auto"
                    >
                      <img src={buttonIcon || "/placeholder.svg"} className="w-4" alt="button icon" />
                      <p>{buttonText}</p>
                    </Link>
                  )}
                </div>
              </div>
            ),
        )}
      </div>
    </>
  )
}

export default MeetingList




// import FormatDates from '../constants/constants';
// import viewIcon from '../assets/icons/viewIcon.png'
// import { Link } from 'react-router-dom';

// interface Participant {
//   id: number;
//   name: string;
//   email: string;
//   messages: number;
//   minutes: number;
//   role: string;
// }

// interface Meeting {
//   id: number;
//   meetingTitle: string;
//   date: string;
//   status: string;
//   duration: string;
//   participants: Participant[];
// }

// interface Data {
//   meetings: Meeting[];
// }

// interface MeetingListProps {
//   data: Data;
//   statusFilter: string;
//   buttonText: string;
//   buttonIcon: string;
//   buttonAction: 'view' | 'join';
//     status: 'Completed' | 'In Progress' ;
// }

// function MeetingList({ data, statusFilter, buttonText, buttonIcon, buttonAction,status }: MeetingListProps) {
//   return (
//     <>
//       <div className='space-y-5'>
//         {data.meetings.map((item: Meeting, index: number) => (
//           item.status === statusFilter && (
//             <div key={index} className='flex  items-center justify-around bg-white rounded-2xl p-5 border border-[#f4f4f4]'>
//               <div className='flex gap-5 items-center justify-center'>
//                 <div className='w-44 '>
//                   <img src='https://picsum.photos/300/200' className='w-full rounded-2xl' alt="meeting thumbnail" />
//                 </div>

//                 <div className='flex flex-col justify-center'>
//                   <h2 className='text-sm font-inter-500 text-inActive-green uppercase'>
//                     Title
//                   </h2>
//                   <p className='text-base font-inter-500 w-44 text-text-primary'> 
//                     {item.meetingTitle}
//                   </p>
//                 </div>
//               </div>
//               <div className='flex gap-10 2xl:gap-32 items-center justify-evenly'>
//                 <div>
//                   <h2 className='text-sm font-inter-500 text-inActive-green uppercase'>
//                     participants
//                   </h2>
//                   <p className='text-base font-inter-500 text-text-primary'>
//                     {item.participants.length}
//                   </p>
//                 </div>
                
//                 <div>
//                   <h2 className='text-sm font-inter-500 text-inActive-green uppercase'>
//                     Date
//                   </h2>
//                    <p className='text-base font-inter-500 text-text-primary'>
//                     {FormatDates(item.date)}
//                   </p>
//                 </div>
//                 <p className='text-sm font-inter-500 text-inActive-green uppercase'>{status} </p>
//               </div>
//               <div className='flex gap-2'>
//                 {buttonAction === 'view' ? (
//                   <Link to={`/history/${item.id}`} className='flex gap-2 px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
//                     <img src={buttonIcon} className='w-4' alt="button icon" />
//                     <p>{buttonText}</p>
//                   </Link>
//                 ) : (
//                   <Link to='/video' role='button' className='flex gap-2 px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
//                     <img src={buttonIcon} className='w-4' alt="button icon" />
//                     <p>{buttonText}</p>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           )

//         ))}      </div>
//     </>
//   )
// }

// export default MeetingList; 