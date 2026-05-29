global.PartyConfiguration = (function() {

  const positions = ['0.0','0.1','0.2','1.0','1.1','1.2'];

  // The party configuration is currently just a map of position ids to character ids, though we could add more to
  // it later. Different party formations are a possibility. (to put more or fewer people in the back or front ranks)
  // The current positions and their IDs are arranged like this:
  //
  //   0.0 | 0.1 | 0.2
  //   1.0 | 1.1 | 1.2
  //
  // Assuming a maximum of six party members, though again that could change. Monster formations follow the same
  // pattern, though there can be more ranks and columns on the monster side.
  function setCharacter(id, position) {
    const configuration = GameState.getPartyConfiguration() || {};
    const previous = configuration[position] ? configuration[position] : null;

    if (positions.includes(position) === false) {
      throw `${position} is not a valid position`;
    }

    // If the character is already somewhere in the formation then they are being moved to a new position. If another
    // character was already in the position they are being moved to then we need to move the old character to the new
    // character's old position, swapping them. If the new character wasn't in the formation then the old character
    // is removed from the party.
    positions.forEach(code => {
      if (configuration[code] === id) {
        configuration[code] = previous;
      }
    });

    configuration[position] = id;

    GameState.setPartyConfiguration(configuration);
  }

  function getCharacter(position) {
    if (positions.includes(position) === false) {
      throw `${position} is not a valid position`;
    }

    return GameState.getPartyConfiguration()[position];
  }

  function getCharacters() {
    const configuration = GameState.getPartyConfiguration();
    const characters = [];

    positions.forEach(code => {
      if (configuration[code]) {
        characters.push(configuration[code]);
      }
    });

    return characters;
  }

  return Object.freeze({
    getConfiguration: () => { return GameState.getPartyConfiguration() || {}; },
    setCharacter,
    getCharacter,
    getCharacters,
  });

})();
