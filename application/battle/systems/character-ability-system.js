global.CharacterAbilitySystem = (function() {

  // The codes of the commands the acting character can use this round. A character who can pass must pass.
  function getCommands() {
    return BattleCommand.lookup(BattleCommandCode.pass).isPossible() ? [BattleCommandCode.pass] :
      Object.values(BattleCommandCode).filter(code => BattleCommand.lookup(code).isPossible());
  }

  return {
    getCommands,
  };

})();
