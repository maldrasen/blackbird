global.Ability = (function() {
  const abilities = {};

  function register(code,data) { abilities[code] = data; }
  function getAllCodes() { return Object.keys(abilities); }
  function exists(code) { return abilities[code] != null; }

  function lookup(code) {
    if (abilities[code] == null) { throw new Error(`Bad ability code [${code}]`); }

    const ability = { ...abilities[code] };

    function execute({ key, data } = {}) {
      const round = BattleSystem.getRound();
      round.isActingMonster() ? round.setMonsterAbility(key) : round.setCharacterAbility(code, data);
      round.applyCooldown();
      ability.execute();

      if (round.isActingCharacter()) {
        BattleSystem.finishCharacterRound();
      }
    }

    // A record that calculates its essence returns the terms behind it for the ability essence report. A hand-set
    // value has no terms, only a total.
    function getEssenceBreakdown(entry) {
      return typeof ability.getEssenceBreakdown === 'function' ?
        ability.getEssenceBreakdown(entry) :
        { total:(ability.essence || 0), handSet:true };
    }

    return {
      getCode: () => { return code; },
      getName: () => { return ability.name },
      getCooldown: () => { return ability.cooldown; },
      getCategory: () => { return ability.category },
      getTargetingMode: () => { return ability.targetingMode },
      getEssence: entry => { return getEssenceBreakdown(entry).total; },
      getEssenceBreakdown,
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
