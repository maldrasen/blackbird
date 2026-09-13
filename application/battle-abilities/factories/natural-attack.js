ABILITY.NaturalAttack = function(options) {
  const ability = ABILITY();

  return ability;
}

/*
TODO: Determine what options are needed to express all natural attacks.

attack: {
  skill: 'daggers',
    textKey: 'bite',
    damageType: DamageType.pierce,
    reach: WeaponReach.short,
},
name: 'Dick Punch',
  essence: 75,
  attack: {
  skill: 'martial-arts',
    textKey: 'punch',
    damage: [25,50],
    damageType: DamageType.crush,
    speed: 500,
    reach: WeaponReach.short,
},

hitLocation: EquipmentSlot.legs,
  cooldown: 1000,

  canTarget: target => { return CockComponent.lookupNormalOf(target) != null; },
  getAttackText: () => { return `{A:ActingName} punches {T:targetName} in the dick.`; },

  onHit: (acting, target) => {
  if (getArmorFactor(target) > 0.5) { addStunEffect(acting, target); }
},

  getDamageBonus: () => {
  const target = BattleSystem.getRound().getTarget();
  const sizeFactor = getSizeFactor(CockComponent.lookupNormalOf(target).size);
  return getArmorFactor(target) * sizeFactor;
},
  attack: {
  skill: 'daggers',
    textKey: 'leap-claw',
    damageType: DamageType.slash,
    reach: WeaponReach.short,
},
attack: {
  skill: 'martial-arts',
    textKey: 'punch',
    damageType: DamageType.crush,
    reach: WeaponReach.short,
},
attack: {
  skill: 'daggers',
    textKey: 'bite',
    damageType: DamageType.pierce,
    reach: WeaponReach.short,
},

cooldown: 2500,
  getEffects: entry => { return [venom(entry)]; },
  messageForEntity: (target, results) => { return results.poison ? `Venom burns through {T:targetName's} veins!` : null; },
*/
