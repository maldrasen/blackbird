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

### Wall treatment: per-room fake perspective
The look we're going for here is a fake single point perspective per room with the vanishing point in the room's center. Similar to the way rooms are drawn in the original NES "Zelda" or "Binding of Isaac". Every wall face is visible, sloping inward.

We'll extrude each wall segment inward into a trapezoid of fixed depth with mitered corners where segments meet. Directly adjacent rooms each extrude to their own side, so shared boundaries read as back-to-back wall bands. Doors then become passages through the wall thickness (jambs on both bands) rather than flat symbols. 

We'll need to pay special attention to single tile wide rooms like corridors. It's possible we'll need to update the floor factory to build 3 tile wide rooms at a minimum. (1 floor tile, two wall tiles) It might be possible though to draw all four walls within a single tile (if each wall only extrudes to 1/3 of the width of a tile) That's a question we'll need to look at the visually to decide. The gridSize of 32px was completely arbitrary, especially when we're drawing the tiles will svg and can scale up or down to whatever looks good. We'll just need to update the room sizes in the themes because a 9x9 room would look too large when the walls take 1/3 of a tile. Conversely if we go with a two or three tile width minimum, we'll see more granularity in room placement, which might look good.

## Theming
Each dungeon theme should have it's own pallet and texture options for the walls and floors. Because we're drawing the walls and floors as SVGs we can generate the textures procedurally. A brick texture for instance could have slightly random widths for bricks, or the theme could specify two brick courses or three on the walls. There are probably some interesting floor tile patterns we can produce. A standard grid, bricks, herringbone, a hex grid, non-periodic Penrose tiling, anything goes really.

---
**Notes (Claude):** Too big for one task — recommend splitting. This is being built in parallel on the `112-room-graphics` branch (on `main`, rooms are still HTML boxes at `gridSize = 32`). On that branch the SVG foundation is already in place — per-room `<svg>` elements, `GeometryHelper.traceOutline`, the 64px grid, and a coordinate-space camera. What remains is several independent pieces:

1. **Wall extrusion / fake perspective** (8) — extrude each wall segment inward into mitered trapezoids toward a per-room vanishing point. The hard geometry work: corner mitering, back-to-back bands on shared boundaries. Touches `application/views/dungeon/dungeon-floor-view.js` + a geometry helper.
2. **Doors as passages through wall thickness** (5) — jambs on both bands instead of flat door symbols; depends on (1). Coordinate with `dungeon/factories/door-finder.js` and the door pads from [[project_dungeon_navigation]].
3. **Floor-factory minimum width** (5) — decide 1-tile vs 3-tile minimum room/corridor width so walls have room to extrude; if changed, update theme room-size ranges (`data/dungeon-themes/*`) and re-tune generation. This is a geometry/gen-tuning risk, verify visually. Watch for [[floor-no-path-failure]] regressions.
4. **Per-theme palettes + procedural wall/floor textures** (5) — brick/herringbone/hex/Penrose generators keyed off theme data; mostly additive.
5. **Map memory / current-room highlight fade** (2) — per-room opacity over time; the per-room element already exists for this.

Verify each visually via `node bin/serve.js` at :8300. Flat-color highlights only per existing navigation constraints.
