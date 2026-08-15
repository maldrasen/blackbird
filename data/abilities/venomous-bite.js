
// TODO: The venom power should eventually come from the base monster's ability definition.
const venomPower = 25;

const venomousBiteAttack = {
  skill: 'daggers',
  name: 'fangs',
  textKey: 'bite',
  damageType: DamageType.pierce,
  low: 25,
  high: 50,
  speed: 500,
  reach: WeaponReach.short,
};

Ability.register('venomous-bite', {
  name: 'Venomous Bite',
  category: 'physical',
  targetingMode: TargetingMode.enemyInWeaponRange,
  essence: 25,

  canBeUsed: () => {
    const round = BattleSystem.getRound();
    if (StatusEffects(round.getActing()).has('hidden')) { return false; }
    return BattleHelper.isAttackWithinRange(venomousBiteAttack.reach,
      round.getActingPosition(),
      round.getTargetPosition());
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();

    const contest = PhysicalAttackContest(acting, target);
          contest.setNaturalAttack(venomousBiteAttack);
          contest.setAbility('venomous-bite');
          contest.roll();

    const attackRoll = contest.getAttackRoll();
    const context = { A:acting, T:target, hitLocation:attackRoll.getHitLocation() };
    const attackText = Dialog.lookupTemplate(DialogCategory.attackText, venomousBiteAttack.textKey, context);

    round.addMessage({ text:attackText }, Weaver(context));
    round.addTime(venomousBiteAttack.speed);

    if (contest.isHit()) {
      addVenomEffect(target);
      PhysicalAttackSystem.processHit(attackRoll, contest.getDefendRoll());
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, contest.getDefendRoll());
    }
  },
});

// The venom takes hold when the target fails to resist it.
function addVenomEffect(target) {
  const resist = ResistRoll(target, DamageType.nature, venomPower);
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`Venom burns through {T:targetName's} veins.` });
    BattleSystem.addStatus(target, 'poison', { strength:venomPower });
  }
}
