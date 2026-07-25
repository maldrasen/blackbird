global.DefendRoll = function(defender, attacker, attackRoll) {
  const state = BattleSystem.getState();
  const defendSkill = determineDefendSkill();

  // A defender with no equipment can only dodge. A character with a sword and shield will parry if they can. If a
  // character can't parry and has a shield they'll block.
  function determineDefendSkill() {
    if (EquipmentComponent.lookup(defender) == null) { return 'dodge'; }

    const equipment = EquipmentManager(defender);
    const hasSword = equipment.hasEquippedWeaponType('sword')
    const hasShield = equipment.getEquippedShield();
    const canParry = SkillsComponent.lookup(defender).parry > 0;
    const isRangedAttack = attackRoll.getBaseWeapon().getType() === 'bow';

    if (hasSword && canParry && !isRangedAttack) { return 'parry'; }
    if (hasShield) { return 'block'; }

    return 'dodge';
  }

  function rollDefendSkill() {
    const offBalance = state.hasStatusEffect(defender, 'off-balance');
    const poised = state.hasStatusEffect(defender, 'poised');
    const stunned = state.hasStatusEffect(defender, 'stun');

    if (offBalance && poised) {
      throw new Error(`Entity:${defender} is both poised and off-balance, which is not be allowed.`)
    }

    if (offBalance) { return SkillCheck(defender, defendSkill, RollMode.disadvantage); }
    if (poised) { return SkillCheck(defender, defendSkill, RollMode.advantage); }
    if (stunned) { return { value:0 }; }

    return SkillCheck(defender, defendSkill);
  }

  // TODO: This finalValue will have other modifiers that adjust its value.
  // TODO: We might nees to take armor enchantments into account here.

  const defendRoll = rollDefendSkill();
  let finalValue = defendRoll.value;

  Console.log(`Defend Roll [${defender}]`,{ system:'BattleSystem', level:3, data:{ defendRoll, finalValue }});

  return Object.freeze({
    getRollValue: () => { return defendRoll.value },
    getDefendSkill: () => { return defendSkill },
    isCrit: () => { return defendRoll.crit === true; },
    isFumble: () => { return defendRoll.fumble === true; },
    getFinalValue: () => { return finalValue },
  });
}
