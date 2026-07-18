global.DungeonDoorView = (function() {

  const doorLength = 80;
  const doorLintel = 6;
  const doorMargin = 2;

  // A door is a single solid parallelogram lying on the wall face it belongs to: its base edge stands on the wall
  // base, its top edge stops short of the wall line to leave the lintel, and its sides lean with the projection
  // of vertical edges. The slab is physically centered on its tile, so it leans exactly the way the wall grid's
  // cell does and its base lands centered on the floor grid's cell. Near a corner, where part of the wall cell
  // hides behind a side wall, the slab slides along the wall just far enough to stay on the visible face. While
  // the room owning the wall is unexplored that wall is invisible, so the door also carries a tile's width of
  // wall and floor line — the frame — drawn exactly where the room's own lines will land, so nothing shifts when
  // revealing the room anchors the door.
  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const metrics = DungeonRoomView.getWallMetrics();

    let classname = `door ${door.direction}`;
    if (floor.isRevealed(door.from) === false && floor.isRevealed(door.to) === false) { classname += ' hide'; }
    if (floor.isRevealed(door.from)) { classname += ' anchored'; }

    const start = slabStart(floor, door, gridSize, metrics);
    const geometry = (door.direction === 'N')
      ? northGeometry(gridSize, metrics, start)
      : westGeometry(gridSize, metrics, start);

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

  // Where the slab starts along its wall, in tile-local unsheared wall coordinates: the coordinate runs along the
  // wall with the lean removed, so an edge at start recovers its leaning position as x = start + (y - wallInset).
  // The slab is centered on the tile unless the face's occluded boundary pushes it aside.
  function slabStart(floor, door, gridSize, metrics) {
    const centered = (gridSize - doorLength) / 2;
    const face = findWallFace(floor, door, gridSize, metrics);
    if (face == null) { return centered; }

    const north = door.direction === 'N';
    const tileX = door.position.x * gridSize;
    const tileY = door.position.y * gridSize;

    // Unshearing turns the slab into an axis-aligned rectangle while every face boundary edge stays a straight
    // line, so the room available to the slab is an interval scan across the face polygon at the slab's top and
    // base heights. The base scan runs half a pixel above the base line, where the polygon's own vertices sit.
    const unshear = north
      ? point => ({ a: point.x - point.y, b: point.y })
      : point => ({ a: point.y - point.x, b: point.x });
    const polygon = face.ceiling.concat([...face.base].reverse()).map(unshear);

    const offset = (north ? tileX - tileY : tileY - tileX) - metrics.wallInset;
    const band = north ? tileY : tileX;
    const target = offset + (gridSize / 2);

    const topSpan = spanAt(polygon, band + metrics.wallInset + doorLintel, target);
    const baseSpan = spanAt(polygon, band + metrics.wallInset + metrics.wallDepth - 0.5, target);
    if (topSpan == null || baseSpan == null) { return centered; }

    const lo = Math.max(topSpan[0], baseSpan[0]) + doorMargin - offset;
    const hi = Math.min(topSpan[1], baseSpan[1]) - doorMargin - offset;

    if (hi - lo < doorLength) { return (lo + hi - doorLength) / 2; }
    return Math.min(Math.max(centered, lo), hi - doorLength);
  }

  // The face polygon the door lies on, in floor pixels: the wall face whose ceiling runs through the door tile's
  // wall line. Interior faces come from the room on the near side of the wall; when the far room is nested inside
  // it the wall is the nested room's exterior face instead. Feature doors don't promise which end of the door is
  // the near room, so both rooms' geometry is searched.
  function findWallFace(floor, door, gridSize, metrics) {
    const point = (door.direction === 'N')
      ? { x: (door.position.x * gridSize) + (gridSize / 2), y: (door.position.y * gridSize) + metrics.wallInset }
      : { x: (door.position.x * gridSize) + metrics.wallInset, y: (door.position.y * gridSize) + (gridSize / 2) };

    for (const index of new Set([door.from, door.to])) {
      const room = floor.getRooms()[index];
      const position = room.getFloorPosition();
      const faces = [
        ...DungeonRoomView.getRoomGeometry(room).faces,
        ...DungeonRoomView.getNestedGeometry(floor, room).flatMap(nested => nested.faces),
      ].map(face => translateFace(face, position.x * gridSize, position.y * gridSize));

      const match = faces.find(face => ceilingContains(face, point));
      if (match != null) { return match; }
    }

    return null;
  }

  function translateFace(face, x, y) {
    return {
      ceiling: face.ceiling.map(point => ({ x: point.x + x, y: point.y + y })),
      base: face.base.map(point => ({ x: point.x + x, y: point.y + y })),
    };
  }

  function ceilingContains(face, point) {
    for (let i = 0; i + 1 < face.ceiling.length; i++) {
      const from = face.ceiling[i];
      const to = face.ceiling[i + 1];
      if (from.y === point.y && to.y === point.y && contains(point.x, from.x, to.x)) { return true; }
      if (from.x === point.x && to.x === point.x && contains(point.y, from.y, to.y)) { return true; }
    }
    return false;
  }

  function contains(value, from, to) {
    return Math.min(from, to) <= value && value <= Math.max(from, to);
  }

  // The a-interval the polygon covers at height b: the crossing pair containing the target coordinate, falling
  // back to the nearest pair.
  function spanAt(polygon, b, target) {
    const crossings = [];
    polygon.forEach((point, i) => {
      const next = polygon[(i + 1) % polygon.length];
      if ((point.b < b) === (next.b < b)) { return; }
      crossings.push(point.a + ((next.a - point.a) * ((b - point.b) / (next.b - point.b))));
    });
    crossings.sort((p, q) => p - q);

    let best = null;
    for (let i = 0; i + 1 < crossings.length; i += 2) {
      const distance = Math.max(crossings[i] - target, target - crossings[i + 1], 0);
      if (best == null || distance < best.distance) { best = { distance, span: [crossings[i], crossings[i + 1]] }; }
    }
    return (best == null) ? null : best.span;
  }

  function northGeometry(gridSize, metrics, start) {
    const { wallInset, wallDepth } = metrics;
    const top = wallInset + doorLintel;
    const base = wallInset + wallDepth;
    const topLeft = start + doorLintel;
    const baseLeft = start + wallDepth;

    return {
      offsetX: 0,
      offsetY: wallInset - 1,
      width: gridSize,
      height: wallDepth + 2,
      viewBox: `0 ${wallInset - 1} ${gridSize} ${wallDepth + 2}`,
      frames: [
        [0, wallInset, gridSize, wallInset],
        [0, base, gridSize, base],
      ],
      slab: `${topLeft},${top} ${topLeft + doorLength},${top} ${baseLeft + doorLength},${base} ${baseLeft},${base}`,
    };
  }

  function westGeometry(gridSize, metrics, start) {
    const { wallInset, wallDepth } = metrics;
    const top = wallInset + doorLintel;
    const base = wallInset + wallDepth;
    const topStart = start + doorLintel;
    const baseStart = start + wallDepth;

    return {
      offsetX: wallInset - 1,
      offsetY: 0,
      width: wallDepth + 2,
      height: gridSize,
      viewBox: `${wallInset - 1} 0 ${wallDepth + 2} ${gridSize}`,
      frames: [
        [wallInset, 0, wallInset, gridSize],
        [base, 0, base, gridSize],
      ],
      slab: `${top},${topStart} ${base},${baseStart} ${base},${baseStart + doorLength} ${top},${topStart + doorLength}`,
    };
  }

  return Object.freeze({
    build,
  });

})();
