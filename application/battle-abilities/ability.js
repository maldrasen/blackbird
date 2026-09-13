let nextAbilityId = 0;

// TODO: I'm just calling this model ABILITY for now. The intent is to replace the Ability record. Once all the
//       references to Ability have been removed I can just search and replace this.
global.Ability = function(name) {
  const id = nextAbilityId++;

  let accuracyBonus = 1;
  let accuracyBonusFunction;
  let damageBonus = 1;
  let damageBonusFunction;
  let cooldown = 0;
  let possibleFunction; // Possible is a better name than canBeUsed I think.
  let targetingMode = TargetingMode.anyEnemy;

  // TODO: Well send an ability though an AbilityAppraiser after it's been built. The ability shouldn't need an essence
  //       breakdown after its been calculated.
  let essence = 0;

  // TODO: Execute will do basically the same thing.
  function execute({ key, data } = {}) {
    const round = BattleSystem.getRound();
    round.isActingMonster() ? round.setMonsterAbility(key) : round.setCharacterAbility(code, data);
    round.applyCooldown();
    ability.execute();

    if (round.isActingCharacter()) {
      BattleSystem.finishCharacterRound();
    }
  }

  return {
    getId: () => { return id; },
    getName: () => { return name },

    setAccuracyBonusFunction: closure => { accuracyBonusFunction = closure; },
    setAccuracyBonus: factor => { accuracyBonus = factor; },
    getAccuracyBonus: () => { return accuracyBonusFunction ? accuracyBonusFunction() : accuracyBonus; },
    setDamageBonusFunction: closure => { damageBonusFunction = closure; },
    setDamageBonus: factor => { damageBonus = factor; },
    getDamageBonus: () => { return damageBonusFunction ? damageBonusFunction() : damageBonus; },
    setCooldown: time => { cooldown = time; },
    getCooldown: () => { return cooldown; },
    setPossibleFunction: closure => { possibleFunction = closure; },
    isPossible: () => { return possibleFunction ? possibleFunction() : true; },
    setTargetingMode: mode => { targetingMode = mode; },
    getTargetingMode: () => { return targetingMode; },
    getEssence: () => { return essence; },
    execute,
  };

}
