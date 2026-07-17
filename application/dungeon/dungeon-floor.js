global.DungeonFloor = function(level, theme=null) {

  // The floor theme is usually picked at random, given the level of the dungeon. In order for the fixtures to more
  // easily test one theme or another we take a theme as an optional parameter. A real game should never set the theme
  // like this.
  if (theme == null) { theme = DungeonThemeSystem.pickTheme(level); }

  const floorGrid = Array.from({ length:getFloorHeight() }, () => new Array(getFloorWidth()).fill(null));
  const stairs = { up:[], down:[] };
  const revealed = new Set();

  let location = null;
  let features = [];
  let rooms = [];
  let doors = [];

  // Theoretically the size of the floor should come from the floor theme, as well as any specific building and room
  // layout instructions.
  function getFloorWidth() { return 60; }
  function getFloorHeight() { return 40; }

  function setLocation(index) {
    location = index;
    revealed.add(index);
  }

  function addFeature(feature) {
    feature.setIndex(features.length);
    features.push(feature);

    const featurePosition = feature.getPosition();
    feature.getRooms().forEach(room => {
      const roomPosition = room.getPosition();
      room.setIndex(rooms.length);
      room.setFeatureIndex(feature.getIndex());
      room.setFloorPosition(featurePosition.x + roomPosition.x, featurePosition.y + roomPosition.y);
      rooms.push(room);
    });
  }

  function getFeatureForRoom(roomIndex) {
    return features[rooms[roomIndex].getFeatureIndex()];
  }

  function addDoor(door) {
    doors.push(door);
  }

  function pack() {
    return {
      theme,
      floorGrid,
      stairs,
      features: features.map(feature => feature.pack()),
      doors,
    }
  }

  return Object.freeze({
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
    getFloorGrid: () => { return floorGrid; },
    getFloorWidth,
    getFloorHeight,

    setLocation,
    getLocation: () => { return location; },

    getFeatures: () => { return features; },
    getRooms: () => { return rooms; },
    getFeatureForRoom,
    addFeature,
    revealRoom: index => { revealed.add(index); },
    isRevealed: index => { return revealed.has(index); },

    setDoors: d => { doors = d; },
    getDoors: () => { return doors; },
    addDoor,
    addStairs: (direction, data) => { stairs[direction].push(data); },
    getStairs: direction => { return stairs[direction]; },

    pack,
  });

}
