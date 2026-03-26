global.SexPosition = (function() {
  const $sexPositions = {};

  function register(code,data) {
    $sexPositions[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexPositions);
  }

  function lookup(code) {
    if ($sexPositions[code] == null) { throw `Bad sex position code [${code}]`; }

    const position = { ...$sexPositions[code] };

    function getRearrange(context) {
      return (typeof position.generateRearrange === 'function') ?
        Weaver(context).weave(position.generateRearrange(context)):
        Weaver(context).formatWarning(`[SexPosition(${code}).generateRearrange()]`);
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return position.name; },
      getAlignment: () => { return position.alignment; },
      getMoves: () => { return position.moves; },
      getRearrange,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
