// Pure countdown math, decoupled from React so it can be unit-tested.
export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalMs: number;
};

export function computeParts(targetMs: number, nowMs: number): CountdownParts {
  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalMs: diff };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
    totalMs: diff,
  };
}

// "in 3 days", "in 4 hours", "12 minutes ago" — a friendly relative summary.
export function humanize(parts: CountdownParts): string {
  if (parts.isExpired) return 'Completed';
  if (parts.days > 0) return `in ${parts.days} day${parts.days === 1 ? '' : 's'}`;
  if (parts.hours > 0) return `in ${parts.hours} hour${parts.hours === 1 ? '' : 's'}`;
  if (parts.minutes > 0) return `in ${parts.minutes} minute${parts.minutes === 1 ? '' : 's'}`;
  return 'less than a minute';
}

export function formatTarget(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
