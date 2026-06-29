global.FloorFactory = function() {
  const floor = DungeonSystem.getDungeonFloor();

  function buildFloor() {
    const [features, grid] = FeaturePlacer().packFeatures();
    floor.setFeatures(features);

    Console.log(`Created a Dungeon Floor [level:${floor.getLevel()}/${floor.getTheme()}] - Features:${features.length}`);

    const [connections,doors] = DoorFinder(grid).execute();
    floor.setDoors(doors);

    const forest = connections.getSpanningForest();

    // Change to a loop once we have this working
    if (forest.length > 1) {
      const [first, second] = FeatureGraphHelper.getClosestDisconnectedFeatures(forest);
      const result = CorridorFactory(grid).digBetween(first, second);

      if (result) {
        connections.addEdge(first, second);
        // Add the result.feature to features. Add the result.doors to doors.
        // Rebuild the forest, loop until forest length is 1
      }

      if (result == null) {
        // blacklist the [first,second] combo and find the next closest pair of rooms.
      }
    }

    // Finally prune redundant doors.
  }


  return Object.freeze({
    buildFloor,
  });

};
