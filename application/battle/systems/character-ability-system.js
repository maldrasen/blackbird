global.CharacterAbilitySystem = (function() {

  function getAbilities() {
    const acting = BattleSystem.getRound().getActing();
    if (stunned(acting)) { return ['pass']; }
    return getAllAbilities(acting).filter(code => Ability.lookup(code).canBeUsed());
  }

  function getAllAbilities(acting) {
    const skills = SkillsComponent.lookup(acting);

    const abilities = [
      'basic-attack',
      'basic-defend',
      'change-equipment',
      'use-item',
    ]

    if (skills.stealth > 0) {
      abilities.push('hide');
      abilities.push('sneak-attack');
    }

    return abilities;
  }

  function stunned(acting) {
    return BattleSystem.getState().hasStatusEffect(acting,'stun');
  }

  return Object.freeze({
    getAbilities,
  });

})();
