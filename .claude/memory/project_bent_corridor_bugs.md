---
name: project-bent-corridor-bugs
description: "Two coordinate-comparison bugs found and fixed in the dungeon corridor-connection pipeline (feature.js edge tiles, corridor-factory.js alignment)."
metadata: 
  node_type: memory
  type: project
  originSessionId: ee62af61-a41d-42f2-85c6-b9dc8cc232ae
---

While implementing `setMainBox`/`setSubBox` in `BentCorridorFactory`, found two separate pre-existing bugs that caused `BentCorridorFactory` to fail to find paths between geometrically-connectable features:

1. `application/dungeon/models/feature.js` `getEdgeTiles()` — `findEastTiles`/`findWestTiles` had their scan direction and offset swapped, so each returned the wrong side's boundary tiles. Fixed by swapping the two function bodies to mirror `findNorthTiles`/`findSouthTiles`.
2. `application/dungeon/factories/corridor-factory.js` `getFeatureAlignment()` — `isEast`/`isWest` used mismatched Min/Max comparisons (not parallel to the correct `isNorth`/`isSouth` pattern), misclassifying alignment direction for x-adjacent features. Fixed to `isEast = b.xMin >= a.xMax`, `isWest = b.xMax <= a.xMin`.

**Why:** Both bugs manifested as "Cannot find a path between features X and Y" warnings for room pairs that should have been connectable — first surfaced with features 1/34, then again with 45/61 after the first fix, confirming they were independent issues, not one bug with two symptoms.

**How to apply:** If more spurious "cannot find a path" warnings show up in floor generation, check for other direction/edge logic in `application/dungeon/**` with the same Min/Max-asymmetry pattern (see [[user_geometry_reasoning]]) before assuming it's a new class of bug.
