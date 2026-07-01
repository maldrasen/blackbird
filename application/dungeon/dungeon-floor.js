global.DungeonFloor = function(level) {

  const theme = DungeonThemeSystem.pickTheme(level);
  const floorGrid = Array.from({ length:getFloorHeight() }, () => new Array(getFloorWidth()));

  let features;
  let doors;

  // Theoretically the size of the floor should come from the floor theme, as well as any specific building and room
  // layout instructions.
  function getFloorWidth() { return 60; }
  function getFloorHeight() { return 40; }

  function addFeature(feature) {
    feature.setIndex(features.length);
    features.push(feature);
  }

  function addDoor(door) {
    doors.push(door);
  }

  return Object.freeze({
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
    getFloorGrid: () => { return floorGrid; },
    getFloorWidth,
    getFloorHeight,

    setFeatures: f => { features = f; },
    getFeatures: () => { return features; },
    addFeature,

    setDoors: d => { doors = d; },
    getDoors: () => { return doors; },
    addDoor,
  });

}
