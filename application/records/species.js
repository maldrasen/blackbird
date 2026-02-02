global.Species = (function() {
  const $speciesMap = {};

  function register(code,data) {
    $speciesMap[code] = data;
  }

  function getAllCodes() {
    return Object.keys($speciesMap);
  }

  function lookup(code) {
    const species = $speciesMap[code];

    if (species === null) {
      throw `Bad species code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return species.code; },
      getName: () => { return species.name; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
