global.Ability = (function() {
  const $abilities = {};

  function register(code,data) {
    $abilities[code] = data;
  }

  function getAllCodes() {
    return Object.keys($abilities);
  }

  function lookup(code) {
    if ($abilities[code] == null) { throw new Error(`Bad ability code [${code}]`); }

    const ability = { ...$abilities[code] };

    function canBeUsed() {
      return true;
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return ability.name },
      getType: () => { return ability.type },
      canBeUsed,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
