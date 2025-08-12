import React, { useMemo } from 'react';
import type { EventItem } from '@/types/event';
import useCountdown from '@/hooks/useCountdown';
import { Button } from './ui/button';

type Props = {
  item: EventItem;
  onDelete?: (id: string) => void;
};

export const CountdownCard: React.FC<Props> = ({ item, onDelete }) => {
  const target = useMemo(() => new Date(item.targetISO).getTime(), [item.targetISO]);
  const { days: d, hours: h, minutes: m, seconds: s, isExpired } = useCountdown(item.targetISO);
  const msLeft = target - Date.now();

  return (
    <div>
      <div>
        <strong>{item.title}</strong>
        {onDelete && (
          <Button
            variant="ghost"
            className="tw:cursor-pointer"
            onClick={() => onDelete(item.id)}
          >
            ✕
          </Button>
        )}
      </div>

      <div>Target: {new Date(item.targetISO).toLocaleString()}</div>

      {isExpired ? (
        <div>
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
      ) : (
        <div>
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
      {/* Time Left, modify to show different types */}
      <div>{`${Math.ceil(msLeft / 1000)} seconds remaining`}</div>
    </div>
  );
};

const TimeBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div>{String(value).padStart(2, '0')}</div>
    <div>{label}</div>
  </div>
);
