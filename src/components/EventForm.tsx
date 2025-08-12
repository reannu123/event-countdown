import React, { useState } from 'react';
import type { EventItem } from '../types/event';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type Props = {
  onCreate: (item: EventItem) => void;
};

export const EventForm: React.FC<Props> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dtLocal, setDtLocal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dtLocal) return;

    // datetime-local -> treat as local time, convert to ISO (UTC)
    const targetISO = new Date(dtLocal).toISOString();

    const item: EventItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      targetISO
    };
    onCreate(item);
    setTitle('');
    setDtLocal('');
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Countdown</Button>
      </DialogTrigger>
      <DialogContent className="tw:sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Countdown</DialogTitle>
            <DialogDescription>
              Create a new countdown event by providing a title and target date/time.
              <br />
              The target date will be converted to UTC for accurate countdown calculations.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Event title (e.g., Launch Day)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <Input
            type="datetime-local"
            placeholder="Select date and time"
            value={dtLocal}
            onChange={e => setDtLocal(e.target.value)}
            required
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
