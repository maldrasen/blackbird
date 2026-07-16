global.GameState = function(data={}) {

  let gameMode = data.gameMode || GameMode.location;
  let gameTime = data.gameTime || 0;
  let location = data.location;
  let player = data.player;
  let party = data.party;
  let legacyName = data.legacyName;
  let roster = data.roster || [];

  function pack() {
    return {
      gameTime: Math.round(gameTime),
      gameMode: gameMode,
      location: location,
      player: player,
      party: party,
      legacyName: legacyName,
      roster: roster,
    };
  }

  // TODO: When setting the player create a default party configuration with the player in the center position.

  return Object.freeze({
    getGameTime: () => { return gameTime; },
    setGameTime: time => { gameTime = time; },
    advanceGameTime: time => { gameTime += time; },
    getGameMode: () => { return gameMode; },
    setGameMode: mode => { gameMode = mode; },
    getCurrentLocation: () => { return location; },
    setCurrentLocation: code => { location = code; },
    getCurrentDistrict: () => { return Location.lookup(location).getDistrict(); },
    getPlayer: () => { return player; },
    setPlayer: id => { player = id; },
    getPartyConfiguration: () => { return party; },
    setPartyConfiguration: config => { party = config; },
    getLegacyName: () => { return legacyName; },
    setLegacyName: name => { legacyName = name; },

    getRoster: () => { return roster; },
    addToRoster: id => { if (roster.includes(id) === false) { roster.push(id); } },
    removeFromRoster: id => { roster = roster.filter(x => x !== id); },
    isInRoster: id => { return roster.includes(id); },

    pack,
  });

};
