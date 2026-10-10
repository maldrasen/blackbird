---
name: project-grid-movement-task215
description: "Task 215 grid based dungeon movement — code shipped 2026-09-20 on branch 215-grid-based-movement, view steps never play-tested by Claude; design decisions and gotchas"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3bffeef4-1ab3-4a2e-9535-1d8cd0e97db0
  modified: 2026-09-20T23:51:08.844Z
---

Task 215 replaced room-based dungeon movement with 8-directional tile movement. All 22 plan steps implemented 2026-09-20; reference doc is `docs/reference/dungeon-floor.md`. This supersedes [[project-dungeon-navigation]] (the room-graph API — moveToRoom, walkPath, getDoorInDirection, pathfinding — is deleted).

**Decisions the user made:** new-room ambush roll (20%) kept on first room entry; every other step rolls `stepEncounterRate` (0.5%, rolled out of 1000); time stays room-based (1.0 / 0.2, in-room steps free); keyboard only, click-to-move deliberately deferred to a follow-up but kept possible (`findStep(position, direction)` takes an explicit position; `DungeonViewport.didDrag` kept unused on purpose); room contents stay room-wide, only stairs are a tile feature; reveal/visited stay per-room (per-tile fog belongs to task 224).

**Measured:** shortest arrival-stairs→down-stairs walk averages 44 steps / ~11 rooms, so 0.5% per step ≈ the old 2% per revisited room (~20% per backtrack). User was told; rate untuned.

**Key bindings changed mid-task at the user's request:** every action is `{ primary, alternate }`, either key fires it; dungeon = numpad primaries (8 directions), WASD alternates. Old single-string saved options are read as the primary slot, so an existing options file needs Restore Defaults once to get numpad primaries. Same key in both slots of one action is not a conflict.

**Gotchas:**
- Diagonal rule = one room owns all four tiles around the shared corner (no corner cutting, never through doors) — chosen because inset walls really cross the diagonal at corridor bends and 224's vision polygon casts from the marker.
- `WeaverPackage.pick()` wraps text in a `<span data-package>` marker (spec with `include`, not `equal`) and throws on a package with no valid option — a blank description needs an unconditional `''` entry.
- Stub queues throw when dry or out of the die's range, so stubbing one roll proves which encounter die a step rolled.
- `enterRoom` must run before `setPartyPosition` (visited is read first).
- View steps (marker, step handling, controls, door fade, held-key repeat) were never run in the app by Claude — user does the play check. Held keys have the OS initial-repeat pause; proper hold-chaining left for 224.
- Pre-existing flake found: `NegotiationState pickQuestion()` fails with seed 3585013934 on committed code (unrelated).
