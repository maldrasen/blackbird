---
name: project-gamestate-view-coupling
description: "GameState/GameController refactored to the System/State pattern (GameSystem + GameState factory); mode-change view calls now live in GameSystem, HEADLESS-guarded."
metadata:
  node_type: memory
  type: project
  originSessionId: 3de767b5-d738-40a4-b129-ec758f4dd131
---

**Refactored 2026-07-08.** `GameState` and `GameController` were converted to the same System/State pattern as BattleSystem/BattleState and TrainingSystem/TrainingState:

- **`GameState`** (`application/world/game-state.js`) is now a **factory** `GameState(data={})` returning a frozen data object (getters/setters + `pack()`). It takes the packed-save shape, so construction replaces the old `initialize()`/`unpack()`/`reset()`. It is pure data — **no view calls**.
- **`GameSystem`** (`application/world/game-system.js`, renamed from `GameController`) owns the current `state`, exposes `getState()`, and holds all orchestration: `startNewGame`/`loadLastGame`/`openGame`, `reset()` (clears the Registry + rebuilds a blank state), `isLoaded()` (real flag — also fixed a latent `GameState.isLoaded()` call that referenced an undefined method), and the mode transitions.
- **`setGameMode` moved to `GameSystem`.** `GameSystem.setGameMode(mode)` calls `state.setGameMode(mode)` (value only) then `showViewForMode(mode)`, which is guarded by `if (HEADLESS === false && Tests.running() === false)`. The `Tests.running()` half was added 2026-07-14: specs also run inside the Electron app in dev mode where HEADLESS is false, and a spec driving mode changes was opening real views mid-run (failed in-app, passed headless). Same guard pattern as BattleInterface/Console. The return-mode transitions (`markReturnMode`/`returnToPreviousMode`) also moved to GameSystem.

**Access convention:** state reads go through `GameSystem.getState().getPlayer()` etc. (full parity with `BattleSystem.getState()`). Mode/return-mode calls are on `GameSystem` directly.

**Headless status:** the old "10 specs fail with `TrainingView is not defined`" problem is gone — the `HEADLESS` guard around the view switch handles it, and the full suite passes (263). So headless breakage is NOT a current issue.

**Remaining (optional) cleanup:** `GameSystem.showViewForMode()` still calls view globals (`BattleView.show()`, etc.) directly, just guarded + isolated in one place. If full decoupling via `*Interface` modules is still wanted, that switch is the single spot to route through them. View transitions are NOT exercised by the headless suite, so verify mode changes in-app after touching this.
