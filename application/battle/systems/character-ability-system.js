global.CharacterAbilitySystem = (function() {

  function getAbilities() {
    const acting = BattleSystem.getRound().getActing();

    if (stunned(acting)) {
      return ['pass'];
    }

    const abilities = getAllAbilities(acting).filter(code => Ability.lookup(code).canBeUsed());

    console.log("Filtered:",abilities)

    return abilities
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
      // abilities.push('hide');
      // abilities.push('sneak-attack');
    }

    return abilities;
  }

  function stunned(acting) {
    return BattleSystem.getState().hasStatusEffect(acting,'stun');
  }

  // function canHide(situation) { return situation.isNotHidden && situation.isInBack && situation.hasHideSkill; }
  //
  // function getSituation(acting) {
  //   const state = BattleSystem.getState();
  //
  //   const situation = {
  //     state: state,
  //     isInFront: BattleSystem.getState().isInFront(acting),
  //     monstersInRange: TargetingController.getMonstersInRange(),
  //   }
  //
  //   situation.isNotHidden = situation.isHidden === false;
  //   situation.isInBack = situation.isInFront === false;
  //   situation.monstersAreInRange = situation.monstersInRange.length > 0;
  //
  //   return situation;
  // }

  return Object.freeze({
    getAbilities,
  })

})();
