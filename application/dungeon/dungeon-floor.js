global.DungeonFloor = function(level) {

  const theme = DungeonThemeSystem.pickTheme(level);

  let features;

  // Theoretically the size of the floor should come from the floor theme, as well as any specific building and room
  // layout instructions. For now we can assume a 50x50 dungeon using the standard layout algorithm.
  function getFloorSize() { return 30; }

  return Object.freeze({
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
    setFeatures: f => { features = f; },
    getFeatures: () => { return features; },
    getFloorSize,
  });

}
