global.DoglegCorridorFactory = function(originFeature, targetFeature, alignment) {
  const floor = DungeonSystem.getDungeonFloor();
  const grid = floor.getFloorGrid();

  function build() {
    console.log("=== Attempt Dogleg Corridor ===");
    return null;
  }

  return Object.freeze({
    build,
  });

}
