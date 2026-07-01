global.FloorFactorySupport = (function() {

  // We need to track the room origin position between building a main box and setting a sub box. Better to just set
  // a temp variable like this than to pass the value between the functions (though that would be more proper)
  let mainOrigin;

  // Get the start tiles for a feature in a given direction where the starting tiles are empty.
  function getStartTiles(feature, direction) {
    const position = feature.getPosition();
    const floorGrid = DungeonSystem.getDungeonFloor().getFloorGrid();

    return feature.getEdgeTiles(direction).
    map(tile => ({ x: tile.x + position.x, y: tile.y + position.y })).
    filter(tile => floorGrid[tile.y][tile.x] == null);
  }

  function setMainBox(room, start, end) {
    const width = Math.abs(end.x - start.x) + 1;
    const height = Math.abs(end.y - start.y) + 1;

    mainOrigin = { x: Math.min(start.x,end.x), y: Math.min(start.y,end.y) };
    room.setMainBox(width, height);
  }

  // Setting a room's sub box reads from the `mainOrigin` variable, that should have been set when setMainBox() is
  // called. That is to say, always call setMainBox() before this.
  function setSubBox(room, start, end) {
    const width = Math.abs(end.x - start.x) + 1;
    const height = Math.abs(end.y - start.y) + 1;
    const subOrigin = { x: Math.min(start.x,end.x), y: Math.min(start.y,end.y) };

    room.setSubBox(subOrigin.x - mainOrigin.x, subOrigin.y - mainOrigin.y, width, height);
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
    getStartTiles,
    setMainBox,
    setSubBox,
    buildDoor,
  });

})();
