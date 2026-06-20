import { useState } from 'react';
import CountdownList from '@/components/CountdownList';
import { EventForm } from '@/components/EventForm';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { EventItem } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Plus, Timer } from 'lucide-react';

const Home = () => {
  const [events, setEvents] = useLocalStorage<EventItem[]>('events:v1', []);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);

  const onDelete = (id: string) => setEvents((prev) => prev.filter((e) => e.id !== id));

  const upsert = (item: EventItem) =>
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === item.id);
      return exists ? prev.map((e) => (e.id === item.id ? item : e)) : [...prev, item];
    });

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (item: EventItem) => {
    setEditing(item);
    setOpen(true);
  };

  return (
    <div className="tw:min-h-screen tw:w-full tw:bg-gray-950 tw:px-4 tw:py-10 tw:text-white">
      <div className="tw:mx-auto tw:flex tw:w-full tw:max-w-6xl tw:flex-col">
        <header className="tw:flex tw:flex-col tw:items-start tw:justify-between tw:gap-4 tw:sm:flex-row tw:sm:items-center">
          <div>
            <div className="tw:flex tw:items-center tw:gap-2 tw:text-2xl tw:font-bold">
              <Timer className="tw:text-sky-400" /> Countdowns
            </div>
            <p className="tw:mt-1 tw:text-sm tw:text-white/55">
              Track the moments that matter — and share a live link with anyone.
            </p>
          </div>
          <Button onClick={openAdd} className="tw:gap-1">
            <Plus size={18} /> Add countdown
          </Button>
        </header>

        <CountdownList events={events} onDelete={onDelete} onEdit={openEdit} />
      </div>

      <EventForm open={open} onOpenChange={setOpen} onSubmit={upsert} editing={editing} />
    </div>
  );
};

export default Home;
