import data from '../data/data.json';
import Searcbar from '../components/searchbar';
import MeetingList from '../components/MeetingList';
// import joinIcon from '../assets/icons/joinIcon.png'
import viewIcon from '../assets/icons/viewIcon.png'

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

function Ongoing() {
  const meetingsData = data as Data;
  
  return (
    <section className='p-7'>
      <Searcbar completedcount={meetingsData.meetings.filter(meeting => meeting.status === 'In Progress').length} />
      <MeetingList 
        data={meetingsData}
        statusFilter="In Progress"
        buttonText="Join"
        buttonIcon={viewIcon}
        status='In Progress'
        buttonAction="join"
      />
    </section>
  )
}

export default Ongoing;