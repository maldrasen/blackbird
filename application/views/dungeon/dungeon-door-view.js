global.DungeonDoorView = (function() {

  const doorLength = 60;
  const doorLintel = 10;

  function build(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const metrics = DungeonRoomView.getWallMetrics();

    let classname = `door ${door.direction}`;
    if (floor.isRevealed(door.from) === false) { classname += ' hide'; }

    const geometry = doorGeometry(door, gridSize, metrics);
    const clip = buildClipPath(floor, door, gridSize, metrics, 'door');

    return doorElement(door, classname, geometry, clip == null
      ? [`<polygon class='slab' points='${geometry.slab}'/>`]
      : [clip.element, `<polygon class='slab' clip-path='url(#${clip.id})' points='${geometry.slab}'/>`]);
  }

  function buildHanging(floor, door) {
    const gridSize = DungeonFloorView.getGridSize();
    const metrics = DungeonRoomView.getWallMetrics();
    const raised = floor.getRooms()[door.from].isOverlapping(door);

    let classname = `hanging-door ${door.direction}`;
    if (raised) { classname += ' raised'; }
    if (floor.isRevealed(door.to) === false) { classname += ' hide'; }

    const geometry = doorGeometry(door, gridSize, metrics);
    const clip = raised ? buildClipPath(floor, door, gridSize, metrics, 'hanging') : null;
    const content = [
      ...geometry.frames.map(line =>
        `<line class='frame' x1='${line[0]}' y1='${line[1]}' x2='${line[2]}' y2='${line[3]}'/>`),
      `<polygon class='slab' points='${geometry.slab}'/>`,
    ];

    return doorElement(door, classname, geometry, clip == null
      ? content
      : [clip.element, `<g clip-path='url(#${clip.id})'>`, ...content, `</g>`]);
  }

  function doorGeometry(door, gridSize, metrics) {
    return (door.direction === 'N') ? northGeometry(gridSize, metrics) : westGeometry(gridSize, metrics);
  }

  function doorElement(door, classname, geometry, content) {
    const gridSize = DungeonFloorView.getGridSize();
    const element = X.createElement([
      `<svg class='${classname}' data-from='${door.from}' data-to='${door.to}' viewBox='${geometry.viewBox}'>`,
      ...content,
      `</svg>`,
    ].join(''));
    element.style['left'] = `${(door.position.x * gridSize) + geometry.offsetX}px`;
    element.style['top'] = `${(door.position.y * gridSize) + geometry.offsetY}px`;
    element.style['height'] = `${geometry.height}px`;
    element.style['width'] = `${geometry.width}px`;
    return element;
  }

  // The real door and a raised hanging door clip to the same wall face, but each defines its own copy of the
  // clipPath. They can't share one: the browser won't resolve a clip reference into a display:none element, and
  // one of the pair is always hidden.
  function buildClipPath(floor, door, gridSize, metrics, kind) {
    const face = findWallFace(floor, door, gridSize, metrics);
    if (face == null) { return null; }

    const id = `doorClip-${kind}-${door.position.x}-${door.position.y}-${door.direction}`;
    const across = (door.direction === 'N') ? 'y' : 'x';
    const along = (door.direction === 'N') ? 'x' : 'y';
    const ceiling = adjustPolyline(face.ceiling, across, along, -1);
    const base = adjustPolyline(face.base, across, along, 1);

    const tileX = door.position.x * gridSize;
    const tileY = door.position.y * gridSize;
    const points = ceiling.concat(base.reverse())
      .map(point => `${point.x - tileX},${point.y - tileY}`).join(' ');

    return { id, element: `<clipPath id='${id}'><polygon points='${points}'/></clipPath>` };
  }

  // The wall strokes are 2px wide, centered on the face geometry, so the clip boundary would otherwise cut every
  // stroke in half: push the polyline half a stroke outward across the wall to keep the frame lines whole, and pull
  // its ends half a stroke inward so the slab stops at the corner lines instead of covering them.
  function adjustPolyline(points, across, along, acrossShift) {
    const adjusted = points.map(point => ({ ...point, [across]: point[across] + acrossShift }));
    const sign = Math.sign(adjusted[adjusted.length - 1][along] - adjusted[0][along]);
    adjusted[0][along] += sign;
    adjusted[adjusted.length - 1][along] -= sign;
    return adjusted;
  }

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

  function northGeometry(gridSize, metrics) {
    const { wallInset, wallDepth } = metrics;
    const start = (gridSize - doorLength) / 2;
    const top = wallInset + doorLintel - 1;
    const base = wallInset + wallDepth - 1;
    const topLeft = start + doorLintel - 1;
    const baseLeft = start + wallDepth - 1;

    return {
      offsetX: -wallDepth,
      offsetY: wallInset - 1,
      width: gridSize + (wallDepth * 2),
      height: wallDepth + 2,
      viewBox: `${-wallDepth} ${wallInset - 1} ${gridSize + (wallDepth * 2)} ${wallDepth + 2}`,
      frames: [
        [0, wallInset, gridSize, wallInset],
        [wallDepth, wallInset + wallDepth, gridSize + wallDepth, wallInset + wallDepth],
      ],
      slab: `${topLeft},${top} ${topLeft + doorLength},${top} ${baseLeft + doorLength},${base} ${baseLeft},${base}`,
    };
  }

  function westGeometry(gridSize, metrics) {
    const { wallInset, wallDepth } = metrics;
    const start = (gridSize - doorLength) / 2;
    const top = wallInset + doorLintel - 1;
    const base = wallInset + wallDepth - 1;
    const topStart = start + doorLintel - 1;
    const baseStart = start + wallDepth - 1;

    return {
      offsetX: wallInset - 1,
      offsetY: -wallDepth,
      width: wallDepth + 2,
      height: gridSize + (wallDepth * 2),
      viewBox: `${wallInset - 1} ${-wallDepth} ${wallDepth + 2} ${gridSize + (wallDepth * 2)}`,
      frames: [
        [wallInset, 0, wallInset, gridSize],
        [wallInset + wallDepth, wallDepth, wallInset + wallDepth, gridSize + wallDepth],
      ],
      slab: `${top},${topStart} ${base},${baseStart} ${base},${baseStart + doorLength} ${top},${topStart + doorLength}`,
    };
  }

  return Object.freeze({
    build,
    buildHanging,
  });

})();
