global.AbilityAppraiser = (function() {

  const damageEssenceScale = 5;
  const spikeExponent = 0.35;

  // An ability's essence comes from what its effects do to one target per use, scaled by how often it can be used.
  // Damage is weighted by the size of each hit as well as the damage per second, so an ability that lands its damage
  // in one burst is worth somewhat more than the same damage spread over several uses. A status effect is worth its
  // type's essence for the share of the fight it keeps a target covered, discounted by the chance it lands at all.

  function run() {
    BaseMonster.getAllCodes().forEach(code => {
      BaseMonster.lookup(code).getAbilities().forEach(ability => {
        if (ability.getEssence() == null) { ability.appraise(); }
      });
    });
  }

  // ==================
  //   Attack Essence
  // ==================
  // Attack damage is based on a character's attributes, so rather than having a dice value like the spells an attack
  // has a [low,high] range which is a percentage applied to the attribute for that attack. Abilities such as a bite
  // attack still use the weapon skill (such as daggers) because the skill maps to which attribute to use and effects
  // the hit chance for that attack.
  //
  // Applicable NaturalAttack Options:
  //   - damage: in [low,high] format
  //   - speed
  //   - effects
  //   - cooldown
  //   - (reach?): An attack reach other than WeaponReach.short should give a flat essence bonus. Monsters that have
  //        long arms or a natural ranged should have more essence.
  //   - (targets?): Doesn't exist yet, but some natural attacks will have the ability to hit multiple targets. A
  //        'swipe' attack that hits the target and two neighbors for instance.
  function attackEssence(options) {
    console.log("Attack Essence Options:",options)
  }

  // =================
  //   Spell Essence
  // =================
  // The period between casts is the casting time plus the release, unless the entry's cooldown is longer.
  // Applicable CastSpell Options
  //   - spell
  //   - powerLevel
  //   - cooldown
  function spellEssence(options) {
    const spell = Spell.lookup(options.spell);
    const powerLevel = options.powerLevel || 1;
    const time = spell.getCastingTime(powerLevel) + BattleConstants.spellReleaseTime;
    const period = periodBetweenUses(time, options.cooldown || 0);

    return essenceForEffects(spell.getEffects(powerLevel), effectTargetCount(spell), period);
  }

  // A cooldown only matters when it outlasts the time the ability itself takes.
  function periodBetweenUses(time, cooldown) {
    return Math.max(time, cooldown||0);
  }

  // The formation count could really be anywhere between 1 and 10. Six seems like a reasonable average for a
  // formation size.
  function effectTargetCount(spell) {
    switch (spell.getTarget()) {
      case EffectTarget.self: return 1;
      case EffectTarget.single: return 1;
      case EffectTarget.allyFormation: return 6;
      case EffectTarget.enemyFormation: return 6;
      case EffectTarget.position: return areaTargetCount(spell.getAreaOfEffect());
      default: throw new Error(`No effect count for the [${spell.getTarget()}] effect target.`);
    }
  }

  function areaTargetCount(area) {
    switch (area) {
      case AreaOfEffect.single: return 1;
      case AreaOfEffect.small: return 3;
      case AreaOfEffect.large: return 6;
      default: throw new Error(`No target count for the [${area}] area of effect.`);
    }
  }

  // =============
  //    Effects
  // =============

  function essenceForEffects(effects, targets, period) {
    const spike = EffectMath.averageDamage(effects);
    const weight = spikeWeight(spike, targets, period);
    const status = statusEssence(effects, targets, period);
    return Math.round(weight + status);
  }

  // Hit size earns a premium over sustained damage, but a sublinear one.
  function spikeWeight(spike, targets, period) {
    const dps = (spike * targets) / (period / 1000);
    return dps * Math.pow(spike, spikeExponent) * damageEssenceScale;
  }

  function statusEssence(effects, targets, period) {
    return effects.filter(effect => effect.type === 'status-effect').reduce((sum, effect) => {
      const type = StatusEffectType.lookup(effect.code);
      const landChance = EffectMath.landChance(effect.strength);
      const uptime = Math.min(1, (EffectMath.statusDurationSeconds(effect) * 1000) / period);
      const coverage = type.getEssence() * targets * uptime;

      return sum + ((coverage + tickDamageEssence(effect, targets, period)) * landChance);
    }, 0);
  }

  // A damaging effect's expected damage over its whole life is priced as a single burst: once it has landed nothing
  // the victim does can dodge or armor it away.
  function tickDamageEssence(effect, targets, period) {
    if (effect.damage == null) { return 0; }
    const ticks = (EffectMath.statusDurationSeconds(effect) * 1000) / EffectMath.interval(effect);
    return spikeWeight(Random.averageDice(effect.damage) * ticks, targets, period);
  }

  return {
    run,
    attackEssence,
    spellEssence,
  };

})();
