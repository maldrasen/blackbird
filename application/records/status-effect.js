global.StatusEffect = (function() {
  const $statusEffects = {};

  function register(code,data) {
    $statusEffects[code] = data;
  }

  function getAllCodes() {
    return Object.keys($statusEffects);
  }

  function lookup(code) {
    if ($statusEffects[code] == null) { throw new Error(`Bad status effect code [${code}]`); }

    const statusEffect = { ...$statusEffects[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return statusEffect.name; },
      getCategory: () => { return statusEffect.category; },
      getDamageType: () => { return statusEffect.damageType; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
