global.FloorFactorySupport = (function() {

  // The number of empty tiles between origin and target along a single cardinal axis.
  function getGapBetweenFeatures(originFeature, targetFeature, direction) {
    const origin = originFeature.getLocation();
    const target = targetFeature.getLocation();

    switch (direction) {
      case 'N': return origin.yMin - target.yMax;
      case 'S': return target.yMin - origin.yMax;
      case 'E': return target.xMin - origin.xMax;
      case 'W': return origin.xMin - target.xMax;
    }
  }

  // Get the start tiles for a feature in a given direction, where the starting tiles are empty. It's possible, through
  // feature overlap shenanigans, for the direction to the target feature to point to the edge, while the origin
  // feature itself is up against the edge of the grid. Edge tiles sit one step outside the feature footprint, so a
  // feature flush against the grid border produces tiles that are off the grid entirely and must be discarded.
  function getStartTiles(feature, direction) {
    const floor = DungeonSystem.getDungeonFloor();
    const floorGrid = floor.getFloorGrid();
    const height = floor.getFloorHeight();
    const width = floor.getFloorWidth();
    const position = feature.getPosition();

    return feature.getEdgeTiles(direction).
        map(tile => ({ x: tile.x + position.x, y: tile.y + position.y })).
        filter(tile => tile.x >= 0 && tile.y >= 0 && tile.x < width && tile.y < height).
        filter(tile => floorGrid[tile.y][tile.x] == null);
  }

  // Add a box to the room for a straight segment between two absolute grid points, translated into the room's own
  // grid by the corridor's origin (its min corner in floor coordinates).
  function addSegment(room, start, end, origin) {
    const x = Math.min(start.x, end.x) - origin.x;
    const y = Math.min(start.y, end.y) - origin.y;
    const width = Math.abs(end.x - start.x) + 1;
    const height = Math.abs(end.y - start.y) + 1;
    room.addBox(x, y, width, height);
  }

  // Walks every cell from `from` to `to` (inclusive of both ends) one tile at a time, along whichever of the four
  // directions the segment actually runs in, failing as soon as it finds an occupied cell.
  function segmentIsClear(from, to) {
    const grid = DungeonSystem.getDungeonFloor().getFloorGrid();
    const dx = step(to.x - from.x);
    const dy = step(to.y - from.y);
    let cursor = { x:from.x, y:from.y };

    while (true) {
      if (grid[cursor.y][cursor.x] != null) { return false; }
      if (cursor.x === to.x && cursor.y === to.y) { return true; }
      cursor = { x:cursor.x + dx, y:cursor.y + dy };
    }
  }

  function step(n) {
    if (n > 0) { return 1; }
    if (n < 0) { return -1; }
    return 0;
  }

  // Resolve which room of toFeature a corridor door tile actually touches, then build the door between the corridor's
  // room and that room. The point can touch the feature on more than one side while only some of those walls allow
  // doors, so the wall is picked from the door-permitted candidates rather than plain adjacency. Must be called after
  // the corridor is registered, so its room has a floor-global index.
  function buildDoorToFeature(point, fromRoomIndex, toFeature) {
    const floor = DungeonSystem.getDungeonFloor();
    const grid = floor.getFloorGrid();

    const candidates = [
      { direction:'N', tile:{ x:point.x, y:point.y-1 } },
      { direction:'S', tile:{ x:point.x, y:point.y+1 } },
      { direction:'W', tile:{ x:point.x-1, y:point.y } },
      { direction:'E', tile:{ x:point.x+1, y:point.y } },
    ].
      filter(({tile}) => tile.x >= 0 && tile.y >= 0 && tile.x < floor.getFloorWidth() && tile.y < floor.getFloorHeight()).
      map(candidate => ({ ...candidate, cell:grid[candidate.tile.y][candidate.tile.x] })).
      filter(({cell}) => cell != null && floor.getFeatureForRoom(cell) === toFeature);

    if (candidates.length === 0) {
      throw new Error(`Feature[${toFeature.getIndex()}] is not adjacent to (${point.x},${point.y})`);
    }

    const allowed = candidates.find(({direction,tile,cell}) => {
      const opposite = { N:'S', S:'N', E:'W', W:'E' };
      const room = floor.getRooms()[cell];
      const position = room.getFloorPosition();
      return room.doorIsAllowed(tile.x - position.x, tile.y - position.y, opposite[direction]);
    });

    if (allowed == null) {
      throw new Error(`Feature[${toFeature.getIndex()}] allows no door adjacent to (${point.x},${point.y})`);
    }

    return buildDoor(point, fromRoomIndex, allowed);
  }

  // Doors are only ever stored on a tile's N or W wall. A room to the S or E needs the door tile shifted onto that
  // room so it can be expressed as N/W facing.
  function buildDoor(point, fromIndex, {direction, cell}) {
    switch (direction) {
      case 'N': return { position:point, direction:'N', from:fromIndex, to:cell };
      case 'W': return { position:point, direction:'W', from:fromIndex, to:cell };
      case 'S': return { position:{ x:point.x, y:point.y+1 }, direction:'N', from:cell, to:fromIndex };
      case 'E': return { position:{ x:point.x+1, y:point.y }, direction:'W', from:cell, to:fromIndex };
    }
  }

  return {
    getGapBetweenFeatures,
    getStartTiles,
    addSegment,
    segmentIsClear,
    buildDoorToFeature,
  };

})();
