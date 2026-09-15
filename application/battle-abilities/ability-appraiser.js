global.AbilityAppraiser = (function() {

  // Spell Knobs
  const damageEssenceScale = 0.045;
  const formationTargets = 3;
  const smallAreaTargets = 2;

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

  function appraise(ability) {
    console.log(`=== Appraise ${ability.getName()} ===`);

    const cooldown = ability.getCooldown();
    // Hmm... how do I get the profile from an ability now?

    // const period = periodBetweenUses(speed, cooldown);

    ability.setEssence(0);
  }

  // ==================
  //   Attack Essence
  // ==================
  // A natural or weapon attack hits one target per swing, with the swing's speed as the period unless the cooldown is
  // longer. The effects are the status effects the attack applies when it hits, priced beside its damage.

  // function attackEssenceBreakdown({ low, high, speed, cooldown, effects=[] }) {
  //   return effectsEssenceBreakdown({ effects, targets:1, period:, spike:(low + high) / 2 });
  // }





// A record that calculates its essence returns the terms behind it for the ability essence report. A hand-set
// value has no terms, only a total.
// function getEssenceBreakdown(entry) {
//   return typeof ability.getEssenceBreakdown === 'function' ?
//     ability.getEssenceBreakdown(entry) :
//     { total:(ability.essence || 0), handSet:true };
// }
  // An essence value set on the monster's ability entry wins over anything the record would calculate. Otherwise the
  // record gets the entry with the cooldown resolved the same way the battle resolves it, so a spell entry's cooldown
  // counts toward how often the spell can be cast.
  // function abilityEntryBreakdown(base, key) {
  //   const entry = base.getAbilityMap()[key];
  //   if (entry.essence != null) { return { total:entry.essence, handSet:true }; }
  //
  //   return Ability.lookup(entry.code).getEssenceBreakdown({ ...entry, cooldown:base.getAbilityCooldown(key) });
  // }


/*


  function effectsEssenceBreakdown({ effects, targets, period, spike=EffectMath.averageDamage(effects) }) {
    const damage = burstEssence(spike, targets, period);
    const status = statusEssence(effects, targets, period);

    return { period, targets, spike, damage, status, total:damage + status };
  }

  // A cooldown only matters when it outlasts the time the ability itself takes.
  function periodBetweenUses(useTime, cooldown) {
    return Math.max(useTime, cooldown || 0);
  }

  function burstEssence(spike, targets, period) {
    const dps = spike * targets / (period / 1000);
    return spike * dps * damageEssenceScale;
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
    return burstEssence(Random.averageDice(effect.damage) * ticks, targets, period);
  }


  // =================
  //   Spell Essence
  // =================
  // The period between casts is the casting time plus the release, unless the entry's cooldown is longer.

  function spellEssenceBreakdown({ spell, powerLevel=1, cooldown }) {
    const record = Spell.lookup(spell);
    const period = periodBetweenUses(record.getCastingTime(powerLevel) + BattleConstants.spellReleaseTime, cooldown);

    return effectsEssenceBreakdown({ effects:record.getEffects(powerLevel), targets:spellTargets(record), period });
  }

  // A spell cast on the monster's own side isn't a threat the player has to survive, at least not yet.
  function spellTargets(record) {
    switch (record.getTarget()) {
      case EffectTarget.single: return 1;
      case EffectTarget.enemyFormation: return formationTargets;
      case EffectTarget.position: return areaTargets(record.getAreaOfEffect());
      default: return 0;
    }
  }

  function areaTargets(area) {
    if (area === AreaOfEffect.small) { return smallAreaTargets; }
    throw new Error(`No target count for the [${area}] area of effect.`);
  }
*/

  return {
    run,
  };

})();
