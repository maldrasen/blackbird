global.DungeonDoorView = (function() {

  const doorLength = 60;
  const doorThickness = 8;

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

    const opening = rectangle(door.direction, along, wallInset + 2);
    const caps = [-along, along].flatMap(position => ['from','to'].map(side =>
      capLine(door.direction, position, side, wallInset)));
    const slab = rectangle(door.direction, along-4, doorThickness / 2);
    const target = `0,${-half} ${half},0 0,${half} ${-half},0`;

    const element = X.createElement([
      `<svg class='${classname}' data-from='${door.from}' data-to='${door.to}' viewBox='${-half} ${-half} ${gridSize} ${gridSize}'>`,
      `<polygon class='opening' points='${opening}'/>`,
      ...caps,
      `<polygon class='slab' points='${slab}'/>`,
      `<polygon class='click-target' points='${target}'/>`,
      `</svg>`,
    ].join(''));

    const center = (door.direction === 'N')
      ? { x: (door.position.x * gridSize) + half, y: door.position.y * gridSize }
      : { x: door.position.x * gridSize, y: (door.position.y * gridSize) + half };

    element.style['left'] = `${center.x - half}px`;
    element.style['top'] = `${center.y - half}px`;
    element.style['height'] = `${gridSize}px`;
    element.style['width'] = `${gridSize}px`;

    return element;
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
  };

})();
