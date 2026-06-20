import React from 'react';
import type { CountdownParts } from '@/lib/time';
import type { Theme } from '@/lib/themes';

type Props = {
  parts: CountdownParts;
  theme: Theme;
  size?: 'sm' | 'lg';
};

// The set of time boxes (days / hours / minutes / seconds). Shared between the
// dashboard cards (sm) and the full-screen shared view (lg).
const BigCountdown: React.FC<Props> = ({ parts, theme, size = 'sm' }) => {
  const boxes = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: parts.hours },
    { label: 'Minutes', value: parts.minutes },
    { label: 'Seconds', value: parts.seconds },
  ];
  const big = size === 'lg';

  if (parts.isExpired) {
    return (
      <div
        className={big ? 'tw:py-6 tw:text-center' : 'tw:py-2 tw:text-center'}
        style={{ color: theme.text }}
      >
        <div className={big ? 'tw:text-6xl' : 'tw:text-3xl'}>🎉</div>
        <div
          className={big ? 'tw:mt-2 tw:text-2xl tw:font-semibold' : 'tw:mt-1 tw:text-lg tw:font-semibold'}
          style={{ color: theme.accent }}
        >
          It's here!
        </div>
      </div>
    );
  }

  return (
    <div className={big ? 'tw:flex tw:justify-center tw:gap-4' : 'tw:flex tw:justify-center tw:gap-2'}>
      {boxes.map((b) => (
        <div key={b.label} className="tw:text-center">
          <div
            className={
              big
                ? 'tw:min-w-[5rem] tw:rounded-2xl tw:px-3 tw:py-4 tw:text-5xl tw:font-bold tw:tabular-nums tw:sm:min-w-[6rem] tw:sm:text-7xl'
                : 'tw:min-w-[3rem] tw:rounded-lg tw:px-2 tw:py-2 tw:text-2xl tw:font-bold tw:tabular-nums'
            }
            style={{ background: 'rgba(0,0,0,0.25)', color: theme.accent }}
          >
            {String(b.value).padStart(2, '0')}
          </div>
          <div
            className={big ? 'tw:mt-2 tw:text-sm tw:uppercase tw:tracking-wider' : 'tw:mt-1 tw:text-[10px] tw:uppercase tw:tracking-wider'}
            style={{ color: theme.text, opacity: 0.7 }}
          >
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BigCountdown;
