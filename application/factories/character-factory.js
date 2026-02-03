global.CharacterFactory = (function() {

  // This map is just a placeholder. For a randomly generated character the actual species will largely depend on
  // location. If the player is exploring the dungeon it will mostly be monster girls. There will be a world generation
  // step as well (similar to HHS) that populates the city with NPCs. That will come from a city species frequency map.
  const SpeciesFrequency = {
    elf: 10,
    equian: 10,
    halfling: 10,
    human: 10,
    kobold: 10,
    lupin: 10,
    nymph: 10,
    sylph: 10,
  }

  function build(options) {
    const characterId = Registry.createEntity();
    const speciesCode = options.species || Random.fromFrequencyMap(SpeciesFrequency);
    const species = Species.lookup(speciesCode);
    const genderCode = options.gender || Random.fromFrequencyMap(species.getGenderRatio());

    // Sexuality used to set sexual preferences for gynophilic and androphilic. A straight futa is gynophilic, a gay
    // futa is androphilic (because of butt stuff). Bi is positive in both. Ace is negative in both.
    const sexuality = options.sexuality || Random.fromFrequencyMap(species.getSexualityRatio());

    const actorComponent = { gender:genderCode, species:speciesCode };
    const attributesComponent = rollAttributes(genderCode, speciesCode);
    const healthComponent = rollHealth(attributesComponent);
    const personalityComponent = rollPersonality(genderCode, speciesCode);



    // Need to completely rework names down to a single name version.
    // if (options.firstName == null) {
    //   actorComponent.firstName = names.first.name;
    //   actorComponent.lastName = names.last.name;
    // }

    Registry.createActorComponent(characterId, actorComponent);
    Registry.createAttributesComponent(characterId, attributesComponent);
    Registry.createHealthComponent(characterId, healthComponent);
    Registry.createPersonalityComponent(characterId, personalityComponent);

    return characterId;
  }

  // I don't think we roll attributes in any place other than this character factory. If so we can move this to the
  // Attributes component or something.
  function rollAttributes(gender,species) {
    const diceLevels = { F:1, D:2, C:3, B:4, A:5, S:6, SS:7, SSS:8 }
    const speciesMap = Species.lookup(species).getAttributes();
    const attributes = {};

    ['strength','dexterity','vitality','intelligence','beauty'].forEach(code => {
      let dice = diceLevels[speciesMap[code]];

      if (code === 'strength' && ['male','futa'].includes(gender)) { dice += 1 }
      if (code === 'beauty' && ['female','futa'].includes(gender)) { dice += 1 }

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

  function rollPersonality(gender,species) {
    const ranges = Species.lookup(species).getPersonalityRanges();
    const personality = { sanity:100 };

    Object.keys(ranges).forEach(key => {
      personality[key] = Random.between(ranges[key][0],ranges[key][1]);
    });

    return personality;
  }

  return {
    build
  }

})();
