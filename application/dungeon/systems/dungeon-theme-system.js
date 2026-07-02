global.DungeonThemeSystem = (function() {

  const rarityRanges = {};

  function init() {

    for (let i=1; i<=5; i++) {
      rarityRanges[i] = {};
      for (let j=1; j<=10; j++) {
        rarityRanges[i][j] = [];
      }
    }

    DungeonTheme.getAllCodes().forEach(themeCode => {
      const theme = DungeonTheme.lookup(themeCode);
      const range = theme.getRange();
      const rarity = theme.getRarity();

      let rangeLow = 1;
      let rangeHigh = 10;
      if (typeof range === 'number') {
        rangeLow = range;
        rangeHigh = range;
      }
      if (typeof range === 'object') {
        rangeLow = range[0];
        rangeHigh = range[1];
      }

      for (let i=rangeLow; i<=rangeHigh; i++) {
        rarityRanges[rarity][i].push(themeCode);
      }
    });
  }

  function pickTheme(level) {
    if (Object.keys(rarityRanges).length === 0) { init(); }
    return Random.from(rarityRanges[getRandomRarity()][level]);
  }

  // Rarity 1 is the same percentage chance as rarity 2 because there should
  // only be one theme (generic dungeon) in the first slot, meaning the generic
  // dungeon will be picked as often as all the level 2 themes combined.
  function getRandomRarity() {
    return Random.fromFrequencyMap({
      1:30, 2:30, 3:10, 4:3, 5:1,
    });
  }

  return Object.freeze({
    init,
    pickTheme,
  });

})();
