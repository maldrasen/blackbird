global.ArticleAppraiser = (function() {

  // Article values sit on the same scale as the base weapons and armor, which run from roughly 200 to 1000. A
  // consumable is used once though, so a point of health restored or damage dealt is worth far less than a point of
  // weapon damage that can be dealt every second.
  const _healthValue = 1;
  const _manaValue = 3;
  const _damageValue = 1;
  const _potencyValue = 20;

  // Ammunition only adds a flat bonus to a shot the bow was making anyway, so a point of ammunition damage is worth
  // half a point of damage from a consumable that does its damage on its own.
  const _ammunitionDamageValue = 0.5;

  // A status effect is worth a base amount for every turn (turn count effects) or second (fixed time effects) that it
  // lasts. Only the effects that articles actually apply need a value, an unpriced effect is an error so that new
  // effects are priced deliberately rather than silently adding nothing.
  const _statusValues = {
    blind: 4,
    stun: 15,
  };

  // Articles are read only data objects, but the article values are calculated rather than set directly. The
  // appraiser runs at lead time to set the value of all the articles so that an article's getValue function can just
  // return a precalculated value. Once a value has been set by this loader it can't be overwritten.
  function run() {
    Article.getAllCodes().forEach(code => {
      Article.setValue(code, appraise(code));
    });
  }

  function appraise(code) {
    const article = Article.lookup(code);
    let value = article.getBaseValue() || 0;

    switch (article.getType()) {
      case ArticleType.ammunition: value += valueForAmmunition(code); break;
      case ArticleType.consumable: value += valueForConsumable(code); break;
    }

    return Math.ceil(value);
  }

  function valueForAmmunition(code) {
    const ammunition = Ammunition.lookup(code);
    return valueForDamageTypes(ammunition.getDamageTypes()) + valueForEffects(ammunition.getEffects());
  }

  function valueForDamageTypes(damageTypes) {
    return Object.values(damageTypes).reduce((total, range) => {
      return total + (((range.low + range.high) / 2) * _ammunitionDamageValue);
    }, 0);
  }

  function valueForConsumable(code) {
    const consumable = Consumable.lookup(code);
    return valueForEffects(consumable.getEffects()) * factorForArea(consumable.getTarget(), consumable.getAreaOfEffect())
  }

  function valueForEffects(effects) {
    return effects.reduce((total, effect) => total + valueForEffect(effect), 0);
  }

  function valueForEffect(effect) {
    switch (effect.type) {
      case 'restore-health': return ((effect.min + effect.max) / 2) * _healthValue;
      case 'restore-mana': return ((effect.min + effect.max) / 2) * _manaValue;
      case 'damage': return Random.averageDice(effect.damage) * _damageValue;
      case 'status-effect': return valueForStatusEffect(effect);
      case 'increase-potency': return effect.level * _potencyValue;
    }

    throw new Error(`Unsupported effect type [${effect.type}]`);
  }

  function valueForStatusEffect(effect) {
    if (_statusValues[effect.code] == null) {
      throw new Error(`No value has been set for the [${effect.code}] status effect.`);
    }
    return _statusValues[effect.code] * durationOfStatusEffect(effect) * landChance(effect.strength);
  }

  function durationOfStatusEffect(effect) {
    switch (StatusEffectType.lookup(effect.code).getDurationType()) {
      case StatusEffectDurationType.turnCount: return effect.count || 1;
      case StatusEffectDurationType.fixedTime: return effect.duration / 1000;
    }

    throw new Error(`Unsupported duration type for the [${effect.code}] status effect.`);
  }

  // The chance that an effect lands on a target with no resistance. This approximates the contest in ResistRoll, where
  // strength 0 is a coin flip and strength 100 lands about four times out of five.
  function landChance(strength) {
    return 0.5 + (0.5 * Math.tanh((strength || 0) / 150));
  }

  // An item that can be used on a single target is slightly more valuable than one that can only be used on yourself,
  // otherwise the factor is around the max number of people that this can hit. (Enemy formation is 8 instead of 10
  // because battles against full formations are rare, but hitting an entire side should still be very valuable)
  function factorForArea(target, areaOfEffect) {
    switch(target) {
      case EffectTarget.self: return 1;
      case EffectTarget.single: return 1.2;
      case EffectTarget.allyFormation: return 6;
      case EffectTarget.enemyFormation: return 8;
    }

    switch (areaOfEffect) {
      case AreaOfEffect.small: return 4;
      case AreaOfEffect.large: return 6;
    }

    throw new Error(`Unsupported area [${target}|${areaOfEffect}]`);
  }

  return {
    run,
    valueForEffects,
    valueForDamageTypes,
  }

})();
