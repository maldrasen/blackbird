global.NipplesBuilder = (function() {

  function build(character, options) {
    if (character.id == null) { throw 'Character must be persisted.'; }
    if (character.species.bodyOptions.nipples == false) { return; }

    let params = CharacterBuilder.baseline('nipples', options, character.species, {
      character_id: character.id,
      count: 1,
      width: null,
      length: null,
      shade: Random.upTo(5)+1,
      shape: 'normal',
      orificeWidth: 0,
      orificeElasticity: 0,
    });

    // Set a default shape for the character's gender. Males by default have
    // small boring nipples.
    if (params.shape == null) {
      params.shape = (character.gender.code == 'male') ? 'normal' : randomFemaleNippleShape();
    }

    // Also, ensure that even minotaur males have normal nipples.
    if (params.shape == 'teat' && character.gender.code == 'male') {
      params.shape = 'normal';
    }

    // If width or length is null go ahead and randomize both. If the size is
    // important then both attributes should be set.
    if (params.width == null || params.length == null) {
      randomNippleSize(params, character);
    }

    return Nipples.create(params);
  }

  function randomFemaleNippleShape() {
    return Random.fromFrequencyMap({
      normal: 100,
      puffy: 20,
      inverted: 20,
      star: 1,
      heart: 1 });
  }

  function randomNippleSize(params, character) {
    // If a character is male then their base nipple size is around 2cm, but we
    // want to scale to body size. So assume a character is 160cm tall, multiply
    // height by 0.0125 to get nipple width. Females should be about 3cm, so
    // ratio is a bit bigger.
    let width = (character.gender.code == 'male') ?
      (character.species.randomHeight(character.gender.code) * 0.0125):
      (character.species.randomHeight(character.gender.code) * 0.01875);

    // Length is about a tenth of the width for normal nipples.
    let length = width * (0.9+Random.upTo(100)/1000)/10;

    // Adjust values for nipple shapes. Cock, pussy and mouth shapes are handled
    // by their associated classes.
    if (params.shape == 'puffy')    { length = width; }
    if (params.shape == 'inverted') { length = 1; }
    if (params.shape == 'star')     { width = width*2; }
    if (params.shape == 'heart')    { width = width*2; }
    if (params.shape == 'teat')     { length = (2+Random.upTo(2))*width; }

    let extraLength = ObjectUtility.fetch(character.species.bodyOptions,'nipples','extraLength')
    let extraWidth = ObjectUtility.fetch(character.species.bodyOptions,'nipples','extraWidth')
    if (extraLength) { width += Random.upTo(extraWidth) }
    if (extraWidth)  { width += Random.upTo(extraLength) }

    params.width = Math.round(width);
    params.length = Math.round(length);
  }

  return { build:build }

})();
