import type { EventItem } from '@/types/event';
import { CountdownCard } from './CountdownCard';

type CountdownListProps = {
  events: EventItem[];
  onDelete: (id: string) => void;
};
function CountdownList({ events, onDelete }: CountdownListProps) {
  return (
    <div>
      {events.map(event => (
        <CountdownCard
          key={event.id}
          item={event}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CountdownList;
