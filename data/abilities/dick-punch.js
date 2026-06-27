Ability.register('dick-punch',{
  name: 'Dick Punch',
  category: 'physical',
  needsTarget: true,

  canBeUsed: () => {
    const round = BattleSystem.getRound();
    const cock = CockComponent.lookupNormalOf(round.getTarget());
    return cock == null ? false : BattleHelper.isAttackWithinRange(WeaponReach.short,
      round.getActingPosition(),
      round.getTargetPosition());
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const state = BattleSystem.getState();
    const acting = round.getActing();
    const target = round.getTarget();
    const attackRoll = PhysicalAttackRoll(acting, target, round.getPrimaryWeapon(), EquipmentSlot.legs);
    const defendRoll = DefendRoll(target, acting, attackRoll);

    round.setTime(400);
    round.addMessage({ text:getAttackText() });
    state.setCooldown(acting, 'dick-punch', 800);

    if (attackRoll.getFinalValue() > defendRoll.getFinalValue()) {
      const armorFactor = getArmorFactor(target);
      const sizeFactor = getSizeFactor(CockComponent.lookupNormalOf(target).size);
      if (armorFactor === 1) { addStunEffect(acting,target); }
      PhysicalAttackSystem.processHit(attackRoll, defendRoll, { damageFactor:(armorFactor * sizeFactor) });
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
    }
  }

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

// TODO: We haven't actually implemented armor yet. When a character can have armor equipped though the leg armor
//       will reduce the ability's damage, beyond what the leg armor's normal damage reduction would be, especially if
//       it's made out of metal.

function getArmorFactor(target) {
  const pants = EquipmentManager(target).getSlot(EquipmentSlot.legs);
  if (pants == null) { return 1; }
  throw new Error(`Actually implement this.`);
}

// When the attack does full damage (i.e. there's no damage mitigation from the equipped armor) the dick punch adds a
// stun effect if the resistance roll is failed. The power of the stun effect is based on the attacking character's
// strength.
function addStunEffect(acting, target) {
  const resist = ResistRoll(target,DamageType.shock,AttributesComponent.createWrapper({ id:acting }).getStrength());
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`{S/tar}{T:baseName}{/S} groans and clutches {T:his} crotch, doubling over in pain.` });
    BattleSystem.getState().addStatus(BattleStatusEffect(target,'stun',{ duration:1 }));
  }
}

function getAttackText() {
  return `{S/act}{A:baseName}{/S} punches {S/tar}{T:baseName}{/S} in the dick.`
}
