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

    if (acting === GameSystem.getState().getPlayer() && livingMonsterCount() === 1) {
      abilities.push(BattleCommand.negotiate);
    }

    return abilities;
  }

  function livingMonsterCount() {
    const state = BattleSystem.getState();
    return state.getMonsters().filter(id => state.isAlive(id)).length;
  }

  function stunned(acting) {
    return BattleSystem.getState().hasStatusEffect(acting,'stun');
  }

  return Object.freeze({
    getAbilities,
  });

})();
