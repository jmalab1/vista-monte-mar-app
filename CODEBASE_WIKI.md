# Vista Monte Mar App Wiki

_Last updated: 2026-04-25_

## Purpose

Frontend web app for the Vista Monte Mar condo site.

Stack:
- React 18
- TypeScript
- Vite
- Tailwind CSS

## Key Structure

- `src/pages`: route-level pages (`Home`, `HouseRules`, `AboutUs`, `Directions`, `Arrival`, `Checkout`, `Gallery`)
- `src/sections`: page sections and content JSON
- `src/modules`: feature modules (navbar, footer, details modules, contact form)
- `src/components`: reusable UI components
- `src/assets`: local media assets (images/video)
- `public/image`: static images/logo
- `conf/server.conf`: nginx runtime config in container

## Routes

Defined in `src/App.tsx` with basename `/vista_monte_mar/`:
- `/`
- `/house_rules`
- `/about_us`
- `/directions`
- `/arrival`
- `/checkout`
- `/gallery`
- `*` (not found)

## Local Dev

```bash
cd C:\Users\malab\Documents\dev\vista-monte-mar-app
npm install
npm run dev
```

Scripts:
- `npm run dev` -> `vite --mode server`
- `npm run build` -> `vite build --mode server`
- `npm run lint`
- `npm run preview`

## Build and Runtime Notes

- `vite.config.js` sets `base` to `/vista_monte_mar/` in `server` mode.
- Vite proxies `/api` to `https://localhost` with `secure: false`.
- BrowserRouter basename is `/vista_monte_mar/`.
- Nginx rewrites root `/` to `/vista_monte_mar/`.
- Nginx proxies `/api/` to backend host `server:8135`.

## Docker Notes

- `pushToDocker.sh` builds/pushes: `jmalab24/vista-monte-mar-app:latest`
- `pushToDockerDev.sh` builds/pushes: `jmalab24/vista-monte-mar-app:dev`
- Container uses nginx and serves built output from `/app/dist`.

## First Files To Open

1. `src/App.tsx`
2. `src/pages/Home/index.tsx`
3. `src/modules/ContactForm/index.tsx`
4. `vite.config.js`
5. `conf/server.conf`

