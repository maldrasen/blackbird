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

      if (round.isActingCharacter()) {
        BattleSystem.finishCharacterRound();
      }
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return ability.name },
      getCategory: () => { return ability.category },
      getTargetingMode: () => { return ability.targetingMode },
      getEssence: () => { return ability.essence || 0; },
      hasOverlay: () => { return typeof ability.overlay === 'function' },
      openOverlay: () => { ability.overlay() },
      canBeUsed: () => { return ability.canBeUsed(); },
      execute,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    exists,
    lookup,
  });

})();
