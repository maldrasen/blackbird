global.SexPosition = (function() {
  const sexPositions = {};

  function register(code,data) {
    sexPositions[code] = data;
  }

  function getAllCodes() {
    return Object.keys(sexPositions);
  }

  function lookup(code) {
    if (sexPositions[code] == null) { throw new Error(`Bad sex position code [${code}]`); }

    const position = { ...sexPositions[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return position.name; },
      getAlignment: () => { return position.alignment; },
      getMoves: () => { return position.moves; },
      getRearrangePackage: () => { return position.rearrangePackage },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
