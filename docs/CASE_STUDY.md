# Case Study — Countdowns

**One line:** Took a barebones localStorage countdown app and turned it into a
themed, installable PWA whose countdowns are shareable by link — without adding
a backend.

---

## The starting point

The revived app worked but was thin: a single screen, unstyled countdown cards
(bare `<div>`s), localStorage only, no routing, and no way to share a countdown
with anyone. It demonstrated that I could ship a working React app, but not much
about product thinking or polish.

## The goal

Make it genuinely *useful* and portfolio-worthy without turning a simple idea
into a heavy full-stack project. The headline question: **how do you share a
countdown with someone when there's no server to store it?**

## The key idea — backend-free sharing

Instead of a database, the entire event is encoded into the URL. Clicking
**share** serializes `{ title, targetISO, theme, note }` to JSON and packs it
into a URL-safe, UTF-8-safe base64 string:

```
/c/eyJ0aXRsZSI6Ik5ldyBZZWFyIDIwMzEiLCAidGFyZ2V0SVNPIjogIjIwMzEtMDEtMDE..."
```

The shared route decodes that payload and renders a live, full-screen countdown.

**Why this is the right call here:**

- **No infrastructure** — the app stays 100% static, so it can be hosted on any
  CDN/Pages host, run offline, and costs nothing to operate.
- **Privacy** — nothing is stored on a server; the link *is* the data.
- **Correctness** — the target is stored in UTC, so the countdown is right in
  every timezone the link is opened in.

Trade-off: links are immutable snapshots (editing makes a new link) and a very
long title yields a long URL. Both are acceptable for the use case, and an
optional backend for synced, editable, account-bound countdowns is a documented
next step.

## What else changed

- **Design system** — six gradient themes applied via inline styles (so dynamic
  theme choices are never purged by Tailwind), themed cards + a full-screen
  shared view, empty state, and a completion celebration.
- **Real dashboard** — create / edit / delete, auto-sorted soonest-first, with
  expired events sinking to the bottom.
- **PWA** — web manifest + a service worker (network-first for navigations so
  deep links still work, cache-first for assets) make it installable and
  offline-capable.
- **Production routing** — an nginx SPA fallback so deep links like `/c/<code>`
  resolve to the app instead of 404ing.
- **Quality** — pure, framework-free modules for the share codec and countdown
  math, covered by vitest unit tests; strict TypeScript; lint + build gates.

## Outcome

- Verified: `docker compose -f compose.prod.yaml up --build` serves the app;
  the SPA fallback returns the app for `/c/<code>`; the service worker and
  manifest are served; creating events and opening a shared link both work
  (see `docs/screenshots/`).
- 8 unit tests pass; `tsc -b && vite build` is clean.

## What this demonstrates

- **Product thinking** — solving "share a countdown" with the *simplest* thing
  that works (URL-encoded state) instead of reaching for a database.
- **Modern frontend** — React 19, Vite, Tailwind 4, a small design system,
  routing, and PWA mechanics.
- **Engineering discipline** — pure testable core logic, typed throughout,
  documented trade-offs and limitations.
