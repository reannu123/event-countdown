export type EventItem = {
  id: string;
  title: string;
  // ISO 8601 string (UTC). We'll compute against Date.now() (UTC ms).
  targetISO: string;
};
