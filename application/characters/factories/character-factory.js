global.CharacterFactory = (function() {

  let state;

  // Build a random character given the options:
  //   gender:     Gender code
  //   species:    Species code
  //   name:       String (for unique characters)
  //   title:      String (for unique characters)
  //   surname:    String (for unique characters)
  //   triggers:   Detailed in the documentation
  //   archetypes: Archetype frequency map (from a base monster), used when no name trigger sets an archetype
  //   sexuality:  (straight, gay, bi, ace)
  //   skills:     Default skills map
  //
  function build(options={}) {
    if (options.gender && options.species == null) {
      throw new Error(`If you specify a gender, you should also specify a species.`);
    }

    try {
      for (let attempts=0; attempts<10; attempts++) {
        let characterId = Registry.createEntity();
        try {
          return buildLoop(characterId, options);
        }
        catch(error) {
          Registry.deleteEntity(characterId);

          error.message.match(/Character Rejected/) ?
            Console.log(error.message, { System:'CharacterFactory', level:3 }):
            Console.log(error,{ system:'CharacterFactory', type:LogType.warning, data:{ options }});
        }
      }
    }
    finally {
      endBuild();
    }

    Console.log(`Cannot create a character using these options: ${JSON.stringify(options)}`,{
      system: 'CharacterFactory',
      type: LogType.error,
      data: { options:options },
    });

    throw new Error(`Cannot create character.`);
  }

  function startBuild(options={}) {
    state = CharacterFactoryState(options);
    return state;
  }

  function getState() { return state; }
  function endBuild() { state = null; }

  // The buildLoop() will throw an exception to reject a character. This can happen when we randomly pick incompatible
  // traits, and it's easier to start over from scratch than to figure out how to back out of bad decisions.
  function buildLoop(characterId, options) {
    startBuild(options);

    assertGenderInSpecies(state.getGender(), state.getSpecies());
    buildNames();
    state.dedupeTriggers();

    const actor = state.getActor();
    Console.log(StringHelper.pack(`Building[${characterId}]: ${actor.title||''}
      ${actor.name} ${actor.surname||''} [${actor.gender} ${actor.species}]`),
      { system:'CharacterFactory', level:1 });

    BodyFactory.build();
    AnusFactory.build();
    MouthFactory.build();
    PussyFactory.build();
    CockFactory.build();
    BreastsFactory.build();

    // Add random mutators like strange hair colors or tails and shit.
    TriggerFactory.addRandomTriggers();

    AspectsFactory.build();
    AttributesFactory.build();
    HealthFactory.build();
    PersonalityFactory.build();
    SensitivitiesFactory.build();
    SkillsFactory.build();
    SexualityFactory.build();
    SexualPreferencesFactory.makeAdjustments();
    SexualHistoryFactory.build();
    BodyFactory.applyTriggers();
    AnusFactory.applyTriggers();
    MouthFactory.applyTriggers();
    BreastsFactory.applyTriggers();
    CockFactory.applyTriggers();
    PussyFactory.applyTriggers();

    // TODO: Add archetype flavors here
    applyMagical();

    const triggers = state.getTriggers();
    if (triggers.length > 0) {
      throw new Error(`Unresolved Triggers: ${JSON.stringify(triggers)}`);
    }

    createComponents(characterId);

    return characterId;
  }

  function assertGenderInSpecies(gender, species) {
    const genderMap = species.getGenderRatio();
    if (genderMap[gender] == null || genderMap[gender] < 1) {
      throw new Error(`Character Rejected: ${species.getName()} cannot be ${gender}`);
    }
  }

  // Names passed in through the options are set on the actor when the state is created, so this only needs to pick a
  // random name for a character who doesn't have one yet.
  function buildNames() {
    if (state.getName() == null) {
      const actor = state.getActor();
      const nameData = Name.getRandom(actor.gender, actor.species);
      state.addTriggers(nameData.name.triggers||[]);
      state.setActorData('name', nameData.name.name);

      if (nameData.title) {
        state.setActorData('title', nameData.title.name);
        state.addTriggers(nameData.title.triggers||[]);
      }
      if (nameData.surname) {
        state.setActorData('surname', nameData.surname.name);
        state.addTriggers(nameData.surname.triggers||[]);
      }
    }

    const named = state.getActor();
    if (StringHelper.longestCommonSubstring(named.name, named.surname||'') > 3) {
      throw new Error(`Character Rejected: Name[${named.name}] and Surname[${named.surname}] are too similar.`);
    }
  }

  function applyMagical() {
    if (state.takeTrigger('magical')) {
      Console.log(`Applied Magical`,{ system:'CharacterFactory', level:3 });
    }
  }

  // Once every data block in the state has been built and every trigger consumed, the character is assembled from
  // the state.
  function createComponents(characterId) {
    ActorComponent.create(characterId, state.getActor());
    AnimaComponent.createBaseline(characterId);
    AnimusComponent.createBaseline(characterId);
    AnusComponent.create(characterId, state.getAnus());
    ArousalComponent.create(characterId);
    AttributesComponent.create(characterId, state.getAttributes());
    BodyComponent.create(characterId, state.getBody());
    HealthComponent.create(characterId, state.getHealth());
    MouthComponent.create(characterId, state.getMouth());
    PersonalityComponent.create(characterId, state.getPersonality());
    SkillsComponent.create(characterId, state.getSkills());
    SensitivitiesComponent.create(characterId, state.getSensitivities());
    SexualPreferencesComponent.create(characterId, state.getSexualPreferences());
    SexualHistoryComponent.create(characterId, state.getSexualHistory());
    AspectsComponent.create(characterId, state.getAspects());
    EquipmentComponent.create(characterId);
    ExperienceComponent.create(characterId);
    InventoryComponent.create(characterId);

    if (state.getBreasts()) { BreastsComponent.create(characterId, state.getBreasts()); }
    if (state.getCock()) { CockComponent.create(characterId, state.getCock()); }
    if (state.getPussy()) { PussyComponent.create(characterId, state.getPussy()); }

    CacheComponent.build(characterId);

    Console.log('CharacterData',{ system:'CharacterFactory', data:{
      attributes: state.getAttributes(),
      personality: state.getPersonality(),
      body: state.getBody(),
      anus: state.getAnus(),
      breasts: state.getBreasts() || {},
      cock: state.getCock() || {},
      mouth: state.getMouth(),
      pussy: state.getPussy(),
      sensitivitiesData: state.getSensitivities(),
      sexualPreferences: state.getSexualPreferences(),
      sexualHistory: state.getSexualHistory(),
      aspects: state.getAspects(),
    }});
  }

  return Object.freeze({ build, startBuild, getState, endBuild });

})();
