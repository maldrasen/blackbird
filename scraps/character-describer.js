global.CharacterDescriber = (function() {

  // Update the entire character description. This is needed when a character's
  // name has changed or something else happens that might effect every part
  // description.
  async function updateAll(character) {
    const context = new Context();
    await context.addCharacter('C',character);

    const bodyDescriber =  new BodyDescriber(context);
    const anusDescriber =  new AnusDescriber(context);
    const cockDescriber =  new CockDescriber(context);
    const pussyDescriber = new PussyDescriber(context);
    const titsDescriber =  new TitsDescriber(context);

    await bodyDescriber.updateDescription();
    await anusDescriber.updateDescription();
    await cockDescriber.updateDescription();
    await pussyDescriber.updateDescription();
    await titsDescriber.updateDescription();
  }

  // Put together the full description from all of the various part
  // descriptions and return them as an HTML string.
  async function fullDescription(character) {
    const parts = await character.getCompleteBody();

    let description = `
      <div class='full-description'>
        ${generalDescription(character,parts)}
        ${parts.body.description}
      </div>`;

    if (character.genderCode == 'female') { description += `
      <div class='sex-description'>
        ${parts.tits.description}
        ${parts.pussy.description}
        ${parts.anus.description}
      </div>
    `; }

    if (character.genderCode == 'futa') { description += `
      <div class='sex-description'>
        ${parts.tits.description}
        ${parts.cock.description}
        ${parts.pussy.description}
        ${parts.anus.description}
      </div>
    `; }

    if (character.genderCode == 'male') { description += `
      <div class='sex-description'>
        ${parts.cock.description}
        ${parts.anus.description}
      </div>
    `; }

    return await Weaver.weaveWithCharacter(description,'C',character);
  }

  // TODO: The general description should also include things like the
  //       character's loyality and general attitude towards the player.
  function generalDescription(character,parts) {
    return "TODO: General Description";
  }

  return { fullDescription, updateAll };

})();
