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
    const characterId = Registry.createEntity();
    const speciesCode = options.species || Random.fromFrequencyMap(SpeciesFrequency);
    const species = Species.lookup(speciesCode);
    const genderCode = options.gender || Random.fromFrequencyMap(species.getGenderRatio());
    const biologicalSex = getBiologicalSex(species,genderCode);

    const actorData = { gender:genderCode, species:speciesCode };
    const attributesData = AttributesFactory.rollAttributes(genderCode, speciesCode);
    const personalityData = PersonalityFactory.rollPersonality(genderCode, speciesCode);

    // It's very important for triggers to be a clone here. The character factory might add incompatible triggers that
    // cause the character to be rejected. If we change the original triggers array, when a character is rejected we
    // must call build() with the original options again, otherwise this will just try to make a character with the
    // same incompatible triggers.
    let triggers = [...options.triggers||[]];

    let breastsData;
    let cockData;
    let pussyData;
    let sexualPreferences;
    let aspectsData;
    let sensitivitiesData;
    let skillsData;

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

    // Make triggers unique.
    triggers = [...new Set(triggers)]

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

      aspectsData = AspectsFactory.build(triggers, actorData);
      sensitivitiesData = SensitivitiesFactory.build(triggers, actorData, breastsData, cockData, pussyData);
      skillsData = buildSkillsData(triggers);

      BodyFactory.applyTriggers(bodyData, triggers);
      AnusFactory.applyTriggers(anusData, triggers);
      MouthFactory.applyTriggers(mouthData, triggers);
      BreastsFactory.applyTriggers(breastsData, actorData, triggers);
      CockFactory.applyTriggers(cockData, actorData, triggers);
      PussyFactory.applyTriggers(pussyData, triggers);
      PersonalityFactory.applyTriggers(personalityData, triggers);

      applyMagical(triggers);
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
      throw `Error: Unresolved Triggers: ${JSON.stringify(triggers)}`;
    }

    log('CharacterData',{ system:'CharacterFactory', data:{
      attributes: attributesData,
      personality: personalityData,
      body: bodyData,
      anus: anusData,
      breasts: breastsData || {},
      cock: cockData || {},
      mouth: mouthData,
      pussy: pussyData,
      sensitivitiesData: sensitivitiesData,
      sexualPreferences: sexualPreferences,
      aspects: aspectsData,
    }});

    ActorComponent.create(characterId, actorData);
    AnimaComponent.createBaseline(characterId);
    AnimusComponent.createBaseline(characterId);
    AnusComponent.create(characterId, anusData);
    ArousalComponent.create(characterId, { arousal:0 });
    AttributesComponent.create(characterId, attributesData);
    BodyComponent.create(characterId, bodyData);
    HealthComponent.create(characterId, healthData);
    MouthComponent.create(characterId, mouthData);
    PersonalityComponent.create(characterId, personalityData);
    SkillsComponent.create(characterId, skillsData);
    SensitivitiesComponent.create(characterId, sensitivitiesData);
    SexualPreferencesComponent.create(characterId, sexualPreferences);
    AspectsComponent.create(characterId, aspectsData);

    if (breastsData) { BreastsComponent.create(characterId, breastsData); }
    if (cockData) { CockComponent.create(characterId, cockData); }
    if (pussyData) { PussyComponent.create(characterId, pussyData); }

    return characterId;
  }

  // Currently the player is always a male human. The game might have a rogue-lite mechanic where new species and body
  // types are unlocked through multiple runs. I'll add character creation as part of the new game, and character
  // creation will have these new unlocked options. This is fine for early in development though.
  function buildPlayer(options={}) {
    const playerId = Registry.createEntity();
    const speciesCode = options.species || 'human';
    const genderCode = options.gender || Gender.male;
    const triggers = options.triggers || [];

    if (options.style) {
      if (options.style === 'domination') {
        options.triggers.push('domination<10,20>');
        options.triggers.push('dominant[20]');
      }
      if (options.style === 'degradation') {
        options.triggers.push('degradation<10,20>');
        options.triggers.push('debaser[20]');
      }
      if (options.style === 'sadism') {
        options.triggers.push('sadism<10,20>');
        options.triggers.push('sadistic[20]');
      }
    }

    const actorData = { name:'Greg', gender:genderCode, species:speciesCode };
    const arousalData = { arousal:0 };
    const attributesData = AttributesFactory.rollAttributes(genderCode, speciesCode);
    const healthData = AttributesFactory.rollHealth(attributesData);

    let pussyData, breastsData, cockData;
    const bodyData = BodyFactory.build(actorData,triggers);
    const anusData = AnusFactory.build(actorData);
    const mouthData = MouthFactory.build(actorData,bodyData);

    if ([Gender.futa, Gender.female].includes(actorData.gender)) {
      pussyData = PussyFactory.build(actorData);
      breastsData = BreastsFactory.build(actorData);
    }
    if ([Gender.futa, Gender.male].includes(actorData.gender)) {
      cockData = CockFactory.build(actorData);
    }

    const aspectsData = AspectsFactory.build(triggers, actorData);
    const skillsData = buildSkillsData(triggers);

    // Triggers are applied in the same way, though I'm not sure if player
    // creation can produce triggers. This could be useful in a spec though.
    BodyFactory.applyTriggers(bodyData, triggers);
    AnusFactory.applyTriggers(anusData, triggers);
    MouthFactory.applyTriggers(mouthData, triggers);
    BreastsFactory.applyTriggers(breastsData, actorData, triggers);
    CockFactory.applyTriggers(cockData, actorData, triggers);
    PussyFactory.applyTriggers(pussyData, triggers);

    // Build all starting player components.
    ActorComponent.create(playerId, actorData);
    ArousalComponent.create(playerId, arousalData);
    AttributesComponent.create(playerId, attributesData);
    HealthComponent.create(playerId, healthData);
    SkillsComponent.create(playerId, skillsData);
    AspectsComponent.create(playerId, aspectsData);
    AnusComponent.create(playerId, anusData);
    BodyComponent.create(playerId, bodyData);
    MouthComponent.create(playerId, mouthData);

    // TODO: These values are important to the sensation calculations. We
    //       mostly just need to know when the player is going to cum. The
    //       player doesn't gain anima so, there's no way to upgrade these
    //       values, so they're either going to need a different upgrade path,
    //       or will have a simplified version of these components.

    SexualPreferencesComponent.create(playerId, {});
    SensitivitiesComponent.create(playerId, {});

    if (breastsData) { BreastsComponent.create(playerId, breastsData); }
    if (cockData) { CockComponent.create(playerId, cockData); }
    if (pussyData) { PussyComponent.create(playerId, pussyData); }

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


  // TODO: Triggers that add skills. At the moment all characters start with all skills at 0. The skills component
  //       needs to have all the skill properties set though.
  function buildSkillsData(triggers) {
    const skillsData = {};

    SkillsComponent.getSkills().forEach(skillCode => {
      skillsData[skillCode] = 0;
    });

    return skillsData;
  }

  // TODO: The magical trigger will need to randomly select a spell or two to give to a character, then it will need to
  //       add mana enough to cast their spells. The function will need to produce a mana component and a list of known
  //       spells.
  function applyMagical(triggers) {
    if (triggers.includes('magical')) {
      log(`Applied Magical`,{ system:'CharacterFactory', level:3 });
      ArrayHelper.remove(triggers, 'magical');
    }
  }

  return Object.freeze({
    build,
    buildPlayer,
  });

})();
