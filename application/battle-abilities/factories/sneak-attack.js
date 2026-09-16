// A sneak attack is a single strike from hiding with the equipped weapon, landing more often and hitting harder than
// an open attack. Striking reveals the attacker: the stealth system drops the hidden status when the round ends.
//
// TODO: The bonuses are functions so that feats and abilities can add to them. A high level rogue might be doing 4x
//       damage with a sneak attack. They might also depend on the weapon: to prevent sneak attacks with a maul, the
//       damage multiplier could increase with the weapon's speed.
Ability.SneakAttack = function(options={}) {
  return Ability.SpecialAttack({
    name: 'Sneak Attack',
    targetingMode: TargetingMode.anyEnemy,
    essence: 25,
    priority: options.priority,
    isPossible: () => { return StatusEffects(BattleSystem.getRound().getActing()).hasHidden(); },
    getAccuracyBonus: () => { return 1.5; },
    getDamageBonus: () => { return 2; },
    getAttackText,
  });
}

// TODO: We'll need a lot more attack text for this ability.
function getAttackText(weapon, context) {
  const base = weapon.getBaseWeapon();
  const type = base.getType();
  const damageTypes = base.getDamageTypes().map(damageType => damageType.type);

  if (type === 'bow') { return Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-ranged', context); }
  if (damageTypes.includes(DamageType.pierce)) { return Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-pierce', context); }
  if (['axe','mace'].includes(type)) { return Dialog.lookupTemplate(DialogCategory.attackText, 'sneak-attack-swing', context); }

  return `[TODO: Sneak attack with ${base.getCode()}]`;
}
