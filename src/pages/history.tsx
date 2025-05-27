import data from '../data/data.json';
import Searcbar from '../components/searchbar';
import MeetingList from '../components/MeetingList';
import viewIcon from '../assets/icons/viewIcon.png'
import { useState } from 'react';
import  useDebounce  from '../hooks/useDebounce';

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

  const [searchTerm, setSearchTerm] = useState<string >('');
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);

  // Filter meetings by status and search term
  useDebounce({
    effect: () => {
      setFilteredMeetings(
        meetingsData.meetings.filter(m =>
          m.meetingTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    },
    dependencies: [meetingsData, searchTerm],
    delay: 500,
  });

  const completedCount = meetingsData.meetings.filter(meeting => meeting.status === 'Completed').length;
  const ongoingCount = meetingsData.meetings.filter(meeting => meeting.status === "In Progress").length;
  
  return (
    <section className='p-3 sm:p-5 md:p-7'>
    <Searcbar completedcount={completedCount}  ongoingcount={ ongoingCount} setOnSearch={setSearchTerm}/>
      <MeetingList 
        data={{meetings: filteredMeetings}}
        statusFilter="Completed"     
        status='Completed'
        buttonText="View"
        buttonIcon={viewIcon}
        buttonAction="view"
      />
    </section>
  )
}

export default History;
