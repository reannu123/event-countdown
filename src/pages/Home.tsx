import { CountdownCard } from '@/components/CountdownCard';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { EventItem } from '@/types/event';

const Home = () => {
  const [events, setEvents] = useLocalStorage<EventItem[]>('events:v1', []);
  return (
    <>
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:dark:bg-gray-950">
        <div className="tw:flex tw:w-7xl tw:items-center tw:justify-center tw:dark:text-white tw:flex-col">
          <div>
            {events.map(event => (
              <CountdownCard
                key={event.id}
                item={event}
                onDelete={id => setEvents(prev => prev.filter(e => e.id !== id))}
              />
            ))}
          </div>
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
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
