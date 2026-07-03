global.FloorFactory = function() {
  const floor = DungeonSystem.getDungeonFloor();
  const blacklist = new Set();

  // Floor generation failures are nearly impossible to hunt down after the fact because the randomly generated state
  // is lost when the factory dies, so we dump whatever state we have before rethrowing. The error always propagates;
  // retrying has to happen in DungeonSystem with a fresh DungeonFloor because this floor's grid is already littered
  // with the failed attempt's features.
  function buildFloor() {
    try {
      build();
    }
    catch (error) {
      if (Environment.isDevelopment) {
        FileHelper.writeJSON(`${ROOT}/debug/floor-failure-state.json`, { error:error.stack, floor:floor.pack() });
      }
      throw error;
    }
  }

  function build() {
    const [features, grid] = FeaturePlacer().packFeatures();
    floor.setFeatures(features);

    Console.log(`Created a Dungeon Floor [level:${floor.getLevel()}/${floor.getTheme()}] - Features:${features.length}`);

    const [connections,doors] = DoorFinder(grid).execute();
    floor.setDoors(doors);

    let forest = connections.getSpanningForest();

    while (forest.length > 1) {
      const pair = FeatureGraphHelper.getClosestDisconnectedFeatures(forest, blacklist);

      if (pair == null) {
        throw new Error('Cannot find a path between any of the remaining disconnected features.');
      }

      const [origin, target] = pair;
      const result = CorridorFactory().digBetween(origin, target);

      if (result) {
        floor.addFeature(result.feature);
        result.doors.forEach(door => floor.addDoor(door));
        connections.addEdge(origin, result.feature.getIndex());
        connections.addEdge(result.feature.getIndex(), target);
        addFeatureToGrid(result.feature);
        forest = connections.getSpanningForest();
      }

      if (result == null) {
        blacklist.add(FeatureGraphHelper.pairKey(origin, target));
      }
    }

    // Get rid of some of the redundant doors, so that clusters of rooms aren't all
    // connected, but there are at least some loops between rooms.
    const spanningTree = connections.getSpanningTree(0);
    floor.setDoors(floor.getDoors().filter(door => {
      return (spanningTree.getEdges(door.getFrom()).includes(door.getTo())) ? true : (Random.roll(100) < 50);
    }));

    if (Environment.isDevelopment) {
      FileHelper.writeJSON(`${ROOT}/debug/floor-state.json`, floor.pack());
    }
  }

  function addFeatureToGrid(feature) {
    const position = feature.getPosition();
    const index = feature.getIndex();
    const floorGrid = DungeonSystem.getDungeonFloor().getFloorGrid();

    function fillBox(box) {
      const yMin = position.y + box.y;
      const xMin = position.x + box.x;

      for (let y=yMin; y<(yMin + box.height); y++) {
        for (let x=xMin; x<(xMin + box.width); x++) {
          floorGrid[y][x] = index;
        }
      }
    }

    feature.getRooms().forEach(room => {
      room.getBoxes().forEach(fillBox);
    });
  }

  return Object.freeze({
    buildFloor,
  });

};
