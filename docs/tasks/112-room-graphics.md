---
id: 112
title: Room Graphics
priority: 1
created: 2026-07-16
tags:
  - dungeon
points: 21
---
---
I think it's time to start updating the room graphics. Currently every room is a simple html element, with a pair of boxes. We need to start expanding how boxes are drawn. I think the right approach is to stick with simple vector graphics, adding an SVG element to each room that we can draw the room's contents inside of. 

I think it's still useful to have each room be its own element, for click events and for graphical effects that we want to control at the room level. We'll at least want to highlight the current room. I could see implementing a kind of "map memory" where as time passes the rooms get more transparent. 

### Visual Style
The game's dungeon is a hybrid between old school roguelikes like Angband, and even older school text based adventurers like Zork. As such the graphics should look a little like a roguelike style dungeon, but we'll be replacing the entirely text based glyphs with colored lines that, if you squint, mimic that look. Still colored lines on a black background. With the walls and floor being drawn with lines, the few glyphs we use like the ? and the stair triangles won't stand out. We could also add more complex svg line drawings in some of the rooms, representing shrines, or other contents. We could also have unique rooms that come prepackaged with their own SVG graphics.

### Wall treatment: Orthogonal Now
I was originally planning on making each wall visible from above (fake single point perspective, vanishing point in center of the room), but I don't think there's any way to make that look good with single tile rooms or single tile wide corridors. Instead we should do the standard north wall fully visible, west wall partially visible, orthogonal perspective. We still only draw within the room's grid footprint. 

### Doors
Moving to an orthogonal view simplifies the doors somewhat. Rather than mitering the walls inward to connect a narrow passage, they can be drawn directly on the north or west wall. In making that decision though, it would seem that the door data model is completely backwards. Doors go between tiles, so we only needed to specify if a door was on the south or east border. But if we're always drawing doors on the north or west side of a tile, the data model should reflect this. Oops.

## Theming
Each dungeon theme should have it's own pallet and texture options for the walls and floors. Because we're drawing the walls and floors as SVGs we can generate the textures procedurally. A brick texture for instance could have slightly random widths for bricks, or the theme could specify two brick courses or three on the walls. There are probably some interesting floor tile patterns we can produce. A standard grid, bricks, herringbone, a hex grid, non-periodic Penrose tiling, anything goes really.
