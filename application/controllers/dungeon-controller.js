global.DungeonController = (function() {

  let $currentFloor;

  function createDungeon() {
    changeFloor(1);
  }

  function changeFloor(floor) {
    $currentFloor = floor;
    // When the floor changes we generate an entirely new map for that floor.
  }

  return Object.freeze({
    createDungeon,
    changeFloor,
  });

})();