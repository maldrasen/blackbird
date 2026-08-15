const beastBiteAttack = {
  skill: 'daggers',
  name: 'teeth',
  textKey: 'bite',
  damageType: DamageType.pierce,
  low: 25,
  high: 50,
  speed: 500,
  reach: WeaponReach.short,
};

Ability.register('beast-bite', {
  name: 'Bite',
  category: 'physical',
  targetingMode: TargetingMode.enemyInWeaponRange,
  essence: 10,

  canBeUsed: () => {
    const round = BattleSystem.getRound();
    if (StatusEffects(round.getActing()).has('hidden')) { return false; }
    return BattleHelper.isAttackWithinRange(beastBiteAttack.reach,
      round.getActingPosition(),
      round.getTargetPosition());
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();

    const contest = PhysicalAttackContest(acting, target);
          contest.setNaturalAttack(beastBiteAttack);
          contest.setAbility('beast-bite');
          contest.roll();

    const attackRoll = contest.getAttackRoll();
    const context = { A:acting, T:target, hitLocation:attackRoll.getHitLocation() };
    const attackText = Dialog.lookupTemplate(DialogCategory.attackText, beastBiteAttack.textKey, context);

    round.addMessage({ text:attackText }, Weaver(context));
    round.addTime(beastBiteAttack.speed);

    contest.isHit() ?
      PhysicalAttackSystem.processHit(attackRoll, contest.getDefendRoll()):
      PhysicalAttackSystem.processMiss(attackRoll, contest.getDefendRoll());
  },
});
