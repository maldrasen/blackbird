global.EssenceSystem = (function() {

  // Essence Knobs
  const attributePowerExponent = 1.5;
  const essenceScale = 0.12;
  const abilityScale = 0.02;

  // Level Knobs
  const baseLevelCost = 250;
  const levelCostExponent = 1.1;
  const speciesCostExponent = 0.6;
  const baselineGradeTotal = 15;

  // ============================
  //    Monster Essence Values
  // ============================

  // A monster's essence value is determined by their attributes and abilities. Attributes are worth more as they
  // determine the potency of the abilities. Even a monster without abilities, with only a basic attack can be very
  // dangerous, but a weak monster with lots of abilities is still weak.
  function monsterEssenceValue(monsterId) {
    return Math.round(attributeFactor(monsterId) * abilityFactor(monsterId));
  }

  function attributeFactor(monsterId) {
    const attributes = AttributesComponent.lookup(monsterId);
    const attributeSum = Object.keys(Attrib).reduce((sum,code) => sum + attributes[code], 0);
    return (attributeSum ** attributePowerExponent) * essenceScale;
  }

  function abilityFactor(monsterId) {
    const scoreSum = Monster(monsterId).getPrioritizedAbilities().reduce((sum,ability) => {
      return sum + Ability.lookup(ability.code).getEssence();
    },0);

    return 1 + (scoreSum * abilityScale);
  }

  // The essence from the battle's dead pile is split evenly among the surviving party members, discarding any
  // remainder. Must be called before the battle state cleanup deletes the dead monsters from the registry.
  // function awardBattleEssence(deadPile, survivors) {
  //   const total = deadPile.reduce((sum,id) => sum + monsterEssenceValue(id), 0);
  //   const share = survivors.length === 0 ? 0 : Math.floor(total / survivors.length);
  //   const awards = {};
  //
  //   survivors.forEach(id => {
  //     awards[id] = share;
  //     if (share === 0) { return; }
  //
  //     const experience = ExperienceComponent.lookup(id);
  //     experience.essence += share;
  //     ExperienceComponent.update(id, experience);
  //   });
  //
  //   return { total, share, awards };
  // }

  // ========================
  //    Character Leveling
  // ========================

  function totalEssenceToLevel(level, speciesCode) {
    let total = 0;
    for (let i=1; i<=level; i++) { total += essenceToLevel(i,speciesCode); }
    return total;
  }

  function essenceToLevel(level, speciesCode) {
    return Math.round(baseLevelCost * (level ** levelCostExponent) * speciesCostFactor(speciesCode));
  }

  function speciesCostFactor(speciesCode) {
    return (speciesGradeTotal(speciesCode) / baselineGradeTotal) ** speciesCostExponent;
  }

  function speciesGradeTotal(speciesCode) {
    const grades = Species.lookup(speciesCode).getAttributes();
    return Object.values(grades).reduce((sum,grade) => sum + LetterGradeHelper.attributeScore(grade), 0);
  }

  function canLevelUp(characterId) {
    const experience = ExperienceComponent.lookup(characterId);
    const species = ActorComponent.lookup(characterId).species;

    return experience.essence >= totalEssenceToLevel(experience.level + 1, species);
  }

  return Object.freeze({
    monsterEssenceValue,
    // awardBattleEssence,
    essenceToLevel,
    totalEssenceToLevel,
    speciesCostFactor,
    canLevelUp,
  });

})();
