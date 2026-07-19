global.EssenceSystem = (function() {

  // Balance tuning knobs. Essence is superlinear in a monster's attribute total, so a tougher statblock is worth
  // disproportionately more, with abilities amplifying that base as a percentage. Level costs are superlinear in
  // level to keep leveling slow, and sublinear in the species grade total: a high grade species pays more for a
  // level, but gains more from it, so given the same essence an elf slightly outpaces a human, and a human a kobold.
  const attributePowerExponent = 1.5;
  const essenceScale = 10;
  const baseLevelCost = 250;
  const levelCostExponent = 1.3;
  const speciesCostExponent = 0.6;
  const baselineGradeTotal = 15;

  function monsterEssenceValue(monsterId) {
    const attributes = AttributesComponent.lookup(monsterId);
    const attributeSum = Object.keys(Attrib).reduce((sum,code) => sum + attributes[code], 0);
    const attributePower = (attributeSum ** attributePowerExponent) / essenceScale;

    return Math.round(attributePower * abilityFactor(monsterId));
  }

  // Abilities amplify the attribute base rather than adding to it, because the attributes govern how potent the
  // abilities themselves are.
  function abilityFactor(monsterId) {
    const scoreSum = Monster(monsterId).getPrioritizedAbilities().reduce((sum,ability) => {
      return sum + Ability.lookup(ability.code).getEssence();
    },0);

    return 1 + (scoreSum / 100);
  }

  // The essence needed to advance from (level - 1) to level.
  function essenceToLevel(level, speciesCode) {
    return Math.round(baseLevelCost * (level ** levelCostExponent) * speciesCostFactor(speciesCode));
  }

  // The lifetime essence needed to reach the given level from level 0.
  function totalEssenceToLevel(level, speciesCode) {
    let total = 0;
    for (let i=1; i<=level; i++) { total += essenceToLevel(i,speciesCode); }
    return total;
  }

  function speciesCostFactor(speciesCode) {
    return (speciesGradeTotal(speciesCode) / baselineGradeTotal) ** speciesCostExponent;
  }

  function speciesGradeTotal(speciesCode) {
    const grades = Species.lookup(speciesCode).getAttributes();
    return Object.values(grades).reduce((sum,grade) => sum + LetterGradeHelper.gradeLevel(grade), 0);
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
