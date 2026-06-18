// Skill checks can roll against one attribute, or an average of attributes.
// The attribute roll is then multiplied by the level and skill factor to
// get the final value.

/**
 * @function
 * @global
 * @param {string} id - Entity ID
 * @param {string} code - Skill code
 * @param {string} mode - RollMode:[normal, advantage, disadvantage]
 * @returns {{value: number, crit?: boolean, fumble?: boolean}}
 */
global.SkillCheck = function(id, code, mode=RollMode.normal) {
  const level = SkillsComponent.lookup(id)[code];
  const skill = Skill.lookup(code);

  function averageAttributes(attributes, attributeList) {
    let total = 0;

    attributeList.forEach(attribute => {
      total += attributes[attribute];
    });

    return Math.ceil(total / attributeList.length);
  }

  const average = averageAttributes(AttributesComponent.lookup(id), skill.getAttributes());
  const plus = Math.floor(average * 0.25);
  const rand = Math.ceil(average * 0.75);
  const factor = (1 + (level/100)) * skill.getFactor();

  // TODO: Hard code the crit and fumble chances for now. Eventually we'll have
  //       systems in place that can change these percentages.
  const critChance = 3;
  const fumbleChance = 3;

  function executeRoll() {
    const critRoll = Random.between(1,100);
    if (critRoll > 100-critChance) { return { value:(average*factor), crit:true }; }
    if (critRoll <= fumbleChance) { return { value:(plus*factor), fumble:true }; }
    return { value:(Random.between(1,rand) + plus) * factor };
  }

  if (mode === RollMode.advantage) {
    const roll1 = executeRoll();
    const roll2 = executeRoll();
    return roll1.value > roll2.value ? roll1 : roll2;
  }

  if (mode === RollMode.disadvantage) {
    const roll1 = executeRoll();
    const roll2 = executeRoll();
    return roll1.value < roll2.value ? roll1 : roll2;
  }

  return executeRoll();
}
