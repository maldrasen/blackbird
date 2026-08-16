global.AttributeMath = (function() {

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

  const attributeBaseline = 5;

  // An entity's attribute grades come from its species, or from the monster type for beasts, which don't have one.
  function attributeGrades(id) {
    const species = ActorComponent.lookup(id).species;
    if (species) { return Species.lookup(species).getAttributes(); }
    return MonsterType.lookup(BaseMonster.lookup(MonsterComponent.lookup(id).code).getType()).getAttributes();
  }

  // Roll a single attribute increase from an attribute grade map, attribute aspects, and gender. This is shared by
  // the attributes factory when rolling a new character's attributes and by the level system when leveling one up.
  // The grades come from the species for characters and from the monster type for beasts.
  function attributeIncrease(attribute, grades, actorData, aspectsData) {
    const grade = grades[attribute];
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
    if (gender === Gender.none) { return 0; }
    if (attribute === Attrib.strength && gender === Gender.male) { return 1; }
    if (attribute === Attrib.beauty && gender !== Gender.male) { return 1; }
    return 0;
  }

  return {
    attributeBaseline,
    attributeGrades,
    attributeIncrease,
  };

})();
