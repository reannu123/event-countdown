import CountdownList from '@/components/CountdownList';
import { EventForm } from '@/components/EventForm';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { EventItem } from '@/types/event';

const Home = () => {
  const [events, setEvents] = useLocalStorage<EventItem[]>('events:v1', []);
  const onDelete = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };
  const addEvent = (item: EventItem) => {
    setEvents(prev => [...prev, item]);
  };
  return (
    <>
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:dark:bg-gray-950">
        <div className="tw:flex tw:w-7xl tw:flex-col tw:items-center tw:justify-center tw:dark:text-white">

          <EventForm onCreate={addEvent} />

          <CountdownList
            events={events}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
