global.DungeonDoorView = (function() {

  const openingLength = 60;
  const doorLength = 40;

  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const across = DungeonRoomView.getWallInset() + 2;
    const half = gridSize / 2;

    let classname = `door ${door.direction}`;
    if (floor.isRevealed(door.from) === false && floor.isRevealed(door.to) === false) { classname += ' hide'; }

    const opening = rectangle(door.direction, openingLength / 2, across);
    const slab = rectangle(door.direction, doorLength / 2, across);
    const target = `0,${-half} ${half},0 0,${half} ${-half},0`;

    const element = X.createElement([
      `<svg class='${classname}' data-from='${door.from}' data-to='${door.to}' viewBox='${-half} ${-half} ${gridSize} ${gridSize}'>`,
      `<polygon class='opening' points='${opening}'/>`,
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

  return {
    build,
  };

})();
