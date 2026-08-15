
// A natural attack ability - a punch, a bite, a claw - is an unarmed strike an entity makes with part of its body
// instead of an equipped weapon. Every one of them shares the same skeleton: check that the attacker isn't hidden
// and that the target is in reach, run a physical attack contest against a NaturalAttack profile, describe the
// strike, spend the attack's time, then resolve the hit or the miss. This factory owns that skeleton so the ability
// records only carry what makes them different.
//
//     NaturalAttackAbility.register('venomous-bite', {
//       name: 'Venomous Bite',
//       essence: 25,
//       attack: { skill:'daggers', name:'fangs', textKey:'bite', damageType:DamageType.pierce,
//                 low:25, high:50, speed:500, reach:WeaponReach.short },
//       onHit: (acting, target) => { addVenomEffect(target); },
//     });
//
// Optional keys:
//     canTarget         An extra usability check on the target, beyond reach.
//     hitLocation       Forces the strike to a location instead of rolling one.
//     cooldown          Milliseconds before the attacker can use the ability again.
//     onHit             Called with (acting, target) before the hit is processed.
//     getAttackText     Called with the weaver context in place of the attack text template lookup.
//     getAccuracyBonus  Passed through to the ability record.
//     getDamageBonus    Passed through to the ability record.
//
global.NaturalAttackAbility = (function() {

  function register(code, options) {
    Validate.isString(`${code}.name`, options.name);
    Validate.isNumber(`${code}.essence`, options.essence);
    Validate.exists(`${code}.attack`, options.attack);

    Ability.register(code, {
      name: options.name,
      category: 'physical',
      targetingMode: TargetingMode.enemyInWeaponRange,
      essence: options.essence,
      canBeUsed: () => canBeUsed(options),
      execute: () => execute(code, options),
      getAccuracyBonus: options.getAccuracyBonus,
      getDamageBonus: options.getDamageBonus,
    });
  }

  // A hidden attacker can't make a natural attack - they strike from hiding with a sneak attack instead.
  function canBeUsed(options) {
    const round = BattleSystem.getRound();

    if (StatusEffects(round.getActing()).has('hidden')) { return false; }
    if (options.canTarget && options.canTarget(round.getTarget()) === false) { return false; }

    return BattleHelper.isAttackWithinRange(options.attack.reach,
      round.getActingPosition(),
      round.getTargetPosition());
  }

  function execute(code, options) {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();

    const contest = PhysicalAttackContest(acting, target);
          contest.setNaturalAttack(options.attack);
          contest.setAbility(code);
          contest.setHitLocation(options.hitLocation || null);
          contest.roll();

    const attackRoll = contest.getAttackRoll();
    const defendRoll = contest.getDefendRoll();
    const context = { A:acting, T:target, hitLocation:attackRoll.getHitLocation() };

    round.addMessage({ text:getAttackText(options, context) }, Weaver(context));
    round.addTime(options.attack.speed);

    if (options.cooldown) { BattleSystem.getState().setCooldown(acting, code, options.cooldown); }

    if (contest.isHit()) {
      if (options.onHit) { options.onHit(acting, target); }
      PhysicalAttackSystem.processHit(attackRoll, defendRoll);
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
    }
  }

  function getAttackText(options, context) {
    return options.getAttackText ?
      options.getAttackText(context):
      Dialog.lookupTemplate(DialogCategory.attackText, options.attack.textKey, context);
  }

  return {
    register,
  };

})();
