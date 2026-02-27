global.DungeonController = (function() {

  let $currentFloor;

  function clear() {
    $currentFloor = null;
  }

  // The floor might not always be one, if we are loading a game rather than starting a fresh dungeon.
  // Should be fine for now though.
  function createDungeon() {
    clear();
    changeFloor(1);
  }

  function changeFloor(level) {
    log("Building Dungeon",{ system:'DungeonController', level:1, data:{ level }});

    $currentFloor = FloorFactory.build(level);

    console.log(`Current Floor: ${$currentFloor.getLevel()}/${$currentFloor.getTheme()}`)
  }

  return Object.freeze({
    createDungeon,
    changeFloor,
  });

})();