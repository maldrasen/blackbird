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
  //
  function build(options) {
    const attempt = options.attempt || 1;
    const triggers = options.triggers || [];
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

    // Character creation is super complicated, so it's worth it to log the data as we build it.
    log(StringHelper.pack(`Building[${characterId}]: ${actorData.title||''} ${actorData.name} ${actorData.surname||''}
        [${genderCode} ${speciesCode}]`),{ system:'CharacterFactory', level:1 });
    if (triggers.length > 0) {
      log('Name Triggers',{ system:'CharacterFactory', level:3, data: { triggers }});
    }

    // The body factory rolls for random mutations and might modify the triggers array. We don't know what parts a
    // character will have at this point. (They don't always come from gender) If we trigger something like big-tits,
    // and they don't end up having breasts, we can ignore the triggers that don't apply.
    const bodyData = BodyFactory.build(actorData, triggers);
    const anusData = AnusFactory.build(actorData);
    const mouthData = MouthFactory.build(actorData, bodyData);

    log('BodyData',{ system:'CharacterFactory', data:bodyData });
    log('Triggers',{ system:'CharacterFactory', data:{ triggers:triggers }});
    log('AnusData',{ system:'CharacterFactory', data:anusData });
    log('MouthData',{ system:'CharacterFactory', data:mouthData });

    // We can adjust the attributes at this point. Calling this function mutates both the attributes data and the
    // triggers array. After the attributes are adjusted it's safe to calculate the health.
    AttributesFactory.adjustAttributes(attributesData, triggers);
    const healthData = AttributesFactory.rollHealth(attributesData);

    // Technically, men also have nipples, but I don't think we ever actually do anything with them. Even a "lick his
    // nipples action" wouldn't need to describe them in any detail.
    if ([Gender.futa, Gender.female].includes(biologicalSex)) {
      pussyData = PussyFactory.build(actorData);
      log('PussyData',{ system:'CharacterFactory', data:pussyData });

      if (species.getBody().breasts) {
        breastsData = BreastsFactory.build(actorData);
        log('BreastData',{ system:'CharacterFactory', data:breastsData });
      }
    }

    if ([Gender.futa, Gender.male].includes(biologicalSex)) {
      cockData = CockFactory.build(actorData);
      log('CockData',{ system:'CharacterFactory', data:cockData });
    }

    // TODO: Use the list of triggers to make adjustments to the body, sexual preferences and other components. If we
    //       find that we've generated a body or sexual preferences that's incompatible with the triggers, we can try
    //       return build(options) again to try once again. We should probably add a counter to the options so that we
    //       only retry a few time and just eventually return an invalid character if we never get a valid character
    //       for some reason. This would be a pretty major bug though so we'd need to print out all the information we
    //       can to determine why so many characters are incompatible. Because the triggers can come from the options
    //       though this situation can be caused by an input like triggers:['flat-chest','huge-tits']

    try {

      const sexualPreferences = SexualPreferenceFactory.build({
        biologicalSex: biologicalSex,
        sexuality:     options.sexuality || Random.fromFrequencyMap(species.getSexualityRatio()),
      }, triggers);

      const aspects = []; // TODO: Some triggers add aspects.
      const skills = [];  // TODO: Characters might come with some skills.
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
