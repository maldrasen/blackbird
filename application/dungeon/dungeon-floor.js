global.DungeonFloor = function(level) {

  const theme = DungeonThemeSystem.pickTheme(level);

  let features;

  // Theoretically the size of the floor should come from the floor theme, as well as any specific building and room
  // layout instructions.
  function getFloorWidth() { return 60; }
  function getFloorHeight() { return 30; }

  return Object.freeze({
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
    setFeatures: f => { features = f; },
    getFeatures: () => { return features; },
    getFloorWidth,
    getFloorHeight,
  });

}
