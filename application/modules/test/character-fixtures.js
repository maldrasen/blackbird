global.CharacterFixtures = (function() {

  function genericMale(options) {
    const id = Registry.createEntity();
    const defaultSensitivities = { cock:3, anus:2, prostate:2 };
    const defaultActor = { name:'Greg', gender:Gender.male, species:'elf' };

    ActorComponent.create(id, { ...defaultActor, ...(options.actor||{}) });
    SensitivitiesComponent.create(id, { ...defaultSensitivities, ...(options.sensitivities||{}) });

    genericAttributes(id, options.attributes);
    genericArousal(id, options.arousal);
    genericPersonality(id, options.personality);
    genericBody(id, options.body);
    genericAnus(id, options.anus);
    genericCock(id, options.cock);
    genericMouth(id, options.mouth);
    genericSexualPreferences(id, options.sexualPreferences);
    genericAspects(id, options.aspects);
    genericSkills(id, options.skills);

    return id;
  }

  function genericFemale(options) {
    const id = Registry.createEntity();
    const defaultSensitivities = { clit:3, pussy:3, anus:2, nipple:1 };
    const defaultActor = { name:'Karen', gender:Gender.female, species:'elf' };

    ActorComponent.create(id, { ...defaultActor, ...(options.actor||{}) });
    SensitivitiesComponent.create(id, { ...defaultSensitivities, ...(options.sensitivities||{}) });

    genericAttributes(id, options.attributes);
    genericArousal(id, options.arousal);
    genericPersonality(id, options.personality);
    genericBody(id, options.body);
    genericAnus(id, options.anus);
    genericBreasts(id, options.breasts);
    genericMouth(id, options.mouth);
    genericPussy(id, options.pussy);
    genericSexualPreferences(id, options.sexualPreferences);
    genericAspects(id, options.aspects);
    genericSkills(id, options.skills);

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

  function genericPersonality(id, options={}) {
    const defaultPersonality = { sanity:100, calm:30, kind:20, violent:10 };
    return PersonalityComponent.create(id, { ...defaultPersonality, ...options });
  }

  function genericBody(id, options={}) {
    const defaultBody = { height:1500, skinType:"skin", eyeShape:"round", eyeColor:"black", bodySmell:"pine",
      earShape:"elf", skinColor:"warm", hairColor:"darkBrown" }
    return BodyComponent.create(id, { ...defaultBody, ...options });
  }

  function genericAnus(id, options={}) {
    const defaultAnus = { placement:"normal", shape:"normal", minWidth:0, maxWidth:60, prolapseLength:0 }
    return AnusComponent.create(id, { ...defaultAnus, ...options });
  }

  function genericBreasts(id, options={}) {
    const defaultBreasts = { breastCount:2, breastSize:"average", breastFirmness:"medium", nippleShape:"normal",
      nippleShade:0, orificeMinWidth:0, orificeMaxWidth:0, lactationFactor:0, relativeBreastVolume:815,
      absoluteBreastVolume:683, breastShape:"average", nippleLength:20, nippleWidth:15, areolaWidth:30 };
    return BreastsComponent.create(id, { ...defaultBreasts, ...options });
  }

  function genericCock(id, options={}) {
    const defaultCock = { count:1, placement:"normal", shape:"normal", minUrethraWidth:0, maxUrethraWidth:3,
      size:"average", length:200, width:36, cumVolume:9, flaccidLength:120, testicleWidth:36 };
    return CockComponent.create(id, { ...defaultCock, ...options });
  }

  function genericMouth(id, options={}) {
    const defaultMouth = { placement:"normal", maxMouthWidth:55, maxThroatWidth:30, tongueLength:55,
      tongueShape:"normal", comfortableThroatDepth:100 };
    return MouthComponent.create(id, { ...defaultMouth, ...options });
  }

  function genericPussy(id, options={}) {
    const defaultPussy ={ placement:"normal", shape:"normal", minPussyWidth:0, minCervixWidth:0, maxCervixWidth:0,
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
