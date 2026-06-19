import type { EventItem } from '@/types/event';
import { useNow } from '@/context/NowContext';
import { sortBySoonest } from '@/lib/share';
import { CountdownCard } from './CountdownCard';
import { CalendarClock } from 'lucide-react';

type CountdownListProps = {
  events: EventItem[];
  onDelete: (id: string) => void;
  onEdit: (item: EventItem) => void;
};

function CountdownList({ events, onDelete, onEdit }: CountdownListProps) {
  const now = useNow();

  if (events.length === 0) {
    return (
      <div className="tw:mt-10 tw:flex tw:flex-col tw:items-center tw:gap-3 tw:rounded-2xl tw:border tw:border-dashed tw:border-white/15 tw:px-8 tw:py-16 tw:text-center tw:text-white/60">
        <CalendarClock size={40} className="tw:opacity-60" />
        <p className="tw:text-lg tw:font-medium tw:text-white/80">No countdowns yet</p>
        <p className="tw:max-w-sm tw:text-sm">
          Add your first event above — a launch, a birthday, a trip. Then share a
          live link with anyone, no account required.
        </p>
      </div>
    );
  }

  const sorted = sortBySoonest(events, now);

  return (
    <div className="tw:mt-8 tw:grid tw:w-full tw:grid-cols-1 tw:gap-5 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
      {sorted.map((event) => (
        <CountdownCard key={event.id} item={event} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default CountdownList;
