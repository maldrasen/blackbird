global.DungeonFloorGrid = (function() {

  // Plain grid lines on the floor, one per tile boundary. The room's coordinates are ceiling-level, and the floor
  // plane projects a wall depth down from them, so the lines sit at the tile boundaries shifted by the wall depth
  // — landing them exactly on the base ends of the wall seams. The lines span the room's whole bounds and are
  // clipped to the floor polygon, so the parts running under the wall bands (and outside an odd-shaped room
  // entirely) never show. The texture sits right after the floor element, under the wall lines.
  function paint(room) {
    const gridSize = DungeonFloorView.getGridSize();
    const wallDepth = DungeonRoomView.getWallMetrics().wallDepth;
    const bounds = room.getBounds();
    const index = room.getIndex();
    const width = bounds.xMax * gridSize;
    const height = bounds.yMax * gridSize;

    const floorShape = DungeonRoomView.getRoomGeometry(room).floor
      .map(vertex => `${vertex.x},${vertex.y}`).join(' ');

    const lines = [];
    for (let x = gridSize; x < width; x += gridSize) {
      lines.push(`<line x1='${x + wallDepth}' y1='0' x2='${x + wallDepth}' y2='${height}'/>`);
    }
    for (let y = gridSize; y < height; y += gridSize) {
      lines.push(`<line x1='0' y1='${y + wallDepth}' x2='${width}' y2='${y + wallDepth}'/>`);
    }

    X.first(`#dungeonFloor .room[data-index='${index}'] .floor`).insertAdjacentHTML('afterend', [
      `<clipPath id='floorTextureClip-${index}'><polygon points='${floorShape}'/></clipPath>`,
      `<g class='floor-texture' clip-path='url(#floorTextureClip-${index})'>${lines.join('')}</g>`,
    ].join(''));
  }

  return Object.freeze({
    paint
  });

})();
