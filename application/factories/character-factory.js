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

    const triggers = options.triggers || [];
    const characterId = Registry.createEntity();
    const speciesCode = options.species || Random.fromFrequencyMap(SpeciesFrequency);
    const species = Species.lookup(speciesCode);
    const genderCode = options.gender || Random.fromFrequencyMap(species.getGenderRatio());

    const actorData = { gender:genderCode, species:speciesCode };
    const attributesData = rollAttributes(genderCode, speciesCode);
    const healthData = rollHealth(attributesData);
    const personalityData = rollPersonality(genderCode, speciesCode);

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

    log(StringHelper.pack(`Building[${characterId}]: ${actorData.title||''} ${actorData.name} ${actorData.surname||''}
        [${genderCode} ${speciesCode}]`),{ system:'CharacterFactory', data:{ triggers }});

    const bodyData = BodyFactory.build(actorData, attributesData, triggers);

    log('BodyData',{ system:'CharacterFactory', data:bodyData });

    // Sexuality used to set sexual preferences for gynophilic and androphilic. A straight futa is gynophilic, a gay
    // futa is androphilic (because of butt stuff). Bi is positive in both. Ace is negative in both.
    const sexuality = options.sexuality || Random.fromFrequencyMap(species.getSexualityRatio());

    // TODO: Use the list of triggers to make adjustments to the body, sexual preferences and other components. If we
    //       find that we've generated a body or sexual preferences that's incompatible with the triggers, we can try
    //       return build(options) again to try once again. We should probably add a counter to the options so that we
    //       only retry a few time and just eventually return an invalid character if we never get a valid character
    //       for some reason. This would be a pretty major bug though so we'd need to print out all the information we
    //       can to determine why so many characters are incompatible. Because the triggers can come from the options
    //       though this situation can be caused by an input like triggers:['flat-chest','huge-tits']

    Registry.createActorComponent(characterId, actorData);
    Registry.createArousalComponent(characterId, { arousal:0 });
    Registry.createAttributesComponent(characterId, attributesData);
    Registry.createBodyComponent(characterId, bodyData);
    Registry.createHealthComponent(characterId, healthData);
    Registry.createPersonalityComponent(characterId, personalityData);

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

    const attributesComponent = rollAttributes(genderCode, speciesCode);
    const healthComponent = rollHealth(attributesComponent);

    Registry.createActorComponent(playerId, actorComponent);
    Registry.createArousalComponent(playerId, arousalComponent);
    Registry.createAttributesComponent(playerId, attributesComponent);
    Registry.createHealthComponent(playerId, healthComponent);

    return playerId;
  }

  // I don't think we roll attributes in any place other than this character factory. If so we can move this to the
  // Attributes component or something.
  function rollAttributes(gender,species) {
    const diceLevels = { F:1, D:2, C:3, B:4, A:5, S:6, SS:7, SSS:8 }
    const speciesMap = Species.lookup(species).getAttributes();
    const attributes = {};

    ['strength','dexterity','vitality','intelligence','beauty'].forEach(code => {
      let dice = diceLevels[speciesMap[code]];

      if (code === 'strength' && ['male','futa'].includes(gender)) { dice += 1 }
      if (code === 'beauty' && ['female','futa'].includes(gender)) { dice += 1 }

      attributes[code] = Random.rollDice({ x:dice, d:10 });

      if (attributes[code] < 5) { attributes[code] = 5; }
    });

    return attributes;
  }

  // Health is based on the character's vitality and rolled randomly. If we have a mechanism for adding a point
  // of vitality, it should also roll and add more health points as well. Baseline health is simply (vitality)d10.
  // Health and current health are the only values currently tracked by the health component.
  function rollHealth(attributes) {
    const health = Random.rollDice({ x:attributes.vitality, d:10 });
    const stamina = Attributes.createWrapper({ data:attributes }).getMaxStamina();

    return { currentStamina:stamina, currentHealth:health, maxHealth:health };
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
