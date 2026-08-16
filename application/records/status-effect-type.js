global.StatusEffectType = (function() {
  const statusEffects = {};

  function register(code,data) {
    statusEffects[code] = data;
  }

  function getAllCodes() {
    return Object.keys(statusEffects);
  }

  function lookup(code) {
    if (statusEffects[code] == null) { throw new Error(`Bad status effect code [${code}]`); }

    const statusEffect = { ...statusEffects[code] };

    function getDamageMessage(damage) {
      return statusEffect.getDamageMessage == null ?
        Weaver.formatError(`${code} is missing a damage message.`):
        statusEffect.getDamageMessage(damage);
    }

    function getExpireMessage() {
      return statusEffect.getExpireMessage == null ?
        Weaver.formatError(`${code} is missing a expire message.`):
        statusEffect.getExpireMessage();
    }

    function getResistMessage() {
      return statusEffect.getResistMessage == null ?
        Weaver.formatError(`${code} is missing a resist message.`):
        statusEffect.getResistMessage();
    }

    return {
      getCode: () => { return code; },
      getName: () => { return statusEffect.name; },
      getCategory: () => { return statusEffect.category; },
      getDamageType: () => { return statusEffect.damageType; },
      getDurationType: () => { return statusEffect.durationType; },
      getInterval: () => { return statusEffect.interval || null; },
      getRemovedAt: () => { return statusEffect.removedAt || 'start-of-round' },
      isClearedAfterBattle: () => { return statusEffect.clearAfterBattle === true; },
      getDamageMessage,
      getExpireMessage,
      getResistMessage,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
