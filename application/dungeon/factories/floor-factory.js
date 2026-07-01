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
      const [origin, target] = FeatureGraphHelper.getClosestDisconnectedFeatures(forest);
      const result = CorridorFactory().digBetween(origin, target);

      if (result) {
        floor.addFeature(result.feature);
        result.doors.forEach(door => floor.addDoor(door));
        connections.addEdge(origin, target);
        // Rebuild the forest, loop until forest length is 1
      }

      if (result == null) {
        console.warn(`Cannot find a path between features ${origin} and ${target}.`);
        // blacklist the [origin,target] combo and find the next closest pair of rooms.
      }
    }

    // Finally prune redundant doors.
  }


  return Object.freeze({
    buildFloor,
  });

};
