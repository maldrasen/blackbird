global.PartyConfiguration = (function() {

  // If the character is already somewhere in the formation then they are being moved to a new position. If another
  // character was already in the position they are being moved to then we need to move the old character to the new
  // character's old position, swapping them. If the new character wasn't in the formation then the old character
  // is removed from the party.
  //
  // The PartyConfiguration itself is stored in the GameState as it needs to persist outside the BattleSystem,
  // though its really only applicable from within it. There might be some events during exploration, traps and
  // such that target specific positions or the front rank.
  function setCharacter(id, position) {
    if (position.match(_positionPattern) == null) { throw new Error(`Invalid Position: ${position}`); }

    const configuration = GameState.getPartyConfiguration() || {};
    const previousPosition = configuration[id];
    const displacedId = Object.keys(configuration).find(x => {
      return configuration[x] === position && x !== id
    });

    configuration[id] = position;
    if (displacedId) {
      configuration[displacedId] = previousPosition;
    }

    GameState.setPartyConfiguration(configuration);
  }

  return Object.freeze({
    getConfiguration: () => { return GameState.getPartyConfiguration() || {}; },
    setCharacter,
  });

})();
