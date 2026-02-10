global.SexPosition = (function() {
  const $sexPositions = {};

  function register(code,data) {
    $sexPositions[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexPositions);
  }

  function lookup(code) {
    if ($sexPositions[code] === null) { throw `Bad sex position code [${code}]`; }

    const position = { ...$sexPositions[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return position.name; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
