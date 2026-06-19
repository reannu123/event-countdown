export type EventItem = {
  id: string;
  title: string;
  // ISO 8601 string (UTC). We compute against Date.now() (UTC ms).
  targetISO: string;
  // Optional visual theme id (see lib/themes.ts). Defaults to the first theme.
  theme?: string;
  // Optional short note shown under the title.
  note?: string;
};

// The subset of an event that travels inside a shareable link.
export type SharedEvent = {
  title: string;
  targetISO: string;
  theme?: string;
  note?: string;
};
