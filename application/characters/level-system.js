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

  // The levelUp() function can be called to add levels to a new monster. When we do this a monster needs to also
  // have the minimum essence needed to reach that level in case this monster is later turned into a party member.
  // For normal characters, we need to make sure to call canLevelUp() before allowing characters to level.
  function incrementLevel(id) {
    const experience = ExperienceComponent.lookup(id);
    experience.level += 1;

    const minimum = EssenceSystem.totalEssenceToLevel(experience.level, Character(id).getSpecies());
    if (experience.essence < minimum) { experience.essence = minimum; }

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
