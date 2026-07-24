---
id: 135
title: Upgrade Electron
priority: 3
created: 2026-07-23
tags: []
points: 3
---
---
We're on Electron 23.1.3 (Feb 2023 — Chromium 110, Node 18.12), which went end-of-life in mid-2023.
As of July 2026 the current release is 43.x (Chromium 150, Node 24.18), so we're 20 major versions
behind. A survey of the official breaking-changes doc found nothing that touches this app:

- `nodeIntegration: true` / `contextIsolation: false` / `sandbox: false` still work in 43, so the
  no-bundler, attach-to-global loading model is unaffected.
- Our whole Electron API surface is `BrowserWindow`, `loadURL(file://)`, `ipcMain.handle`,
  `webContents.send`, and app lifecycle events — none removed or changed between 24 and 43.
- No runtime dependencies and no native modules, so the Node 18 → 24 bump only needs to not break
  our own plain JS (it won't; the headless runner already exercises everything on system Node).

Plan: jump straight to latest, `npm install`, run the headless specs, smoke-test the app. Only fall
back to stepping through majors if something actually breaks. Things to verify while smoke-testing:

- `electron-builder` may need a version bump to package Electron 43; confirm the portable Windows
  build still works.
- Since Electron 42 the npm package no longer downloads the binary at install time — it fetches
  on demand at first launch. Just a dev-workflow note, not a blocker.
- Chromium 110 → 150 is a big rendering jump; give the views a once-over. Payoff: `subgrid` (117+)
  becomes available, which simplifies shared-column layouts like the enlighten skill-improvements
  grid.
