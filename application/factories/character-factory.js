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

  // Options:
  //   gender: Gender code
  //   species: Species code
  //   name: String (for unique characters)
  //   title: String (for unique characters)
  //   surname: String (for unique characters)
  //   triggers: Detailed in the character-adjuster.
  //   sexuality: (straight, gay, bi, ace)
  //
  function build(options) {
    const attempt = options.attempt || 1;
    const triggers = [...options.triggers||[]]; // Very Important
    const characterId = Registry.createEntity();
    const speciesCode = options.species || Random.fromFrequencyMap(SpeciesFrequency);
    const species = Species.lookup(speciesCode);
    const genderCode = options.gender || Random.fromFrequencyMap(species.getGenderRatio());
    const biologicalSex = getBiologicalSex(species,genderCode);

    const actorData = { gender:genderCode, species:speciesCode };
    const attributesData = AttributesFactory.rollAttributes(genderCode, speciesCode);
    const personalityData = rollPersonality(genderCode, speciesCode);

    let breastsData;
    let cockData;
    let pussyData;
    let sexualPreferences;
    let aspects;
    let skills;

    if (options.name) { actorData.name = options.name; }
    if (options.title) { actorData.title = options.title; }
    if (options.surname) { actorData.surname = options.surname; }

    if (actorData.name == null) {
      const nameData = Name.getRandom(genderCode, speciesCode);
      triggers.push(...(nameData.name.triggers||[]))

      actorData.name = nameData.name.name;
      if (nameData.title) {
        actorData.title = nameData.title.name;
        triggers.push(...(nameData.title.triggers||[]))
      }
      if (nameData.surname) {
        actorData.surname = nameData.surname.name;
        triggers.push(...(nameData.surname.triggers||[]))
      }
    }

    // Log start of character creation.
    log(StringHelper.pack(`Building[${characterId}]: ${actorData.title||''} ${actorData.name} ${actorData.surname||''}
        [${genderCode} ${speciesCode}]`),{ system:'CharacterFactory', level:1 });

    const bodyData = BodyFactory.build(actorData, triggers);
    const anusData = AnusFactory.build(actorData);
    const mouthData = MouthFactory.build(actorData, bodyData);

    TriggerFactory.addRandomTriggers(triggers, species);

    // We can adjust the attributes at this point. Calling this function mutates both the attributes data and the
    // triggers array. After the attributes are adjusted it's safe to calculate the health.
    AttributesFactory.adjustAttributes(attributesData, triggers);
    const healthData = AttributesFactory.rollHealth(attributesData);

    // Technically, men also have nipples, but I don't think we ever actually do anything with them. Even a "lick his
    // nipples action" wouldn't need to describe them in any detail.
    if ([Gender.futa, Gender.female].includes(biologicalSex)) {
      pussyData = PussyFactory.build(actorData);
      if (species.getBody().breasts) {
        breastsData = BreastsFactory.build(actorData);
      }
    }
    if ([Gender.futa, Gender.male].includes(biologicalSex)) {
      cockData = CockFactory.build(actorData);
    }

    try {

      sexualPreferences = SexualPreferenceFactory.build({
        actor:         actorData,
        biologicalSex: biologicalSex,
        sexuality:     options.sexuality || Random.fromFrequencyMap(species.getSexualityRatio()),
        cock:          cockData,
        pussy:         pussyData,
        breasts:       breastsData,
      }, triggers);

      aspects = {}; // TODO: Some triggers add aspects.
      skills = {};  // TODO: Characters might come with some skills.

      BodyFactory.applyTriggers(bodyData, triggers);
      // Make Anus Adjustments
      // Make Breast Adjustments
      // Make Cock Adjustments
      // Make Pussy Adjustments
    }
    catch(error) {
      console.warn(error);
      log(error,{ system:'CharacterFactory', type:LogType.warning, buildOptions:options });

      Registry.deleteEntity(characterId);

      if (attempt >= 10) {
        logError('Cannot create a character using these options.',{ system:'CharacterFactory', buildOptions:options });
        throw error
      }

      options.attempt = attempt + 1;
      return build(options);
    }

    if (triggers.length > 0) {
      console.warn(`Unresolved Triggers`,triggers)
      // throw `Error: Unresolved Triggers: ${JSON.stringify(triggers)}`;
    }

    log('CharacterData',{ system:'CharacterFactory', data:{
      attributes: attributesData,
      body: bodyData,
      anus: anusData,
      breasts: breastsData || {},
      cock: cockData || {},
      mouth: mouthData,
      pussy: pussyData,
      sexualPreferences: sexualPreferences,
    }});

    Registry.createActorComponent(characterId, actorData);
    Registry.createAnusComponent(characterId, anusData);
    Registry.createArousalComponent(characterId, { arousal:0 });
    Registry.createAttributesComponent(characterId, attributesData);
    Registry.createBodyComponent(characterId, bodyData);
    Registry.createHealthComponent(characterId, healthData);
    Registry.createMouthComponent(characterId, mouthData);
    Registry.createPersonalityComponent(characterId, personalityData);

    if (breastsData) { Registry.createBreastsComponent(characterId, breastsData); }
    if (cockData) { Registry.createCockComponent(characterId, cockData); }
    if (pussyData) { Registry.createPussyComponent(characterId, pussyData); }

    Object.keys(sexualPreferences).forEach(type => {
      Registry.createSexualPreferenceComponent(characterId, { type:type, value:sexualPreferences[type] });
    });

    return characterId;
  }

  // Currently the player is always a male human. The game might have a rogue-lite mechanic where new species and body
  // types are unlocked through multiple runs. I'll add character creation as part of the new game, and character
  // creation will have these new unlocked options. This is fine for early in development though.
  function buildPlayer() {
    const playerId = Registry.createEntity();
    const speciesCode = 'human';
    const genderCode = 'male';

    const actorComponent = { name:'Greg', gender:genderCode, species:speciesCode };
    const arousalComponent = { arousal:0 }

    const attributesComponent = AttributesFactory.rollAttributes(genderCode, speciesCode);
    const healthComponent = AttributesFactory.rollHealth(attributesComponent);

    Registry.createActorComponent(playerId, actorComponent);
    Registry.createArousalComponent(playerId, arousalComponent);
    Registry.createAttributesComponent(playerId, attributesComponent);
    Registry.createHealthComponent(playerId, healthComponent);

    return playerId;
  }

  // If a character is non-binary I still need to know their biological sex in order to build the various naughty bits.
  // This value needs to be randomly chosen from the species gender ratio map with the enby option removed.
  function getBiologicalSex(species, gender) {
    if (gender !== Gender.enby) { return gender; }

    const ratios = species.getGenderRatio();
    return Random.fromFrequencyMap({
      male: ratios.male,
      female: ratios.female,
      futa: ratios.futa,
    });
  }

  function rollPersonality(gender,species) {
    const ranges = Species.lookup(species).getPersonalityRanges();
    const personality = { sanity:100 };

    Object.keys(ranges).forEach(key => {
      personality[key] = Random.between(ranges[key][0],ranges[key][1]);
    });

    return personality;
  }

  return Object.freeze({
    build,
    buildPlayer,
  });

})();
