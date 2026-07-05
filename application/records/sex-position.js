global.SexPosition = (function() {
  const $sexPositions = {};

  function register(code,data) {
    $sexPositions[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexPositions);
  }

  function lookup(code) {
    if ($sexPositions[code] == null) { throw new Error(`Bad sex position code [${code}]`); }

    const position = { ...$sexPositions[code] };

    function getRearrange(context) {
      if (position.rearrangePackage != null) { return Weaver(context).weave(position.rearrangePackage.pick(context)); }

      // TODO: Get rid of this once we've converted all the position files.
      if (typeof position.generateRearrange === 'function') { return Weaver(context).weave(position.generateRearrange(context)); }

      return Weaver.formatWarning(`[SexPosition(${code}).generateRearrange()]`);
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
