global.StraightCorridorFactory = function(originFeature, targetFeature, alignment) {
  const floor = DungeonSystem.getDungeonFloor();
  const grid = floor.getFloorGrid();
  const features = floor.getFeatures();

  function build() {
    const ray = corridorRayCast(alignment);
    if (ray) {
      const index = features.length;
      const { start, end } = ray;

      const isVertical = start.x === end.x;
      const x = isVertical ? start.x : Math.min(start.x, end.x);
      const y = isVertical ? Math.min(start.y, end.y) : start.y;

      const feature = Feature('corridor');
      feature.setPosition(x, y);
      feature.setIndex(index);
      feature.addRoom(buildRoomBetween(start, end));

      const doors = [
        FloorFactorySupport.buildDoor(start, feature.getIndex(), originFeature.getIndex()),
        FloorFactorySupport.buildDoor(end, feature.getIndex(), targetFeature.getIndex()),
      ];

      return { feature, doors };
    }
  }

  // If two features are aligned we can attempt to find a straight path between them. We first find all the
  // overlapping tiles. Then we draw a line through the grid from the origin tiles to the feature. A ray will fail if
  // it encounters a feature other than the target.
  function corridorRayCast(alignment) {
    const startTiles = getOverlappingStartTiles(alignment);
    const rays = []

    startTiles.forEach(start => {
      let cursor = {...start};
      let end = {...start};

      while(true) {
        switch(alignment) {
          case 'N': cursor = { y:cursor.y-1, x:cursor.x }; break;
          case 'S': cursor = { y:cursor.y+1, x:cursor.x }; break;
          case 'E': cursor = { y:cursor.y, x:cursor.x+1 }; break;
          case 'W': cursor = { y:cursor.y, x:cursor.x-1 }; break;
        }

        // A ray that leaves the grid without finding the target fails. Off-grid cells read as undefined, which would
        // otherwise pass the empty cell check and let the ray march on forever.
        if (isOnGrid(cursor) === false) { return; }

        let cell = grid[cursor.y][cursor.x];
        if (cell == null) { end = cursor; }

        // A ray is only valid if it finds the target feature at the end.
        if (cell != null) {
          if (cell === targetFeature.getIndex()) {
            rays.push({ start, end });
          }
          return;
        }
      }
    });

    return (rays.length > 0) ? Random.from(rays) : null;
  }

  // The overlapping start tiles are the edge tiles in the direction of the target feature where the tiles are empty
  // and intersect with the target feature bounds.
  function getOverlappingStartTiles(alignment) {
    const position = originFeature.getPosition();
    const target = targetFeature.getLocation();

    const inTargetOverlap = ['N','S'].includes(alignment) ?
      (tile) => tile.x >= target.xMin && tile.x < target.xMax :
      (tile) => tile.y >= target.yMin && tile.y < target.yMax;

    return originFeature.getEdgeTiles(alignment).
        map(tile => ({ x: tile.x + position.x, y: tile.y + position.y })).
        filter(isOnGrid).
        filter(tile => grid[tile.y][tile.x] == null).
        filter(inTargetOverlap);
  }

  // Edge tiles sit one step outside the feature footprint, so a feature flush against the grid border produces tiles
  // that are off the grid entirely.
  function isOnGrid(tile) {
    return tile.x >= 0 && tile.y >= 0 && tile.x < floor.getFloorWidth() && tile.y < floor.getFloorHeight();
  }

  function buildRoomBetween(start,end) {
    const isVertical = start.x === end.x;
    const width  = isVertical ? 1 : Math.abs(end.x - start.x) + 1;
    const height = isVertical ? Math.abs(end.y - start.y) + 1 : 1;

    const room = Room();
    room.addBox(0, 0, width, height);
    return room;
  }

  return Object.freeze({
    build,
  });
}
