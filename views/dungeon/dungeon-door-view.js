global.DungeonDoorView = (function() {

  const doorLength = 60;

 function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const wallInset = DungeonRoomView.getWallInset();
    const half = gridSize / 2;

    let classname = `door ${door.direction}`;
    if (floor.isRevealed(door.from) === false && floor.isRevealed(door.to) === false) { classname += ' hide'; }

    const across = wallInset + 1;
    const along = doorLength / 2;
    const slab = (door.direction === 'N')
      ? `${-along},${-across} ${along},${-across} ${along},${across} ${-along},${across}`
      : `${-across},${-along} ${across},${-along} ${across},${along} ${-across},${along}`;
    const target = `0,${-half} ${half},0 0,${half} ${-half},0`;

    const element = X.createElement([
      `<svg class='${classname}' data-from='${door.from}' data-to='${door.to}' viewBox='${-half} ${-half} ${gridSize} ${gridSize}'>`,
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

  return {
    build,
  };

})();
