global.MouthBuilder = (function() {

  function build(character, options) {
    if (character.id == null) { throw 'Character must be persisted.'; }

    let params = CharacterBuilder.baseline('mouth', options, character.species, {
      character_id: character.id,
      throatWidth: null,
      tongueShape: 'normal',
      tongueLength: null,
      width: null,
      smashLevel: 0,
      smashCount: 0,
      smashHealing: 0,
      smashTeethMissing: 0,
      cutLevel: 0,
      cutCount: 0,
      cutHealing: 0,
    });

    if (params.throatWidth == null) { params.throatWidth = getThroatWidth(character); }
    if (params.tongueLength == null) { params.tongueLength = getTongueLength(character.species); }
    if (params.width == null) { params.width = getWidth(character); }

    return Mouth.create(params);
  }

  // Throat width is based off of the character's species average height. For
  // a human the average throat width is about 20mm. I couldn't find any data
  // on how far a human throat can reasonably stretch, so I'm just going to say
  // it's about 35mm. I take that width and scale it to the body scale, unless
  // the species overrides it. A naga could probably swollow a bowling ball and
  // succubui need to get a lot of dicks into their throats at once.
  function getThroatWidth(character) {
    let average = ObjectUtility.fetch(character.species, 'bodyOptions', 'mouth', 'maxThroatWidth') || (35 * character.species.sizeFactor());
    return Random.tightlyBound(average, Math.round(average/10));
  }

  // Tongue length is also mostly determined by the species and has a bit more
  // variability than throat width.
  function getTongueLength(species) {
    let average = ObjectUtility.fetch(species, 'bodyOptions', 'mouth', 'averageTongueLength') || 60;
    return Random.tightlyBound(average, Math.round(average/4));
  }

  // The mouth width is mostly determined by species. There is a lot of
  // variety between species, but most elf-like species will just use the
  // default.
  function getWidth(character) {
    let width = ObjectUtility.fetch(character.species, 'bodyOptions', 'mouth', 'maxMouthWidth') || 48;

    // Capriens are uniquely dimorphous.
    if (character.speciesCode == 'caprien') {
      width = (character.genderCode == 'male') ? 200 : 48;
    }

    if (character.genderCode == 'male') { width = Math.round(width * 1.1); }
    if (character.genderCode == 'futa') { width = Math.round(width * 1.05); }

    return Math.round(width * Random.between(90,110)/100);
  }

  return { build:build }

})();
