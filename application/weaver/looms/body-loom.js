global.BodyLoom = (function() {

  function weave(id, token) {
    const body = BodyComponent.lookup(id);

    if (token === 'eyeColor') { return eyeColor(body.eyeColor); }
    if (token === 'furColor') { return hairColor(body.furColor); }
    if (token === 'hairColor') { return hairColor(body.hairColor); }

    return Weaver.formatWarning(`[Body:${token}]`);
  }

  // TODO: This will work fine as is, given that all eye colors are single
  //   lower case words, but it can be extended like hair colors with more
  //   color synonyms.
  function eyeColor(color) {
    return color;
  }

  function hairColor(color) {
    if (color === 'platinumBlond') { return Random.from(['platinum blond','bright blond']); }
    if (color === 'strawberryBlond') { return Random.from(['strawberry blond']); }
    if (color === 'goldenBlond') { return Random.from(['golden blond']); }
    if (color === 'darkBlond') { return Random.from(['dark blond','dirty blond','dusty blond']); }
    if (color === 'lightBrown') { return Random.from(['light brown']); }
    if (color === 'darkBrown') { return Random.from(['dark brown']); }
    if (color === 'blackBrown') { return Random.from(['black brown','almost black','nearly black']); }
    if (color === 'jetBlack') { return Random.from(['jet black','glossy black']); }
    if (color === 'darkRed') { return Random.from(['dark red']); }
    if (color === 'lightBlue') { return Random.from(['light blue','powder blue']); }
    if (color === 'blue') { return Random.from(['blue','bright blue']); }
    if (color === 'darkBlue') { return Random.from(['dark blue']); }
    if (color === 'lightGreen') { return Random.from(['light green','pale green']); }
    if (color === 'green') { return Random.from(['green','sage green','grass green']); }
    if (color === 'darkGreen') { return Random.from(['dark green','forest green']); }
    if (color === 'lightPurple') { return Random.from(['light purple','pale purple']); }
    if (color === 'purple') { return Random.from(['purple','deep purple']); }
    if (color === 'darkPurple') { return Random.from(['dark purple']); }

    return color;
  }

  return Object.freeze({
    weave
  });

})();
