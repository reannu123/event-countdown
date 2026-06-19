// Visual themes for a countdown. Applied as inline-style gradients so they are
// never purged by Tailwind and can be chosen dynamically per event.
export type Theme = {
  id: string;
  name: string;
  gradient: string;
  accent: string; // numbers / highlights
  text: string; // primary text on the gradient
};

export const THEMES: Theme[] = [
  { id: 'midnight', name: 'Midnight', gradient: 'linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#0b1220 100%)', accent: '#38bdf8', text: '#e2e8f0' },
  { id: 'sunset', name: 'Sunset', gradient: 'linear-gradient(135deg,#7c2d12 0%,#be185d 55%,#f59e0b 100%)', accent: '#fde68a', text: '#fff7ed' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(135deg,#062f4f 0%,#0e7490 55%,#22d3ee 100%)', accent: '#a5f3fc', text: '#ecfeff' },
  { id: 'forest', name: 'Forest', gradient: 'linear-gradient(135deg,#052e16 0%,#166534 55%,#65a30d 100%)', accent: '#bef264', text: '#f0fdf4' },
  { id: 'candy', name: 'Candy', gradient: 'linear-gradient(135deg,#581c87 0%,#db2777 55%,#fb7185 100%)', accent: '#fbcfe8', text: '#fdf4ff' },
  { id: 'mono', name: 'Mono', gradient: 'linear-gradient(135deg,#111827 0%,#374151 60%,#1f2937 100%)', accent: '#f9fafb', text: '#e5e7eb' },
];

export const DEFAULT_THEME = THEMES[0];

export function themeById(id?: string): Theme {
  return THEMES.find((t) => t.id === id) ?? DEFAULT_THEME;
}
