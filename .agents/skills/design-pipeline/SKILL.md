---
name: design-pipeline
description: 194-screen React 19 + Vite canvas and monorepo runbook.
---
# Design Pipeline — Pure React 19 + Vite Architecture

## Modern Monorepo Protocol
1. All 194 production screen definitions reside in `apps/web/src/screens-manifest.ts`.
2. Interactive React components reside in `apps/web/src/client/`, `apps/web/src/platform/`, and `apps/mobile/src/screens/`.
3. Rebuild command: `npx vite build apps/web`
4. Verification: `npm test` runs 61+ unit and integration tests across web, mobile, core, and SQLite API.
5. Zero dependency on legacy HTML exports or obsolete Python scripts.
