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

  // A seen tile has been inside the party's light at some point. The dungeon view decides that as the party moves,
  // and draws what it remembers of the walls around seen tiles. Revealing a room marks all of its tiles as seen.
  const seenTiles = new Map();

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

  function revealRoom(index) {
    revealed.add(index);
    eachRoomTile(rooms[index], markTileSeen);
  }

  function markTileSeen(x, y) {
    if (getRoomIndexAt(x, y) == null) { throw new Error(`There is no floor tile at (${x},${y}) to see.`); }
    seenTiles.set(`${x},${y}`, { x, y });
  }

  function isTileSeen(x, y) {
    return seenTiles.has(`${x},${y}`);
  }

  function getSeenTiles() {
    return [...seenTiles.values()].map(tile => ({ ...tile }));
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

  // The grid cells hold the room's floor-global index, as rooms are the unit of navigation. Footprints never share a
  // tile, so the order the rooms are painted in doesn't matter.
  function paintRoom(room) {
    const index = room.getIndex();
    eachRoomTile(room, (x, y) => { floorGrid[y][x] = index; });
  }

  // Call back with the floor coordinates of every tile in a room's footprint.
  function eachRoomTile(room, callback) {
    const position = room.getFloorPosition();

    room.getFootprint().forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell != null) { callback(position.x + x, position.y + y); }
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

  // A floor tile as the room that owns it sees it, in the room's own coordinates.
  function findRoomTile(x, y) {
    const index = getRoomIndexAt(x, y);
    if (index == null) { return null; }

    const position = rooms[index].getFloorPosition();
    return { room:rooms[index], x:x - position.x, y:y - position.y };
  }

  // Whether the party could stand on a tile.
  function canEnterTile(x, y) {
    const tile = findRoomTile(x, y);
    return tile ? tile.room.canEnterTile(tile.x, tile.y) : false;
  }

  // Whatever has been put on a tile, or null for a bare tile. The contents keep the room's own coordinates.
  function getTileContents(x, y) {
    const tile = findRoomTile(x, y);
    return tile ? tile.room.getTileContents(tile.x, tile.y) : null;
  }

  function getTileDescription(x, y) {
    const tile = findRoomTile(x, y);
    return tile ? tile.room.getTileDescription(tile.x, tile.y) : null;
  }

  function getStairs(direction) {
    return rooms.filter(room => room.getStairs() === direction).map(room => {
      return { position:room.getStairsFloorPosition(), room:room.getIndex() };
    });
  }

  // The direction of the stairs standing on a tile, if there are any.
  function getStairsAt(x, y) {
    const contents = getTileContents(x, y);
    return (contents && contents.type === 'stairs') ? contents.direction : null;
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
    canEnterTile,
    getTileContents,
    getTileDescription,
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
    revealRoom,
    isRevealed: index => { return revealed.has(index); },
    isVisited: index => { return visited.has(index); },
    markTileSeen,
    isTileSeen,
    getSeenTiles,

    setDoors,
    getDoors: () => { return doors; },
    getDoorAt,
    addDoor,
    getStairs,
    getStairsAt,

    pack,
  };

}
