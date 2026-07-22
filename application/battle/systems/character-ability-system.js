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

    if (canNegotiate(acting)) {
      abilities.push(BattleCommand.negotiate);
    }

    return abilities;
  }

  function canNegotiate(acting) {
    if (acting !== GameSystem.getState().getPlayer()) { return false; }
    if (BattleSystem.getState().hasAttemptedNegotiation()) { return false; }
    return livingMonsterCount() === 1;
  }

  function livingMonsterCount() {
    const state = BattleSystem.getState();
    return state.getActiveMonsters().length;
  }

  function stunned(acting) {
    return BattleSystem.getState().hasStatusEffect(acting,'stun');
  }

  return Object.freeze({
    getAbilities,
  });

})();
