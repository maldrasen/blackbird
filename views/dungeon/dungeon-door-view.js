global.DungeonDoorView = (function() {

  const doorLength = 60;
  const doorThickness = 8;

  // The opening reaches a little past the wall lines on either side of the door so that their strokes are covered.
  const openingOverlap = 2;

  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const wallInset = DungeonRoomView.getWallInset();
    const half = gridSize / 2;
    const along = doorLength / 2;

    let classname = `door ${door.direction}`;
    if (floor.isRevealed(door.from) === false) { classname += ' from-unrevealed'; }
    if (floor.isRevealed(door.to) === false) { classname += ' to-unrevealed'; }
    if (door.from === floor.getLocation()) { classname += ' from-current'; }
    if (door.to === floor.getLocation()) { classname += ' to-current'; }
    if (door.open) { classname += ' open'; }

    const opening = rectangle(door.direction, along, wallInset + openingOverlap);
    const caps = [-along, along].flatMap(position => ['from','to'].map(side =>
      capLine(door.direction, position, side, wallInset)));
    const slab = rectangle(door.direction, along-4, doorThickness / 2);

    const element = X.createElement([
      `<svg class='${classname}' data-from='${door.from}' data-to='${door.to}' data-x='${door.position.x}' data-y='${door.position.y}' viewBox='${-half} ${-half} ${gridSize} ${gridSize}'>`,
      `<polygon class='opening' points='${opening}'/>`,
      ...caps,
      `<polygon class='slab' points='${slab}'/>`,
      `</svg>`,
    ].join(''));

    const center = getDoorCenter(door);

    element.style['left'] = `${center.x - half}px`;
    element.style['top'] = `${center.y - half}px`;
    element.style['height'] = `${gridSize}px`;
    element.style['width'] = `${gridSize}px`;

    return element;
  }

  // The midpoint of the wall the door sits in, in floor pixels.
  function getDoorCenter(door) {
    const gridSize = DungeonFloorView.getGridSize();
    const half = gridSize / 2;

    return (door.direction === 'N')
      ? { x: (door.position.x * gridSize) + half, y: door.position.y * gridSize }
      : { x: door.position.x * gridSize, y: (door.position.y * gridSize) + half };
  }

  // The rectangle the opening paints over the wall lines on either side of the door, in floor pixels.
  function getOpening(door) {
    const center = getDoorCenter(door);
    const along = doorLength / 2;
    const across = DungeonRoomView.getWallInset() + openingOverlap;

    return (door.direction === 'N')
      ? { xMin: center.x - along, xMax: center.x + along, yMin: center.y - across, yMax: center.y + across }
      : { xMin: center.x - across, xMax: center.x + across, yMin: center.y - along, yMax: center.y + along };
  }

  function rectangle(direction, along, across) {
    return (direction === 'N')
      ? `${-along},${-across} ${along},${-across} ${along},${across} ${-along},${across}`
      : `${-across},${-along} ${across},${-along} ${across},${along} ${-across},${along}`;
  }

  // The from room is always the door's own tile, on the positive side of the shared edge; the to room is the
  // north or west neighbor on the negative side.
  function capLine(direction, position, side, extent) {
    const reach = (side === 'from') ? extent : -extent;
    return (direction === 'N')
      ? `<line class='cap ${side}' x1='${position}' y1='0' x2='${position}' y2='${reach}'/>`
      : `<line class='cap ${side}' x1='0' y1='${position}' x2='${reach}' y2='${position}'/>`;
  }

  return {
    build,
    getDoorCenter,
    getOpening,
    getDoorLength: () => { return doorLength; },
  };

})();
