global.Monster = (function() {
  const $monsters = {};

  function register(code,data) {
    $monsters[code] = data;
  }

  function getAllCodes() {
    return Object.keys($monsters);
  }

  function lookup(code) {
    if ($monsters[code] == null) { throw new Error(`Bad monster code [${code}]`); }

    const monster = { ...$monsters[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return monster.name; },
      getSpecies: () => { return monster.species; },
      getTriggers: () => { return monster.triggers || [] },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
