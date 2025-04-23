import data from '../data/data.json';
import Searcbar from '../components/searchbar';
import FormatDates from '../constants/constants';
import viewIcon from '../assets/icons/viewIcon.png'

function History() {
  return (
    <section className='p-7'>
      <Searcbar completedcount={(data.meetings.length)}  />
      <div className='space-y-5'>
        {data.meetings.map((item, index) => (
          <div key={index} className='flex w-  items-center justify-around bg-white rounded-2xl p-5  border border-[#f4f4f4]'>
            <div className='flex gap-5 items-center justify-center'>
              <div className='w-44 '>
                <img src='https://picsum.photos/300/200' className='w-full rounded-2xl' />
              </div>

              <div className='flex flex-col  justify-center'>
                <h2 className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>
                  Title
                </h2>
                <p className='1xl:text-lg text-base font-inter-500 w-44 text-text-primary'> 
                  {item.meetingTitle}
                </p>
              </div>
            </div >
            <div className='flex gap-10 2xl:gap-32 items-center justify-evenly'>
              <div>
                <h2 className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>
                  participants
                </h2>
                <p className='1xl:text-base text-sm font-inter-500 text-text-primary'>
                  {item.participants.length}
                </p>
              </div>
              <div>
                <h2 className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>
                  Date
                </h2>
                <p className='1xl:text-base text-sm font-inter-500 text-text-primary'>
                  {FormatDates(item.date)}
                </p>
              </div>
              <p className='text-sm 1xl:text-base font-inter-500 text-inActive-green uppercase'>{item.status}</p>
              
            </div>
            <div className='flex gap-2'>
              <button className='flex gap-2 px-10 border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
                <img src={viewIcon} className='w-4' />
                <p>View</p>
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}

export default History;
