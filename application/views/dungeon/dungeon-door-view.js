global.DungeonDoorView = (function() {

  const doorLength = 40;

  // A door is a single solid parallelogram lying on the wall face it belongs to: its top edge sits on the wall
  // line, its base edge on the wall base, and its sides lean with the projection of vertical edges. The whole
  // leaning shape is centered on the door's tile.
  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const metrics = DungeonRoomView.getWallMetrics();
    const hide = (floor.isRevealed(door.from) || floor.isRevealed(door.to)) ? '' : ' hide';

    const geometry = (door.direction === 'N')
      ? northGeometry(door, gridSize, metrics)
      : westGeometry(door, gridSize, metrics);

    const doorElement = X.createElement([
      `<svg class='door ${door.direction}${hide}' data-from='${door.from}' data-to='${door.to}' viewBox='0 0 ${geometry.width} ${geometry.height}'>`,
      `<polygon class='slab' points='${geometry.slab}'/>`,
      `</svg>`,
    ].join(''));
    doorElement.style['left'] = `${geometry.left}px`;
    doorElement.style['top'] = `${geometry.top}px`;
    doorElement.style['height'] = `${geometry.height}px`;
    doorElement.style['width'] = `${geometry.width}px`;

    return doorElement;
  }

  function northGeometry(door, gridSize, metrics) {
    const lean = metrics.westWallDepth;
    const width = doorLength + lean;
    const height = metrics.northWallDepth;

    return {
      left: (door.position.x * gridSize) + ((gridSize - width) / 2),
      top: (door.position.y * gridSize) + metrics.wallInset,
      width,
      height,
      slab: `0,0 ${doorLength},0 ${width},${height} ${lean},${height}`,
    };
  }

  function westGeometry(door, gridSize, metrics) {
    const lean = metrics.northWallDepth;
    const width = metrics.westWallDepth;
    const height = doorLength + lean;

    return {
      left: (door.position.x * gridSize) + metrics.wallInset,
      top: (door.position.y * gridSize) + ((gridSize - height) / 2),
      width,
      height,
      slab: `0,0 ${width},${lean} ${width},${height} 0,${doorLength}`,
    };
  }

  return Object.freeze({
    build,
  });

})();
