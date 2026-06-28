global.DungeonFloor = function(level) {

  const theme = DungeonThemeSystem.pickTheme(level);

  let features;

  return Object.freeze({
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
    setFeatures: f => { features = f; },
    getFeatures: () => { return features; },
  });

}
