import { Search } from 'lucide-react'
// import {useState} from 'react'
// import ongoing from '../pages/ongoing'

function searchbar({completedcount,ongoingcount}: { completedcount?: number , ongoingcount?:number }) {
  // const [completedcount, setCompletedCount] = useState<number>(0)

  return (
    <div className='flex items-center gap-4 mb-5'>
      <div className=' flex w-full items-center gap-2 bg-fade-bg border-2  border-[#f4f4f4] rounded-2xl p-2'>
        <Search className='text-inActive-green ml-3'/>
        <input type="text" placeholder='Enter a session title' className=' focus:outline-none font-inter-400  p-2 placeholder:text-inActive-green w-full'/>
      </div>
      <div className='flex gap-2'>
        <button className='border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2'>
          completed({completedcount})
        </button>
        <button className='border-2 border-[#f4f4f4] bg-fade-bg font-inter-600 text-inActive-green rounded-2xl p-2'>
          Ongoing({ongoingcount})
        </button>
      </div>
    </div>
  )
}

export default searchbar