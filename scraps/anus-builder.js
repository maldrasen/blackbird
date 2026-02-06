global.AnusBuilder = (function() {

  function build(character, options) {
    if (character.id == null) { throw 'Character must be persisted.'; }

    let params = CharacterBuilder.baseline('anus', options, character.species, {
      character_id:   character.id,
      shape:          Random.from(['normal','normal','puffy']),
      condition:      randomCondition(character.species),
      sizeClass:      Random.fromFrequencyMap(character.species.bodyOptions.cock.size),
      sizeScale:      Random.upTo(100),
      prolapseLength: 0,
      smashLevel:     0,
      smashCount:     0,
      smashHealing:   0,
      smashShape:     null,
      description:    null,
    });

    params.sizeFactor = character.species.sizeFactor();

    if (params.condition == 'loose') {
      if (params.sizeClass == 'small') { params.sizeClass= 'average'; }
    }
    if (params.condition == 'gaping') {
      if (params.sizeClass == 'small') { params.sizeClass = 'big'; }
      if (params.sizeClass == 'average') { params.sizeClass = 'big'; }
    }

    return Anus.create(params);
  }

  // Only a couple species have condition maps set, the default map to use is the elf map.
  function randomCondition(species) {
    return Random.fromFrequencyMap(
      ObjectUtility.fetch(species, 'bodyOptions', 'anus', 'conditionMap') ||
      Species.lookup('elf').bodyOptions.anus.conditionMap);
  }

  return { build:build }

})();
