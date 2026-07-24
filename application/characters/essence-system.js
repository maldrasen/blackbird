global.EssenceSystem = (function() {

  // Essence Knobs
  // const attributePowerExponent = 1.5;

  // TEMP dev value
  const attributePowerExponent = 2.5;
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

  // ========================
  //    Character Leveling
  // ========================

  function totalEssenceToLevel(level, speciesCode) {
    let total = 0;
    for (let i=2; i<=level; i++) { total += essenceToLevel(i,speciesCode); }
    return total;
  }

  // The essence needed to reach this level from the level before it. Characters start at level 1, so the first level
  // is free.
  function essenceToLevel(level, speciesCode) {
    return Math.round(baseLevelCost * ((level-1) ** levelCostExponent) * speciesCostFactor(speciesCode));
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
    essenceToLevel,
    totalEssenceToLevel,
    speciesCostFactor,
    canLevelUp,
  });

})();
