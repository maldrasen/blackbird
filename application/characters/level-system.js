global.LevelSystem = (function() {

  const attributeRollMax = 5;

  // Level up a character or monster, raising the chosen attribute. Characters pick the attribute in the enlighten
  // view, monsters pick from their type's attribute growth frequency map, but both come through here. The increase
  // is a random amount plus the base amount from the species letter grade, so a species grows fastest in the
  // attributes it's naturally good at.
  function levelUp(id, attribute) {
    const increase = Random.between(1,attributeRollMax) + speciesGradeBase(id, attribute);
    const attributes = AttributesComponent.lookup(id);

    attributes[attribute] += increase;
    AttributesComponent.update(id, attributes);

    incrementLevel(id);

    if (attribute === Attrib.vitality) {
      HealthComponent.growMaxHealth(id, increase, getHealthFactor(id));
    }

    return increase;
  }

  function speciesGradeBase(id, attribute) {
    const species = getSpecies(id);
    return species == null ? 0 : LetterGradeHelper.gradeLevel(species.getAttributes()[attribute]);
  }

  function getHealthFactor(id) {
    const species = getSpecies(id);
    return (species == null) ? 1 : (species.getHealthFactor() || 1);
  }

  // Monsters without a species, like plain animals, won't have an actor component.
  function getSpecies(id) {
    const actor = ActorComponent.lookup(id);
    return (actor == null || actor.species == null) ? null : Species.lookup(actor.species);
  }

  function incrementLevel(id) {
    const experience = ExperienceComponent.lookup(id);
    if (experience == null) { return; }

    experience.level += 1;
    ExperienceComponent.update(id, experience);
  }

  return Object.freeze({
    levelUp,
  });

})();
