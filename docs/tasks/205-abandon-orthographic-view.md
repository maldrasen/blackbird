---
id: 205
title: Abandon Orthographic View
priority: 1
created: 2026-08-26
tags:
  - dungeon
points: 8
---
---
When I first built the dungeon view, I wanted to try something different, so I experimented with an orthographic top down projection where the floors were placed on the grid, but the north and west walls were drawn on top of them to give a 3D illusion. After working with this for a while I'm not happy with the look. It's more difficult to read than I thought it would be and having the doors hanging off the edge is bad and awkward. It's also limiting the room shapes I can reasonably make. If I switch to a completely top down perspective, adding round rooms or or rooms with rounded or chamfered corners would be fairly easy. 

This task should only effect the dungeon view layer. None of the back end data really needs to change, as it's just the visual representation of the dungeon that's changing, and because the view is already essentially top down all we're changing is removing the wall drawing and how the doors are drawn. 

The doors will need a new kind of hit box. From the top down, doors are simple rectangles, drawn in the padding space between rooms. That's too small of a hitbox though, so we'll need a larger target over them. The hit box needs to be a diamond because two doors can occupy the same tile and would overlap otherwise. A diamond shape centered over the tile edge should work well.