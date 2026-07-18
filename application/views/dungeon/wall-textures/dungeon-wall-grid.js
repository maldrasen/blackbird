global.DungeonWallGrid = (function() {

  // Seam lines on the wall faces, one per tile boundary, leaning with the projection of vertical edges the same
  // way the door slabs do. Ceiling vertices always sit a wall inset away from a tile boundary, so a seam never
  // lands on a face's end and never crosses the trims there — the boundaries strictly inside each ceiling
  // segment are exactly the visible seams.
  function paint(room) {
    const gridSize = DungeonFloorView.getGridSize();
    const wallDepth = DungeonRoomView.getWallMetrics().wallDepth;
    const floor = DungeonSystem.getDungeonFloor();
    const roomElement = X.first(`#dungeonFloor .room[data-index='${room.getIndex()}']`);

    const seams = DungeonRoomView.getRoomGeometry(room).faces
      .flatMap(face => faceSeams(face, gridSize, wallDepth));

    roomElement.querySelector('.floor').insertAdjacentHTML('afterend',
      `<g class='wall-texture'>${seams.join('')}</g>`);

    // The seams on the nested exteriors go in their own group above the nested walls, whose filled polygons
    // would otherwise cover them.
    const nestedSeams = DungeonRoomView.getNestedGeometry(floor, room)
      .flatMap(nested => nested.faces)
      .flatMap(face => faceSeams(face, gridSize, wallDepth));

    if (nestedSeams.length > 0) {
      const nestedWallElements = roomElement.querySelectorAll('.nested-wall');
      nestedWallElements[nestedWallElements.length - 1].insertAdjacentHTML('afterend',
        `<g class='wall-texture'>${nestedSeams.join('')}</g>`);
    }
  }

  // A ceiling segment runs along one axis; the seams sit at the tile boundaries strictly inside it, whichever
  // way the segment is walked.
  function faceSeams(face, gridSize, wallDepth) {
    const seams = [];

    for (let i = 0; i < face.ceiling.length - 1; i++) {
      const from = face.ceiling[i];
      const to = face.ceiling[i + 1];

      if (from.y === to.y) {
        const last = Math.max(from.x, to.x);
        for (let x = Math.ceil(Math.min(from.x, to.x) / gridSize) * gridSize; x < last; x += gridSize) {
          seams.push(seamLine(x, from.y, wallDepth));
        }
      } else {
        const last = Math.max(from.y, to.y);
        for (let y = Math.ceil(Math.min(from.y, to.y) / gridSize) * gridSize; y < last; y += gridSize) {
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
