global.PartyConfiguration = (function() {

  function setConfiguration(configuration) {
    if (isValid(configuration) === false) {
      throw new Error(`Invalid configuration: ${JSON.stringify(configuration)}`);
    }

    GameSystem.getState().setPartyConfiguration({ ...configuration });
  }

  function getConfiguration() {
    return GameSystem.getState().getPartyConfiguration();
  }

  function setCharacter(id, position) {
    if (isPartyPosition(position) === false) { throw new Error(`Invalid Position: ${position}`); }

    const configuration = getConfiguration();
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

  function getVacantFrontPositions(configuration) {
    const positions = Object.values(configuration);
    const vacant = [];

    for (let column=0; column<5; column++) {
      if (positions.includes(`P.1.${column}`) && positions.includes(`P.0.${column}`) === false) {
        vacant.push(`P.0.${column}`);
      }
    }

    return vacant;
  }

  function isPartyPosition(position) {
    const match = position.match(_positionPattern);
    return match != null && match[1] === 'P';
  }

  // A valid configuration contains the player, holds only party side positions with no duplicates, and never leaves
  // a back row character exposed.
  function isValid(configuration = getConfiguration()) {
    const positions = Object.values(configuration);

    if (configuration[GameSystem.getState().getPlayer()] == null) { return false; }
    if (positions.every(isPartyPosition) === false) { return false; }
    if (new Set(positions).size !== positions.length) { return false; }

    return getVacantFrontPositions(configuration).length === 0;
  }

  return Object.freeze({
    setConfiguration,
    getConfiguration,
    setCharacter,
    getVacantFrontPositions,
    isValid,
  });

})();
