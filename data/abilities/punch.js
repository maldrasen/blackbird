
// The punch is the simplest of the natural attack abilities, used by monsters that fight without weapons. The attack
// profile stands in for a base weapon in the attack contest.

const punchAttack = {
  skill: 'martial-arts',
  name: 'fist',
  textKey: 'punch',
  damageType: DamageType.crush,
  low: 25,
  high: 50,
  speed: 500,
  reach: WeaponReach.short,
};

Ability.register('punch', {
  name: 'Punch',
  category: 'physical',
  targetingMode: TargetingMode.enemyInWeaponRange,
  essence: 10,

  canBeUsed: () => {
    const round = BattleSystem.getRound();
    if (BattleSystem.getState().hasStatusEffect(round.getActing(),'hidden')) { return false; }
    return BattleHelper.isAttackWithinRange(punchAttack.reach,
      round.getActingPosition(),
      round.getTargetPosition());
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();

    const contest = PhysicalAttackContest(acting, target);
          contest.setNaturalAttack(punchAttack);
          contest.setAbility('punch');
          contest.roll();

    const attackRoll = contest.getAttackRoll();
    const context = { A:acting, T:target, hitLocation:attackRoll.getHitLocation() };
    const attackText = Dialog.lookupTemplate(DialogCategory.attackText, punchAttack.textKey, context);

    round.addMessage({ text:attackText }, Weaver(context));
    round.addTime(punchAttack.speed);

    contest.isHit() ?
      PhysicalAttackSystem.processHit(attackRoll, contest.getDefendRoll()):
      PhysicalAttackSystem.processMiss(attackRoll, contest.getDefendRoll());
  },
});
