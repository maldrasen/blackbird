global.TitsBuilder = (function() {

  function build(character, options) {
    if (character.id == null) { throw 'Character must be persisted.'; }
    if (character.gender.tits == false) { return; }
    if (character.species.bodyOptions.tits == false) { return; }

    let params = CharacterBuilder.baseline('tits', options, character.species, {
      character_id: character.id,
      count: 2,
      sizeClass: null,
      sizeScale: null,
      shape: null,
      lactationLevel: 0,
      lactationFactor: 1,
      blightLevel: 0,
      blightPlace: null,
      blightCount: 0,
      blightHealing: 0,
      burnLevel: 0,
      burnPlace: null,
      burnCount: 0,
      burnHealing: 0,
      smashLevel: 0,
      smashCount: 0,
      smashPlace: null,
      smashHealing: 0,
      smashShape: null,
      description: null,
    });

    if (params.sizeClass == null) { params.sizeClass = Random.fromFrequencyMap(character.species.bodyOptions.tits.size); }
    if (params.sizeScale == null) { params.sizeScale = Random.upTo(100); }
    if (params.shape == null)     { params.shape = randomShape(params.sizeClass); }

    return Tits.create(params);
  }

  function randomShape(sizeClass) {
    let smallMap =   { perky:80, round:50,     conical:80  };
    let averageMap = { perky:60, round:120,    dangling:80 };
    let hugeMap =    { round:50, dangling:100, bell:80     };

    return Random.fromFrequencyMap({
      zero:    { flat:100 },
      tiny:    smallMap,
      small:   smallMap,
      average: averageMap,
      big:     averageMap,
      huge:    hugeMap,
      monster: hugeMap,
    }[sizeClass]);
  }

  return {
    build: build,
    randomShape: randomShape,
  }

  return { build:build }

})();
