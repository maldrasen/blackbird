---
name: enlighten-essence-bars
description: "Task 129 (2026-07-23): animated essence bars + per-character level-up overlay in enlighten view; essence banked at startEnlightenment, bars are cosmetic replay"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b709d22-c525-4541-8f86-e02af394d60a
  modified: 2026-07-23T18:38:16.015Z
---

Task 129 replaced the queue-based level-up flow with per-character essence bars in the enlighten view.

- `EnlightenSystem.startEnlightenment` banks each party member's essence share into `ExperienceComponent` immediately; the view's bars are only an animation replaying `state.getEssence()[id].start → end`. Matters for save/load mid-enlighten and for the [[postbattle-overlap]] pipeline (017/045/116).
- Level ups are per-id: `EnlightenSystem.chooseLevelUpAttribute(id, attribute)` (throws unless `EssenceSystem.canLevelUp`). The old queue (`getCurrentLevelUp`/`hasPendingLevelUps`) is gone.
- View animation: reuses `BarDisplay`, whose `minValue` is now the bar's zero point (floor-relative width — all pre-existing callers passed 0). CSS width transition in enlighten-view.scss + `transitionend` → `full` class (white flash keyframe) → Level Up button → `GeneralOverlay` with attribute picks + confirm → bar re-animates from the new level floor. Bar bounds come live from `EssenceSystem.totalEssenceToLevel(level|level+1)`.
- Escape can close the level-up overlay without confirming — intentional; the Level Up button stays and reopens it.

**Why:** the banking-first design means the UI can be interrupted at any point without losing progression.
**How to apply:** any later enlighten work (loot task 116, training view 122) should treat state as already-persisted display data, not pending awards.
