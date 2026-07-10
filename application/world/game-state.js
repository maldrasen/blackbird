global.GameState = function(data={}) {

  let $gameTime = data.gameTime || 0;
  let $gameMode = data.gameMode || GameMode.location;
  let $currentLocation = data.currentLocation || null;
  let $currentFloor = data.currentFloor || null;
  let $player = data.player || null;
  let $partyConfiguration = data.partyConfiguration || null;
  let $legacyName = data.legacyName || null;

  // The roster holds every character the player owns (recruited monsters and the like). It's distinct from the
  // partyConfiguration, which only maps a subset of those characters to their positions in the battle formation.
  let $roster = data.roster || [];

  function pack() {
    return {
      gameTime: $gameTime,
      gameMode: $gameMode,
      currentLocation: $currentLocation,
      currentFloor: $currentFloor,
      player: $player,
      partyConfiguration: $partyConfiguration,
      legacyName: $legacyName,
      roster: $roster,
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
    getRoster: () => { return $roster; },
    addToRoster: id => { if ($roster.includes(id) === false) { $roster.push(id); } },
    removeFromRoster: id => { $roster = $roster.filter(x => x !== id); },
    isInRoster: id => { return $roster.includes(id); },
    pack,
  });

};
