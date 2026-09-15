global.EssenceSystem = (function() {

  // Essence Knobs
  const attributePowerExponent = 1.5;
  const essenceScale = 0.12;
  const abilityScale = 1;
  const healthWeight = 1.25;
  const speedWeight = 1.5;

  // Level Knobs
  const baseLevelCost = 250;
  const levelCostExponent = 1.1;
  const speciesCostExponent = 0.6;
  const baselineGradeTotal = 15;

  // ============================
  //    Monster Essence Values
  // ============================

  function monsterEssenceValue(id) {
    const base = Monster(id).getBaseMonster();
    const root = abilityTotal(base) + attributeTotal(id) + getBonusEssence(base);
    return Math.round(root * healthFactor(base) * speedFactor(base) * essenceScale);
  }

  function abilityTotal(base) {
    return base.getAbilities().reduce((sum, ability) => {
      return sum + ability.getEssence() * abilityScale;
    }, 0);
  }

  function getBonusEssence(base) {
    return base.getBonusEssence() || 0;
  }

  // TODO: Seriously check this.
  function healthFactor(base) {
    return base.getHealthFactor() * healthWeight;
  }

  // TODO: Hmm, this seems wrong... Why are the speed factors of species being ignored?
  function speedFactor(base) {
    const value = base.getSpecies() ? 1 : squeeze(base.getSpeedFactor(), speedWeight);
    return 1/value;
  }

  function attributeTotal(id) {
    const attributes = AttributesComponent.lookup(id);
    const attributeSum = Object.keys(Attrib).reduce((sum,code) => sum + attributes[code], 0);
    return attributeSum ** attributePowerExponent;
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
