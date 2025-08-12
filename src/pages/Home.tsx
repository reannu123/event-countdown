import CountdownList from '@/components/CountdownList';
import { EventForm } from '@/components/EventForm';
import { Button } from '@/components/ui/button';
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
          
          <Button
            size={'lg'}
            variant={'secondary'}
            className="tw:mt-4 tw:w-full tw:max-w-xs tw:cursor-pointer"
            onClick={() => {
              const newEvent: EventItem = {
                id: crypto.randomUUID(),
                title: 'New Event',
                targetISO: new Date(Date.now() + 86400000).toISOString() // 1 day from now
              };
              setEvents(prev => [...prev, newEvent]);
            }}
          >
            Add Event
          </Button><EventForm onCreate={addEvent} />

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
