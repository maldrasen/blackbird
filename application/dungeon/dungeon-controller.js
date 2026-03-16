global.DungeonController = (function() {

  let state;

  // The floor might not always be one, if we are loading a game rather than starting a fresh dungeon.
  // Should be fine for now though.
  function createDungeon() {
    state = DungeonState();
  }

  function changeLevel(level) {
    Console.log("Building Dungeon",{ system:'DungeonController', level:1, data:{ level }});
    state.changeLevel(level);
  }

  return Object.freeze({
    createDungeon,
    changeLevel,
  });

})();