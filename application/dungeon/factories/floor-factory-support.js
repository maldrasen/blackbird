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

  // Get the start tiles for a feature in a given direction where the starting tiles are empty.
  function getStartTiles(feature, direction) {
    const position = feature.getPosition();
    const floorGrid = DungeonSystem.getDungeonFloor().getFloorGrid();

    return feature.getEdgeTiles(direction).
    map(tile => ({ x: tile.x + position.x, y: tile.y + position.y })).
    filter(tile => floorGrid[tile.y][tile.x] == null);
  }

  // Add a box to the room for a straight segment between two absolute grid points. Room normalizes its own origin
  // to (0,0) lazily (whenever its bounds/boxes are actually read), so every segment of a multi-box room (a bent
  // corridor's two legs, a dogleg's three) can just be added using plain absolute grid coordinates.
  function addSegment(room, start, end) {
    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
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

  // Doors are only ever stored on a tile's S or E wall. Given an empty point that touches the feature at toIndex,
  // this finds which side toIndex is on and derives the door's real position/direction from that. A feature to the
  // N or W needs the door tile shifted onto that feature so it can be expressed as S/E facing.
  function buildDoor(point, fromIndex, toIndex) {
    const floor = DungeonSystem.getDungeonFloor();
    const grid = floor.getFloorGrid();

    const north = point.y > 0 ? grid[point.y-1][point.x] : null;
    const south = point.y+1 < floor.getFloorHeight() ? grid[point.y+1][point.x] : null;
    const west  = point.x > 0 ? grid[point.y][point.x-1] : null;
    const east  = point.x+1 < floor.getFloorWidth() ? grid[point.y][point.x+1] : null;

    if (south === toIndex) { return Door(point, 'S', fromIndex, toIndex); }
    if (east  === toIndex) { return Door(point, 'E', fromIndex, toIndex); }
    if (north === toIndex) { return Door({ x:point.x, y:point.y-1 }, 'S', toIndex, fromIndex); }
    if (west  === toIndex) { return Door({ x:point.x-1, y:point.y }, 'E', toIndex, fromIndex); }

    throw new Error(`Feature[${toIndex}] is not adjacent to (${point.x},${point.y})`);
  }

  return Object.freeze({
    getGapBetweenFeatures,
    getStartTiles,
    addSegment,
    segmentIsClear,
    buildDoor,
  });

})();
