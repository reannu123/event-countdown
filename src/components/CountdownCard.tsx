import React, { useMemo } from 'react';
import type { EventItem } from '@/types/event';
import useCountdown from '@/hooks/useCountdown';

type Props = {
  item: EventItem;
  onDelete?: (id: string) => void;
};

export const CountdownCard: React.FC<Props> = ({ item, onDelete }) => {
  const target = useMemo(() => new Date(item.targetISO).getTime(), [item.targetISO]);
  const { days: d, hours: h, minutes: m, seconds: s, isExpired } = useCountdown(item.targetISO);
  const msLeft = target - Date.now();

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <strong>{item.title}</strong>
        {onDelete && (
          <button
            style={styles.delete}
            onClick={() => onDelete(item.id)}
          >
            ✕
          </button>
        )}
      </div>

      <div style={styles.subtle}>Target: {new Date(item.targetISO).toLocaleString()}</div>

      {isExpired ? (
        <div style={{ ...styles.timer, color: '#b91c1c' }}>Event started!</div>
      ) : (
        <div style={styles.timer}>
          <TimeBox
            label="Days"
            value={d}
          />
          <TimeBox
            label="Hours"
            value={h}
          />
          <TimeBox
            label="Minutes"
            value={m}
          />
          <TimeBox
            label="Seconds"
            value={s}
          />
        </div>
      )}

      <div style={styles.micro}>
        {msLeft > 0 ? `${Math.ceil(msLeft / 1000)} seconds remaining` : '0s'}
      </div>
    </div>
  );
};

const TimeBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div style={styles.box}>
    <div style={styles.boxValue}>{String(value).padStart(2, '0')}</div>
    <div style={styles.boxLabel}>{label}</div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    background: '#222',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  delete: { border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16 },
  subtle: { color: '#6b7280', marginTop: 4, marginBottom: 8, fontSize: 12 },
  timer: { display: 'flex', gap: 12, alignItems: 'center', fontVariantNumeric: 'tabular-nums' },
  box: { textAlign: 'center', minWidth: 72 },
  boxValue: { fontSize: 28, fontWeight: 700 },
  boxLabel: { fontSize: 12, color: '#6b7280' },
  micro: { marginTop: 8, color: '#9ca3af', fontSize: 12 }
};
