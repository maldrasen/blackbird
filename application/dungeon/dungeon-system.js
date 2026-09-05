global.DungeonSystem = (function() {

  let dungeonFloor;

  function enterDungeon() {
    createDungeon();
    setLevel(1, 'up');
    GameSystem.setGameMode(GameMode.dungeon);
  }

  function createDungeon() {
    Console.log("Creating Dungeon",{ system:'DungeonSystem', level:1 });
  }

  function exitDungeon() {
    reset();
    GameSystem.setGameMode(GameMode.location);
  }

  function reset() {
    dungeonFloor = null;
  }

  // Floor generation can very rarely build a floor whose features cannot all be connected. When that happens we
  // throw the whole floor away and start over from scratch with a fresh DungeonFloor. The factory dumps the failed
  // floor's state to the debug directory before we toss it, so a failure can still be analyzed after the fact. The
  // party arrives in a room with the stairs in the direction they just came through, an upstairs when descending or
  // a downstairs when climbing.
  function setLevel(level, arrival='up', theme=null) {
    Console.log("Changing Level",{ system:'DungeonSystem', level:1, data:{ level, arrival }});

    let lastError;

    for (let attempt=0; attempt<5; attempt++) {
      dungeonFloor = DungeonFloor(level, theme);
      try {
        FloorFactory().buildFloor();
        dungeonFloor.setLocation(Random.from(dungeonFloor.getStairs(arrival)));
        return;
      }
      catch (error) {
        lastError = error;
        Console.log(`Discarding failed floor (attempt ${attempt+1}): ${error.message}`,{ system:'DungeonSystem', level:1 });
      }
    }

    throw new Error(`Failed to generate a valid floor for level ${level} after 5 attempts. Last error: ${lastError.message}`,
      { cause:lastError });
  }

  function goDownStairs() {
    setLevel(dungeonFloor.getLevel() + 1, 'up');
  }

  function goUpStairs() {
    (dungeonFloor.getLevel() === 1) ? exitDungeon() : setLevel(dungeonFloor.getLevel() - 1, 'down');
  }

  // TODO: Some features will also have their own encounter data to use, rather than defaulting to the floor encounter.
  function startRandomEncounter() {
    GameSystem.markReturnMode();
    BattleSystem.startBattle(getFloorEncounterOptions());
    GameSystem.setGameMode(GameMode.battle);
  }

  function startRoomEpisode(code) {
    GameSystem.markReturnMode();
    EpisodeSystem.startEpisode(code, { P:GameSystem.getState().getPlayer() });
    GameSystem.setGameMode(GameMode.episode);
  }

  function getFloorEncounterOptions() {
    return {
      cohorts: DungeonTheme.lookup(dungeonFloor.getTheme()).getCohorts(),
      essenceTarget: BattleHelper.getEssenceTarget(dungeonFloor.getLevel()),
    }
  }

  return {
    setDungeonFloor: floor => { dungeonFloor = floor },
    getDungeonFloor: () => { return dungeonFloor; },
    getDungeonState: () => { return GameSystem.getState().getDungeonState(); },
    enterDungeon,
    createDungeon,
    exitDungeon,
    reset,
    setLevel,
    goDownStairs,
    goUpStairs,
    startRandomEncounter,
    startRoomEpisode,
  };

})();
