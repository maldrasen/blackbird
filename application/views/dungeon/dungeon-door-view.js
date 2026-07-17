global.DungeonDoorView = (function() {

  const doorLength = 48;

  // The door slab rises 80% of the wall height, leaving a lintel of wall above it.
  const slabHeight = 0.8;

  // A door is a closed slab standing in the plane of the wall it belongs to. The mouth erases whatever wall lines
  // cross the passage, then the passage is redrawn closed: flat floor lines along the passage sides, the cut edges
  // of the wall slanted like every vertical edge, the wall's top and base lines carried across the passage, and
  // the slab's top edge between them.
  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const metrics = DungeonRoomView.getWallMetrics();
    const insetOffset = (gridSize - doorLength) / 2;
    const hide = (floor.isRevealed(door.from) || floor.isRevealed(door.to)) ? '' : ' hide';

    const geometry = (door.direction === 'N')
      ? northGeometry(metrics, insetOffset)
      : westGeometry(metrics, insetOffset);

    const doorElement = X.createElement([
      `<svg class='door ${door.direction}${hide}' data-from='${door.from}' data-to='${door.to}' viewBox='${geometry.viewBox}'>`,
      `<rect class='mouth' x='${geometry.mouth.x}' y='${geometry.mouth.y}' width='${geometry.mouth.width}' height='${geometry.mouth.height}'/>`,
      ...geometry.jambs.map(line => `<polyline class='jamb' points='${line}'/>`),
      `<polyline class='slab' points='${geometry.slab}'/>`,
      `</svg>`,
    ].join(''));
    doorElement.style['left'] = `${(door.position.x * gridSize) + geometry.origin.x}px`;
    doorElement.style['top'] = `${(door.position.y * gridSize) + geometry.origin.y}px`;
    doorElement.style['height'] = `${geometry.height}px`;
    doorElement.style['width'] = `${geometry.width}px`;

    return doorElement;
  }

  // Local coordinates put (0,0) on the door tile's top-left corner. The passage runs from the far room's wall
  // line, across the boundary void, to this wall's base; the wall face spans between the base and top lines. The
  // element bounds pad the drawn geometry by a stroke width on every side.
  function northGeometry(metrics, insetOffset) {
    const { wallInset, northWallDepth, westWallDepth } = metrics;
    const top = wallInset;
    const base = wallInset + northWallDepth;
    const near = insetOffset;
    const far = insetOffset + doorLength;
    const slabX = westWallDepth * slabHeight;
    const slabY = base - (northWallDepth * slabHeight);

    const minX = near - westWallDepth - 1;
    const minY = -wallInset - 2;
    const width = (far + 1) - minX;
    const height = (base + 2) - minY;

    return {
      origin: { x: minX, y: minY },
      viewBox: `${minX} ${minY} ${width} ${height}`,
      width,
      height,
      mouth: { x: near, y: -wallInset - 1, width: doorLength, height: wallInset + base + 2 },
      jambs: [
        `${near},${-wallInset} ${near},${base} ${near - westWallDepth},${top}`,
        `${far},${-wallInset} ${far},${base} ${far - westWallDepth},${top}`,
        `${near},${top} ${far},${top}`,
        `${near},${base} ${far},${base}`,
      ],
      slab: `${near - slabX},${slabY} ${far - slabX},${slabY}`,
    };
  }

  function westGeometry(metrics, insetOffset) {
    const { wallInset, northWallDepth, westWallDepth } = metrics;
    const top = wallInset;
    const base = wallInset + westWallDepth;
    const near = insetOffset;
    const far = insetOffset + doorLength;
    const slabX = base - (westWallDepth * slabHeight);
    const slabY = northWallDepth * slabHeight;

    const minX = -wallInset - 2;
    const minY = near - northWallDepth - 1;
    const width = (base + 2) - minX;
    const height = (far + 1) - minY;

    return {
      origin: { x: minX, y: minY },
      viewBox: `${minX} ${minY} ${width} ${height}`,
      width,
      height,
      mouth: { x: -wallInset - 1, y: near, width: wallInset + base + 2, height: doorLength },
      jambs: [
        `${-wallInset},${near} ${base},${near} ${top},${near - northWallDepth}`,
        `${-wallInset},${far} ${base},${far} ${top},${far - northWallDepth}`,
        `${top},${near} ${top},${far}`,
        `${base},${near} ${base},${far}`,
      ],
      slab: `${slabX},${near - slabY} ${slabX},${far - slabY}`,
    };
  }

  return Object.freeze({
    build,
  });

})();
