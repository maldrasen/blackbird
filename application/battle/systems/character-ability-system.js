global.CharacterAbilitySystem = (function() {

  // A character who can pass must pass.
  function getAbilities() {
    return Ability.lookup(BattleCommand.pass).canBeUsed() ?
      [BattleCommand.pass]:
      Object.values(BattleCommand).filter(code => Ability.lookup(code).canBeUsed());
  }

  return {
    getAbilities,
  };

})();
