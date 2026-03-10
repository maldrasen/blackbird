
// This map is just a placeholder. For a randomly generated character the actual species will largely depend on
// location. If the player is exploring the dungeon it will mostly be monster girls. There will be a world generation
// step as well (similar to HHS) that populates the city with NPCs. That will come from a city species frequency map.
const SpeciesFrequency = {
  elf:10, equian:10, halfling:10, human:10, kobold:10, lupin:10, nymph:10, sylph:10, vermen:10,
};

global.CharacterFactory = (function() {

  // Build a random character given the options:
  //   gender: Gender code
  //   species: Species code
  //   name: String (for unique characters)
  //   title: String (for unique characters)
  //   surname: String (for unique characters)
  //   triggers: Detailed in the documentation
  //   sexuality: (straight, gay, bi, ace)
  //
  function build(options={}) {
    for (let attempts=0; attempts<10; attempts++) {
      let characterId = Registry.createEntity();
      try {
        return buildLoop(characterId, options);
      }
      catch(error) {
        Registry.deleteEntity(characterId);
        Console.log(error,{ system:'CharacterFactory', type:LogType.warning, data:{ options }});
      }
    }

    Console.log('Cannot create a character using these options.',{
      system: 'CharacterFactory',
      type: LogType.error,
      data: { options:options },
    });

    throw `Cannot create character.`
  }

  // The buildLoop() will throw an exception to reject a character. This can happen when we randomly pick incompatible
  // traits, and it's easier to start over from scratch than to figure out how to back out of bad decisions.
  function buildLoop(characterId, options) {
    const speciesCode = options.species || Random.fromFrequencyMap(SpeciesFrequency);
    const species = Species.lookup(speciesCode);
    const genderCode = options.gender || Random.fromFrequencyMap(species.getGenderRatio());
    const biologicalSex = getBiologicalSex(species,genderCode);

    const actorData = { gender:genderCode, species:speciesCode };
    const attributesData = AttributesFactory.rollAttributes(biologicalSex, speciesCode);

    // It's very important for triggers to be a clone here. The character factory might add incompatible triggers that
    // cause the character to be rejected. If we change the original triggers array, when a character is rejected we
    // must call build() with the original options again, otherwise this will just try to make a character with the
    // same incompatible triggers.
    let triggers = [...options.triggers||[]];

    buildNames(options, actorData, triggers);

    // Two names can add the same trigger, so we need to make them unique before continuing.
    triggers = [...new Set(triggers)]

    // Log start of character creation.
    Console.log(StringHelper.pack(`Building[${characterId}]: ${actorData.title||''} 
      ${actorData.name} ${actorData.surname||''} [${genderCode} ${speciesCode}]`),
      { system:'CharacterFactory', level:1 });

    const bodyData = BodyFactory.build(actorData, triggers);
    const anusData = AnusFactory.build(actorData);
    const mouthData = MouthFactory.build(actorData, bodyData);
    const pussyData = buildPussy(biologicalSex, actorData);
    const cockData = buildCock(biologicalSex, actorData);
    const breastsData = buildBreasts(biologicalSex, actorData);

    // Add random mutators like strange hair colors or tails and shit.
    TriggerFactory.addRandomTriggers(triggers, species);

    // We can adjust the attributes at this point. Calling this function mutates both the attributes data and the
    // triggers array. After the attributes are adjusted it's safe to calculate the health.
    AttributesFactory.adjustAttributes(attributesData, triggers);
    const healthData = AttributesFactory.rollHealth(attributesData);
    const personalityData = PersonalityFactory.buildPersonality(actorData, triggers);

    const sexualPreferences = SexualityFactory.build({
      sexuality: options.sexuality,
      actor: actorData,
      personality: personalityData,
      sex: biologicalSex
    }, triggers);

    //   SexualPreferenceFactory.build({
    //   actor:         actorData,
    //   personality:   personalityData
    //   biologicalSex: biologicalSex,
    //   sexuality:      || ,
    //   cock:          cockData,
    //   pussy:         pussyData,
    //   breasts:       breastsData,
    // }, triggers);

    const aspectsData = AspectsFactory.build(triggers, actorData);
    const sensitivitiesData = SensitivitiesFactory.build(triggers, actorData, breastsData, cockData, pussyData);
    const skillsData = SkillsFactory.build(triggers);

    BodyFactory.applyTriggers(bodyData, triggers);
    AnusFactory.applyTriggers(anusData, triggers);
    MouthFactory.applyTriggers(mouthData, triggers);
    BreastsFactory.applyTriggers(breastsData, actorData, triggers);
    CockFactory.applyTriggers(cockData, actorData, triggers);
    PussyFactory.applyTriggers(pussyData, triggers);

    applyMagical(triggers);

    if (triggers.length > 0) {
      console.log(`Unresolved Triggers:`,triggers);
    //   throw `Error: Unresolved Triggers: ${JSON.stringify(triggers)}`;
    }

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
    EquipmentComponent.create(characterId);
    InventoryComponent.create(characterId);

    if (breastsData) { BreastsComponent.create(characterId, breastsData); }
    if (cockData) { CockComponent.create(characterId, cockData); }
    if (pussyData) { PussyComponent.create(characterId, pussyData); }

    Console.log('CharacterData',{ system:'CharacterFactory', data:{
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

    return characterId;
  }

  function buildNames(options, actorData, triggers) {
    if (options.name) { actorData.name = options.name; }
    if (options.title) { actorData.title = options.title; }
    if (options.surname) { actorData.surname = options.surname; }

    if (actorData.name == null) {
      const nameData = Name.getRandom(actorData.gender, actorData.species);
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

    if (StringHelper.longestCommonSubstring(actorData.name, actorData.surname||'') > 3) {
      throw `Character Rejected: Name[${actorData.name}] and Surname[${actorData.surname}] are too similar.`
    }
  }

  function buildPussy(sex, actorData) {
    return [Gender.futa, Gender.female].includes(sex) ? PussyFactory.build(actorData) : null;
  }

  function buildBreasts(sex, actorData) {
    return (Species.lookup(actorData.species).getBody().breasts && [Gender.futa, Gender.female].includes(sex)) ?
      BreastsFactory.build(actorData) : null;
  }

  function buildCock(sex, actorData) {
    return [Gender.futa, Gender.male].includes(sex) ? CockFactory.build(actorData) : null;
  }

  // TODO: The magical trigger will need to randomly select a spell or two to give to a character, then it will need to
  //       add mana enough to cast their spells. The function will need to produce a mana component and a list of known
  //       spells.
  function applyMagical(triggers) {
    if (triggers.includes('magical')) {
      Console.log(`Applied Magical`,{ system:'CharacterFactory', level:3 });
      ArrayHelper.remove(triggers, 'magical');
    }
  }

  // If a character is non-binary I still need to know their biological sex to build their various naughty bits. This
  // value needs to be randomly chosen from the species gender ratio map with the enby option removed. Non-binary
  // Kobolds and Vermens however are always biologically male.
  function getBiologicalSex(species, gender) {
    if (gender !== Gender.enby) { return gender; }

    if (['kobold','vermen'].includes(species.getCode())) {
      return Gender.male;
    }

    const ratios = species.getGenderRatio();
    return Random.fromFrequencyMap({
      male: ratios.male,
      female: ratios.female,
      futa: ratios.futa,
    });
  }

  return Object.freeze({ build });

})();
