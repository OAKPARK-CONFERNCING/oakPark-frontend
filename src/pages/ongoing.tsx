import data from '../data/data.json';
import Searchbar from '../components/searchbar';
import MeetingList from '../components/MeetingList';
import viewIcon from '../assets/icons/viewIcon.png';
import { useState } from 'react';
import  useDebounce  from '../hooks/useDebounce';


export interface Participant {
  id: number;
  name: string;
  email: string;
  messages: number;
  minutes: number;
  role: string;
}

export interface Meeting {
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

  // const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Count totals
  const completedCount = meetingsData.meetings.filter(m => m.status === 'Completed').length;
  const ongoingCount = meetingsData.meetings.filter(m => m.status === 'In Progress').length;

  // Search term state
  const [searchTerm, setSearchTerm] = useState<string>('');
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
  


  return (
    <section className="p-3 sm:p-5 md:p-7">
      <Searchbar
        completedcount={completedCount}
        ongoingcount={ongoingCount}
        setOnSearch={setSearchTerm}
      />
      <MeetingList 
        data={{ meetings: filteredMeetings }}
        statusFilter="In Progress"
        buttonText="Join"
        buttonIcon={viewIcon}
        status="In Progress"
        buttonAction="join"
      />
    </section>
  );
}

export default Ongoing;