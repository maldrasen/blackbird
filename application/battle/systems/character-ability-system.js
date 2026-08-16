global.CharacterAbilitySystem = (function() {

  // A character who can pass must pass.
  function getAbilities() {
    const acting = BattleSystem.getRound().getActing();
    return Ability.lookup(BattleCommand.pass).canBeUsed(acting) ?
      [BattleCommand.pass]:
      Object.values(BattleCommand).filter(code => Ability.lookup(code).canBeUsed(acting));
  }

  return {
    getAbilities,
  };

})();
