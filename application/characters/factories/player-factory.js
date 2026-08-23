global.PlayerFactory = (function() {

  // Currently the player is always a male human. New species and body types will either be unlocked through gameplay,
  // or I'll them as options in character creation right at the start. This is fine for early in development though.
  function build(options={}) {
    const playerId = Registry.createEntity();
    const triggers = [...(options.triggers||[])];

    // Eventually we'll want to set this style as an option in character creation as well.
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

    try {
      const state = CharacterFactory.startBuild({
        species: options.species || SpeciesCode.human,
        gender: options.gender || Gender.male,
        name: options.name || 'Greg',
        surname: options.surname,
        triggers: triggers,
      });

      AspectsFactory.build();
      AttributesFactory.build();
      HealthFactory.build();
      ManaFactory.build();

      BodyFactory.build();
      AnusFactory.build();
      MouthFactory.build();
      PussyFactory.build();
      BreastsFactory.build();
      CockFactory.build();

      SkillsFactory.build();

      // Triggers are applied in the same way, though I'm not sure if player
      // creation can produce triggers. This could be useful in a spec though.
      BodyFactory.applyTriggers();
      AnusFactory.applyTriggers();
      MouthFactory.applyTriggers();
      BreastsFactory.applyTriggers();
      CockFactory.applyTriggers();
      PussyFactory.applyTriggers();

      // Build all starting player components.
      ActorComponent.create(playerId, state.getActor());
      ArousalComponent.create(playerId, { arousal:0 });
      AttributesComponent.create(playerId, state.getAttributes());
      HealthComponent.create(playerId, state.getHealth());
      ManaComponent.create(playerId, state.getMana());
      SkillsComponent.create(playerId, state.getSkills());
      AspectsComponent.create(playerId, state.getAspects());
      AnusComponent.create(playerId, state.getAnus());
      BodyComponent.create(playerId, state.getBody());
      MouthComponent.create(playerId, state.getMouth());

      // TODO: These values are important to the sensation calculations. We
      //       mostly just need to know when the player is going to cum. The
      //       player doesn't gain anima so, there's no way to upgrade these
      //       values, so they're either going to need a different upgrade path,
      //       or will have a simplified version of these components.

      SexualPreferencesComponent.create(playerId, {});
      SensitivitiesComponent.create(playerId, {});

      if (state.getBreasts()) { BreastsComponent.create(playerId, state.getBreasts()); }
      if (state.getCock()) { CockComponent.create(playerId, state.getCock()); }
      if (state.getPussy()) { PussyComponent.create(playerId, state.getPussy()); }

      EquipmentComponent.create(playerId);
      InventoryComponent.create(playerId);
      ExperienceComponent.create(playerId);

      return playerId;
    }
    finally {
      CharacterFactory.endBuild();
    }
  }

  return { build };

})();
