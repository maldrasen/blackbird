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

  // TODO: Hard code the crit and fumble chances for now. Eventually we'll have systems in place that can change
  //       these percentages.

  const critChance = 3;
  const fumbleChance = 3;

  // Any time a skill is used there's a chance the skill will improve. The chance for a skill to improve is inversely
  // proportional to the skill. A character with 10 points in a skill will have a 9% chance to improve the skill while
  // a character with 90 points in a skill should have a 1% chance to improve it. Each time a skill is improved it goes
  // up by a single point.

  // TODO: The training state will need a similar function as will any mode that has the possibility of a character
  //       using and improving their skills.

  function improveSkill() {
    const improveChance = Math.ceil((100 - level)/10);
    const improveRoll = Random.roll(100);

    if (improveRoll < improveChance) {
      const skills = SkillsComponent.lookup(id);
      const battleState = BattleSystem.getState();
      skills[code] = skills[code] + 1;
      SkillsComponent.update(id, skills);

      if (battleState) {
        battleState.skillImproved(id, code, skills[code]);
      }
    }
  }

  function executeRoll() {
    const critRoll = Random.between(1,100);
    if (critRoll > 100-critChance) { return { value:(average*factor), crit:true }; }
    if (critRoll <= fumbleChance) { return { value:(plus*factor), fumble:true }; }
    return { value:(Random.between(1,rand) + plus) * factor };
  }

  let result = executeRoll();

  if (mode === RollMode.advantage) {
    const advantage = executeRoll();
    result = result.value > advantage.value ? result : advantage;
  }
  if (mode === RollMode.disadvantage) {
    const disadvantage = executeRoll();
    result = disadvantage.value < result.value ? disadvantage : result;
  }

  if (level < 100) {
    improveSkill();
  }

  result.mode = mode;

  return result;
}
