global.CharacterAbilitySystem = (function() {

  // A character who can pass must pass.
  function getAbilities() {
    return Ability.lookup(BattleCommandCode.pass).canBeUsed() ?
      [BattleCommandCode.pass]:
      Object.values(BattleCommandCode).filter(code => Ability.lookup(code).canBeUsed());
  }

  return {
    getAbilities,
  };

})();
