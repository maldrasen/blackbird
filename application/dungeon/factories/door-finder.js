global.DoorFinder = function(grid) {
  const floor = DungeonSystem.getDungeonFloor();
  const floorHeight = floor.getFloorHeight();
  const floorWidth = floor.getFloorWidth();

  function execute() {
    console.log("=== Find Doors ===")

    for (let y=0; y<floorHeight; y++) {
      for (let x=0; x<floorWidth; x++) {
        console.log(`Adjacency of (${x},${y})`);
      }
    }
  }

  return Object.freeze({
    execute,
  });

}
