---
name: dungeon-vision-task224
description: "Task 224 dungeon vision mask SHIPPED 2026-09-22; layer design, tunables, deliberate leftovers, and follow-ups not in the code"
metadata: 
  node_type: memory
  type: project
  originSessionId: ee36feb2-43e5-4e51-afda-310310dbdb01
  modified: 2026-09-22T18:08:00.895Z
---

Task 224 (dungeon vision mask) shipped 2026-09-22 across ten reviewed steps on branch `224-dungeon-vision`. Design: one floor-sized `<svg id='dungeonVision'>` at z 105 with shadow (evenodd path) → trim outlines (clip-path = vision polygon) → gated trim glyphs → falloff gradient rect → memory outlines (clip-path = seen tile squares, opacity .35) → memory glyphs. No `<mask>` anywhere. Ray-casting at endpoint angles (`VisibilityHelper`), not the Red Blob sweep; memory is seen tiles on `DungeonFloor`. The marker (`DungeonPartyMarker`) drives its own rAF loop and calls `DungeonVisionView.render` per frame.

**Why:** the user approved both the ray-cast and seen-tiles choices explicitly; they liked the result ("looks amazing") and the reference doc's Vision section records the geometry rules. Things NOT in the code: the tunables (light radius 4.5 tiles, falloff start 55%, overshoot 3 px, glyph body 30% of font size, memory opacity .35) were first guesses the user never asked to change; the base layer's `.current` room highlight was kept on purpose (only `.unrevealed` was retired).

**How to apply:** the user's monitor flashes whole-screen (not captured by recordings) when the vision loop presents bursty frames at a 60 Hz mode; its native 59.94 Hz mode (or 30 Hz) is clean, so that report is the display, not the app. Confining the per-frame shadow/clip/falloff elements to the light box (static black backdrop for the rest of the floor) remains an unclaimed efficiency follow-up. If walking hitches on new ground, the seen clip is rewritten as one path per new-tile frame; switch to appending a rect per tile. If the overlay ever dominates a profile, first lever is the light radius, second is the angular sweep. Don't reintroduce `<use>` for the outline copies: descendant selectors don't reach into a use element's shadow tree (that bug shipped once and was fixed). Task file bookkeeping (moving 224 to completed) is the user's. Related: [[grid-movement-task215]], [[room-graphics-task112]].
