import type { EventItem, SharedEvent } from '@/types/event';

// Shareable countdowns need no backend: the whole event is encoded into the URL
// as URL-safe, UTF-8-safe base64. Anyone who opens the link sees the countdown.

function bytesToB64Url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64UrlToBytes(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export function encodeEvent(event: EventItem | SharedEvent): string {
  const payload: SharedEvent = {
    title: event.title,
    targetISO: event.targetISO,
    theme: event.theme,
    note: event.note,
  };
  return bytesToB64Url(new TextEncoder().encode(JSON.stringify(payload)));
}

export function decodeEvent(code: string): SharedEvent | null {
  try {
    const json = new TextDecoder().decode(b64UrlToBytes(code));
    const data = JSON.parse(json) as SharedEvent;
    if (!data || typeof data.title !== 'string' || typeof data.targetISO !== 'string') return null;
    if (Number.isNaN(new Date(data.targetISO).getTime())) return null;
    return data;
  } catch {
    return null;
  }
}

export function shareUrl(event: EventItem | SharedEvent, origin: string): string {
  return `${origin.replace(/\/$/, '')}/c/${encodeEvent(event)}`;
}

// Soonest upcoming first; expired events sink to the bottom (most recent first).
export function sortBySoonest(events: EventItem[], nowMs: number): EventItem[] {
  return [...events].sort((a, b) => {
    const da = new Date(a.targetISO).getTime() - nowMs;
    const db = new Date(b.targetISO).getTime() - nowMs;
    const aExpired = da <= 0;
    const bExpired = db <= 0;
    if (aExpired !== bExpired) return aExpired ? 1 : -1;
    return aExpired ? db - da : da - db;
  });
}
