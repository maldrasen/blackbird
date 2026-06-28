global.DungeonFloor = function(level) {

  let theme = DungeonThemeSystem.pickTheme(level);

  return Object.freeze({
    getLevel: () => { return level; },
    getTheme: () => { return theme; },
  });

}
