import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Searchbar from '../components/searchbar';
import MeetingList from '../components/MeetingList';
import viewIcon from '../assets/icons/viewIcon.png';
import useDebounce from '../hooks/useDebounce';
import { getRooms } from '../api/apiconfig';
import { addToast } from '../redux/toastSlice';
import type { Room } from '../types/room.types';

function History() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch completed rooms
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const result = await getRooms('ended');
        
        if (result.success && result.data) {
          const roomsData = Array.isArray(result.data) ? result.data : result.data.rooms || [];
          setRooms(roomsData);
          setFilteredRooms(roomsData);
        } else {
          dispatch(addToast({
            id: Date.now().toString(),
            message: result.message || 'Failed to fetch rooms',
            type: 'error',
            open: true,
          }));
        }
      } catch (error) {
        dispatch(addToast({
          id: Date.now().toString(),
          message: 'An error occurred while fetching rooms',
          type: 'error',
          open: true,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [dispatch]);

  // Debounced search
  useDebounce({
    effect: () => {
      if (searchTerm) {
        setFilteredRooms(
          rooms.filter(room =>
            room.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredRooms(rooms);
      }
    },
    dependencies: [searchTerm, rooms],
    delay: 500,
  });

  const completedCount = rooms.length;
  const ongoingCount = 0; // No ongoing sessions in history page
  
  return (
    <section className='p-3 sm:p-5 md:p-7'>
      <Searchbar 
        completedcount={completedCount} 
        ongoingcount={ongoingCount} 
        setOnSearch={setSearchTerm}
      />
      <MeetingList 
        rooms={filteredRooms}
        status='Completed'
        buttonText="View"
        buttonIcon={viewIcon}
        buttonAction="view"
        isLoading={isLoading}
      />
    </section>
  )
}

export default History;
