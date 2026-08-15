global.LevelSystem = (function() {

  function levelUp(id, attribute) {
    const actor = ActorComponent.lookup(id);
    const grades = CharacterMath.attributeGrades(id);
    const increase = CharacterMath.attributeIncrease(attribute, grades, actor, AspectsComponent.lookup(id) || {});
    const attributes = AttributesComponent.lookup(id);

    attributes[attribute] += increase;
    AttributesComponent.update(id, attributes);

    incrementLevel(id);

    if (attribute === Attrib.vitality) {
      growMaxHealth(id, increase);
    }

    return increase;
  }

  // Beasts don't have a species, so their health factor comes from their base monster record instead.
  function getHealthFactor(id) {
    const species = Character(id).getSpecies();
    return species ?
      Species.lookup(species).getHealthFactor() :
      BaseMonster.lookup(MonsterComponent.lookup(id).code).getHealthFactor();
  }

  // The levelUp() function can be called to add levels to a new monster. When we do this a monster needs to also
  // have the minimum essence needed to reach that level in case this monster is later turned into a party member.
  // For normal characters, we need to make sure to call canLevelUp() before allowing characters to level. Beasts
  // can't be recruited and don't track experience at all, so they skip this.
  function incrementLevel(id) {
    const experience = ExperienceComponent.lookup(id);
    if (experience) {
      experience.level += 1;

      const minimum = EssenceSystem.essenceToLevel(id);
      if (experience.essence < minimum) { experience.essence = minimum; }

      ExperienceComponent.update(id, experience);
    }
  }

  function growMaxHealth(id, vitalityIncrease) {
    const factor = getHealthFactor(id);
    const health = HealthComponent.lookup(id);
    const addedHealth = Math.ceil(Random.rollDice({ x:vitalityIncrease, d:10 }) * factor);

    health.maxHealth += addedHealth;
    health.currentHealth += addedHealth;

    HealthComponent.update(id, health);
  }

  return {
    levelUp,
  };

})();
