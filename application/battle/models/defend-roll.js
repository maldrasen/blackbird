global.DefendRoll = function(defender, attacker, attackRoll) {

  // TODO: Including the attacker and the attackRoll in the arguments because some defense abilities may trigger
  //       depending on things like the attacker's gender, or the hit location of the attack roll.

  // TODO: Change the defend skill to block if they have a shield equipped, or parry if they have a sword and the
  //       parry skill.

  const defendSkill = 'dodge';
  const defendRoll = SkillCheck(defender, defendSkill);

  let finalValue = defendRoll.value;
  let modifiers = [];

  return Object.freeze({
    getRollValue: () => { return defendRoll.value },
    getDefendSkill: () => { return defendSkill },
    isCrit: () => { return defendRoll.crit === true; },
    isFumble: () => { return defendRoll.fumble === true; },
    getFinalValue: () => { return finalValue },
    getModifiers: () => { return modifiers },
  });
}
