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
- Nginx proxies `/api/` to the runtime-configured upstream, defaulting to `http://127.0.0.1:8135`.

## Docker Notes

- `pushToDocker.sh` builds/pushes: `jmalab24/vista-monte-mar-app:latest`
- `pushToDockerDev.sh` builds/pushes: `jmalab24/vista-monte-mar-app:dev`
- Container now builds the app inside Docker and serves built output from `/app/dist`.
- `API_UPSTREAM` is injected at container startup and defaults to `http://127.0.0.1:8135`.

## k3s Deploy

Development flow:
- Run locally with `npm run dev`
- Deploy via the sibling `vista-monte-mar-services` repo

Ownership:
- This repo owns the frontend source and Docker image build
- `vista-monte-mar-services` owns Kubernetes manifests, deploy scripts, ingress, and cluster wiring

Required deploy env vars:
- Managed in `vista-monte-mar-services`

Optional deploy env vars:
- Managed in `vista-monte-mar-services`

## First Files To Open

1. `src/App.tsx`
2. `src/pages/Home/index.tsx`
3. `src/modules/ContactForm/index.tsx`
4. `vite.config.js`
5. `conf/server.conf.template`
