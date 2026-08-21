global.PartyConfiguration = (function() {

  function setConfiguration(configuration) {
    if (isValid(configuration) === false) {
      throw new Error(`Invalid configuration: ${JSON.stringify(configuration)}`);
    }

    const previous = getConfiguration();

    GameSystem.getState().setPartyConfiguration({ ...configuration });
    syncLocations(previous, configuration);
    LocationInterface.update();
  }

  // Party members are situated at the in-party pseudo-location. Characters dropped from the party go back to the
  // living room until characters have schedules and somewhere better to be. The real version of this should get their
  // location from their schedule rather than storing a previous location.
  function syncLocations(previous, next) {
    Object.keys(previous).filter(id => next[id] == null).forEach(id => setLocation(id,'ruined-living-room'));
    Object.keys(next).forEach(id => setLocation(id,SpecialLocation.inParty));
  }

  function setLocation(id, location) {
    if (SituatedComponent.lookup(id)) {
      SituatedComponent.update(id, { currentLocation:location });
    }
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

  function addCharacter(id) {
    const configuration = getConfiguration();
    const positions = Object.values(configuration);

    const findPosition = () => {
      for (const column of [2,1,3,0,4]) {
        for (const row of [0,1]) {
          const position = `P.${row}.${column}`;
          if (positions.includes(position) === false) { return position; }
        }
      }
    }

    if (Object.keys(configuration).length >= GameSystem.getState().getPartySizeLimit()) {
      throw new Error(`Cannot add ${id} to the party. The party is already full.`);
    }

    configuration[id] = findPosition();

    GameSystem.getState().setPartyConfiguration(configuration);
    setLocation(id, SpecialLocation.inParty);
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
    const match = position.match(BattleConstants.positionPattern);
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

  return {
    setConfiguration,
    getConfiguration,
    setCharacter,
    addCharacter,
    getVacantFrontPositions,
    isValid,
  };

})();
