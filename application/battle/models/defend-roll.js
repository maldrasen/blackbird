
// TODO: I'm including the attacker in the arguments because some defense abilities may need to look at the attacker's
//       attributes, such as an ability where they get a defense bonus against people who are less good looking, or a
//       defense penality against creatures that are much smaller than the defender.

global.DefendRoll = function(defender, attacker, attackRoll) {
  const defendSkill = determineDefendSkill();

  function determineDefendSkill() {
    if (EquipmentComponent.lookup(defender) == null) { return 'dodge'; }

    const equipment = EquipmentManager(defender);
    const hasSword = equipment.hasEquippedWeaponType('sword');
    const hasShield = equipment.getEquippedShield();
    const canParry = attackRoll.isRangedAttack() === false && hasSword && SkillsComponent.lookup(defender).parry > 0;

    if (hasShield && canParry) { return chooseDefenseSkill(defender); }
    if (canParry) { return 'parry'; }
    if (hasShield) { return 'block'; }

    return 'dodge';
  }

  // When a character can both block or parry an attack, they have a chance of doing either. A high strength character
  // will block more often and a high dex character will parry more often.
  function chooseDefenseSkill(defender) {
    const attributes = Attributes(defender);
    return Random.fromFrequencyMap({
      parry: attributes.getDexterity(),
      block: attributes.getStrength(),
    });
  }

  function rollDefendSkill() {
    const statusEffects = StatusEffects(defender);
    const offBalance = statusEffects.has('off-balance');
    const poised = statusEffects.has('poised');
    const stunned = statusEffects.has('stun');
    const blind = statusEffects.has('blind');

    if (offBalance && poised) {
      throw new Error(`Entity:${defender} is both poised and off-balance, which is not be allowed.`)
    }

    // A stunned character cannot defend.
    if (stunned) { return { value:0 }; }

    // A character that is both blind and poised is an odd situation, but one that makes narrative sense, unlike off
    // balance and poised. You can have both effects at the same time, but they simply cancel each other out.
    if (blind && poised) { return SkillCheck(defender, defendSkill); }

    if (poised) { return SkillCheck(defender, defendSkill, RollMode.advantage); }
    if (offBalance) { return SkillCheck(defender, defendSkill, RollMode.disadvantage); }
    if (blind) { return SkillCheck(defender, defendSkill, RollMode.disadvantage); }

    return SkillCheck(defender, defendSkill);
  }

  // TODO: This finalValue will have other modifiers that adjust its value.
  // TODO: We might nees to take armor enchantments into account here.

  const defendRoll = rollDefendSkill();
  let finalValue = defendRoll.value;

  Console.log(`Defend Roll [${defender}]`,{ system:'BattleSystem', level:3, data:{ defendRoll, finalValue }});

  return {
    getRollValue: () => { return defendRoll.value },
    getRollMode: () => { return defendRoll.mode || RollMode.normal },
    getDefendSkill: () => { return defendSkill },
    isCrit: () => { return defendRoll.crit === true; },
    isFumble: () => { return defendRoll.fumble === true; },
    getFinalValue: () => { return finalValue },
  };
}
