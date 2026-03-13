global.PlayerFactory = (function() {

  // Currently the player is always a male human. New species and body types will either be unlocked through gameplay,
  // or I'll them as options in character creation right at the start. This is fine for early in development though.
  function build(options={}) {
    const playerId = Registry.createEntity();
    const speciesCode = options.species || SpeciesCode.human;
    const genderCode = options.gender || Gender.male;
    const triggers = options.triggers || [];

    if (options.style) {
      if (options.style === 'domination') {
        triggers.push('domination<10,20>');
        triggers.push('dominant[20]');
      }
      if (options.style === 'degradation') {
        triggers.push('degradation<10,20>');
        triggers.push('debaser[20]');
      }
      if (options.style === 'sadism') {
        triggers.push('sadism<10,20>');
        triggers.push('sadistic[20]');
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
    const skillsData = SkillsFactory.build(triggers);

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

    EquipmentComponent.create(playerId);
    InventoryComponent.create(playerId);

    return playerId;
  }

  return Object.freeze({ build });

})();
