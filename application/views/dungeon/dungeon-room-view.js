global.DungeonRoomView = (function() {
  const wallInset = 10;
  const wallDepth = 40;

  const wallTopShift = { x: -wallDepth, y: -wallDepth };
  const wallBaseShift = { x: wallDepth, y: wallDepth };
  const noShift = { x: 0, y: 0 };

  const roomWallShifts = { E: wallTopShift, N: wallTopShift, S: noShift, W: noShift };
  const nestedWallShifts = { E: noShift, N: noShift, S: wallBaseShift, W: wallBaseShift };

  const wallFaceDirections = ['E','N'];
  const nestedFaceDirections = ['S','W'];
  const wallBaseInsets = {
    E: wallInset + wallDepth,
    N: wallInset + wallDepth,
    S: wallInset,
    W: wallInset,
  };

  function points(vertices) {
    return vertices.map(vertex => `${vertex.x},${vertex.y}`).join(' ');
  }

  function build(floor, room) {
    const gridSize = DungeonFloorView.getGridSize();
    const index = room.getIndex();
    const position = room.getFloorPosition();
    const bounds = room.getBounds();
    const width = bounds.xMax * gridSize;
    const height = bounds.yMax * gridSize;

    let classname = 'room';
    if (floor.isRevealed(index) === false) { classname += ' unrevealed'; }
    if (index === floor.getLocation()) { classname += ' current'; }

    const geometry = getRoomGeometry(room);
    const content = [
      `<polygon class='footprint' points='${points(geometry.outline)}'/>`,
      ...wallFacePolygons(geometry.faces),
      `<polygon class='floor' points='${points(geometry.floor)}'/>`,
      `<polygon class='walls' points='${points(geometry.wallLine)}'/>`,
      ...wallFaceLines(geometry.faces),
      ...cornerLines(geometry.wallBase, roomWallShifts),
      ...nestedWalls(floor, room),
      stairsGlyph(floor, room, 'up', gridSize),
      stairsGlyph(floor, room, 'down', gridSize),
    ].join('');

    const roomElement = X.createElement(
      `<svg class='${classname}' data-index='${index}' viewBox='0 0 ${width} ${height}'>${content}</svg>`);
    roomElement.style['left'] = `${(position.x * gridSize)}px`;
    roomElement.style['top'] = `${(position.y * gridSize)}px`;
    roomElement.style['height'] = `${height}px`;
    roomElement.style['width'] = `${width}px`;
    roomElement.style.setProperty('--depth', roomDepth(floor, index));

    return roomElement;
  }

  function getRoomGeometry(room) {
    const gridSize = DungeonFloorView.getGridSize();
    const outline = GeometryHelper.traceOutline(room.getFootprint())
      .map(vertex => ({ x: vertex.x * gridSize, y: vertex.y * gridSize }));
    const wallLine = GeometryHelper.insetOutline(outline, wallInset);
    const wallBase = GeometryHelper.insetOutline(outline, wallBaseInsets);

    return {
      outline, wallLine, wallBase,
      floor: floorOutline(outline, wallLine, wallBase),
      faces: wallFaces(outline, wallLine, wallBase),
    };
  }

  function floorOutline(outline, wallLine, wallBase) {
    return outline.flatMap((vertex, i) => {
      const previous = outline[(i + outline.length - 1) % outline.length];
      const next = outline[(i + 1) % outline.length];
      const incoming = GeometryHelper.edgeDirection(previous, vertex);
      const outgoing = GeometryHelper.edgeDirection(vertex, next);
      const slant = { x: wallLine[i].x + wallBaseShift.x, y: wallLine[i].y + wallBaseShift.y };

      if (incoming === 'S' && outgoing === 'E') { return [wallLine[i], slant]; }
      if (incoming === 'N' && outgoing === 'W') { return [slant, wallLine[i]]; }
      return [wallBase[i]];
    });
  }

  function wallFaces(outline, wallLine, wallBase) {
    return GeometryHelper.outlineRuns(outline, wallFaceDirections).map(indices => {
      const ceiling = indices.map(index => wallLine[index]);
      const base = indices.map(index => ({
        x: wallLine[index].x + wallBaseShift.x,
        y: wallLine[index].y + wallBaseShift.y,
      }));
      const corners = [];

      [0, indices.length - 1].forEach(position => {
        const index = indices[position];

        if (GeometryHelper.vertexIsConvex(outline, index)) {
          base[position] = wallBase[index];
          return;
        }

        corners.push([ceiling[position], base[position]]);
      });

      return { ceiling, base, corners };
    });
  }

  function getNestedGeometry(floor, room) {
    const gridSize = DungeonFloorView.getGridSize();
    const feature = floor.getFeatureForRoom(room.getIndex());
    const position = room.getFloorPosition();
    const depth = roomDepth(floor, room.getIndex());

    return feature.getRooms().slice(depth + 1).map(nested => {
      const nestedPosition = nested.getFloorPosition();
      const outline = GeometryHelper.traceOutline(nested.getFootprint()).map(vertex => ({
        x: ((nestedPosition.x - position.x) + vertex.x) * gridSize,
        y: ((nestedPosition.y - position.y) + vertex.y) * gridSize,
      }));
      const wallLine = GeometryHelper.insetOutline(outline, -wallInset);

      return { outline, wallLine, faces: nestedFaces(outline, wallLine) };
    });
  }

  function nestedFaces(outline, wallLine) {
    return GeometryHelper.outlineRuns(outline, nestedFaceDirections).map(indices => ({
      ceiling: indices.map(index => wallLine[index]),
      base: indices.map(index => ({
        x: wallLine[index].x + wallBaseShift.x,
        y: wallLine[index].y + wallBaseShift.y,
      })),
    }));
  }

  function wallFaceLines(faces) {
    return faces.flatMap(face => [
      ...face.corners.map(corner =>
        `<line class='wall-corner' x1='${corner[0].x}' y1='${corner[0].y}' x2='${corner[1].x}' y2='${corner[1].y}'/>`),
      `<polyline class='wall-base' points='${points(face.base)}'/>`,
    ]);
  }

  function wallFacePolygons(faces) {
    return faces.map(face => `<polygon class='wall-face' points='${points(face.ceiling.concat([...face.base].reverse()))}'/>`);
  }

  function cornerLines(anchor, shifts, classname='wall-corner') {
    return anchor.flatMap((vertex, i) => {
      const previous = anchor[(i + anchor.length - 1) % anchor.length];
      const next = anchor[(i + 1) % anchor.length];
      const incoming = shifts[GeometryHelper.edgeDirection(previous, vertex)];
      const outgoing = shifts[GeometryHelper.edgeDirection(vertex, next)];

      if (incoming !== outgoing || incoming === noShift) { return []; }
      return [`<line class='${classname}' x1='${vertex.x}' y1='${vertex.y}' x2='${vertex.x + incoming.x}' y2='${vertex.y + incoming.y}'/>`];
    });
  }

  function nestedWalls(floor, room) {
    return getNestedGeometry(floor, room).flatMap(nested => [
      `<polygon class='nested-wall' points='${points(GeometryHelper.shiftOutline(nested.wallLine, nestedWallShifts))}'/>`,
      `<polygon class='nested-wall' points='${points(nested.wallLine)}'/>`,
      ...wallFacePolygons(nested.faces),
      ...cornerLines(nested.wallLine, nestedWallShifts, 'nested-wall'),
    ]);
  }

  function stairsGlyph(floor, room, direction, gridSize) {
    if (floor.getStairs(direction).includes(room.getIndex()) === false) { return ''; }

    const box = room.getBoxes()[0];
    const glyph = (direction === 'up') ? '▲' : '▼';
    const x = (box.x + (box.width / 2)) * gridSize;
    const y = (box.y + (box.height / 2)) * gridSize;

    return `<text class='stairs ${direction}' data-direction='${direction}' x='${x}' y='${y}'>${glyph}</text>`;
  }

  function roomDepth(floor, index) {
    return floor.getFeatureForRoom(index).getRooms().findIndex(room => room.getIndex() === index);
  }

  return Object.freeze({
    build,
    getRoomGeometry,
    getNestedGeometry,
    getWallMetrics: () => { return { wallInset, wallDepth }; },
  });

})();
