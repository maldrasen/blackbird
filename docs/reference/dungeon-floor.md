# The Dungeon Floor
A dungeon floor is a grid of tiles. The party stands on one tile at a time and moves a tile at a time, in any of eight directions. Rooms still matter, because most of what happens in the dungeon happens when the party crosses from one room into another, but a room is only a set of tiles that share an owner. The floor isn't saved. Leaving a floor throws it away, and a new one is generated on arrival.

### The Floor Grid
`DungeonFloor.getFloorGrid()` is a two dimensional array addressed as `grid[y][x]`, with the origin in the top left corner, x running east and y running south. Every cell holds the floor-global index of the room that owns the tile, or `null` when there's nothing there. Use `getRoomIndexAt(x, y)` to read it, which also returns `null` for a tile that's off the floor entirely.

Rooms are painted into the grid as their feature is added with `addFeature()`. Corridors are features with a single room, so every corridor tile has an owner too. Where the rooms of a feature overlap, the last room painted owns the tile. That's how a nested room works: the inner room is painted after the outer room and takes the tiles in the middle, leaving the outer room with the ring around it. A room's footprint can therefore include tiles that the room doesn't own, and anything that needs a tile of a room (like placing the stairs) has to check the grid rather than the footprint.

### Doors
A door is a plain object built by `Door()`: `{ position, direction, from, to, open }`.

Doors sit on the wall between two tiles, and are always stored on the **north or west** wall of the tile at `position`. The `from` room owns that tile, and the `to` room owns the tile on the other side of the wall (the tile to the north or to the west). A door that would face south or east is stored on the neighboring tile instead, where it faces north or west. `Door()` throws for any other direction.

A wall can only hold one door. The floor indexes its doors by wall, and `getDoorAt(x, y, direction)` finds the door on a wall or returns `null`. The index is rebuilt by `setDoors()` and added to by `addDoor()`, and adding a second door to a wall throws.

Every door starts closed and is opened by walking through it. An open door doesn't change anything yet other than how it's drawn.

### Moving
`DungeonNavigationSystem.findStep(position, direction)` works out where a step would lead. It returns `{ position, door }` for an open step, or `null` when the way is blocked. It takes the position to step from rather than using the party's own, so that a path can be searched for from any tile. The directions are `north`, `south`, `west`, `east`, `northeast`, `northwest`, `southeast`, and `southwest`, which are also the names of the key binding actions in the `dungeon` context.

**Cardinal steps.** The tile being stepped onto has to exist. If the same room owns both tiles the step is open. If different rooms own them then there has to be a door in the wall between them. Because doors are only ever on a north or west wall, a step north or west looks for the door on the tile being left, and a step south or east looks for it on the tile being stepped onto.

**Diagonal steps.** A diagonal step passes through the corner point where four tiles meet: the tile being left, the tile being stepped onto, and the two tiles beside them. The step is only open when one room owns all four of those tiles, because then no wall and no door can be touching that corner. This means a diagonal step never passes through a door, never changes rooms, and never cuts a corner, including the inside corner of a bend in a corridor.

`step(direction)` moves the party. A blocked step returns `{ moved:false }` and nothing else happens. Otherwise it returns `{ moved, position, openedDoor, enteredRoom, revealed, episode, trap, encounter }`. `enteredRoom` is set whenever the step crossed into a different room, and `revealed` is only true when the map needs to uncover that room.

### Entering a Room
Rooms are revealed and visited as a whole. A revealed room is drawn on the map. A visited room is one the party has actually stood in. Standing on any tile of a room does both, but a room can be revealed without being visited (the console's reveal command), so everything below keys off of visited.

Crossing into a room for the **first time**:
- The party's scout makes a scouting check, which is stored on the room.
- The room's trap is sprung, unless the scouting check spotted it.
- The episode belonging to the room's contents is started, if it has one and its requirements are met.
- Game time advances by 1.

Crossing into a room that's already been visited only advances the game time by 0.2. A step that stays within a room takes no time.

Room contents belong to the whole room. Their commands can be used from any tile in it.

### Encounters
Every step that moves the party makes exactly one encounter roll, scaled by the encounter rate difficulty option.
- Crossing into a room for the first time rolls the theme's `newRoomEncounterRate` as a percentage (20 by default). There's no roll at all if the room started an episode.
- Every other step rolls the theme's `stepEncounterRate` (0.5 by default). It's a percentage too, but it's rolled out of a thousand so that it can be less than one percent.

At 0.5 a walk from the arrival stairs to the nearest down stairs through explored rooms (about 44 steps on average) has roughly a one in five chance of an encounter.

### The Party
`DungeonFloor.setPartyPosition(x, y)` stands the party on a tile and throws if there's no floor there. `getPartyPosition()` returns a copy of the tile. `getLocation()` and `getCurrentRoom()` are derived from it: they're the room that owns the party's tile. `DungeonSystem.setLevel()` starts the party standing on stairs in the direction they arrived from.

### Stairs
Stairs stand on a single tile of their room. `Room.setStairs(direction, x, y)` takes a tile in the room's own coordinates. `DungeonFloor.getStairs(direction)` lists them as `{ position, room }` in floor coordinates, and `getStairsAt(x, y)` returns the direction of the stairs on a tile. Generated stairs are placed by `FloorFactorySupport.pickStairsTile()`, which picks the tile closest to the room's center point out of the tiles the room owns, preferring a dry one. It never rolls, so a floor's seed always puts the stairs in the same place.

The stairs can only be used while standing on them.

### What the Party Sees
`DungeonTileSystem.getTileInfo()` returns the `{ description, commands }` that the dungeon controls show. Most tiles have nothing of their own and show the description and commands of their room. A tile with something on it is described in place of the room, and puts its own commands ahead of the room's. Stairs are the only thing a tile can have so far, and their command is `use-stairs`. `DungeonTileSystem.useCommand(code)` runs a command from either source, and returns `{ floorChanged:true }` when the party took the stairs.

A description can be empty. A theme doesn't need a description for every kind of room, and the controls leave the space blank.
