---
name: project-headless-test-runner
description: "bin/run-headless.js + bin/run-tests.js let dungeon generation and the mocha suite run from the CLI, outside Electron"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3de767b5-d738-40a4-b129-ec758f4dd131
  modified: 2026-07-21T18:40:34.761Z
---

Added a shared headless bootstrap, [[project-gamestate-view-coupling]] surfaced while building it:

- `bin/run-headless.js` — sets the globals `main.js`/`loader.js` normally provide (`ROOT`, `DATA`,
  `fs`, `ENVIRONMENT='development'`, `HEADLESS=true`), requires `application/environment.js` (not in
  manifest.json — main.js requires it directly), requires `application/views/general/console.js`
  explicitly, then requires every `manifest.json` `fileList` entry except `application/views/*`.
- `application/views/general/console.js` — `log()`/`logError()` now branch on `global.HEADLESS` to
  fall back to plain `console.*` instead of DOM `append()`, so any headless-safe module can safely
  call `Console.log` outside Electron.
- `debug/headless-floor.js` — `require('../bin/run-headless.js')` then drives `DungeonSystem` to
  produce `debug/floor-state.json` from the command line.
- `bin/run-tests.js` — same bootstrap, then runs the mocha suite via mocha's Node API (not the
  browser bundle `application/test/tests.js` uses) against `manifest.json`'s `testFileList`, with
  `beforeEach`/`afterEach` root hooks calling `Random.stubReset()`/`GameState.reset()`. Wired up as
  `npm test`.

**Why:** the user wanted to inspect dungeon generation output and run the test suite without booting
Electron each time.

**How to apply:** any new headless CLI script should `require('../bin/run-headless.js')` first rather
than re-deriving the bootstrap globals. `npm test` is now the CLI entry point for the suite (211
passing, 14 pending, 10 known-failing — see [[project-gamestate-view-coupling]]).

**Update 2026-07-21 — flaky-spec tooling:** every spec gets a fresh Random seed in `beforeEachTest`
(application/test/tests.js); the run prints its starting seed and a failing spec prints its own seed.
Reproduce exactly with `SEED=<n> node bin/run-tests.js --grep "<spec title>"` (PowerShell:
`$env:SEED='<n>'`). `bin/soak-tests.js [runs]` (default 1000) reruns the suite until a run fails,
dumping the failing run's full output. First soak session caught three real bugs; suite then passed
a full 1000-run soak. Note `test/dungeon/systems/dungeon-navigation-system-spec.js` has a spec that
conditionally `this.skip()`s, so the passing count legitimately flickers between 434/435.
