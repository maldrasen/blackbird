global.PartyConfiguration = (function() {

  const positions = [
    'C.0.0','C.0.1','C.0.2','C.0.3','C.0.4',
    'C.1.0','C.1.1','C.1.2','C.1.3','C.1.4'];

  // If the character is already somewhere in the formation then they are being moved to a new position. If another
  // character was already in the position they are being moved to then we need to move the old character to the new
  // character's old position, swapping them. If the new character wasn't in the formation then the old character
  // is removed from the party.
  //
  // The PartyConfiguration itself is stored in the GameState as it needs to persist outside the BattleSystem,
  // though its really only applicable from within it. There might be some events during exploration, traps and
  // such that target specific positions or the front rank.
  function setCharacter(id, position) {
    const configuration = GameState.getPartyConfiguration() || {};
    const previous = configuration[position] ? configuration[position] : null;

    positions.forEach(code => {
      if (configuration[code] === id) {
        configuration[code] = previous;
      }
    });

    configuration[position] = id;

    console.log("Party:",configuration)

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
