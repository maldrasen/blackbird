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
    const monster = Monster(monsterId);
    const scoreSum = Object.entries(monster.getAbilityMap()).reduce((sum,[key,entry]) => {
      return sum + (entry.essence != null ? entry.essence : abilityEssence(monster, key, entry));
    },0);

    return 1 + (scoreSum * abilityScale);
  }

  // An ability record that calculates its own essence gets the monster's entry, with the cooldown resolved the same
  // way the battle resolves it, so a spell entry's cooldown counts toward how often the spell can be cast.
  function abilityEssence(monster, key, entry) {
    return Ability.lookup(entry.code).getEssence({ ...entry, cooldown:monster.getAbilityCooldown(key) });
  }

  // =================
  //   Spell Essence
  // =================
  // A spell's essence comes from what it does to one target per cast, scaled by how often it can be cast. The period
  // between casts is the casting time plus the release, unless the entry's cooldown is longer. Damage is weighted by
  // the size of each hit as well as the damage per second, so a spell that lands its damage in one burst is worth
  // more than the same damage spread over several casts. A status effect is worth its type's essence for the share of
  // the fight it keeps a target covered, discounted by the chance it lands at all.

  function spellEssence(entry) {
    return spellEssenceBreakdown(entry).total;
  }

  // The breakdown is for the report, so the knobs can be tuned with every term in view.
  function spellEssenceBreakdown({ spell, powerLevel=1, cooldown=0 }) {
    const record = Spell.lookup(spell);
    const effects = record.getEffects(powerLevel);
    const period = Math.max(record.getCastingTime(powerLevel) + BattleConstants.spellReleaseTime, cooldown || 0);
    const targets = spellTargets(record);
    const spike = EffectMath.averageDamage(effects);
    const damage = damageEssence(effects, targets, period);
    const status = statusEssence(effects, targets, period);

    return { period, targets, spike, damage, status, total:damage + status };
  }

  function damageEssence(effects, targets, period) {
    const spike = EffectMath.averageDamage(effects);
    const dps = spike * targets / (period / 1000);
    return spike * dps * damageEssenceScale;
  }

  function statusEssence(effects, targets, period) {
    return effects.filter(effect => effect.type === 'status-effect').reduce((sum, effect) => {
      const type = StatusEffectType.lookup(effect.code);
      const uptime = Math.min(1, (EffectMath.statusDurationSeconds(effect) * 1000) / period);
      return sum + (type.getEssence() * EffectMath.landChance(effect.strength) * targets * uptime);
    }, 0);
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
    spellEssence,
    spellEssenceBreakdown,
    canLevelUp,
    essenceToLevel,
  };

})();
