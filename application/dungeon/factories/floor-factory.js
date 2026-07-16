global.FloorFactory = function() {
  const floor = DungeonSystem.getDungeonFloor();
  const blacklist = new Set();

  // Floor generation failures are nearly impossible to hunt down after the fact because the randomly generated state
  // is lost when the factory dies, so we dump whatever state we have before rethrowing. The error always propagates;
  // retrying has to happen in DungeonSystem with a fresh DungeonFloor because this floor's grid is already littered
  // with the failed attempt's features.
  function buildFloor() {
    const seed = Random.getSeed();

    try {
      build();
    }
    catch (error) {
      if (Environment.isDevelopment) {
        FileHelper.writeJSON(`${ROOT}/debug/floor-failure-state.json`, { error:error.stack, seed, floor:floor.pack() });
      }
      throw error;
    }

    if (Environment.isDevelopment) {
      FileHelper.writeJSON(`${ROOT}/debug/floor-state.json`, { seed, floor:floor.pack() });
    }
  }

  function build() {
    const [features, grid] = FeaturePlacer().packFeatures();

    Console.log(`Created a Dungeon Floor [level:${floor.getLevel()}/${floor.getTheme()}] - Features:${features.length}`);

    const [connections,doors] = DoorFinder(grid).execute();
    floor.setDoors(doors);

    const featureDoors = buildFeatureDoors(connections);

    let forest = connections.getSpanningForest();

    while (forest.length > 1) {
      const pair = FeatureGraphHelper.getClosestDisconnectedRooms(forest, blacklist);

      if (pair == null) {
        throw new Error('Cannot find a path between any of the remaining disconnected features.');
      }

      const [origin, target] = pair;
      const result = CorridorFactory().digBetween(origin, target);

      // The corridor's room only gets its global index when the feature is registered, and its door tiles can only
      // be resolved to rooms once the corridor is painted into the grid, so both happen before the doors are built.
      if (result) {
        floor.addFeature(result.feature);
        addFeatureToGrid(result.feature);

        const corridorRoom = result.feature.getRooms()[0];
        result.doorTiles.forEach(doorTile => {
          const door = FloorFactorySupport.buildDoorToFeature(doorTile.point, corridorRoom.getIndex(), doorTile.feature);
          floor.addDoor(door);
          connections.addEdge(door.getFrom(), door.getTo());
        });

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

    featureDoors.forEach(door => floor.addDoor(door));

    placeStairs();
  }

  // Multi-room features join their own rooms with authored doors. Their edges go into the connection graph before
  // the corridors are dug so a feature's rooms don't read as disconnected islands, but the doors themselves only
  // join the floor after the redundant door trimming, as authored doors must never be trimmed.
  function buildFeatureDoors(connections) {
    const featureDoors = [];

    floor.getFeatures().forEach(feature => {
      const position = feature.getPosition();
      const rooms = feature.getRooms();

      feature.getDoors().forEach(spec => {
        const door = Door(
          { x: position.x + spec.position.x, y: position.y + spec.position.y },
          spec.direction,
          rooms[spec.from].getIndex(),
          rooms[spec.to].getIndex());

        connections.addEdge(door.getFrom(), door.getTo());
        featureDoors.push(door);
      });
    });

    return featureDoors;
  }

  function placeStairs() {
    const rooms = Random.shuffle(floor.getRooms().filter(room => room.stairsAreAllowed()));
    const limit = Math.floor(rooms.length / 2);

    ['up','down'].forEach(direction => {
      const count = Math.max(1, Math.min(Random.between(2,3), limit));

      for (let i=0; i<count; i++) {
        const room = rooms.pop();
        floor.addStairs(direction, { roomIndex: room.getIndex(), position: room.getCenterTile() });
      }
    });
  }

  function addFeatureToGrid(feature) {
    const floorGrid = DungeonSystem.getDungeonFloor().getFloorGrid();

    feature.getRooms().forEach(room => {
      const position = room.getFloorPosition();
      const index = room.getIndex();

      room.getBoxes().forEach(box => {
        const yMin = position.y + box.y;
        const xMin = position.x + box.x;

        for (let y=yMin; y<(yMin + box.height); y++) {
          for (let x=xMin; x<(xMin + box.width); x++) {
            floorGrid[y][x] = index;
          }
        }
      });
    });
  }

  return Object.freeze({
    buildFloor,
  });

};
