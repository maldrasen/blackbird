global.ArticleAppraiser = (function() {

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
      case ArticleType.ammunition: value += valueForAmmunition(code);
      case ArticleType.consumable: value += valueForConsumable(code);
    }

    return Math.ceil(value);
  }

  // TODO: Ammo's value comes from damage types, and effects. (assume the same effects that consumables have. An
  //       arrow that could blind or stun for instance.)
  function valueForAmmunition(code) {
    const ammunition = Ammunition.lookup(code);
    return 0;
  }

  function valueForConsumable(code) {
    const consumable = Consumable.lookup(code);
    return valueForEffects(consumable.getEffects()) * factorForArea(consumable.getTarget(), consumable.getAreaOfEffect())
  }

  // TODO: Assign a value for each effect and return sum.
  function valueForEffects(effects) {}

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

  return { run }

})();