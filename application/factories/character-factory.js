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
    const sexuality = options.sexuality || Random.fromFrequencyMap(species.getSexualityRatio());

    console.log(`=== Creating Character [${characterId}] ===`);
    console.log(`Species: ${speciesCode}`);
    console.log(`Gender: ${genderCode}`);
    console.log(`Sexuality: ${sexuality}`)

    // const gender = options.gender || Gender.female
    const actorComponent = { gender:genderCode, species:speciesCode };
    const attributesComponent = rollAttributes(genderCode, speciesCode);

    // Need to figure out how stamina and health values are figured out.
    const healthComponent = { currentStamina:1000, maxStamina:1000, currentHealth:20, maxHealth:20, }
    const situatedComponent = { currentLocation:'filthy-hovel' }

    if (options.firstName == null) {
      const names = NameBuilder.getRandom({ gender:genderCode, category:'Elf' });

      // TODO: Handle the triggers requirements and adjustments that some names come with. These values will be
      //       included with the name. Character builder, especially personality and body parts will need to be more
      //       developed before we can start working on this.

      console.log("Random Name:");
      console.log("  -",names.first);
      console.log("  -",names.last);

      actorComponent.firstName = names.first.name;
      actorComponent.lastName = names.last.name;
    }

    Registry.createActorComponent(characterId, actorComponent);
    Registry.createAttributesComponent(characterId, attributesComponent);
    Registry.createHealthComponent(characterId, healthComponent);
    Registry.createSituatedComponent(characterId, situatedComponent);

    // === Control ===
    // The control value shouldn't be chosen at random. Only characters under the player's control will have a control
    // component. Control value will be determined by how the character was captured, information the character factory
    // doesn't have access to.
    if (options.control) {
      Registry.createControlledComponent(characterId, { control:options.control });
    }

    return characterId;
  }

  // I don't think we roll attributes in any place other than this character factory. If so we can move this to the
  // Attributes component or something.
  function rollAttributes(genderCode,speciesCode) {
    const diceLevels = { F:1, D:2, C:3, B:4, A:5, S:6, SS:7, SSS:8 }
    const speciesMap = Species.lookup(speciesCode).getAttributes();
    const attributes = {};

    console.log("Rolling attributes");
    ['strength','dexterity','vitality','intelligence','beauty'].forEach(code => {
      let dice = diceLevels[speciesMap[code]];

      if (code === 'strength' && ['male','futa'].includes(genderCode)) { dice += 1 }
      if (code === 'beauty' && ['female','futa'].includes(genderCode)) { dice += 1 }

      attributes[code] = Random.rollDice({ x:dice, d:10 });
      console.log(` - ${code}:${attributes[code]}`);
    });

    return attributes;
  }

  return {
    build
  }

})();
