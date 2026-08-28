global.Ability = (function() {
  const abilities = {};

  function register(code,data) { abilities[code] = data; }
  function getAllCodes() { return Object.keys(abilities); }
  function exists(code) { return abilities[code] != null; }

  function lookup(code) {
    if (abilities[code] == null) { throw new Error(`Bad ability code [${code}]`); }

    const ability = { ...abilities[code] };

    function execute() {
      const round = BattleSystem.getRound();
      round.setAbility(code);

      ability.execute();
      applyCooldown();

      if (round.isActingCharacter()) {
        BattleSystem.finishCharacterRound();
      }
    }

    function applyCooldown() {
      const round = BattleSystem.getRound();
      const monsterAbility = round.isActingMonster() ? round.getActingMonster().getAbility(code) : null;
      const cooldown = (monsterAbility ? monsterAbility.cooldown : null) || ability.cooldown;

      if (cooldown) {
        BattleSystem.getState().setCooldown(round.getActing(), code, cooldown);
      }
    }

    return {
      getCode: () => { return code; },
      getName: () => { return ability.name },
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
