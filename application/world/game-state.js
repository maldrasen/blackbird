global.GameState = function(data={}) {

  const saveKey = data.saveKey || Random.identifier().substring(1);
  const flags = data.flags || {};
  const dungeonState = DungeonState(data.dungeonState);

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

  // Only enqueue an episode when it's not already in the queue.
  function pushEpisode(code, place) {
    if (episodeQueue.some(entry => entry.code === code) === false) {
      episodeQueue.push({ code, place });
    }
  }

  function setFlag(key, value) {
    if (flags[key] != null && value == null) {
      return delete flags[key]; }

    if (['boolean','number','string'].includes(typeof value) === false) {
      throw new Error(`A flag must be a boolean, number, or string`); }

    flags[key] = value;
  }

  function getSaveMetadata() {
    return {
      version: Environment.version,
      savedAt: Date.now(),
      legacyName: legacyName,
      playerName: Character(player).getName(),
      locationName: Location.lookup(location).getName(),
      gameTime: Math.round(gameTime),
    };
  }

  function pack() {
    return {
      saveKey: saveKey,
      gameTime: Math.round(gameTime),
      gameMode: gameMode,
      location: location,
      player: player,
      party: party,
      legacyName: legacyName,
      roster: roster,
      episodeQueue: episodeQueue,
      flags: flags,
      dungeonState: dungeonState.pack(),
    };
  }

  return {
    getSaveKey: () => { return saveKey; },
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
    getPartySize: () => { return Object.keys(party).length; },
    getPartySizeLimit,
    getLegacyName: () => { return legacyName; },
    setLegacyName: name => { legacyName = name; },
    getRoster: () => { return [...roster]; },
    addToRoster: id => { if (roster.includes(id) === false) { roster.push(id); } },
    removeFromRoster: id => { roster = roster.filter(x => x !== id); },
    isInRoster: id => { return roster.includes(id); },
    getEpisodes: () => { return episodeQueue.map(entry => ({ ...entry })); },
    removeEpisode: code => { episodeQueue = episodeQueue.filter(entry => entry.code !== code); },
    pushEpisode,
    setFlag,
    getFlag: key => { return flags[key]; },
    getDungeonState: () => { return dungeonState; },
    getSaveMetadata,
    pack,
  };

};
