global.PartyConfiguration = (function() {

  function setConfiguration(configuration) {
    const positions = Object.values(configuration);

    positions.forEach(position => {
      const match = position.match(_positionPattern);
      if (match == null || match[1] !== 'P') { throw new Error(`Invalid Position: ${position}`); }
    });

    if (new Set(positions).size !== positions.length) {
      throw new Error(`Duplicate positions in configuration`);
    }

    if (isValid(configuration) === false) {
      throw new Error(`Invalid formation: vacant front positions [${getVacantFrontPositions(configuration)}]`);
    }

    GameSystem.getState().setPartyConfiguration({ ...configuration });
  }

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
    const configuration = GameSystem.getState().getPartyConfiguration();
    delete configuration[id];
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

  function isValid(configuration) {
    return getVacantFrontPositions(configuration).length === 0;
  }

  return Object.freeze({
    setConfiguration,
    getConfiguration: () => { return GameSystem.getState().getPartyConfiguration(); },
    setCharacter,
    removeCharacter,
    getVacantFrontPositions,
    isValid,
  });

})();
