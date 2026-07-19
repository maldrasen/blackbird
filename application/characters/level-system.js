global.LevelSystem = (function() {

  function levelUp(id, attribute) {
    const increase = Random.between(1,5) + attributeBonus(id, attribute);
    const attributes = AttributesComponent.lookup(id);

    attributes[attribute] += increase;
    AttributesComponent.update(id, attributes);

    incrementLevel(id);

    if (attribute === Attrib.vitality) {
      growMaxHealth(id, increase);
    }

    return increase;
  }

  function attributeBonus(id, attribute) {
    return LetterGradeHelper.attributeBase(getSpecies(id).getAttributes()[attribute]);
  }

  function getSpecies(id) {
    return Species.lookup(Character(id).getSpecies());
  }

  function incrementLevel(id) {
    const experience = ExperienceComponent.lookup(id);
    experience.level += 1;
    ExperienceComponent.update(id, experience);
  }

  function growMaxHealth(id, vitalityIncrease) {
    const factor = Species.lookup(Character(id).getSpecies()).getHealthFactor();
    const health = HealthComponent.lookup(id);
    const addedHealth = Math.ceil(Random.rollDice({ x:vitalityIncrease, d:10 }) * factor);

    health.maxHealth += addedHealth;
    health.currentHealth += addedHealth;

    HealthComponent.update(id, health);
  }

  return Object.freeze({
    levelUp,
  });

})();
