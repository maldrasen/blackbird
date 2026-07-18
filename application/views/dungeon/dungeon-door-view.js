global.DungeonDoorView = (function() {

  const doorLength = 80;
  const doorLintel = 6;

  // A door is a single solid parallelogram lying on the wall face it belongs to: its base edge stands on the wall
  // base, its top edge stops short of the wall line to leave the lintel, and its sides lean with the projection
  // of vertical edges. Every slab is physically centered on its tile, so it leans exactly the way the wall grid's
  // cell does and its base lands centered on the floor grid's cell. Where a side wall stands in front of the face
  // — the ends of narrow walls, most visibly — the slab is clipped by the face polygon, hiding the part of the
  // door that stands behind the wall. While the room owning the wall is unexplored that wall is invisible, so the
  // door also carries a tile's width of wall and floor line — the frame — drawn exactly where the room's own
  // lines will land, so nothing shifts when revealing the room anchors the door.
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
      ...slabElements(floor, door, gridSize, metrics, geometry.slab),
      `</svg>`,
    ].join(''));
    doorElement.style['left'] = `${(door.position.x * gridSize) + geometry.offsetX}px`;
    doorElement.style['top'] = `${(door.position.y * gridSize) + geometry.offsetY}px`;
    doorElement.style['height'] = `${geometry.height}px`;
    doorElement.style['width'] = `${geometry.width}px`;

    return doorElement;
  }

  // The slab, clipped by the polygon of the face it lies on so the parts of the door standing behind a side wall
  // stay hidden. The face polygon is in floor pixels and the door's viewBox puts its tile's origin at 0,0, so the
  // clip is just the polygon shifted onto the tile.
  function slabElements(floor, door, gridSize, metrics, slab) {
    const face = findWallFace(floor, door, gridSize, metrics);
    if (face == null) { return [`<polygon class='slab' points='${slab}'/>`]; }

    const clipId = `doorClip-${door.position.x}-${door.position.y}-${door.direction}`;
    const tileX = door.position.x * gridSize;
    const tileY = door.position.y * gridSize;
    const points = face.ceiling.concat([...face.base].reverse())
      .map(point => `${point.x - tileX},${point.y - tileY}`).join(' ');

    return [
      `<clipPath id='${clipId}'><polygon points='${points}'/></clipPath>`,
      `<polygon class='slab' clip-path='url(#${clipId})' points='${slab}'/>`,
    ];
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

  // The door's viewBox reaches a wall's depth past the tile on both sides, because the base edge of a centered
  // slab trails the lean into the neighboring tile and must not be cut off by the element's own bounds.
  function northGeometry(gridSize, metrics) {
    const { wallInset, wallDepth } = metrics;
    const start = (gridSize - doorLength) / 2;
    const top = wallInset + doorLintel;
    const base = wallInset + wallDepth;
    const topLeft = start + doorLintel;
    const baseLeft = start + wallDepth;

    return {
      offsetX: -wallDepth,
      offsetY: wallInset - 1,
      width: gridSize + (wallDepth * 2),
      height: wallDepth + 2,
      viewBox: `${-wallDepth} ${wallInset - 1} ${gridSize + (wallDepth * 2)} ${wallDepth + 2}`,
      frames: [
        [0, wallInset, gridSize, wallInset],
        [0, base, gridSize, base],
      ],
      slab: `${topLeft},${top} ${topLeft + doorLength},${top} ${baseLeft + doorLength},${base} ${baseLeft},${base}`,
    };
  }

  function westGeometry(gridSize, metrics) {
    const { wallInset, wallDepth } = metrics;
    const start = (gridSize - doorLength) / 2;
    const top = wallInset + doorLintel;
    const base = wallInset + wallDepth;
    const topStart = start + doorLintel;
    const baseStart = start + wallDepth;

    return {
      offsetX: wallInset - 1,
      offsetY: -wallDepth,
      width: wallDepth + 2,
      height: gridSize + (wallDepth * 2),
      viewBox: `${wallInset - 1} ${-wallDepth} ${wallDepth + 2} ${gridSize + (wallDepth * 2)}`,
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
