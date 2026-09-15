global.AbilityAppraiser = (function() {

  const damageEssenceScale = 5;
  const spikeExponent = 0.35;

  function run() {
    BaseMonster.getAllCodes().forEach(code => {
      BaseMonster.lookup(code).getAbilities().forEach(ability => {
        if (ability.getEssence() == null) { ability.appraise(); }
      });
    });
  }

  // An ability's essence comes from what its effects do to one target per use, scaled by how often it can be used.
  // Damage is weighted by the size of each hit as well as the damage per second, so an ability that lands its damage
  // in one burst is worth more than the same damage spread over several uses. A status effect is worth its type's
  // essence for the share of the fight it keeps a target covered, discounted by the chance it lands at all.


  // ==================
  //   Attack Essence
  // ==================
  // A natural or weapon attack hits one target per swing, with the swing's speed as the period unless the cooldown is
  // longer. The effects are the status effects the attack applies when it hits, priced beside its damage.

  // function attackEssenceBreakdown({ low, high, speed, cooldown, effects=[] }) {
  //   return effectsEssenceBreakdown({ effects, targets:1, period:cooldown, spike:(low + high) / 2 });
  // }



  // =================
  //   Spell Essence
  // =================
  // The period between casts is the casting time plus the release, unless the entry's cooldown is longer.

  function spellEssence(code, powerLevel=1, cooldown=0) {
    const spell = Spell.lookup(code);
    const time = spell.getCastingTime(powerLevel) + BattleConstants.spellReleaseTime;
    const period = periodBetweenUses(time, cooldown);

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

    console.log("  Period",period);
    console.log("  Spike Damage:",spike);
    console.log("  Weight:",weight);

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
    spellEssence,
  };

})();
