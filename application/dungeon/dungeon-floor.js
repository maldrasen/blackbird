global.DungeonFloor = function(level, theme=null) {

  // The floor theme is usually picked at random, given the level of the dungeon. In order for the fixtures to more
  // easily test one theme or another we take a theme as an optional parameter. A real game should never set the theme
  // like this.
  if (theme == null) { theme = DungeonThemeSystem.pickTheme(level); }

  const floorGrid = Array.from({ length:getFloorHeight() }, () => new Array(getFloorWidth()).fill(null));

  // A revealed room is drawn on the map; a visited room has actually been walked into. Walking into a room does
  // both, but a room can be revealed without being visited (the debug reveal command), so scouting, traps, and
  // episodes key off visited rather than revealed.
  const revealed = new Set();
  const visited = new Set();

  const doorsByEdge = new Map();

  let partyPosition = null;
  let features = [];
  let rooms = [];
  let doors = [];

  function getFloorWidth() { return DungeonTheme.lookup(theme).getFloorWidth(); }
  function getFloorHeight() { return DungeonTheme.lookup(theme).getFloorHeight(); }

  // The party stands on a single tile of the floor, which reveals and visits the room that owns the tile.
  function setPartyPosition(x, y) {
    const index = getRoomIndexAt(x, y);
    if (index == null) { throw new Error(`The party cannot stand at (${x},${y}), there is no floor there.`); }

    partyPosition = { x, y };
    revealed.add(index);
    visited.add(index);
  }

  // The party's location is the room that owns the tile they're standing on.
  function getLocation() {
    return partyPosition ? getRoomIndexAt(partyPosition.x, partyPosition.y) : null;
  }

  function getPartyPosition() {
    return partyPosition ? { ...partyPosition } : null;
  }

  function addFeature(feature) {
    feature.setIndex(features.length);
    features.push(feature);

    const featurePosition = feature.getPosition();
    feature.getRooms().forEach(room => {
      const roomPosition = room.getPosition();
      room.setIndex(rooms.length);
      room.setFloorPosition(featurePosition.x + roomPosition.x, featurePosition.y + roomPosition.y);
      rooms.push(room);
      paintRoom(room);
    });
  }

  // The grid cells hold the room's floor-global index, as rooms are the unit of navigation. Where the rooms of a
  // feature overlap the last room painted owns the tile.
  function paintRoom(room) {
    const position = room.getFloorPosition();
    const index = room.getIndex();

    room.getFootprint().forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell != null) { floorGrid[position.y + y][position.x + x] = index; }
      });
    });
  }

  function getFeatureForRoom(roomIndex) {
    return features[rooms[roomIndex].getFeatureIndex()];
  }

  function getPlacedContents() {
    return new Set(rooms.map(room => room.getContents()));
  }

  function setDoors(list) {
    doors = list;
    doorsByEdge.clear();
    doors.forEach(indexDoor);
  }

  function addDoor(door) {
    doors.push(door);
    indexDoor(door);
  }

  // Movement looks doors up by the wall they're on, and a wall can only ever hold one door.
  function indexDoor(door) {
    const key = edgeKey(door.position.x, door.position.y, door.direction);
    if (doorsByEdge.has(key)) { throw new Error(`There is already a door at (${key})`); }
    doorsByEdge.set(key, door);
  }

  function edgeKey(x, y, direction) {
    return `${x},${y},${direction}`;
  }

  function getDoorAt(x, y, direction) {
    return doorsByEdge.get(edgeKey(x, y, direction)) || null;
  }

  // The index of the room that owns a tile, or null when the tile is empty or off the floor entirely.
  function getRoomIndexAt(x, y) {
    if (floorGrid[y] == null || floorGrid[y][x] == null) { return null; }
    return floorGrid[y][x];
  }

  function getStairs(direction) {
    return rooms.filter(room => room.getStairs() === direction).map(room => {
      return { position:room.getStairsFloorPosition(), room:room.getIndex() };
    });
  }

  // The direction of the stairs standing on a tile, if there are any.
  function getStairsAt(x, y) {
    const index = getRoomIndexAt(x, y);
    if (index == null) { return null; }

    const position = rooms[index].getStairsFloorPosition();
    if (position == null || position.x !== x || position.y !== y) { return null; }

    return rooms[index].getStairs();
  }

  function pack() {
    return {
      theme,
      floorGrid,
      features: features.map(feature => feature.pack()),
      doors,
    }
  }

  return {
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
    getFloorGrid: () => { return floorGrid; },
    getRoomIndexAt,
    getFloorWidth,
    getFloorHeight,

    setPartyPosition,
    getPartyPosition,
    getLocation,
    getCurrentRoom: () => { return rooms[getLocation()]; },

    getFeatures: () => { return features; },
    getRooms: () => { return rooms; },
    getFeatureForRoom,
    getPlacedContents,
    addFeature,
    revealRoom: index => { revealed.add(index); },
    isRevealed: index => { return revealed.has(index); },
    isVisited: index => { return visited.has(index); },

    setDoors,
    getDoors: () => { return doors; },
    getDoorAt,
    addDoor,
    getStairs,
    getStairsAt,

    pack,
  };

}
