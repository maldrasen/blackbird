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

  function removeCharacter(id) {
    const configuration = GameSystem.getState().getPartyConfiguration() || {};
    delete configuration[id];
    GameSystem.getState().setPartyConfiguration(configuration);
  }

  // A formation is only valid when no back row character is missing a character in front of them. These work on any
  // configuration map, not just the persisted one, so a view can check an unsaved draft.
  function getVacantFrontPositions(configuration) {
    const positions = Object.values(configuration);
    const vacant = [];

    for (let column = 0; column < 5; column++) {
      if (positions.includes(`P.1.${column}`) && positions.includes(`P.0.${column}`) === false) {
        vacant.push(`P.0.${column}`);
      }
    }

    return vacant;
  }

  function isValidConfiguration(configuration) {
    return getVacantFrontPositions(configuration).length === 0;
  }

  return Object.freeze({
    getConfiguration: () => { return GameSystem.getState().getPartyConfiguration() || {}; },
    setCharacter,
    removeCharacter,
    getVacantFrontPositions,
    isValidConfiguration,
  });

})();
