global.DungeonSystem = (function() {

  let dungeonState;
  let dungeonFloor;

  function createDungeon() {
    Console.log("Creating Dungeon",{ system:'DungeonSystem', level:1 });
    dungeonState = DungeonState();
  }

  function setLevel(level) {
    Console.log("Changing Level",{ system:'DungeonSystem', level:1, data:{ level }});
    dungeonFloor = DungeonFloor(level);
    FloorFactory().buildFloor();
  }

  return Object.freeze({
    getDungeonState: () => { return dungeonState; },
    getDungeonFloor: () => { return dungeonFloor; },
    createDungeon,
    setLevel,
  });

})();
