global.DungeonDoorView = (function() {

  // The slab's TOP edge is centered on the tile and the base trails the lean: the top edge is the door's most
  // visible part (the base sinks into the wall base line), so this is what reads as centered. The door must also
  // fit inside the wall face on any tile without ever needing occlusion; the worst case is a corner tile, where
  // the face's base only spans from the corner miter (wallInset + depth into the tile) to the far side wall line.
  // With top-edge centering the width caps at gridSize - 2*wallInset - 2*lean, currently 24.
  const doorLength = 20;
  const doorLintel = 6;

  // A door is a single solid parallelogram lying on the wall face it belongs to: its base edge stands on the wall
  // base, its top edge stops short of the wall line to leave the lintel, and its sides lean with the projection
  // of vertical edges, the whole shape centered on its tile. While the room owning the wall is unexplored that
  // wall is invisible, so the door also carries a tile's width of wall and floor line — the frame — drawn exactly
  // where the room's own lines will land, so nothing shifts when revealing the room anchors the door.
  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const metrics = DungeonRoomView.getWallMetrics();

    let classname = `door ${door.direction}`;
    if (floor.isRevealed(door.from) === false && floor.isRevealed(door.to) === false) { classname += ' hide'; }
    if (floor.isRevealed(door.from)) { classname += ' anchored'; }

    const geometry = (door.direction === 'N')
      ? northGeometry(gridSize, metrics)
      : westGeometry(gridSize, metrics);

    const doorElement = X.createElement([
      `<svg class='${classname}' data-from='${door.from}' data-to='${door.to}' viewBox='${geometry.viewBox}'>`,
      ...geometry.frames.map(line =>
        `<line class='frame' x1='${line[0]}' y1='${line[1]}' x2='${line[2]}' y2='${line[3]}'/>`),
      `<polygon class='slab' points='${geometry.slab}'/>`,
      `</svg>`,
    ].join(''));
    doorElement.style['left'] = `${(door.position.x * gridSize) + geometry.offsetX}px`;
    doorElement.style['top'] = `${(door.position.y * gridSize) + geometry.offsetY}px`;
    doorElement.style['height'] = `${geometry.height}px`;
    doorElement.style['width'] = `${geometry.width}px`;

    return doorElement;
  }

  function northGeometry(gridSize, metrics) {
    const { wallInset, northWallDepth, westWallDepth } = metrics;
    const height = northWallDepth - doorLintel;
    const lean = (height * westWallDepth) / northWallDepth;
    const top = wallInset + doorLintel;
    const base = wallInset + northWallDepth;
    const left = (gridSize - doorLength) / 2;
    const baseLeft = left + lean;

    return {
      offsetX: 0,
      offsetY: wallInset - 1,
      width: gridSize,
      height: northWallDepth + 2,
      viewBox: `0 ${wallInset - 1} ${gridSize} ${northWallDepth + 2}`,
      frames: [
        [0, wallInset, gridSize, wallInset],
        [0, base, gridSize, base],
      ],
      slab: `${left},${top} ${left + doorLength},${top} ${baseLeft + doorLength},${base} ${baseLeft},${base}`,
    };
  }

  function westGeometry(gridSize, metrics) {
    const { wallInset, northWallDepth, westWallDepth } = metrics;
    const height = westWallDepth - doorLintel;
    const lean = (height * northWallDepth) / westWallDepth;
    const top = wallInset + doorLintel;
    const base = wallInset + westWallDepth;
    const start = (gridSize - doorLength) / 2;
    const baseTop = start + lean;

    return {
      offsetX: wallInset - 1,
      offsetY: 0,
      width: westWallDepth + 2,
      height: gridSize,
      viewBox: `${wallInset - 1} 0 ${westWallDepth + 2} ${gridSize}`,
      frames: [
        [wallInset, 0, wallInset, gridSize],
        [base, 0, base, gridSize],
      ],
      slab: `${top},${start} ${base},${baseTop} ${base},${baseTop + doorLength} ${top},${start + doorLength}`,
    };
  }

  return Object.freeze({
    build,
  });

})();
