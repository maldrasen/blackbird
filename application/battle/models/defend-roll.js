global.DefendRoll = function(defender, attacker, attackRoll) {
  const state = BattleSystem.getState();
  const defendSkill = determineDefendSkill();

  function determineDefendSkill() {
    if (EquipmentComponent.lookup(defender) == null) { return 'dodge'; }

    const equipment = EquipmentManager(defender);
    const hasSword = equipment.hasEquippedWeaponType('sword')
    const hasShield = equipment.getEquippedShield();
    const canParry = attackRoll.isRangedAttack() === false && hasSword && SkillsComponent.lookup(defender).parry > 0

    if (hasShield && canParry) { return chooseDefenseSkill(defender); }
    if (canParry) { return 'parry'; }
    if (hasShield) { return 'block'; }

    return 'dodge';
  }

  // When a character can both block or parry an attack, they have a chance of doing either. A high strength character
  // will block more often and a high dex character will parry more often.
  function chooseDefenseSkill(defender) {
    const attributes = AttributesComponent.lookup(defender);
    return Random.fromFrequencyMap({
      parry: attributes.dexterity,
      block: attributes.strength,
    });
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
