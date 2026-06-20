import { describe, it, expect } from 'vitest';
import { encodeEvent, decodeEvent, shareUrl, sortBySoonest } from './share';
import { computeParts, humanize } from './time';
import type { EventItem } from '@/types/event';

const ev = (over: Partial<EventItem> = {}): EventItem => ({
  id: '1',
  title: 'Launch 🚀',
  targetISO: '2030-01-01T00:00:00.000Z',
  theme: 'sunset',
  note: 'café',
  ...over,
});

describe('share codec', () => {
  it('round-trips an event (incl. unicode) through the URL code', () => {
    const decoded = decodeEvent(encodeEvent(ev()));
    expect(decoded).toEqual({
      title: 'Launch 🚀',
      targetISO: '2030-01-01T00:00:00.000Z',
      theme: 'sunset',
      note: 'café',
    });
  });

  it('produces URL-safe codes (no +, /, =)', () => {
    const code = encodeEvent(ev({ title: '???>>>///' }));
    expect(code).not.toMatch(/[+/=]/);
  });

  it('returns null for garbage or malformed payloads', () => {
    expect(decodeEvent('not-base64!!')).toBeNull();
    expect(decodeEvent(btoa('{"nope":1}'))).toBeNull();
  });

  it('builds a share URL under /c/', () => {
    expect(shareUrl(ev(), 'https://x.app/')).toContain('https://x.app/c/');
  });
});

describe('sortBySoonest', () => {
  it('orders upcoming soonest-first and sinks expired to the bottom', () => {
    const now = Date.parse('2026-01-01T00:00:00Z');
    const past = ev({ id: 'past', targetISO: '2025-01-01T00:00:00Z' });
    const soon = ev({ id: 'soon', targetISO: '2026-02-01T00:00:00Z' });
    const later = ev({ id: 'later', targetISO: '2026-06-01T00:00:00Z' });
    const order = sortBySoonest([later, past, soon], now).map((e) => e.id);
    expect(order).toEqual(['soon', 'later', 'past']);
  });
});

describe('computeParts + humanize', () => {
  it('breaks a duration into d/h/m/s', () => {
    const now = 0;
    const target = ((1 * 24 + 2) * 60 + 3) * 60 * 1000 + 4000; // 1d 2h 3m 4s
    const p = computeParts(target, now);
    expect(p).toMatchObject({ days: 1, hours: 2, minutes: 3, seconds: 4, isExpired: false });
  });

  it('flags expired when the target has passed', () => {
    const p = computeParts(0, 1000);
    expect(p.isExpired).toBe(true);
    expect(humanize(p)).toBe('Completed');
  });

  it('humanizes upcoming durations', () => {
    expect(humanize(computeParts(3 * 86_400_000, 0))).toBe('in 3 days');
    expect(humanize(computeParts(2 * 3_600_000, 0))).toBe('in 2 hours');
  });
});
