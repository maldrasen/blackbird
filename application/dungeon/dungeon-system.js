global.DungeonSystem = (function() {

  let dungeonState;
  let dungeonFloor;

  function enterDungeon() {
    createDungeon();
    setLevel(1, 'up');
    GameSystem.setGameMode(GameMode.dungeon);
  }

  function createDungeon() {
    Console.log("Creating Dungeon",{ system:'DungeonSystem', level:1 });
    dungeonState = DungeonState();
  }

  function exitDungeon() {
    reset();
    GameSystem.setGameMode(GameMode.location);
  }

  function reset() {
    dungeonState = null;
    dungeonFloor = null;
  }

  // Floor generation can very rarely build a floor whose features cannot all be connected. When that happens we
  // throw the whole floor away and start over from scratch with a fresh DungeonFloor. The factory dumps the failed
  // floor's state to the debug directory before we toss it, so a failure can still be analyzed after the fact. The
  // party arrives in a room with the stairs in the direction they just came through, an upstairs when descending or
  // a downstairs when climbing.
  function setLevel(level, arrival='up', theme=null) {
    Console.log("Changing Level",{ system:'DungeonSystem', level:1, data:{ level, arrival }});

    for (let attempt=0; attempt<5; attempt++) {
      dungeonFloor = DungeonFloor(level, theme);
      try {
        FloorFactory().buildFloor();
        dungeonFloor.setLocation(Random.from(dungeonFloor.getStairs(arrival)));
        return;
      }
      catch (error) {
        Console.log(`Discarding failed floor (attempt ${attempt+1}): ${error.message}`,{ system:'DungeonSystem', level:1 });
      }
    }

    throw new Error(`Failed to generate a valid floor for level ${level} after 5 attempts.`);
  }

  function goDownStairs() {
    setLevel(dungeonFloor.getLevel() + 1, 'up');
  }

  function goUpStairs() {
    (dungeonFloor.getLevel() === 1) ? exitDungeon() : setLevel(dungeonFloor.getLevel() - 1, 'down');
  }

  // TODO: Pick the encounter from the dungeon theme's encounter tables once they exist (task 015).
  // TODO: Some features will also have their own encounter data to use, rather than defaulting to the floor encounter.
  function startRandomEncounter() {
    GameSystem.markReturnMode();
    BattleSystem.startBattle(getFloorEncounterOptions());
    GameSystem.setGameMode(GameMode.battle);
  }

  // TODO: Determine essence target from level.
  function getFloorEncounterOptions() {
    return {
      cohorts: DungeonTheme.lookup(dungeonFloor.getTheme()).getCohorts(),
      essenceTarget: 0,
    }
  }

  return {
    getDungeonState: () => { return dungeonState; },
    getDungeonFloor: () => { return dungeonFloor; },
    enterDungeon,
    createDungeon,
    exitDungeon,
    reset,
    setLevel,
    goDownStairs,
    goUpStairs,
    startRandomEncounter,
  };

})();
