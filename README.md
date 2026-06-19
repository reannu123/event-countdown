# Event Countdown

A compact React application for creating personal event countdowns. Events are
stored in the browser, display a live remaining-time countdown, and can be
deleted when they are no longer needed.

This project is a self-contained frontend example: it has no accounts,
backend, or external service configuration.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS and Radix UI primitives
- Browser `localStorage` for event persistence
- Docker Compose for development and production-like local checks

## Prerequisites

- Node.js 20 or another current LTS release
- npm
- Docker with Docker Compose (optional, for container workflows)

## Run With npm

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open <http://localhost:5173>.

## Docker

Start the development container with a source bind mount and named dependency
volume:

```bash
docker compose up --build
```

Open <http://localhost:5173>. Stop it with:

```bash
docker compose down
```

For a production-like image check without source bind mounts:

```bash
docker compose -f compose.prod.yaml up --build
```

Open <http://localhost:4173>. Stop it with:

```bash
docker compose -f compose.prod.yaml down
```

Set `APP_PORT` in a local `.env` file only when either host port is already in
use. `.env` is ignored and no secrets are required.

## Checks

```bash
npm run lint
npm run build
docker compose config --quiet
docker compose -f compose.prod.yaml config --quiet
```

## Verification

1. Open the app and select **Add Countdown**.
2. Create an event with a future date and time.
3. Confirm its title, target time, and live countdown appear.
4. Refresh the browser and confirm the event persists.
5. Delete the event and confirm it disappears.

## Current Limitations

- Events are saved only in the current browser's `localStorage`; they do not
  sync across browsers or devices.
- There are no accounts, sharing, notifications, or server-side backups.
- The Docker workflows are local development and production-like checks, not a
  deployed hosting configuration.

## Useful Files

- `src/components/EventForm.tsx` - create-countdown dialog
- `src/components/CountdownList.tsx` - saved event list
- `src/components/CountdownCard.tsx` - live countdown display and deletion
- `src/hooks/useLocalStorage.ts` - browser persistence
- `Dockerfile`, `docker-compose.yml`, and `compose.prod.yaml` - local Docker
  workflows
