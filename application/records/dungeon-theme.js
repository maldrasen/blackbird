global.DungeonTheme = (function() {
  const $themes = {};

  function register(code,data) {
    $themes[code] = data;
  }

  function getAllCodes() {
    return Object.keys($themes);
  }

  function lookup(code) {
    if ($themes[code] === null) { throw `Bad dungeon theme code [${code}]` }

    const theme = { ...$themes[code] };

    // TODO: This function should use the feature rarity. Before we can do that
    //       though every feature is going to need at least five different
    //       feature types to pull from. That should be the bare minimum for
    //       any dungeon theme I think.
    function getRandomFeature() {
      const options = Random.from(theme.features);
      const featureType = FeatureType.lookup(options.type);
      return featureType.buildFeature(options);
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return theme.name; },
      getRarity: () => { return theme.rarity; },
      getRange: () => { return theme.range; },
      getRandomFeature: getRandomFeature,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();