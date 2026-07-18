global.DungeonWallGrid = (function() {

  // Seam lines on the wall faces, one per tile boundary, leaning with the projection of vertical edges the same
  // way the door slabs do. Ceiling vertices always sit a wall inset away from a tile boundary, so a seam never
  // lands on a face's end and never crosses the trims there — the boundaries strictly inside each ceiling
  // segment are exactly the visible seams.
  function paint(room) {
    const gridSize = DungeonFloorView.getGridSize();
    const wallDepth = DungeonRoomView.getWallMetrics().wallDepth;
    const faces = DungeonRoomView.getRoomGeometry(room).faces;

    const seams = faces.flatMap(face => faceSeams(face, gridSize, wallDepth));

    X.first(`#dungeonFloor .room[data-index='${room.getIndex()}'] .floor`).insertAdjacentHTML('afterend',
      `<g class='wall-texture'>${seams.join('')}</g>`);
  }

  // Ceiling segments run E (north walls, x increasing) or N (west walls, y decreasing).
  function faceSeams(face, gridSize, wallDepth) {
    const seams = [];

    for (let i = 0; i < face.ceiling.length - 1; i++) {
      const from = face.ceiling[i];
      const to = face.ceiling[i + 1];

      if (to.x > from.x) {
        for (let x = Math.ceil(from.x / gridSize) * gridSize; x < to.x; x += gridSize) {
          seams.push(seamLine(x, from.y, wallDepth));
        }
      } else {
        for (let y = Math.ceil(to.y / gridSize) * gridSize; y < from.y; y += gridSize) {
          seams.push(seamLine(from.x, y, wallDepth));
        }
      }
    }

    return seams;
  }

  function seamLine(x, y, wallDepth) {
    return `<line x1='${x}' y1='${y}' x2='${x + wallDepth}' y2='${y + wallDepth}'/>`;
  }

  return Object.freeze({
    paint
  });

})();
