global.DefendRoll = function(defender, attacker, attackRoll) {

  // TODO: Including the attacker and the attackRoll in the arguments because some defense abilities may trigger
  //       depending on things like the attacker's gender, or the hit location of the attack roll.

  const state = BattleSystem.getState();

  // Arrows cannot be parried or blocked. Spells and grapples can't either, but neither exists in this attack pipeline
  // yet. Monsters carry no equipment, so they always dodge, even when their attack data includes a shield.
  function determineDefendSkill() {
    if (attackRoll.getBaseWeapon().getType() === 'bow') { return 'dodge'; }
    if (EquipmentComponent.lookup(defender) == null) { return 'dodge'; }

    const equipment = EquipmentManager(defender);
    if (equipment.getEquippedShield()) { return 'block'; }
    if (equipment.hasEquippedWeaponType('sword') && isParryTrained()) { return 'parry'; }
    return 'dodge';
  }

  function isParryTrained() {
    return SkillsComponent.lookup(defender).parry > 0;
  }

  const defendSkill = determineDefendSkill();

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
