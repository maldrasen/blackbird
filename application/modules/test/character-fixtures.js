global.CharacterFixtures = (function() {

  function genericMale(options) {
    const id = Registry.createEntity();

    ActorComponent.create(id, options.actor || {
      name:'Greg', gender:Gender.male, species:'elf',
    });

    genericAttributes(id, options.attributes);
    genericArousal(id, options.arousal);
    genericPersonality(id, options.personality);
    genericBody(id, options.body);
    genericAnus(id, options.anus);
    genericCock(id, options.cock);
    genericMouth(id, options.mouth);
    genericSexualPreferences(id, options.sexualPreferences);
    genericAspects(id, options.aspects);

    SensitivitiesComponent.create(id, options.sensitivities || {
      cock:3, anus:2, prostate:2
    });

    return id;
  }

  function genericFemale(options) {
    const id = Registry.createEntity();

    ActorComponent.create(id, options.actor || {
      name:'Karen', gender:Gender.female, species:'elf',
    });

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

    SensitivitiesComponent.create(id, options.sensitivities || {
      clit:3, pussy:3, anus:2, nipple:1
    });

    return id;
  }

  function genericAttributes(id, attributes = null) {
    return AttributesComponent.create(id, attributes || {
      strength: 25, dexterity: 20, vitality: 15, intelligence: 20, beauty: 15
    });
  }

  function genericArousal(id, arousal = null) {
    return ArousalComponent.create(id, arousal || { arousal:0 });
  }

  function genericPersonality(id, personality = null) {
    PersonalityComponent.create(id, personality || {
      sanity: 100, calm: 30, kind: 20, violent: 10
    });
  }

  function genericBody(id, body = null) {
    BodyComponent.create(id, body || {
      height: 1500, skinType: "skin", eyeShape: "round", eyeColor: "black", bodySmell: "pine",
      earShape: "elf", skinColor: "warm", hairColor: "darkBrown"
    });
  }

  function genericAnus(id, anus = null) {
    return AnusComponent.create(id, anus || {
      placement: "normal", shape: "normal", minWidth: 0, maxWidth: 60, prolapseLength: 0
    });
  }

  function genericBreasts(id, breasts = null) {
    return BreastsComponent.create(id, breasts || {
      breastCount:2, breastSize:"average", breastFirmness:"medium", nippleShape:"normal",
      nippleShade:0, orificeMinWidth:0, orificeMaxWidth:0, lactationFactor:0,
      relativeBreastVolume:815, absoluteBreastVolume:683, breastShape:"average",
      nippleLength:20, nippleWidth:15, areolaWidth:30
    });
  }

  function genericCock(id, cock = null) {
    return CockComponent.create(id, cock || {
      count: 1, placement: "normal", shape: "normal", minUrethraWidth: 0, maxUrethraWidth: 3,
      size: "average", length: 200, width: 36, cumVolume: 9, flaccidLength: 120, testicleWidth: 36
    });
  }

  function genericMouth(id, mouth = null) {
    return MouthComponent.create(id, mouth || {
      placement: "normal", maxMouthWidth: 55, maxThroatWidth: 30, tongueLength: 55,
      tongueShape: "normal", comfortableThroatDepth: 100,
    });
  }

  function genericPussy(id, pussy = null) {
    return PussyComponent.create(id, pussy || {
      placement:"normal", shape:"normal", minPussyWidth:0, minCervixWidth:0,
      maxCervixWidth:0, minUrethraWidth:0, outerLabiaSize:3, prolapseLength:0,
      maxPussyWidth:47, maxPussyDepth:266, maxUrethraWidth:8, clitLength:14,
      clitWidth:6, innerLabiaLength:60
    });
  }

  function genericSexualPreferences(id, preferences = null) {
    SexualPreferencesComponent.create(id, preferences || {
      gynophilic: 20, androphilic: 20
    });
  }

  function genericAspects(id, aspects = null) {
    return AspectsComponent.create(id, aspects || {});
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
  });

})();