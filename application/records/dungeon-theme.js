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

    const location = { ...$themes[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return location.name; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();