global.AttributesFactory = (function() {
  const positiveAttributeTriggers = {
    strong: Attrib.strength,
    skillful: Attrib.dexterity,
    healthy: Attrib.vitality,
    smart: Attrib.intelligence,
    beautiful: Attrib.beauty,
  };
  const negativeAttributeTriggers = {
    weak: Attrib.strength,
    clumsy: Attrib.dexterity,
    sickly: Attrib.vitality,
    stupid: Attrib.intelligence,
    ugly: Attrib.beauty,
  };

  // I don't think we roll attributes in any place other than this character factory. If so we can move this to the
  // Attributes component or something.
  function rollAttributes(gender,species) {
    const diceLevels = { F:1, D:2, C:3, B:4, A:5, S:6, SS:7, SSS:8 }
    const speciesMap = Species.lookup(species).getAttributes();
    const attributes = {};

    Object.keys(Attrib).forEach(code => {
      let dice = diceLevels[speciesMap[code]];

      if (code === Attrib.strength && [Gender.male,Gender.futa].includes(gender)) { dice += 1 }
      if (code === Attrib.beauty && [Gender.female,Gender.futa].includes(gender)) { dice += 1 }

      attributes[code] = Random.rollDice({ x:dice, d:10 });

      if (attributes[code] < 5) { attributes[code] = 5; }
    });

    return attributes;
  }

  // Health is based on the character's vitality and rolled randomly. If we have a mechanism for adding a point
  // of vitality, it should also roll and add more health points as well. Baseline health is simply (vitality)d10.
  // Health and current health are the only values currently tracked by the health component.
  function rollHealth(attributes) {
    const health = Random.rollDice({ x:attributes.vitality, d:10 });
    const stamina = Attributes.createWrapper({ data:attributes }).getMaxStamina();

    return { currentStamina:stamina, currentHealth:health, maxHealth:health };
  }

  // Adjust the attributes based on the following triggers:
  //    strong / weak
  //    skillful / clumsy
  //    healthy / sickly
  //    smart / stupid
  //    beautiful / ugly

  function adjustAttributes(attributesData, triggers) {
    Object.keys(positiveAttributeTriggers).forEach(triggerName => {
      if (triggers.includes(triggerName)) {
        const attributeName = positiveAttributeTriggers[triggerName];
        attributesData[attributeName] += Random.rollDice({ x:2, d:10 });
        log(`Applied ${triggerName}`,{ system:'Attributes Factory', level:3 });
        ArrayHelper.remove(triggers, triggerName);
      }
    });

    Object.keys(negativeAttributeTriggers).forEach(triggerName => {
      if (triggers.includes(triggerName)) {
        const attributeName = negativeAttributeTriggers[triggerName];
        attributesData[attributeName] -= Random.rollDice({ x:2, d:10 });

        if (attributesData[attributeName] < 1) {
          attributesData[attributeName] = 1;
        }

        log(`Applied ${triggerName}`,{ system:'Attributes Factory', level:3 });
        ArrayHelper.remove(triggers, triggerName);
      }
    });
  }

  return Object.freeze({
    rollAttributes,
    rollHealth,
    adjustAttributes,
  });

})();