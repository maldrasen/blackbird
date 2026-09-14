let nextAbilityId = 0;

global.Ability = function(name) {
  const id = nextAbilityId++;

  let accuracyBonus = 1;
  let accuracyBonusFunction;
  let damageBonus = 1;
  let damageBonusFunction;
  let cooldown = 0;
  let possibleFunction;
  let executeFunction;
  let targetingMode = null;
  let essence;
  let priority = 50;
  let details = {};

  // Running an ability leaves the round open. A monster's round is finished by the BattleSystem after the
  // MonsterSystem's turn returns, and a character's by the command that built the ability.
  function execute() {
    if (executeFunction == null) { throw new Error(`Ability[${name}] has no execute function.`); }

    const round = BattleSystem.getRound();
    round.setAbility(ability);
    round.applyCooldown();
    executeFunction();
  }

  const ability = {
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
    setExecuteFunction: closure => { executeFunction = closure; },
    setTargetingMode: mode => { targetingMode = mode; },
    getTargetingMode: () => { return targetingMode; },
    setEssence: value => { essence = value },
    getEssence: () => { return essence; },
    setPriority: value => { priority = value; },
    getPriority: () => { return priority; },
    setDetails: value => { details = value; },
    getDetails: () => { return { ...details }; },
    execute,
  };

  return ability;
}
