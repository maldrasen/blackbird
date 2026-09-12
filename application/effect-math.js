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
      case StatusEffectDurationType.untilResisted: return expectedTicks(effect) * intervalOf(effect, type) / 1000;
    }

    throw new Error(`Unsupported duration type for the [${effect.code}] status effect.`);
  }

  // An until-resisted effect always gets its first tick, then rolls to shrug itself off after every one at the
  // strength it was applied with, so each further tick is another roll the victim loses at the land chance.
  function expectedTicks(effect) {
    return 1 / (1 - landChance(effect.strength));
  }

  function intervalOf(effect, type) {
    const interval = effect.interval != null ? effect.interval : type.getInterval();
    if (interval == null) { throw new Error(`The [${effect.code}] status effect has no interval.`); }
    return interval;
  }

  return {
    averageDamage,
    landChance,
    statusDurationSeconds,
    expectedTicks,
  };

})();
