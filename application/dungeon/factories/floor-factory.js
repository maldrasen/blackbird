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
        addFeatureToGrid(result.feature);
        // Rebuild the forest, loop until forest length is 1
      }

      if (result == null) {
        console.warn(`Cannot find a path between features ${origin} and ${target}.`);
        // blacklist the [origin,target] combo and find the next closest pair of rooms.
      }
    }

    // Finally prune redundant doors.

    if (Environment.isDevelopment) {
      FileHelper.writeJSON(`${ROOT}/debug/floor-state.json`, floor.pack()).then(r => console.log('Saved Floor State'));
    }

  }

  // Corridors can be composed of many rooms, but each room only has one box. This is to allow for "dog leg" shaped
  // features with two turns. When a feature is added we need to set the cells that it covers in the floor grid.
  function addFeatureToGrid(feature) {
    const position = feature.getPosition();
    const index = feature.getIndex();
    const floorGrid = DungeonSystem.getDungeonFloor().getFloorGrid();

    feature.getRooms().forEach(room => {
      const box = room.getMainBox();
      const yMin = position.y + box.y;
      const xMin = position.x + box.x;

      for (let y=yMin; y<(yMin + box.height); y++) {
        for (let x=xMin; x<(xMin + box.width); x++) {
          floorGrid[y][x] = index;
        }
      }
    });
  }

  return Object.freeze({
    buildFloor,
  });

};
