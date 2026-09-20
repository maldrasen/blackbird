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

  let location = null;
  let features = [];
  let rooms = [];
  let doors = [];

  function getFloorWidth() { return DungeonTheme.lookup(theme).getFloorWidth(); }
  function getFloorHeight() { return DungeonTheme.lookup(theme).getFloorHeight(); }

  function setLocation(index) {
    location = index;
    revealed.add(index);
    visited.add(index);
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
    getFloorWidth,
    getFloorHeight,

    setLocation,
    getLocation: () => { return location; },
    getCurrentRoom: () => { return rooms[location]; },

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
    getStairs: direction => { return rooms.filter(room => room.getStairs() === direction).map(room => room.getIndex()); },

    pack,
  };

}
