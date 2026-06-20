# Event Countdown TODO

Last updated: 2026-06-20

## Project

- Name: Event Countdown
- Path: `/home/reannu123/Projects/portfolio/event-countdown`
- Status: complete
- Stage: revival
- Branch: `master`
- Portfolio role: Small polished React delivery example

## Current Milestone

**Flagship upgrade complete (2026-06-20).** Elevated from a barebones
localStorage app into a themed, installable PWA with **backend-free shareable
countdown links** (`/c/:code`), an edit/sort dashboard, unit tests, and a case
study. Verified via the production Docker image (incl. SPA deep-link fallback)
with browser screenshots.

(Prior milestone: revived the app as a clean, presentable, documented, Dockerized
React project.)

## Definition Of Done

- [x] Another developer can install dependencies and run the Vite app.
- [x] `npm run lint` and `npm run build` pass.
- [x] The main workflow has been smoke-tested: create an event, see the
      countdown, refresh the page, and delete the event.
- [x] The starter Vite README is replaced with project-specific setup,
      purpose, stack, limitations, and verification instructions.
- [x] Development and production-like Docker Compose workflows build and serve
      the app locally.
- [x] The current local commits are pushed or merged so the repository state is
      not only local.

## Now

- No active task; the flagship upgrade is complete.

## Next

- [ ] **Activate CI** — `.github/workflows/ci.yml` exists locally but the push
      was rejected (token lacks `workflow` scope). Run:
      `gh auth refresh -s workflow && git add .github && git commit -m "Add CI" && git push`.
- [ ] Live deploy (any static host / Pages / Netlify) for a clickable demo URL.

## Later

- [ ] Calendar (`.ics`) export for a countdown.
- [ ] Optional accounts + backend for a synced, editable dashboard (the shared
      links already work without it).
- [ ] Richer share-preview (OG) images per countdown.
- [ ] Reminder notifications.

## Flagship upgrade — done 2026-06-20

- [x] Shareable countdowns via URL-encoded payload + `/c/:code` public view.
- [x] Six themes (inline-gradient, purge-safe); themed cards + shared view.
- [x] Dashboard: create / edit / delete, soonest-first sort, empty + completed states.
- [x] Routing (react-router-dom); nginx SPA fallback in the prod image.
- [x] Installable, offline-capable PWA (manifest + service worker + icon).
- [x] Pure share-codec + countdown-math modules with vitest unit tests (8 passing).
- [x] Flagship README, MIT LICENSE, docs/CASE_STUDY.md, badges, screenshots.
- [x] Verified: prod Docker build serves app; `/c/<code>` deep link returns 200;
      sw.js + manifest served; browser screenshots of dashboard + shared view.

## Blocked

- No confirmed blocker.

## Done

- [x] Inspected repository on 2026-06-18: React/Vite app files exist, a
      localStorage countdown workflow is implemented, `.gitignore` exists, and
      no `.env.example` is needed for the current frontend-only app.
- [x] Queued behind PayMongo API Dashboard and Better Ecommerce Store on
      2026-06-19.
- [x] Inspected and activated on 2026-06-20 after the Better Ecommerce Store
      revival was merged.
- [x] Pushed the seven existing local commits to the private GitHub repository
      before making revival changes on 2026-06-20.
- [x] Replaced the starter README and added Docker delivery files on
      2026-06-20; verification is still required.
- [x] Verified `npm run lint`, `npm run build`, and both Compose
      configurations on 2026-06-20.
- [x] Smoke-tested the development container in a browser on 2026-06-20:
      create, persist across refresh, and delete work as documented.
- [x] Verified the production-like container builds and serves the app at
      `http://localhost:4173` on 2026-06-20.
- [x] Merged GitHub PR #1 to `master` on 2026-06-20.
