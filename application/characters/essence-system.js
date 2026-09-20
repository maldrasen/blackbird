global.EssenceSystem = (function() {

  // Essence Knobs
  const essenceScale = 10;

  // Level Knobs
  const baseLevelCost = 250;
  const levelCostExponent = 1.1;
  const speciesCostExponent = 0.6;
  const baselineGradeTotal = 15;

  // ============================
  //    Monster Essence Values
  // ============================
  // A monster is worth what its abilities can do, priced for its own attributes, scaled by how tough and how quick it
  // is. Weapons and carried articles are not part of the monster and aren't priced here (task 220).

  function monsterEssenceValue(id) {
    const base = Monster(id).getBaseMonster();
    const root = abilityTotal(base, Attributes(id)) + base.getBonusEssence();
    return Math.round(root * base.getEssenceScale());
  }

  function abilityTotal(base, attributes) {
    return base.getAbilities().reduce((sum, ability) => { return sum + ability.getEssence(attributes); }, 0);
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
    canLevelUp,
    essenceToLevel,
  };

})();
