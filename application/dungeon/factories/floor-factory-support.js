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

  return Object.freeze({
    getStartTiles,
    setMainBox,
    setSubBox,
  });

})();
