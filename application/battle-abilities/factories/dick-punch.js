// The dick punch does dramatically reduced damage to someone wearing metal pants, which also stop the stun. Softer
// pants, like leather and cloth, reduce the damage somewhat but keep the stun. It does full damage to someone without
// pants, making it very effective against big naked men. The essence is hand-set because none of that can be priced
// from plain data.
//
// TODO: We need some ball crushingly vivid attack text here. The attack text also needs to describe how the attack
//       wasn't effective if the defender is wearing metal pants, or only partly effective if they're wearing any
//       pants.
Ability.DickPunch = function(options={}) {
  return Ability.NaturalAttack({
    name: 'Dick Punch',
    priority: options.priority,
    essence: 75,
    skill: 'martial-arts',
    textKey: 'punch',
    damageType: DamageType.crush,
    reach: WeaponReach.short,
    damage: [25,50],
    speed: 500,
    hitLocation: EquipmentSlot.legs,
    cooldown: 1000,
    canTarget: target => { return CockComponent.lookupNormalOf(target) != null; },
    getAttackText: () => { return `{A:ActingName} punches {T:targetName} in the dick.`; },
    onHit: (acting, target) => { if (getArmorFactor(target) > 0.5) { addStunEffect(acting, target); } },
    getDamageBonus: () => {
      const target = BattleSystem.getRound().getTarget();
      return getArmorFactor(target) * getSizeFactor(CockComponent.lookupNormalOf(target).size);
    },
  });
}

// Extra damage to larger cocks, by size category rather than absolute length.
function getSizeFactor(size) {
  return {
    tiny:    1,
    small:   1.1,
    average: 1.2,
    big:     1.4,
    huge:    1.6,
    monster: 1.8,
    giant:   2,
    titanic: 3,
  }[size];
}

function getArmorFactor(target) {
  const pants = EquipmentManager(target).getSlot(EquipmentSlot.legs);
  if (pants == null) { return 1; }
  return Armor(pants).isMetal() ? 0.25 : 0.75;
}

// The stun's power is the attacker's strength.
function addStunEffect(acting, target) {
  const resist = ResistRoll(target, DamageType.shock, Attributes(acting).getStrength());
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`{T:targetName} groans and clutches {T:his} crotch, doubling over in pain.` });
    BattleSystem.addStatus(target, 'stun', { count:1 });
  }
}
