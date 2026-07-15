global.PartyConfiguration = (function() {

  // The PartyConfiguration itself is stored in the GameState as it needs to persist outside the BattleSystem,
  // though its really only applicable from within it. There might be some events during exploration, traps and
  // such that target specific positions or the front rank.
  function setCharacter(id, position) {
    if (position.match(_positionPattern) == null) { throw new Error(`Invalid Position: ${position}`); }

    const configuration = GameSystem.getState().getPartyConfiguration() || {};
    const previousPosition = configuration[id];
    const displacedId = Object.keys(configuration).find(x => {
      return configuration[x] === position && x !== id
    });

    configuration[id] = position;

    if (displacedId) {
      if (previousPosition) {
        configuration[displacedId] = previousPosition;
      } else {
        delete configuration[displacedId];
      }
    }

    GameSystem.getState().setPartyConfiguration(configuration);
  }

  return Object.freeze({
    getConfiguration: () => { return GameSystem.getState().getPartyConfiguration() || {}; },
    setCharacter,
  });

})();
