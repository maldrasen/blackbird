
// A dick punch is always thrown with a fist, whatever the attacker might be holding.

NaturalAttackAbility.register('dick-punch', {
  name: 'Dick Punch',
  essence: 50,
  attack: {
    skill: 'martial-arts',
    name: 'fist',
    textKey: 'punch',
    damageType: DamageType.crush,
    low: 25,
    high: 50,
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

  getDamageBonus: acting => {
    const target = BattleSystem.getRound().getTarget();
    const sizeFactor = getSizeFactor(CockComponent.lookupNormalOf(target).size);
    return getArmorFactor(target) * sizeFactor;
  },
});

// Dick punch does extra damage to larger cocks, based on the cock size category rather than absolute length.
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

// The dick punch ability does dramatically reduced damage to someone wearing metal pants. Metal pants also remove
// the stun effect. Other materials, like leather and cloth will reduce the damage somewhat, but keeps the stun
// effect. This does full damage to someone without pants, making this ability very effective against large naked
// monsters.
function getArmorFactor(target) {
  const pants = EquipmentManager(target).getSlot(EquipmentSlot.legs);
  if (pants == null) { return 1; }
  return Armor(pants).isMetal() ? 0.25 : 0.75;
}

// The dick punch can add a stun effect if the resistance roll is failed. The power of the stun effect is based on the
// attacking character's strength.
function addStunEffect(acting, target) {
  const resist = ResistRoll(target, DamageType.shock, Attributes(acting).getStrength());
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`{T:targetName} groans and clutches {T:his} crotch, doubling over in pain.` });
    BattleSystem.addStatus(target,'stun',{ count:1 });
  }
}

// TODO: We need some ball crushingly vivid attack text here. The attack text also needs to describe how the attack
//       wasn't effective if the defender is wearing metal pants, or only partly effective if they're wearing any
//       pants.
