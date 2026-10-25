// Stateless calculations shared by everything that needs to size up an effect without applying it: item pricing and
// monster essence both ask how much damage an effect does on average, how likely a status effect is to land, and how
// long it lasts once it has.
global.EffectMath = (function() {

  function averageDamage(effects) {
    return effects.
      filter(effect => effect.type === 'damage').
      reduce((total, effect) => total + Random.averageDice(effect.damage), 0);
  }

  // The chance that an effect lands on a target with no resistance. This approximates the contest in ResistRoll, where
  // strength 0 is a coin flip and strength 100 lands about four times out of five.
  function landChance(strength) {
    return 0.5 + (0.5 * Math.tanh((strength || 0) / 150));
  }

  // A turn count effect is counted as a second per turn, which is close enough to a typical action time.
  function statusDurationSeconds(effect) {
    const type = StatusEffectType.lookup(effect.code);

    switch (type.getDurationType()) {
      case StatusEffectDurationType.turnCount: return effect.count || 1;
      case StatusEffectDurationType.fixedTime: return effect.duration / 1000;
      case StatusEffectDurationType.untilResisted: return expectedTicks(effect) * interval(effect) / 1000;
    }

    throw new Error(`Unsupported duration type for the [${effect.code}] status effect.`);
  }

  // An until-resisted effect always gets its first tick, then rolls to shrug itself off after every one at the
  // strength it was applied with, so each further tick is another roll the victim loses at the land chance.
  function expectedTicks(effect) {
    return 1 / (1 - landChance(effect.strength));
  }

  function interval(effect) {
    const value = effect.interval != null ? effect.interval : StatusEffectType.lookup(effect.code).getInterval();
    if (value == null) { throw new Error(`The [${effect.code}] status effect has no interval.`); }
    return value;
  }

  // The damage a status effect is expected to do over its whole life. An effect without damage dice does none.
  function expectedTickDamage(effect) {
    if (effect.damage == null) { return 0; }
    const ticks = (statusDurationSeconds(effect) * 1000) / interval(effect);
    return Random.averageDice(effect.damage) * ticks;
  }

  return {
    averageDamage,
    landChance,
    statusDurationSeconds,
    expectedTicks,
    expectedTickDamage,
    interval,
  };

})();
