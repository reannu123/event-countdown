import React, { useState } from 'react';
import type { EventItem } from '../types/event';

type Props = {
  onCreate: (item: EventItem) => void;
};

export const EventForm: React.FC<Props> = ({ onCreate }) => {
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.form}
    >
      <input
        style={styles.input}
        type="text"
        placeholder="Event title (e.g., Launch Day)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        style={styles.input}
        type="datetime-local"
        placeholder="Select date and time"
        value={dtLocal}
        onChange={e => setDtLocal(e.target.value)}
        required
      />
      <button
        style={styles.button}
        type="submit"
      >
        Add Event
      </button>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  input: { padding: '8px 10px', fontSize: 14 },
  button: { padding: '8px 12px', fontSize: 14, cursor: 'pointer' }
};
