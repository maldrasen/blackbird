---
name: browser-dev-mode
description: "Game runs in plain browser via node bin/serve.js (port 8300) for Claude browser-pane UI inspection; screenshots/preview_click broken in pane, drive UI via preview_eval"
metadata: 
  node_type: memory
  type: project
  originSessionId: b47cc0db-638d-4300-868d-d6fc288f5f71
  modified: 2026-07-23T18:38:07.215Z
---

Blackbird has a browser-served dev mode (built 2026-07-10) so the Claude Code browser pane can inspect the real rendered UI instead of headless-only.

- Start with `preview_start` config `blackbird-browser` (`.claude/launch.json`) or `node bin/serve.js` → http://localhost:8300 redirects to `/views/browser.html`. serve.js recompiles the manifest on boot; SCSS must be compiled separately (`bin/compile-style.sh`).
- `application/browser-shim.js` (blacklisted from manifest) fakes the Electron boot context: `window.global = window`, `ROOT = location.origin`, `DATA = 'blackbird-browser'`, packed `Environment`, and a `window.fs` shim — reads via sync XHR/fetch, writes and DATA-path reads via localStorage (key = full path, e.g. `blackbird-browser/World-State.json`).
- `application/loader.js` branches on `typeof require === 'undefined'` and self-starts when `window.IS_BROWSER`; in-app mocha suite is Electron-only.
- Browser pane quirks (environment, not the app): `preview_screenshot` times out on ANY page and `preview_click` doesn't trigger the game's window-delegated handlers. Drive the UI with `preview_eval` dispatching `new MouseEvent('click', { bubbles:true })` on the target element; verify with `preview_snapshot`/`preview_eval`/`preview_inspect`. (2026-07-16: current tooling's `computer` ref-clicks and `element.click()` via `javascript_tool` both work; screenshots still time out.)
- The pane's renderer reports `document.hidden === true`, so `requestAnimationFrame` NEVER fires — rAF-driven animation (e.g. DungeonCamera) freezes and anything awaiting it hangs. To verify animations, shim it first: `window.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 16)` (+ matching `cancelAnimationFrame`), then sample positions with `setInterval`. CSS transitions also never progress while hidden, so `transitionend` never fires either (2026-07-23) — verify transition-completion logic by dispatching a synthetic `new Event('transitionend')` on the element.
- Verified working: full boot (461 files), main menu, options overlay (sync-XHR templates), New Game episode, [Dungeon] fixture with floor generation, World-State persistence across reloads.
- Driving a battle (verified 2026-07-11): click `#mainMenu a.start-fixture[data-fixture="battle"]` → `negotiation-fixture` encounter (single kobold-runt, party of 3, player goes after 2 party members). Battle text advances on **mousedown** (not click) on `#textPanel #textScroll`; commands are `#commandPanel .command[data-ability=...]`; negotiation buttons are `#negotiation .answer`, no-button screens advance via click on `#generalOverlay .overlay`. Keyboard: `X.onCodeDown` listens for `keydown` with `event.code`. The page occasionally reloads back to the main menu between separate javascript_tool calls — drive multi-step flows inside one async IIFE with sleeps instead.
