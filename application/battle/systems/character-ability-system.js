global.CharacterAbilitySystem = (function() {

  function getAbilities() {
    const acting = BattleSystem.getRound().getActing();
    return Object.values(BattleCommand).filter(code => Ability.lookup(code).canBeUsed(acting));
  }

  return {
    getAbilities,
  };

})();
