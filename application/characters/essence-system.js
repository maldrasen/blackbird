global.EssenceSystem = (function() {

  // Essence Knobs
  const attributePowerExponent = 1.5;
  const essenceScale = 0.12;
  const abilityScale = 0.02;
  const healthEssenceWeight = 0.25;
  const speedEssenceWeight = 0.5;

  // Spell Knobs
  const damageEssenceScale = 0.045;
  const formationTargets = 3;
  const smallAreaTargets = 2;

  // Level Knobs
  const baseLevelCost = 250;
  const levelCostExponent = 1.1;
  const speciesCostExponent = 0.6;
  const baselineGradeTotal = 15;

  // ============================
  //    Monster Essence Values
  // ============================
  // A monster's essence value will be different for each monster as much of that value comes from their attributes
  // which are rolled randomly. This value is determined by their attributes and abilities. Attributes are worth more
  // as they determine the potency of the abilities. Even a monster without abilities, with only a basic attack can be
  // very dangerous, but a weak monster with lots of abilities is still weak. We also include the speed and health
  // factors as they can arbitrarily make a monster faster or tougher. A final bonus essence value can be given to
  // monsters that are just weirdly hard or easy for some reason.

  function monsterEssenceValue(monsterId) {
    const value = attributeFactor(monsterId) * abilityFactor(monsterId) * healthFactor(monsterId) * speedFactor(monsterId);
    return Math.round(value) + Monster(monsterId).getBaseMonster().getBonusEssence();
  }

  function healthFactor(monsterId) {
    return squeeze(Monster(monsterId).getBaseMonster().getHealthFactor(), healthEssenceWeight);
  }

  function speedFactor(monsterId) {
    const base = Monster(monsterId).getBaseMonster();
    const value = base.getSpecies() ? 1 : squeeze(base.getSpeedFactor(), speedEssenceWeight);
    return 1/value;
  }

  function squeeze(factor, weight) {
    return 1 + ((factor - 1) * weight);
  }

  function attributeFactor(monsterId) {
    const attributes = AttributesComponent.lookup(monsterId);
    const attributeSum = Object.keys(Attrib).reduce((sum,code) => sum + attributes[code], 0);
    return (attributeSum ** attributePowerExponent) * essenceScale;
  }

  function abilityFactor(monsterId) {
    const scoreSum = Monster(monsterId).getBaseMonster().getAbilities().reduce((sum, ability) => {
      return sum + (ability.getEssence() || 0);
    }, 0);

    return 1 + (scoreSum * abilityScale);
  }

  // An essence value set on the monster's ability entry wins over anything the record would calculate. Otherwise the
  // record gets the entry with the cooldown resolved the same way the battle resolves it, so a spell entry's cooldown
  // counts toward how often the spell can be cast.
  function abilityEntryBreakdown(base, key) {
    const entry = base.getAbilityMap()[key];
    if (entry.essence != null) { return { total:entry.essence, handSet:true }; }

    return Ability.lookup(entry.code).getEssenceBreakdown({ ...entry, cooldown:base.getAbilityCooldown(key) });
  }

  // ==================
  //   Effect Essence
  // ==================
  // An ability's essence comes from what its effects do to one target per use, scaled by how often it can be used.
  // Damage is weighted by the size of each hit as well as the damage per second, so an ability that lands its damage
  // in one burst is worth more than the same damage spread over several uses. A status effect is worth its type's
  // essence for the share of the fight it keeps a target covered, discounted by the chance it lands at all. The
  // breakdowns exist for the report, so the knobs can be tuned with every term in view. The spike is the average
  // damage of one use, which an attack supplies from its damage range instead of a damage effect.

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

  // ==================
  //   Attack Essence
  // ==================
  // A natural or weapon attack hits one target per swing, with the swing's speed as the period unless the cooldown is
  // longer. The effects are the status effects the attack applies when it hits, priced beside its damage.

  function attackEssenceBreakdown({ low, high, speed, cooldown, effects=[] }) {
    return effectsEssenceBreakdown({ effects, targets:1, period:periodBetweenUses(speed, cooldown), spike:(low + high) / 2 });
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

  // ========================
  //    Character Leveling
  // ========================

  function canLevelUp(characterId) {
    const experience = ExperienceComponent.lookup(characterId);
    return experience.essence >= essenceToLevel(characterId, 1);
  }

  function essenceToLevel(id, addLevels=0) {
    const grades = AttributeMath.attributeGrades(id);
    const experience = ExperienceComponent.lookup(id);
    const level = experience.level + addLevels;

    let total = 0;
    for (let i=2; i<=level; i++) { total += essenceNeededFor(i, grades); }
    return total;
  }

  function essenceNeededFor(level, grades) {
    return Math.round(baseLevelCost * ((level-1) ** levelCostExponent) * costFactor(grades));
  }

  function costFactor(grades) {
    return (gradeTotal(grades) / baselineGradeTotal) ** speciesCostExponent;
  }

  function gradeTotal(grades) {
    return Object.values(grades).reduce((sum,grade) => sum + LetterGradeHelper.attributeScore(grade), 0);
  }


  return {
    monsterEssenceValue,
    abilityEntryBreakdown,
    effectsEssenceBreakdown,
    attackEssenceBreakdown,
    spellEssenceBreakdown,
    canLevelUp,
    essenceToLevel,
  };

})();
