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

    function getRandomFeature() {
      const rarityOrder = RarityHelper.getOrder();
      const index = RarityHelper.rollRarityIndex();

      for (let tier=index; tier>=0; tier--) {
        const candidates = theme.features.filter(entry => entry.rarity === rarityOrder[tier]);
        if (candidates.length > 0) {
          const options = Random.from(candidates);
          return FeatureType.lookup(options.type).buildFeature(options);
        }
      }

      throw new Error(`Theme [${code}] has no feature at or below the [${rarityOrder[index]}] rarity tier`);
    }

    function getEncounterRate(isNewRoom) {
      return isNewRoom ? (theme.newRoomEncounterRate || 20) : (theme.revealedRoomEncounterRate || 2);
    }

    // A room without contents will pull its description from the theme. Currently the variety can only be 'plain',
    // 'corridor', 'upStairs' or 'downStairs'. A theme doesn't need to describe every variety, or any of them.
    function getDescription(variety) {
      const descriptions = (theme.descriptions || {})[variety];
      return descriptions ? descriptions.pick() : null;
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
      getNewRoomEncounterRate: () => { return theme.newRoomEncounterRate ?? 20; },
      getStepEncounterRate: () => { return theme.stepEncounterRate ?? 0.5; },
      getExtraStairChance: () => { return theme.extraStairChance || 50 },
      getFloorTextureFunction: () => { return theme.getFloorTexture().paint },
      getDescription,
      getLootQuantity: () => { return [...(theme.lootQuantity || [1,4])]; },
      getLootQuality:() => { return theme.lootQuality || 1 },
      getLootGroups: () => { return theme.lootGroups || {}; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();