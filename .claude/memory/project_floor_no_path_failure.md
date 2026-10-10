---
name: floor-no-path-failure
description: "Rare FloorFactory \"Cannot find a path\" failure now handled by discard-and-retry in setLevel (2026-07-21); root cause tolerated by design"
metadata: 
  node_type: memory
  type: project
  originSessionId: bf6947e2-7a4b-4cf7-98dd-0ae7ee5df8d1
  modified: 2026-07-21T18:12:36.955Z
---

As of 2026-07-03, after fixing the off-grid edge-tile TypeErrors in straight-corridor-factory.js and floor-factory-support.js, floor generation still has a rare failure: `Cannot find a path between any of the remaining disconnected features` (floor-factory.js). Observed once in ~4000 stress runs. The floor-factory-spec comment anticipated this ("which I think should be impossible"). FloorFactory.buildFloor now wraps generation in try/catch and dumps `debug/floor-failure-state.json` (error stack + floor.pack()) in development, so the next occurrence will leave analyzable state. Likely cause: an island feature whose every corridor attempt fails (dogleg needs gap >= 3; bent needs a clear L path), so all cross-tree pairs get blacklisted. Related: [[bent-corridor-bugs]].

**Why:** The spec can still flake very rarely with this error; without the dump the random state was unrecoverable.

**How to apply:** If FloorFactorySpec fails with "Cannot find a path", read `debug/floor-failure-state.json` and analyze which feature islands could not be connected instead of re-deriving from scratch.

**Update 2026-07-21:** Was deterministically reproducible via `SEED=3759846913 node bin/run-tests.js --grep "fills a dungeon with features"` (found by `bin/soak-tests.js` on run 259). RESOLVED by graceful failure, per user decision: `DungeonSystem.setLevel` already had a 5-attempt retry loop with a fresh DungeonFloor, but development mode rethrew on first failure — that rethrow was removed, so all environments now discard the failed floor (after FloorFactory dumps `debug/floor-failure-state.json`) and retry. The underlying corridor-connection limitation (island feature whose dogleg/bent attempts all fail) is tolerated by design, not fixed; that seed now passes on attempt 2.
