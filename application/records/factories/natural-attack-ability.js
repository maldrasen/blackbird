// Every natural attack shares a similar skeleton: check that the attacker isn't hidden (Monsters that are hidden must
// use a sneak attack variant in order to get the increased accuracy and damage) and that the target is in reach. The
// ability then runs a physical attack contest, describes the attack, adds the attack's time, and finally resolve the
// hit or miss. This factory builds that scaffolding so the ability records only carry what makes them different.
//
// NaturalAttackAbility.register('face-bite', {
//   name: 'Bite your face off',
//   essence: 100,
//   attack: {
//     skill: 'daggers',
//     name: 'fangs',
//     textKey: 'bite',
//     damage: [100,500],
//     damageType: DamageType.pierce,
//     speed: 2000,
//     reach: WeaponReach.short
//   },
//   onHit: (acting, target) => { addFaceRemovedEffect(target); },
// });
//
// The damage range, speed, and essence of a natural attack live on the acting monster's ability entry rather than
// the ability record, so that a kobold bite can be a different class of attack than a dragon bite:
//
//   prioritizedAbilities: [
//     { code:'beast-bite', priority:50, damage:[25,50], speed:1500, essence:50 },
//   ]
//
// The record's attack may still carry damage:[low,high] and speed values, which act as defaults for entries that
// don't set their own.
//
// Optional keys:
//     canTarget         An extra usability check on the target.
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
    const attack = getAttackProfile(code, options, acting);

    const contest = PhysicalAttackContest(acting, target);
          contest.setNaturalAttack(attack);
          contest.setAbility(code);
          contest.setHitLocation(options.hitLocation || null);
          contest.roll();

    const attackRoll = contest.getAttackRoll();
    const defendRoll = contest.getDefendRoll();
    const context = { A:acting, T:target, hitLocation:attackRoll.getHitLocation() };

    round.addMessage({ text:getAttackText(options, context) }, Weaver(context));
    round.addTime(attack.speed);

    if (options.cooldown) { BattleSystem.getState().setCooldown(acting, code, options.cooldown); }

    if (contest.isHit()) {
      if (options.onHit) { options.onHit(acting, target); }
      PhysicalAttackSystem.processHit(attackRoll, defendRoll);
    } else {
      PhysicalAttackSystem.processMiss(attackRoll, defendRoll);
    }
  }

  // The effective attack profile comes from the acting monster's ability entry, with the record's attack values
  // filling in anything the entry doesn't set.
  function getAttackProfile(code, options, acting) {
    const entry = Monster(acting).getAbility(code);
    const [low, high] = entry.damage || options.attack.damage || [];
    const speed = entry.speed || options.attack.speed;

    if (low == null || high == null) { throw new Error(`Ability[${code}] has no damage range for Monster[${Monster(acting).getCode()}]`); }
    if (speed == null) { throw new Error(`Ability[${code}] has no speed for Monster[${Monster(acting).getCode()}]`); }

    return { ...options.attack, low, high, speed };
  }

  function getAttackText(options, context) {
    return options.getAttackText ?
      options.getAttackText(context):
      Dialog.lookupTemplate(DialogCategory.attackText, options.attack.textKey, context);
  }

  return { register };

})();
