global.EssenceSystem = (function() {

  // Essence Knobs
  const attributePowerExponent = 1.5;
  const essenceScale = 0.12;
  const abilityScale = 0.02;
  const healthEssenceWeight = 0.25;
  const speedEssenceWeight = 0.5;

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
  // factors as they can arbritrarily make a monster faster or tougher. A final bonus essence value can be given to
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
    const scoreSum = monster.getPrioritizedAbilities().reduce((sum,ability) => {
      return sum + (ability.essence != null ? ability.essence : Ability.lookup(ability.code).getEssence());
    },0);

    return 1 + (scoreSum * abilityScale);
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
