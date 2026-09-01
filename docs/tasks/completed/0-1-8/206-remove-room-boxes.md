---
id: 206
title: Remove room boxes
priority: 1
created: 2026-08-26
tags:
  - dungeon
points: 5
---
---
The room boxes are a left over concept from when I was drawing the dungeon as html element, and needed two overlapping rectangles to draw an 'L' or 'T' shape. I think they're currently just adding unnecessary complexity. Both the floor builder and the dungeon view should only care about the room's footprint grid, and I don't think the boxes are really used at all once the room has been built. It would be better to just get rid of that internal representation completely. We should still be able to create a room with a box, so that all the builders don't need to change, but adding a box should just adjust an internal grid. This will mean changing a few things though. We should decide on the room bounds first, creating an empty grid of the correct size. That way we're not having to adjust the grid size dynamically when a "box" is added.