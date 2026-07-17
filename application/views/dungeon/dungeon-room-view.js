global.DungeonRoomView = (function() {

  const wallInset = 8;
  const northWallDepth = 20;
  const westWallDepth = 10;

  // The conceit of the oblique perspective: every edge that would be vertical in the world projects to the same
  // diagonal. A vertical corner edge is only drawn where it's actually visible, though: inside a room that's just
  // the NW-type corners where two visible faces meet. Where a face ends against a faceless side wall (NE and SW),
  // the edge is hidden behind that wall, so the base line simply ends on the wall line. Nested exteriors are
  // convex solids, so every face-end edge sits on their silhouette and all of their corners draw.
  const wallTopShift = { x: -westWallDepth, y: -northWallDepth };
  const wallBaseShift = { x: westWallDepth, y: northWallDepth };
  const noShift = { x: 0, y: 0 };

  const roomWallShifts = { E: wallTopShift, N: wallTopShift, S: noShift, W: noShift };
  const nestedWallShifts = { E: noShift, N: noShift, S: wallBaseShift, W: wallBaseShift };

  // North walls show their face at full depth and west walls foreshortened; south and east walls face away, so
  // the boundary line there is the wall base itself. Edges are keyed by walk direction: top edges run E, left
  // edges run N.
  const wallFaceDirections = ['E','N'];
  const wallBaseInsets = {
    E: wallInset + northWallDepth,
    N: wallInset + westWallDepth,
    S: wallInset,
    W: wallInset,
  };

  function points(vertices) {
    return vertices.map(vertex => `${vertex.x},${vertex.y}`).join(' ');
  }

  // Build a room as a single SVG in room-local coordinates. Rooms of a multi-room feature overlap, with later rooms
  // painted inside earlier ones; the room's depth within its feature drives the z-index layering in the stylesheet.
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

    // The footprint is the room's whole grid shape in the background color: on its own it's the hidden state,
    // keeping unrevealed nested rooms from showing as holes. The revealed room is drawn inside it, inset so a
    // sliver of background always separates directly adjacent rooms.
    const outline = GeometryHelper.traceOutline(room.getFootprint())
      .map(vertex => ({ x: vertex.x * gridSize, y: vertex.y * gridSize }));
    const wallBase = GeometryHelper.insetOutline(outline, wallBaseInsets);
    const content = [
      `<polygon class='footprint' points='${points(outline)}'/>`,
      `<polygon class='walls' points='${points(GeometryHelper.insetOutline(outline, wallInset))}'/>`,
      ...GeometryHelper.outlineRuns(wallBase, wallFaceDirections).map(run =>
        `<polyline class='wall-base' points='${points(run)}'/>`),
      ...cornerLines(wallBase, roomWallShifts),
      ...nestedWalls(floor, room, gridSize),
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

  // Where two shifted walls meet, their faces share a vertical corner edge that the shifted polygon's single
  // mitered vertex can't show, so it's drawn as its own line from the anchor vertex along its shift. Every other
  // kind of corner is already covered: the slanted end edge of a lone face is part of the shifted polygon.
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

  // The exterior faces of any rooms nested inside this one are part of this room's view of its own interior, so
  // they reveal along with this room whether or not the nested room has been entered. Seen from outside, the
  // nested structure shows its south and east faces. The lines are outset from the nested outline so the nested
  // room's footprint, which paints above this room, never covers them.
  function nestedWalls(floor, room, gridSize) {
    const feature = floor.getFeatureForRoom(room.getIndex());
    const position = room.getFloorPosition();
    const depth = roomDepth(floor, room.getIndex());

    return feature.getRooms().slice(depth + 1).flatMap(nested => {
      const nestedPosition = nested.getFloorPosition();
      const outline = GeometryHelper.traceOutline(nested.getFootprint()).map(vertex => ({
        x: ((nestedPosition.x - position.x) + vertex.x) * gridSize,
        y: ((nestedPosition.y - position.y) + vertex.y) * gridSize,
      }));

      const wallLine = GeometryHelper.insetOutline(outline, -1);

      return [
        `<polygon class='nested-wall' points='${points(wallLine)}'/>`,
        `<polygon class='nested-wall' points='${points(GeometryHelper.shiftOutline(wallLine, nestedWallShifts))}'/>`,
        ...cornerLines(wallLine, nestedWallShifts, 'nested-wall'),
      ];
    });
  }

  // The stairs glyph is centered on the room's main box, ignoring the grid entirely — once the floor is built the
  // rooms are just elements, and element geometry is all that matters.
  function stairsGlyph(floor, room, direction, gridSize) {
    if (floor.getStairs(direction).includes(room.getIndex()) === false) { return ''; }

    const box = room.getBoxes()[0];
    const glyph = (direction === 'up') ? '▲' : '▼';
    const x = (box.x + (box.width / 2)) * gridSize;
    const y = (box.y + (box.height / 2)) * gridSize;

    return `<text class='stairs ${direction}' data-direction='${direction}' x='${x}' y='${y}'>${glyph}</text>`;
  }

  // How deeply the room is nested within its feature: the position of the room in the feature's room order.
  function roomDepth(floor, index) {
    return floor.getFeatureForRoom(index).getRooms().findIndex(room => room.getIndex() === index);
  }

  return Object.freeze({
    build,
    getWallMetrics: () => { return { wallInset, northWallDepth, westWallDepth }; },
  });

})();
