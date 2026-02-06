global.PussyBuilder = (function() {

  function build(character, options) {
    if (character.id == null) { throw 'Character must be persisted.'; }
    if (character.gender.pussy == false) { return; }

    let params = CharacterBuilder.baseline('pussy', options, character.species, {
      character_id:     character.id,
      shape:            'normal',
      placement:        'normal',
      condition:        randomCondition(character.species),
      sizeClass:        Random.fromFrequencyMap(character.species.bodyOptions.cock.size),
      sizeScale:        Random.upTo(100),
      outerLabiaSize:   Random.upTo(5)+1,
      innerLabiaLength: Random.geometric(30)+10,
      clitLength:       Random.geometric(15),
      clitWidth:        Random.upTo(10)+5,
      prolapseLength:   0,
      blightLevel:      0,
      blightCount:      0,
      blightHealing:    0,
      burnLevel:        0,
      burnCount:        0,
      burnHealing:      0,
      smashLevel:       0,
      smashCount:       0,
      smashHealing:     0,
      smashShape:       null,
      description:      null,
    });

    params.sizeFactor = character.species.sizeFactor();

    return Pussy.create(params);
  }

  // Only a couple species have condition maps set, the default map to use is the elf map.
  function randomCondition(species) {
    return Random.fromFrequencyMap(
      ObjectUtility.fetch(species, 'bodyOptions', 'pussy', 'conditionMap') ||
      Species.lookup('elf').bodyOptions.pussy.conditionMap);
  }

  return { build:build }

})();
