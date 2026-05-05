# Learned Repo Memory

## Memory Metadata
- created_at_unix: 1777953218
- created_at_utc: 2026-05-05T03:53:38Z
- refreshed_at_unix: 1777953218
- refreshed_at_utc: 2026-05-05T03:53:38Z
- refresh_policy: Refresh this file if it is older than 7 days and repo development has continued.

## Repo
- name: vista-monte-mar-app
- purpose: Frontend SPA for the Vista Monte Mar guest/admin experience.
- project types: node, vite, react
- primary languages: typescript, javascript
- active branch: v2

## Read First
- `AGENTS.md`: repo instruction to run context-pack and read this memory before edits.
- `README.md`: frontend/local-dev notes and admin route documentation.
- `package.json`: scripts, dependencies, test commands.
- `src/App.tsx`: route registration and app-level admin chrome/session warning behavior.

## Entry Points
- `src/main.tsx`: React app bootstrap.
- `src/App.tsx`: top-level router and shared route classification.
- `src/context/AuthContext.tsx`: auth state, token verification, idle/session warning behavior.
- `src/layouts/AdminDashboardLayout.tsx`: unified authenticated admin layout.

## Hotspots
- Admin navigation source of truth lives in `src/components/admin/adminNavItems.ts`.
- Shared admin tables/components live in `src/components/admin`.
- Email history admin page lives in `src/pages/EmailHistory/index.tsx` with tests in `src/pages/EmailHistory/index.test.tsx`.
- Vitest setup lives in `vitest.config.ts` and `src/test`.

## Known Pitfalls
- This repo should own frontend application source and container build only; Kubernetes and deploy assets live in sibling repo `vista-monte-mar-services`.
- Windows file-mode noise has happened in this workspace; repo config should keep `core.filemode=false`.
- Auth session timeout should stay production-like unless explicitly doing local/manual expiry testing.
- Context-pack memory should be used as orientation only; verify against current code before editing.

## Operational Notes
- Frontend-only local dev command: `npm run dev:frontend`.
- Test command: `npm test`.
- Recent notable work added `/email-history`, CSV export UI, and Vitest/Testing Library coverage.

## Debugging Notes
- Working tree was clean when this memory was enriched.

## Open Questions
- Keep email-history frontend API assumptions aligned with backend contact-email-history endpoints.
