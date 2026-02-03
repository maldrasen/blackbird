global.SexPosition = (function() {
  const $sexPositions = {};

  function register(code,data) {
    $sexPositions[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexPositions);
  }

  function lookup(code) {
    const location = $sexPositions[code];

    if (location === null) {
      throw `Bad sex position code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return $sexPositions.name; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
