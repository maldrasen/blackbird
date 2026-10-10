---
name: user-geometry-reasoning
description: User finds box/edge/direction coordinate comparisons (xMin/xMax/yMin/yMax logic) hard to mentally verify — needs explicit help checking these in the dungeon generator.
metadata: 
  node_type: memory
  type: user
  originSessionId: ee62af61-a41d-42f2-85c6-b9dc8cc232ae
---

The user has said this kind of coordinate/geometry reasoning is especially difficult for them: expressions like `b.xMax >= a.xMin` vs `b.xMin >= a.xMax` are functionally very different but hard to distinguish without "heavy mental geometry." This came up while debugging [[project_bent_corridor_bugs]] in `application/dungeon/factories/corridor-factory.js`, where `isEast`/`isWest` had Min/Max swapped relative to the correct (and parallel) `isNorth`/`isSouth` checks.

**How to apply:** When touching box/edge/alignment/direction logic in the dungeon generator (`application/dungeon/**`), proactively verify Min/Max parallelism across mirrored directions (N vs S, E vs W) rather than assuming it's correct — this class of bug seems to recur here. When explaining such logic to the user, spell out the geometric intuition in words ("b's near edge is past a's far edge means b is entirely to that side") rather than just stating the formula, since translating symbols to a mental picture is the hard part for them.
