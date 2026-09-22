# The Dungeon Floor
A dungeon floor is a grid of tiles. The party stands on one tile and moves a tile at a time in any of eight directions. A room is only a set of tiles that share an owner, but most of what happens in the dungeon happens when the party crosses from one room into another. This file only lists the rules that are easy to get wrong. The code is the reference for everything else.

The floor isn't saved. Leaving a floor throws it away and a new one is generated on arrival, so rooms and tiles are free to hold closures.

### The Grid and Tile Ownership
- The floor grid is addressed as `grid[y][x]`, origin top left, x running east and y running south. Each cell holds the floor-global index of the room that owns the tile, or `null`.
- A tile only ever belongs to one room. When a room is added to a feature (`Feature.addRoom()`) its tiles are carved out of the footprints of the rooms already there. That's how a nested room works: the inner room takes the tiles in the middle and the outer room's footprint is left as the ring around it.
- Because of the carve a room has to be fully built and positioned before it's added to its feature. Boxes added or positions changed afterwards won't be carved out of anything.
- A room's footprint and the floor grid always agree, so either can be asked who owns a tile. The footprint works in room-local coordinates and is available before the feature is placed; the grid and the floor-level lookups work in floor coordinates.
- Carving a tile throws away anything that was on it, and a carved room's size only counts the tiles it kept. A footprint can have a hole in it, and `GeometryHelper.traceOutline()` only follows the outside edge.

### Doors
- A door sits on the wall between two tiles and is always stored on the **north or west** wall of the tile at its `position`. A door that would face south or east is stored on the neighboring tile instead.
- Because of that, a step north or west looks for its door on the tile being left, and a step south or east looks for it on the tile being stepped onto.
- A wall can only hold one door. Doors start closed and are opened by walking through them.

### Moving
- **Cardinal steps.** The target tile has to exist and be enterable. The step is open when the same room owns both tiles, or when there's a door in the wall between them.
- **Diagonal steps.** A diagonal step passes through the corner point shared by four tiles: the tile being left, the target, and the two tiles beside them. One room has to own all four, and the target and both side tiles have to be enterable. So a diagonal step never passes through a door, never changes rooms, and never cuts a corner, whether that's the corner of a wall or of something standing on a tile.
- `DungeonNavigationSystem.step()` moves the party instantly and knows nothing about time. The pace of walking and running belongs to `DungeonView`.

### Tile Contents
- `Room.setTileContents(x, y, options)` puts something on a single tile, in room-local integer coordinates. A tile holds one thing, and setting the contents again replaces what was there.
- The options are a `glyph` (`{ glyph, color, size, offset }`, drawn at the center of the tile unless an offset in tiles moves it), `canEnter`, `description`, and `shadow`. Both `canEnter` and `description` can be a plain value or a function that's called every time it's read.
- `shadow` is a plain boolean. When it's true the dungeon view treats the glyph as a solid body that blocks the party's light, so a pillar or a tree casts a shadow. `getGlyphs()` always reports it, false when it was omitted.
- A tile that can't be entered blocks movement. A tile with a description is described in place of its room while the party stands on it.
- Stairs are tile contents with `type:'stairs'` and a `direction`, placed by `Room.setStairs()`. A room can only have its stairs set once, and the content placer skips rooms that have stairs (`canHaveContents()`), though a feature can still give its own stair room contents the way the dungeon entrance does. Their description is picked from the theme the first time it's read.
- The floor has matching lookups that take floor coordinates: `canEnterTile`, `getTileContents`, `getTileDescription`, and `getStairsAt`.

### Revealed, Visited, and Seen
- A revealed room is drawn on the map. A visited room is one the party has actually stood in. Standing on any tile of a room does both, but a room can be revealed without being visited (the console's reveal command, a mapping spell, finding a map).
- Everything that happens on entering a room keys off of **visited**: the scouting check, springing the room's trap, and starting the episode of the room's contents all only happen the first time the party crosses into it.
- A seen tile is one that has been inside the party's light. The dungeon view decides that frame by frame as the party moves and records it with `markTileSeen()`; the floor never marks a tile seen on its own, except that revealing a room marks every tile of it. Seen tiles are what the map remembers once the party has moved on, so they're purely cosmetic and nothing in the game keys off of them.

### Encounters
- Every step that moves the party makes exactly one encounter roll, scaled by the encounter rate difficulty option.
- Crossing into a room for the first time rolls the theme's `newRoomEncounterRate` as a percentage, and doesn't roll at all if the room started an episode.
- Every other step rolls the theme's `stepEncounterRate`. It's a percentage too, but it's rolled out of a thousand so that it can be less than one percent.
