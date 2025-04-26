import data from '../data/data.json';
import Searcbar from '../components/searchbar';
import MeetingList from '../components/MeetingList';
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

function History() {
  const meetingsData = data as Data;
  
  return (
    <section className='p-7'>
      <Searcbar completedcount={meetingsData.meetings.filter(meeting => meeting.status === 'Complete').length} />
      <MeetingList 
        data={meetingsData}
        statusFilter="Complete"
        status='Complete'
        buttonText="View"
        buttonIcon={viewIcon}
        buttonAction="view"
      />
    </section>
  )
}

export default History;
