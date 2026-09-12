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
    switch (StatusEffectType.lookup(effect.code).getDurationType()) {
      case StatusEffectDurationType.turnCount: return effect.count || 1;
      case StatusEffectDurationType.fixedTime: return effect.duration / 1000;
    }

    throw new Error(`Unsupported duration type for the [${effect.code}] status effect.`);
  }

  return {
    averageDamage,
    landChance,
    statusDurationSeconds,
  };

})();
