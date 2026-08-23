global.DungeonThemeSystem = (function() {

  const rarityRanges = {};

  function init() {

    Object.values(Rarity).forEach(rarity => {
      rarityRanges[rarity] = {};
      for (let level=1; level<=10; level++) {
        rarityRanges[rarity][level] = [];
      }
    });

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

  // Common has the same percentage chance as unusual because there should only be one common theme (the generic
  // dungeon), meaning the generic dungeon will be picked as often as all the unusual themes combined.
  function getRandomRarity() {
    return Random.fromFrequencyMap({
      [Rarity.common]: 30,
      [Rarity.unusual]: 30,
      [Rarity.rare]: 10,
      [Rarity.astonishing]: 3,
      [Rarity.unheardOf]: 1,
    });
  }

  return {
    init,
    pickTheme,
  };

})();
