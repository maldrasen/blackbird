global.DungeonFloor = function(level) {

  const theme = DungeonThemeSystem.pickTheme(level);
  const floorGrid = Array.from({ length:getFloorHeight() }, () => new Array(getFloorWidth()).fill(null));
  const stairs = { up:null, down:null };
  const revealed = new Set();

  let location = null;
  let features = [];
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
      doors: doors.map(door => door.pack()),
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

    setFeatures: f => { features = f; },
    getFeatures: () => { return features; },
    addFeature,
    isRevealed: index => { return revealed.has(index); },

    setDoors: d => { doors = d; },
    getDoors: () => { return doors; },
    addDoor,
    setStairs: (direction, data) => { stairs[direction] = data; },
    getStairs: direction => { return stairs[direction]; },

    pack,
  });

}
