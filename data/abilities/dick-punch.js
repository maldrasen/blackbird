Ability.register('dick-punch',{
  name: 'Dick Punch',
  type: AbilityType.physicalAttack,

  canBeUsed: () => {
    const round = BattleSystem.getRound();
    const cock = CockComponent.lookupNormalOf(round.getTarget());
    return cock == null ? false : BattleHelper.isAttackWithinRange(WeaponReach.short,
      round.getActingPosition(),
      round.getTargetPosition());
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();
    const attackRoll = PhysicalAttackRoll(acting, target, round.getPrimaryWeapon(), EquipmentSlot.legs);
    const defendRoll = DefendRoll(target, acting, attackRoll);

    round.setTime(500);
    round.addMessage({ text:'DICK PUNCH!' });

    if (attackRoll.getFinalValue() > defendRoll.getFinalValue()) {
      const armorFactor = getArmorFactor(target);
      const sizeFactor = getSizeFactor(CockComponent.lookupNormalOf(target).size);
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
