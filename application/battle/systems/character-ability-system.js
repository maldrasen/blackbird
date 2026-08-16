global.CharacterAbilitySystem = (function() {

  function getAbilities() {
    return Object.values(BattleCommand).filter(code => Ability.lookup(code).canBeUsed(BattleSystem.getRound().getActing()));
  }

  return {
    getAbilities,
  };

})();
