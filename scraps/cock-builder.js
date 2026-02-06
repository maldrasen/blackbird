global.CockBuilder = (function() {

  function build(character, options) {
    if (character.id == null) { throw 'Character must be persisted.'; }
    if (character.gender.cock == false) { return; }

    let params = CharacterBuilder.baseline('cock', options, character.species, {
      character_id:     character.id,
      shape:            "normal",
      placement:        "normal",
      sheath:           null,
      count:            1,
      sizeClass:        Random.fromFrequencyMap(character.species.bodyOptions.cock.size),
      sizeScale:        Random.upTo(100),
      sizeFactor:       character.species.sizeFactor(),
      widthRatio:       null,
      knotWidthRatio:   null,
      knobHeight:       0,
      spineHeight:      0,
      minimumWidth:     20,
      ballsSizeFactor:  1,
      internalBalls:    false,
      blightLevel:      0,
      blightPlace:      null,
      blightCount:      0,
      blightHealing:    0,
      burnLevel:        0,
      burnPlace:        null,
      burnCount:        0,
      burnHealing:      0,
      smashLevel:       0,
      smashCount:       0,
      smashHealing:     0,
      smashShape:       null,
      description:      null,
    });

		if (params.widthRatio == null) {
      params.widthRatio = Cock.getWidthRatio(params.shape);
    }

    // If this is supposed to be a dog cock, but the width ratio isn't set we
    // generate a random width. Should be somewhere between 1.2 and 1.5.
    if (params.shape == 'dog' && params.knotWidthRatio == null) {
      params.knotWidthRatio = 1.2 + (Random.upTo(30)/100);
    }

    // The Caprien's have huge dangling goat balls. If a ballsSizeFactor
    // wasn't set, generate one between 1.2 and 1.8.
    if (character.species.code == 'caprien' && options.ballsSizeFactor == null) {
      params.ballsSizeFactor = 1.2 + (Random.upTo(60)/100);
    }

    return Cock.create(params);
  }

  // Each ball width is about the width of the character's cock.... which isn't going to work now because there is no size here...
  function aboutCockWidth(cockParams) {
    return Math.round(0.1548712 * cockParams.length * cockParams.widthRatio);
  }

  return { build:build }

})();
