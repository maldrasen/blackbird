global.FloorFactory = function() {
  const floor = DungeonSystem.getDungeonFloor();

  function buildFloor() {
    const [features, grid] = FeaturePlacer().packFeatures();
    floor.setFeatures(features);

    Console.log(`Created a Dungeon Floor [level:${floor.getLevel()}/${floor.getTheme()}] - Features:${features.length}`);

    const [connections,doors] = DoorFinder(grid).execute();
    floor.setDoors(doors);

    const forest = connections.getSpanningForest();

    forest.forEach(island => {
      console.log(`[Island] ${JSON.stringify(island.getVertices())}`);
    })

    // Now connect disconnected areas.
    // Will need to be able to add tunnels between rooms, adding a new room type that snakes through the empty space.
    // Finally prune redundant doors.
  }

  return Object.freeze({
    buildFloor,
  });

};
