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
  // A monster's essence value is determined by their attributes and abilities. Attributes are worth more as they
  // determine the potency of the abilities. Even a monster without abilities, with only a basic attack can be very
  // dangerous, but a weak monster with lots of abilities is still weak.

  function monsterEssenceValue(monsterId) {
    return Math.round(attributeFactor(monsterId) * abilityFactor(monsterId) * healthFactor(monsterId) * speedFactor(monsterId));
  }

  // The health and speed factors are squeezed toward 1 before they're applied, so that they temper the essence value
  // rather than drive it. Health gets squeezed harder because speed should have the greater effect.
  function healthFactor(monsterId) {
    return squeeze(Monster(monsterId).getBaseMonster().getHealthFactor(), healthEssenceWeight);
  }

  // Species monsters calculate speed from their bodies, which would swing the essence value from individual to
  // individual, so only the flat factor carried by beasts weighs in here. Fast monsters are more dangerous, so a
  // speed factor below 1 raises the value.
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

  // An ability's essence lives on the monster's ability entry, so the same bite can be weighed differently from
  // monster to monster. The ability record's essence acts as the default for entries that don't set their own.
  function abilityFactor(monsterId) {
    const monster = Monster(monsterId);
    const scoreSum = monster.getPrioritizedAbilities().reduce((sum,ability) => {
      const entry = monster.getAbility(ability.code);
      return sum + (entry.essence != null ? entry.essence : Ability.lookup(ability.code).getEssence());
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
