global.FloorFactorySupport = (function() {

  // Get the start tiles for a feature in a given direction where the starting tiles are empty.
  function getStartTiles(feature, direction) {
    const position = feature.getPosition();
    const floorGrid = DungeonSystem.getDungeonFloor().getFloorGrid();

    return feature.getEdgeTiles(direction).
    map(tile => ({ x: tile.x + position.x, y: tile.y + position.y })).
    filter(tile => floorGrid[tile.y][tile.x] == null);
  }

  function buildRoomBetween(start,end) {
    const isVertical = start.x === end.x;
    const width  = isVertical ? 1 : Math.abs(end.x - start.x) + 1;
    const height = isVertical ? Math.abs(end.y - start.y) + 1 : 1;

    const room = Room();
    room.setMainBox(width, height);

    return room;
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
    getStartTiles,
    buildRoomBetween,
    addFeatureToGrid,
  });

})();