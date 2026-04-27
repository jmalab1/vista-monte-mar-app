# Vista Monte Mar App

## Runbook

See the local deployment and operations runbook:

- [CODEBASE_WIKI.md](./CODEBASE_WIKI.md)

## k3s Deploy

Local development stays in this repo. Kubernetes deployment assets live in the sibling `vista-monte-mar-services` repo.

Use `vista-monte-mar-services` for:

- cluster manifests
- deploy scripts
- SSH/bootstrap helpers
- ingress and service wiring

This repo should only own the frontend application source and container build.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh
