---
name: bounded-loops
description: "Prefer for loops with local bounds over while loops that depend on another module's side effects"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cd07d748-9878-4341-a4be-e485272a9126
  modified: 2026-07-19T23:29:03.547Z
---

When looping until another system's side effect changes state (e.g. looping `while (ExperienceComponent.lookup(id).level < target)` around `LevelSystem.levelUp`), prefer a for loop with a locally computed iteration count instead.

**Why:** If the other module ever stops doing what it promises (levelUp not incrementing the level), the while loop becomes an endless loop. A for loop's bound is local — the caller doesn't have to trust the callee's contract to terminate. "Impossible now" isn't a guarantee after a refactor.

**How to apply:** Compute the iteration count up front from data the loop owns (`for (let i=1; i<monsterBase.getLevel(); i++)`), even if a state-checking while loop looks more direct. Related: [[avoid-else-if-chains]].
