global.DungeonState = function() {

  let currentFloor;

  function changeLevel(level) {
    currentFloor = FloorFactory.build(level);
  }

  return Object.freeze({
    getCurrentFloor: () => { return currentFloor; },
    changeLevel,
  });
}