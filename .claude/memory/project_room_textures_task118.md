---
name: project-room-textures-task118
description: "Task 118 floor/wall grid painters — theme paint functions, getRoomGeometry/getNestedGeometry API, projection conventions"
metadata: 
  node_type: memory
  type: project
  originSessionId: 71d3f287-df2d-46c7-90f6-c6f0099482f8
---

Task 118 (floor and wall textures) implemented on branch `118-floor-and-wall-texture` (2026-07-18). Key conventions that aren't obvious from any one file:

- Themes expose `getFloorTextureFunction()`/`getWallTextureFunction()`; `DungeonFloorView.drawDungeon` calls both per room after appending the room svg. Painters receive only `room` and find their svg via `#dungeonFloor .room[data-index=...]`; SVG children must be added with `insertAdjacentHTML` (namespace), inserted right after the `.floor` polygon so wall strokes paint over them.
- `DungeonRoomView.getRoomGeometry(room)` is the general paintable-area function (outline, wallLine, wallBase, floor outline, faces with corner-occlusion trims applied). `getNestedGeometry(floor, room)` gives nested exteriors' S/E faces (convex — no trims). The planned door improvements should derive per-tile paintable areas from `faces`.
- Projection: room coordinates are ceiling-level; the floor plane is +wallDepth(+20,+20) from them. Floor grid lines sit at `k*64+20` so they meet wall seam base points exactly. The floor outline follows the slanted exposed corner edges at inside NE (S→E) and SW (N→W) concave corners.
- Occlusion gotchas: nested-wall projected polygon is drawn first and filled `$bg-dungeon` to hide the parent's floor grid (draw order matters — filling the later polygon erases the ceiling outline strokes); nested seams need their own `.wall-texture` group inserted after the nested-wall elements.

Related: [[project-room-graphics-task112]].
