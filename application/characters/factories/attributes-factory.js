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

  function rollAttributes(sex,species) {
    const speciesMap = Species.lookup(species).getAttributes();
    const attributes = {};

    Object.keys(Attrib).forEach(code => {
      let dice = LetterGradeHelper.attributeBase(speciesMap[code]);

      if (code === Attrib.strength && [Gender.male,Gender.futa].includes(sex)) { dice += 1 }
      if (code === Attrib.beauty && [Gender.female,Gender.futa].includes(sex)) { dice += 1 }

      attributes[code] = Random.rollDice({ x:dice, d:10 });

      if (attributes[code] < 5) { attributes[code] = 5; }
    });

    return attributes;
  }

  // Health is based on the character's vitality and rolled randomly, then multiplied by the species health factor. If
  // we have a mechanism for adding a point of vitality, it should also roll and add more health points as well.
  // Baseline health is simply (vitality)d10 * healthFactor. Health and current health are the only values currently
  // tracked by the health component.
  function rollHealth(attributes, factor=1.0) {
    const health = Math.round(Random.rollDice({ x:attributes.vitality, d:10 }) * factor);
    const stamina = AttributesComponent.createWrapper({ data:attributes }).getMaxStamina();

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
        Console.log(`Applied ${triggerName}`,{ system:'Attributes Factory', level:3 });
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

        Console.log(`Applied ${triggerName}`,{ system:'Attributes Factory', level:3 });
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