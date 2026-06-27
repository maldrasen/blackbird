global.Ability = (function() {
  const abilities = {};

  function register(code,data) { abilities[code] = data; }
  function getAllCodes() { return Object.keys(abilities); }
  function exists(code) { return abilities[code] != null; }

  function lookup(code) {
    if (abilities[code] == null) { throw new Error(`Bad ability code [${code}]`); }

    const ability = { ...abilities[code] };

    function execute() {
      ability.execute();

      if (BattleSystem.getRound().isActingCharacter()) {
        BattleSystem.finishCharacterRound();
      }
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return ability.name },
      getType: () => { return ability.type },
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
