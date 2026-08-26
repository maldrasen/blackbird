global.DungeonTheme = (function() {
  const themes = {};

  function register(code,data) {
    themes[code] = data;
  }

  function getAllCodes() {
    return Object.keys(themes);
  }

  function lookup(code) {
    if (themes[code] == null) { throw new Error(`Bad dungeon theme code [${code}]`); }

    const theme = { ...themes[code] };

    // TODO: This function should use the feature rarity. Before we can do that
    //       though every feature is going to need at least five different
    //       feature types to pull from. That should be the bare minimum for
    //       any dungeon theme I think.
    function getRandomFeature() {
      const options = Random.from(theme.features);
      const featureType = FeatureType.lookup(options.type);
      return featureType.buildFeature(options);
    }

    function getEncounterRate(isNewRoom) {
      return isNewRoom ? (theme.newRoomEncounterRate || 20) : (theme.revealedRoomEncounterRate || 2);
    }

    // A room without contents will pull its description from the theme. Currently the variety can only be 'plain',
    // 'corridor', 'upStairs' or 'downStairs'.
    function getDescription(variety) {
      return theme.descriptions[variety].pick();
    }

    return {
      getCode: () => { return code; },
      getName: () => { return theme.name; },
      getRarity: () => { return theme.rarity; },
      getRange: () => { return theme.range; },
      getFloorHeight: () => { return theme.floorHeight || 60 },
      getFloorWidth: () => { return theme.floorWidth || 60 },
      getCohorts: () => { return theme.cohorts; },
      getRoomContents: () => { return theme.roomContents || []; },
      getRoomContentChance: () => { return theme.roomContentChance ?? 20; },
      getRandomFeature: getRandomFeature,
      getEncounterRate,
      getExtraStairChance: () => { return theme.extraStairChance || 50 },
      getFloorTextureFunction: () => { return theme.getFloorTexture().paint },
      getDescription,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();