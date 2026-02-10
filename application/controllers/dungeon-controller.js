global.DungeonController = (function() {

  let $currentFloor;

  function createDungeon() {
    changeFloor(1);
  }

  function changeFloor(floor) {
    log("Building Dungeon",{ system:'DungeonController', level:1, data:{ floor }});

    $currentFloor = floor;

    // When the floor changes we generate an entirely new map for that floor.
  }

  return Object.freeze({
    createDungeon,
    changeFloor,
  });

})();