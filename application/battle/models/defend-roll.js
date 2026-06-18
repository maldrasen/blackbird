global.DefendRoll = function(defender, attacker, attackRoll) {

  // TODO: Including the attacker and the attackRoll in the arguments because some defense abilities may trigger
  //       depending on things like the attacker's gender, or the hit location of the attack roll.

  // TODO: Change the defend skill to block if they have a shield equipped, or parry if they have a sword and the
  //       parry skill.

  const state = BattleSystem.getState();
  const defendSkill = 'dodge';
  const modifiers = [];

  function rollDefendSkill() {
    const offBalance = state.hasStatusEffect(defender, 'off-balance')
    const poised = state.hasStatusEffect(defender, 'poised')

    if (offBalance && poised) {
      throw new Error(`Entity:${defender} is both poised and off-balance, which is not be allowed.`)
    }

    if (offBalance) {
      const check = SkillCheck(defender, defendSkill, RollMode.disadvantage);
      modifiers.push(BattleHelper.compileSkillCheckRollData(defendSkill, check, RollMode.disadvantage));
      return check;
    }
    if (poised) {
      const check = SkillCheck(defender, defendSkill, RollMode.advantage);
      modifiers.push(BattleHelper.compileSkillCheckRollData(defendSkill, check, RollMode.advantage));
      return check;
    }

    const check = SkillCheck(defender, defendSkill);
    modifiers.push(BattleHelper.compileSkillCheckRollData(defendSkill, check));
    return check;
  }

  const defendRoll = rollDefendSkill();
  let finalValue = defendRoll.value;

  // TODO: This finalValue will have other modifiers that adjust its value.

  Console.log(`Defend Roll [${defender}]`,{ system:'BattleSystem', level:3, data:modifiers })

  return Object.freeze({
    getRollValue: () => { return defendRoll.value },
    getDefendSkill: () => { return defendSkill },
    isCrit: () => { return defendRoll.crit === true; },
    isFumble: () => { return defendRoll.fumble === true; },
    getFinalValue: () => { return finalValue },
    getModifiers: () => { return modifiers },
  });
}
