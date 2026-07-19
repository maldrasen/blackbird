global.LevelSystem = (function() {

  const attributeBaseline = 5;

  const positiveAspects = {
    strength: 'strong',
    dexterity: 'skillful',
    vitality: 'healthy',
    intelligence: 'smart',
    beauty: 'beautiful',
  };

  const negativeAspects = {
    strength: 'weak',
    dexterity: 'clumsy',
    vitality: 'sickly',
    intelligence: 'stupid',
    beauty: 'ugly',
  };

  function levelUp(id, attribute) {
    const increase = attributeIncrease(attribute, ActorComponent.lookup(id), AspectsComponent.lookup(id));
    const attributes = AttributesComponent.lookup(id);

    attributes[attribute] += increase;
    AttributesComponent.update(id, attributes);

    incrementLevel(id);

    if (attribute === Attrib.vitality) {
      growMaxHealth(id, increase);
    }

    return increase;
  }

  // The amount an attribute goes up when raised, used both on level up and when rolling a character's initial
  // attributes. Attribute aspects only apply when their attribute is the one being raised.
  function attributeIncrease(attribute, actorData, aspectsData) {
    const grade = Species.lookup(actorData.species).getAttributes()[attribute];
    const increase = Random.between(1,5)
      + LetterGradeHelper.attributeBase(grade)
      + aspectModifier(attribute, aspectsData)
      + genderBonus(attribute, actorData.gender);

    return (increase < 1) ? 1 : increase;
  }

  function aspectModifier(attribute, aspectsData) {
    let modifier = 0;
    if (aspectsData[positiveAspects[attribute]]) { modifier += 2; }
    if (aspectsData[negativeAspects[attribute]]) { modifier -= 2; }
    return modifier;
  }

  function genderBonus(attribute, gender) {
    if (attribute === Attrib.strength && gender === Gender.male) { return 1; }
    if (attribute === Attrib.beauty && gender !== Gender.male) { return 1; }
    return 0;
  }

  // ===========================
  //    Character Creation
  // ===========================

  // Characters start with a baseline in every attribute plus a single creation increase. These are starting values,
  // not levels, so characters built this way still start at level 1.
  function buildAttributes(actorData, aspectsData) {
    const attributes = {};
    Object.keys(Attrib).forEach(code => {
      attributes[code] = attributeBaseline + attributeIncrease(code, actorData, aspectsData);
    });
    return attributes;
  }

  function buildHealth(attributes, healthFactor=1.0) {
    const health = Math.round(Random.rollDice({ x:attributes.vitality, d:10 }) * healthFactor);
    const stamina = AttributesComponent.createWrapper({ data:attributes }).getMaxStamina();

    return { currentStamina:stamina, currentHealth:health, maxHealth:health };
  }

  // ===========================
  //    Leveling
  // ===========================

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
    const factor = getSpecies(id).getHealthFactor();
    const health = HealthComponent.lookup(id);
    const addedHealth = Math.ceil(Random.rollDice({ x:vitalityIncrease, d:10 }) * factor);

    health.maxHealth += addedHealth;
    health.currentHealth += addedHealth;

    HealthComponent.update(id, health);
  }

  return Object.freeze({
    levelUp,
    buildAttributes,
    buildHealth,
  });

})();
