global.BodyBuilder = (function() {

  // TODO: Face types should come from a map on the species. Just so we don't
  //       give nymphs hard battlescarred faces and ogres sweet boyish faces.
  //
  function build(character, options) {
    if (character.gender == null)  { throw 'Gender must be set before body can be built.'; }
    if (character.species == null) { throw 'Species must be set before body can be built.'; }
    if (character.id == null)      { throw 'Character must be persisted.'; }

    let bodyOptions = options.body || {};
    let params = {
      faceType:   bodyOptions.faceType   || Random.from(Body.FACE_TYPES),
      height:     bodyOptions.height     || character.species.randomHeight(character.genderCode),
      eyeColor:   bodyOptions.eyeColor   || character.species.random('eye'),
      scaleColor: bodyOptions.scaleColor || character.species.random('scale'),
      tailShape:  bodyOptions.tailShape  || character.species.bodyOptions.tailShape || null,
      hornShape:  bodyOptions.hornShape  || character.species.random('horn'),
      faceShape:  character.species.getFaceShape(character.genderCode),
      pierceLevel: 0,
      pierceCount: 0,
      pierceHealing: 0,
      description: null,
    }

    let skinColor = bodyOptions.skinColor || character.species.random('skin',character.genderCode);
    if (skinColor) {
      params.skinShade = bodyOptions.skinShade || Random.upTo(5)+1;
      params.skinColor = skinColor;
    }

    let furColor = bodyOptions.furColor || character.species.random('fur',character.genderCode);
    if (furColor) {
      params.furShade = bodyOptions.furShade || Random.upTo(5)+1
      params.furColor = furColor;
    }

    let hairColor =  bodyOptions.hairColor || character.species.random('hair',character.genderCode);
    params.hairColor = (hairColor == 'human') ? randomHumanHairColor() : hairColor;

    // Caprien edge case, the caprien males don't have hair, only fur.
    if (character.speciesCode == 'caprien' && character.genderCode == 'male') { params.hairColor = null; }

    if (params.skinColor == 'dragon') { params.skinColor = params.scaleColor; }
    if (params.eyeColor == 'dragon') { params.eyeColor = params.scaleColor; }
    if (params.eyeColor == 'human') { params.eyeColor = randomHumanEyeColor(); }
    if (params.furColor == 'matchHair') { params.furColor = params.hairColor; }

    return Body.create(params);
  }

  function randomHumanHairColor() {
    return Random.fromFrequencyMap({
      'black':            100,
      'dark-brown':       300,
      'brown':            200,
      'light-brown':      200,
      'chestnut':         30,  // a darker brown/red
      'auburn':           30,  // a medium brown/red
      'platinum-blond':   30,
      'golden-blond':     80,
      'blond':            100,
      'dark-blond':       200,
      'strawberry-blond': 50,
      'red':              30,
      'copper':           30,
      'white':            20,
    });
  }

  function randomHumanEyeColor() {
    return Random.fromFrequencyMap({
      'brown': 60,
      'blue': 10,
      'hazel': 5,
      'amber': 5,
      'green': 2,
    });
  }

  return {
    build: build,
  };

})();
