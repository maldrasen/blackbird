global.CharacterAbilitySystem = (function() {

  // The codes of the commands the acting character can use this round. A character who can pass must pass.
  function getCommands() {
    return BattleCommand.lookup(StandardAbility.pass).isPossible() ? [StandardAbility.pass] :
      Object.values(StandardAbility).filter(code => BattleCommand.lookup(code).isPossible());
  }

  return {
    getCommands,
  };

})();
