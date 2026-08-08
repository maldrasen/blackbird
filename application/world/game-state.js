global.GameState = function(data={}) {

  let gameMode = data.gameMode || GameMode.location;
  let gameTime = data.gameTime || 0;
  let location = data.location;
  let player = data.player;
  let party = data.party || {};
  let legacyName = data.legacyName;
  let roster = data.roster || [];
  let episodeQueue = data.episodeQueue || [];

  // TODO: Eventually this function will consult everything that might influence this value. It's not set in the state,
  //       but may need to read values from the player.
  function getPartySizeLimit() { return 6; }

  function pack() {
    return {
      gameTime: Math.round(gameTime),
      gameMode: gameMode,
      location: location,
      player: player,
      party: party,
      legacyName: legacyName,
      roster: roster,
      episodeQueue: episodeQueue,
    };
  }

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
    getPartySizeLimit,
    getLegacyName: () => { return legacyName; },
    setLegacyName: name => { legacyName = name; },

    getEpisodeQueue: () => { return episodeQueue.map(entry => ({ ...entry })); },
    pushEpisodeToQueue: (code,place) => {
      if (episodeQueue.some(entry => entry.code === code) === false) { episodeQueue.push({ code, place }); }
    },
    removeEpisodeFromQueue: code => { episodeQueue = episodeQueue.filter(entry => entry.code !== code); },

    getRoster: () => { return [...roster]; },
    addToRoster: id => { if (roster.includes(id) === false) { roster.push(id); } },
    removeFromRoster: id => { roster = roster.filter(x => x !== id); },
    isInRoster: id => { return roster.includes(id); },

    pack,
  });

};
