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

  // TODO: A room should have a property that we can use to forbid a room from having stairs. The nested room will
  //       mark the outer room as not allowing stairs, but the inner room can have stairs. We also want to change this
  //       center tile function, perhaps even get rid of it. The stairs should be placed in the center of a room's main
  //       box. Because the rooms are displayed as HTML elements, we don't care about the grid once the dungeon layout
  //       is complete. Stairs should be placed in the actual middle of an element.

  // TODO: Dungeon floors can have more than two stairs, and should only require the entry stairs. It's possible that
  //       you've found a dead end floor and need to go back up in order to go further down, something you'll only
  //       know by fully exploring a floor. That should be rare though. The dungeon theme can define how many stairs
  //       a floor can have.

  function placeStairs() {
    const rooms = floor.getRooms().filter(room => {
      const feature = floor.getFeatureForRoom(room.getIndex());
      return feature.getType() !== 'corridor' && feature.getRooms().length === 1;
    });
    const upRoom = Random.from(rooms);
    const downRoom = pickDownStairsRoom(rooms, upRoom);

    floor.setStairs('up', { roomIndex: upRoom.getIndex(), position: upRoom.getCenterTile() });
    floor.setStairs('down', { roomIndex: downRoom.getIndex(), position: downRoom.getCenterTile() });
  }

  function pickDownStairsRoom(rooms, upRoom) {
    const upCenter = upRoom.getFloorCenter();

    let farthest;
    let farthestDistance = -1;

    const distantRooms = rooms.filter(room => {
      if (room === upRoom) { return false; }

      const center = room.getFloorCenter();
      const distance = ((center.x - upCenter.x) ** 2) + ((center.y - upCenter.y) ** 2);

      if (distance > farthestDistance) {
        farthestDistance = distance;
        farthest = room;
      }

      return distance >= (20 ** 2);
    });

    return (distantRooms.length > 0) ? Random.from(distantRooms) : farthest;
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
