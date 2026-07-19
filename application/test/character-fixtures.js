global.CharacterFixtures = (function() {

  // When we build a player object, we set the player entity id in the GameState. This function could take character
  // options if I wanted to test a specific player type.
  function randomPlayer() {
    const player = PlayerFactory.build({
      style:Random.from(['domination','degradation','sadism'])
    });
    GameSystem.getState().setPlayer(player);
    return player;
  }

  // Creating random characters needs a player to exist in order to create their feelings. This fixture is still using
  // placeholder values for the control and feelings components. Should figure out what the default values there are.
  function randomCharacters(count, options={}) {
    const characters = []
    const player = GameSystem.getState().getPlayer();
    const location = GameSystem.getState().getCurrentLocation();

    for (let i=0; i<count; i++) {
      characters.push(CharacterFactory.build(options));
    }

    characters.forEach(id => {
      ControlledComponent.create(id,{ control:0 });
      ArousalComponent.update(id,{ arousal:Random.between(0,25) });

      if (location) {
        SituatedComponent.create(id,{ currentLocation:location });
      }

      if (player) {
        FeelingsComponent.create(id,{ target:player,
          affection: Random.between(100,400),
          respect: Random.between(100,400),
          fear: Random.between(0,200)
        });
      }
    });

    return characters;
  }

  function genericMale(options) {
    const id = Registry.createEntity();
    const defaultSensitivities = { cock:3, anus:2, prostate:2 };
    const defaultActor = { name:'Greg', gender:Gender.male, species:SpeciesCode.elf };

    ActorComponent.create(id, { ...defaultActor, ...(options.actor||{}) });
    SensitivitiesComponent.create(id, { ...defaultSensitivities, ...(options.sensitivities||{}) });

    genericAttributes(id, options.attributes);
    genericArousal(id, options.arousal);
    genericHealth(id, options.health);
    genericPersonality(id, options.personality);
    genericBody(id, options.body);
    genericAnus(id, options.anus);
    genericCock(id, options.cock);
    genericMouth(id, options.mouth);
    genericSexualPreferences(id, options.sexualPreferences);
    genericAspects(id, options.aspects);
    genericSkills(id, options.skills);

    EquipmentComponent.create(id);
    InventoryComponent.create(id);
    ExperienceComponent.create(id);

    return id;
  }

  function genericFemale(options) {
    const id = Registry.createEntity();
    const defaultSensitivities = { clit:3, pussy:3, anus:2, nipple:1 };
    const defaultActor = { name:'Karen', gender:Gender.female, species:SpeciesCode.elf };

    ActorComponent.create(id, { ...defaultActor, ...(options.actor||{}) });
    SensitivitiesComponent.create(id, { ...defaultSensitivities, ...(options.sensitivities||{}) });

    genericAttributes(id, options.attributes);
    genericArousal(id, options.arousal);
    genericHealth(id, options.health);
    genericPersonality(id, options.personality);
    genericBody(id, options.body);
    genericAnus(id, options.anus);
    genericBreasts(id, options.breasts);
    genericMouth(id, options.mouth);
    genericPussy(id, options.pussy);
    genericSexualPreferences(id, options.sexualPreferences);
    genericAspects(id, options.aspects);
    genericSkills(id, options.skills);

    EquipmentComponent.create(id);
    InventoryComponent.create(id);
    ExperienceComponent.create(id);

    return id;
  }

  function genericAttributes(id, options={}) {
    const defaultAttributes = { strength:25, dexterity:20, vitality:15, intelligence:20, beauty:15 };
    return AttributesComponent.create(id, { ...defaultAttributes, ...options });
  }

  function genericArousal(id, options={}) {
    const defaultArousal = { arousal:0 };
    return ArousalComponent.create(id, { ...defaultArousal, ...options });
  }

  function genericHealth(id, options={}) {
    const defaultHealth = { currentStamina:2000, currentHealth:100, maxHealth:100 };
    return HealthComponent.create(id, { ...defaultHealth, ...options });
  }

  function genericPersonality(id, options={}) {
    const defaultPersonality = { archetype:ArchetypeCode.reserved, sanity:100 };
    return PersonalityComponent.create(id, { ...defaultPersonality, ...options });
  }

  function genericBody(id, options={}) {
    const defaultBody = { height:1500, skinType:'skin', eyeShape:'round', eyeColor:'black', bodySmell:'pine',
      earShape:'elf', skinColor:'warm', hairColor:'darkBrown' }
    return BodyComponent.create(id, { ...defaultBody, ...options });
  }

  function genericAnus(id, options={}) {
    const defaultAnus = { placement:'normal', shape:'normal', minWidth:0, maxWidth:60, prolapseLength:0 }
    return AnusComponent.create(id, { ...defaultAnus, ...options });
  }

  function genericBreasts(id, options={}) {
    const defaultBreasts = { breastCount:2, breastSize:'average', breastFirmness:'medium', nippleShape:'normal',
      nippleShade:0, orificeMinWidth:0, orificeMaxWidth:0, lactationFactor:0, relativeBreastVolume:815,
      absoluteBreastVolume:683, breastShape:'average', nippleLength:20, nippleWidth:15, areolaWidth:30 };
    return BreastsComponent.create(id, { ...defaultBreasts, ...options });
  }

  // Cocks are complex enough that simply merging some default options with the argument options leads to some weird
  // cocks where the ratios between the various properties aren't correct. Instead, I've used the CockFactory to build
  // some actual components that we can use as canned cocks.
  function genericCock(id, code) {
    if (typeof code === 'object') { throw new Error('this uses a code now.') }

    const smallCock = { count:1, size:'small', placement:'normal', shape:'normal', minUrethraWidth:0,
      maxUrethraWidth:3, length:116, width:28, cumVolume:4, flaccidLength:77, testicleWidth:32 };

    const averageCock = { count:1, size:'average', placement:'normal', shape:'normal', minUrethraWidth:0,
      maxUrethraWidth:3, length:200, width:36, cumVolume:9, flaccidLength:120, testicleWidth:36 };

    const huge = { count:1, size:'huge', placement:'normal', shape:'normal', minUrethraWidth:0,
      maxUrethraWidth:5, length:403, width:58, cumVolume:36, flaccidLength:234, testicleWidth:48 };

    const hugeHorse = { count:1, size:'huge', placement:'normal', shape:'horse', minUrethraWidth:0,
      maxUrethraWidth:5, length:500, width:44, cumVolume:340, flaccidLength:120, testicleWidth:51,
      headFlare:194 };

    const hugeDog = { count:1, size:'huge', placement:'normal', shape:'dog', minUrethraWidth:0,
      maxUrethraWidth:5, length:342, width:45, cumVolume:182, flaccidLength:120, testicleWidth:44,
      knotRatio:136, knotFlare:143 };

    switch (code) {
      case 'small': return CockComponent.create(id, smallCock);
      case 'huge': return CockComponent.create(id, huge);
      case 'hugeHorse': return CockComponent.create(id, hugeHorse);
      case 'hugeDog': return CockComponent.create(id, hugeDog);
      default: return CockComponent.create(id, averageCock);
    }
  }

  function genericMouth(id, options={}) {
    const defaultMouth = { placement:'normal', maxMouthWidth:55, maxThroatWidth:30, tongueLength:55,
      tongueShape:'normal', comfortableThroatDepth:100 };
    return MouthComponent.create(id, { ...defaultMouth, ...options });
  }

  function genericPussy(id, options={}) {
    const defaultPussy ={ placement:'normal', shape:'normal', minPussyWidth:0, minCervixWidth:0, maxCervixWidth:0,
      minUrethraWidth:0, outerLabiaSize:3, prolapseLength:0, maxPussyWidth:47, maxPussyDepth:266, maxUrethraWidth:8,
      clitLength:14, clitWidth:6, innerLabiaLength:60 };
    return PussyComponent.create(id, { ...defaultPussy, ...options });
  }

  function genericSexualPreferences(id, options={}) {
    const defaultPreferences = { gynophilic:20, androphilic:20 };
    return SexualPreferencesComponent.create(id, { ...defaultPreferences, ...options });
  }

  function genericAspects(id, options={}) {
    return AspectsComponent.create(id, options);
  }

  function genericSkills(id, options={}) {
    const skillsData = {};

    SkillsComponent.getSkills().forEach(code => {
      skillsData[code] = options[code] || 0;
    });

    return SkillsComponent.create(id, skillsData);
  }

  return Object.freeze({
    randomPlayer,
    randomCharacters,
    genericMale,
    genericFemale,
    genericAttributes,
    genericArousal,
    genericPersonality,
    genericBody,
    genericAnus,
    genericBreasts,
    genericCock,
    genericMouth,
    genericPussy,
    genericSexualPreferences,
    genericAspects,
    genericSkills,
  });

})();
