---
name: project-door-placement
description: "Door rendering — drawn-face selection model (2026-07-18): a door renders on whatever wall face a revealed room currently draws; nested doors S/E only"
metadata: 
  node_type: memory
  type: project
  originSessionId: d865060b-da40-46ae-9553-f2272425d137
---

Door rendering (application/views/dungeon/dungeon-door-view.js, reworked 2026-07-18) uses one selection
rule instead of reveal-keyed hide classes: `build(floor, door)` searches the *revealed* rooms of
{from,to} for a drawn wall face containing the door (`findDrawnFace`, via `getRoomGeometry` /
`getNestedGeometry` — a revealed room's SVG draws both its own faces and its nested blocks' faces).
Drawn face found → real `.door` clipped to that face (z 100); no face but one side revealed → `.hanging-door`
(z 30, under revealed rooms so anything a revealed room draws occludes its spill into the one neighbor
tile it leans into); neither revealed → no element at all. DungeonFloorView.updateLocation rebuilds
(remove + re-append) every door touching a newly revealed room; DungeonCommands.revealAll still redraws
fully. Click handlers are delegated so rebuilt elements keep working.

Slab geometry unchanged from task 120: slabs physically centered on their tile, top edge shifted by the
lintel, element/viewBox extends a wallDepth past the tile so the leaning base isn't truncated; slab lifted
1px so the base clears the 2px wall-base stroke; `pointer-events: none` on SVG roots with `visiblePainted`
on `.slab` only, and clipped-away slab parts are unclickable (correct).

Nested-room constraint (data/feature-types/nested-room.js): the oblique projection renders only the S and E
faces of a nested block (nestedFaceDirections ['S','W'] = outline runs → east and south edges), so nested
doors generate only on the S/E walls — a N/W-wall door faces away from the viewer and can never be drawn
(that was the room 46/47 invisible-door bug: hanging door buried under the outer room's block art at z 40).
For S/E doors the tile owner is the *outer* room, and the block face drawn by the revealed outer room
carries the door as a real slab even while the inner room is unrevealed.

Key z insight: "hanging doors under revealed rooms" IS the neighbor-tile occlusion check — the revealed
neighbor paints itself over the hanging door's 40px frame-line spill (N doors spill east, W doors spill
south, exactly one neighbor tile each). No hand-computed clip needed; the only case z-order can't fix is a
door on a never-drawn face, which is now excluded at generation.

Reveal-all invariant (good smoke test): with every room revealed, every floor door must render as a real
clipped door — 0 hanging, 0 unclipped. Verified via browser dev mode + javascript_tool DOM asserts;
screenshots in the browser pane still time out.
