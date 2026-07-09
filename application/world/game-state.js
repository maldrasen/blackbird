global.GameState = function(data={}) {

  let $gameTime = data.gameTime || 0;
  let $gameMode = data.gameMode || GameMode.location;
  let $currentLocation = data.currentLocation || null;
  let $currentFloor = data.currentFloor || null;
  let $player = data.player || null;
  let $partyConfiguration = data.partyConfiguration || null;
  let $legacyName = data.legacyName || null;

  function pack() {
    return {
      gameTime: $gameTime,
      gameMode: $gameMode,
      currentLocation: $currentLocation,
      currentFloor: $currentFloor,
      player: $player,
      partyConfiguration: $partyConfiguration,
      legacyName: $legacyName,
    };
  }

  return Object.freeze({
    getGameTime: () => { return $gameTime; },
    advanceGameTime: time => { $gameTime += time; },
    getGameMode: () => { return $gameMode; },
    setGameMode: mode => { $gameMode = mode; },
    getCurrentLocation: () => { return $currentLocation; },
    setCurrentLocation: location => { $currentLocation = location; },
    getPlayer: () => { return $player; },
    setPlayer: player => { $player = player; },
    getPartyConfiguration: () => { return $partyConfiguration; },
    setPartyConfiguration: party => { $partyConfiguration = party; },
    getLegacyName: () => { return $legacyName; },
    setLegacyName: name => { $legacyName = name; },
    pack,
  });

};
