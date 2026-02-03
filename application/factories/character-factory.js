global.CharacterFactory = (function() {

  const SpeciesFrequency = {
    cambion: 50,
    kobold: 40,
    equian: 20,
    lupin: 20,
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
    const healthComponent = calculateHealth(attributesComponent);

    if (options.firstName == null) {
      const names = NameBuilder.getRandom({ gender:genderCode, category:'Elf' });

      // TODO: Handle the triggers requirements and adjustments that some names come with. These values will be
      //       included with the name. Character builder, especially personality and body parts will need to be more
      //       developed before we can start working on this.

      actorComponent.firstName = names.first.name;
      actorComponent.lastName = names.last.name;
    }

    Registry.createActorComponent(characterId, actorComponent);
    Registry.createAttributesComponent(characterId, attributesComponent);
    Registry.createHealthComponent(characterId, healthComponent);

    // === Control ===
    // The control value shouldn't be chosen at random. Only characters under the player's control will have a control
    // component. Control value will be determined by how the character was captured, information the character factory
    // doesn't have access to.
    if (options.control) {
      Registry.createControlledComponent(characterId, { control:options.control });
    }

    // Like control, the current location should probably be passed as an argument.
    const situatedComponent = { currentLocation:'filthy-hovel' }
    Registry.createSituatedComponent(characterId, situatedComponent);

    return characterId;
  }

  // I don't think we roll attributes in any place other than this character factory. If so we can move this to the
  // Attributes component or something.
  function rollAttributes(genderCode,speciesCode) {
    const diceLevels = { F:1, D:2, C:3, B:4, A:5, S:6, SS:7, SSS:8 }
    const speciesMap = Species.lookup(speciesCode).getAttributes();
    const attributes = {};

    ['strength','dexterity','vitality','intelligence','beauty'].forEach(code => {
      let dice = diceLevels[speciesMap[code]];

      if (code === 'strength' && ['male','futa'].includes(genderCode)) { dice += 1 }
      if (code === 'beauty' && ['female','futa'].includes(genderCode)) { dice += 1 }

      attributes[code] = Random.rollDice({ x:dice, d:10 });

      if (attributes[code] < 5) { attributes.code = 5; }
    });

    return attributes;
  }

  // Health is based on the character's vitality and rolled randomly. If we have a mechanism for adding a point
  // of vitality, it should also roll and add more health points as well. Baseline health is simply (vitality)d10.
  // Health and current health are the only values currently tracked by the health component.
  function calculateHealth(attributes) {
    const health = Random.rollDice({ x:attributes.vitality, d:10 });
    return { currentHealth:health, maxHealth:health };
  }

  return {
    build
  }

})();
