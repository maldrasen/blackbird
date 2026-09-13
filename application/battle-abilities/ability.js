let nextAbilityId = 0;

// TODO: I'm just calling this model ABILITY for now. The intent is to replace the Ability record. Once all the
//       references to Ability have been removed I can just search and replace this.
global.ABILITY = function() {
  const id = nextAbilityId++;

  let accuracyBonus = 1;
  let damageBonus = 1;
  let targetingMode = TargetingMode.anyEnemy;

  // TODO: Well send an ability though an AbilityAppraiser after it's been built.
  let essence = 0;

  return {
    getId: () => { return id; },
    setAccuracyBonus: factor => { accuracyBonus = factor; },
    getAccuracyBonus: () => { return accuracyBonus; }, // A factor used in the PhysicalAttackContest
    setDamageBonus: factor => { damageBonus = factor; },
    getDamageBonus: () => { return damageBonus; }, // A factor used by the damage roll.
    getEssence: () => { return essence; },
    setTargetingMode: mode => { targetingMode = mode; },
    getTargetingMode: () => { return targetingMode; }, // Used in PhysicalAttackRoll
  };

}
