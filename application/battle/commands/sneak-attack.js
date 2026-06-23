global.SneakAttack = (function() {

  function execute() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();
    const weapon = round.getPrimaryWeapon();
    const attackRoll = PhysicalAttackRoll(acting, target, weapon);
    const defendRoll = DefendRoll(target, acting, attackRoll);

    round.setTime(BaseWeapon.lookup(weapon.base).getSpeed());
    round.addMessage({ text:`Sneak Attack - {A:baseName} attacking {T:baseName}` });

    BattleSystem.getState().removeStatus(acting,'hidden');

    const actualHitValue = attackRoll.getFinalValue() * getSneakAttackAccuracyBonus(acting);
    if (actualHitValue > defendRoll.getFinalValue()) {
      PhysicalAttackSystem.processHit(attackRoll, defendRoll, { damageFactor:getSneakAttackDamageBonus(acting) });
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
    }
  }

  // TODO: Sneak attacks should get a bonus to accuracy and a bonus to damage. I'll represent these as factors rather
  //       than flat values so that they scale. I'm thinking a 50% accuracy and a 100% damage bonus seems reasonable.
  //       These are functions though because I'd like for the characters to have feats and abilities that add to
  //       these values. A high level rogue might be doing 4x damage with a sneak attack. These numbers might also
  //       depend on the weapon being used. To prevent sneak attacks with a maul maybe the damage multiplier increases
  //       with the weapon speed. Something to consider for the future I think.

  function getSneakAttackAccuracyBonus(acting) { return 1.5; }
  function getSneakAttackDamageBonus(acting) { return 2; }

  return Object.freeze({
    execute,
  });

})();