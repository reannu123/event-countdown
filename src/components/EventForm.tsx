import React, { useEffect, useState } from 'react';
import type { EventItem } from '@/types/event';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { THEMES, DEFAULT_THEME } from '@/lib/themes';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (item: EventItem) => void;
  editing?: EventItem | null;
};

const createEventId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// ISO (UTC) -> value for <input type="datetime-local"> in the user's local time.
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const EventForm: React.FC<Props> = ({ open, onOpenChange, onSubmit, editing }) => {
  const [title, setTitle] = useState('');
  const [dtLocal, setDtLocal] = useState('');
  const [note, setNote] = useState('');
  const [theme, setTheme] = useState(DEFAULT_THEME.id);

  // Prefill when opening in edit mode (or reset for a fresh add).
  useEffect(() => {
    if (!open) return;
    if (editing) {
      setTitle(editing.title);
      setDtLocal(toLocalInput(editing.targetISO));
      setNote(editing.note ?? '');
      setTheme(editing.theme ?? DEFAULT_THEME.id);
    } else {
      setTitle('');
      setDtLocal('');
      setNote('');
      setTheme(DEFAULT_THEME.id);
    }
  }, [open, editing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || !dtLocal) return;
    onSubmit({
      id: editing?.id ?? createEventId(),
      title: t,
      targetISO: new Date(dtLocal).toISOString(),
      note: note.trim() || undefined,
      theme,
    });
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="tw:sm:max-w-[460px]">
        <form onSubmit={handleSubmit} className="tw:flex tw:flex-col tw:gap-4">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit countdown' : 'New countdown'}</DialogTitle>
            <DialogDescription>
              Pick a moment to count down to. The time is stored in UTC so shared
              links are correct in every timezone.
            </DialogDescription>
          </DialogHeader>

          <div className="tw:flex tw:flex-col tw:gap-1">
            <label className="tw:text-sm tw:text-white/70">Title</label>
            <Input
              type="text"
              name="title"
              placeholder="e.g. Product launch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="tw:flex tw:flex-col tw:gap-1">
            <label className="tw:text-sm tw:text-white/70">Date &amp; time</label>
            <Input
              type="datetime-local"
              name="targetDateTime"
              value={dtLocal}
              onChange={(e) => setDtLocal(e.target.value)}
              required
            />
          </div>

          <div className="tw:flex tw:flex-col tw:gap-1">
            <label className="tw:text-sm tw:text-white/70">Note (optional)</label>
            <Input
              type="text"
              name="note"
              placeholder="A short detail"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="tw:flex tw:flex-col tw:gap-2">
            <label className="tw:text-sm tw:text-white/70">Theme</label>
            <div className="tw:flex tw:flex-wrap tw:gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  title={t.name}
                  aria-label={t.name}
                  onClick={() => setTheme(t.id)}
                  className="tw:h-8 tw:w-8 tw:rounded-full tw:ring-offset-2 tw:ring-offset-black tw:transition"
                  style={{
                    background: t.gradient,
                    outline: theme === t.id ? `2px solid ${t.accent}` : '2px solid transparent',
                  }}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? 'Save' : 'Add'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
