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

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return theme.name; },
      getRarity: () => { return theme.rarity; },
      getRange: () => { return theme.range; }
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();