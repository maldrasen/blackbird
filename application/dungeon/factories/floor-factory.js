global.FloorFactory = (function() {

  const rarityRanges = {};

  // depth: (number) The depth of this floor.
  // theme: (string) The dungeon theme for this floor, or randomly picked if null.
  function build(level, theme=null) {
    if (level == null) { throw "The floor number is required" }
    if (theme == null) { theme = pickTheme(level); }

    return Floor({ level, theme });
  }

  // In order to do this, each floor needs a rarity map.
  function pickTheme(floor) {
    if (rarityRanges[1] == null) { compileRarityRanges(); }
    return Random.from(rarityRanges[getRandomRarity()][floor]);
  }

  function compileRarityRanges() {

    // Initialize 5x10 table
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

  // Rarity 1 is the same percentage chance as rarity 2 because there should
  // only be one theme (generic dungeon) in the first slot, meaning the generic
  // dungeon will be picked as often as all the level 2 themes combined.
  function getRandomRarity() {
    return Random.fromFrequencyMap({
      1:30, 2:30, 3:10, 4:3, 5:1,
    });
  }

  return Object.freeze({
    build
  });

})();
