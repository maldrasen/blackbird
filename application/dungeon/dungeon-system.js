global.DungeonSystem = (function() {

  let dungeonState;
  let dungeonFloor;

  function enterDungeon() {
    createDungeon();
    setLevel(1);
    GameSystem.setGameMode(GameMode.dungeon);
  }

  function exitDungeon() {
    dungeonState = null;
    dungeonFloor = null;
    GameSystem.setGameMode(GameMode.location);
  }

  function createDungeon() {
    Console.log("Creating Dungeon",{ system:'DungeonSystem', level:1 });
    dungeonState = DungeonState();
  }

  // Floor generation can very rarely build a floor whose features cannot all be connected. In production we throw
  // the whole floor away and start over from scratch with a fresh DungeonFloor. The party arrives on a feature with
  // the stairs in the direction they just came through, an upstairs when descending or a downstairs when climbing.
  function setLevel(level, arrival='up') {
    Console.log("Changing Level",{ system:'DungeonSystem', level:1, data:{ level }});

    for (let attempt=0; attempt<5; attempt++) {
      dungeonFloor = DungeonFloor(level);
      try {
        FloorFactory().buildFloor();
        dungeonFloor.setLocation(dungeonFloor.getStairs(arrival).featureIndex);
        return;
      }
      catch (error) {
        if (Environment.isDevelopment) { throw error; }
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

  return Object.freeze({
    getDungeonState: () => { return dungeonState; },
    getDungeonFloor: () => { return dungeonFloor; },
    createDungeon,
    setLevel,
    goDownStairs,
    goUpStairs,
    enterDungeon,
    exitDungeon,
  });

})();
