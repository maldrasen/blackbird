global.Ability = (function() {
  const abilities = {};

  function register(code,data) { abilities[code] = data; }
  function getAllCodes() { return Object.keys(abilities); }
  function exists(code) { return abilities[code] != null; }

  function lookup(code) {
    if (abilities[code] == null) { throw new Error(`Bad ability code [${code}]`); }

    const ability = { ...abilities[code] };

    function execute(entry=null) {
      const round = BattleSystem.getRound();
      round.setAbility(code, entry);
      round.applyCooldown(code);
      ability.execute();

      if (round.isActingCharacter()) {
        BattleSystem.finishCharacterRound();
      }
    }

    return {
      getCode: () => { return code; },
      getName: () => { return ability.name },
      getCooldown: () => { return ability.cooldown; },
      getCategory: () => { return ability.category },
      getTargetingMode: () => { return ability.targetingMode },
      getEssence: () => { return ability.essence || 0; },
      hasOverlay: () => { return typeof ability.overlay === 'function' },
      openOverlay: () => { ability.overlay() },
      canBeUsed: () => { return (ability.canBeUsed == null) ? true : ability.canBeUsed(); },
      getAccuracyBonus: () => { return typeof ability.getAccuracyBonus === 'function' ? ability.getAccuracyBonus() : 1; },
      getDamageBonus: () => { return typeof ability.getDamageBonus === 'function' ? ability.getDamageBonus() : 1; },
      execute,
    };
  }

  return {
    register,
    getAllCodes,
    exists,
    lookup,
  };

})();
