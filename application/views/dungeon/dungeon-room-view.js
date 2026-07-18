global.DungeonRoomView = (function() {

  const wallInset = 6;
  const wallDepth = 20;

  // The conceit of the oblique perspective: every edge that would be vertical in the world projects to the same
  // diagonal. A vertical corner edge is only drawn where it's actually visible, though: inside a room that's just
  // the NW-type corners where two visible faces meet. Where a face ends against a faceless side wall (NE and SW),
  // the edge is hidden behind that wall, so the base line simply ends on the wall line. Nested exteriors are
  // convex solids, so every face-end edge sits on their silhouette and all of their corners draw.
  const wallTopShift = { x: -wallDepth, y: -wallDepth };
  const wallBaseShift = { x: wallDepth, y: wallDepth };
  const noShift = { x: 0, y: 0 };

  const roomWallShifts = { E: wallTopShift, N: wallTopShift, S: noShift, W: noShift };
  const nestedWallShifts = { E: noShift, N: noShift, S: wallBaseShift, W: wallBaseShift };

  // North walls show their face at full depth and west walls foreshortened; south and east walls face away, so
  // the boundary line there is the wall base itself. Edges are keyed by walk direction: top edges run E, left
  // edges run N. Nested exteriors are seen from the other side, showing their south and east faces.
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
    // sliver of background always separates directly adjacent rooms. The floor is the interior region the wall
    // bands leave uncovered; the textures paint themselves in right after it, under the wall lines.
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

  // The room's wall geometry in room-local pixels, for anything that paints on or into the walls: the outline,
  // the wall and wall base lines, and the visible wall faces with their occlusion already worked out.
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

  // The floor is the interior region the wall bands leave uncovered. Mostly that's the wall base outline, but at
  // the inside NE and SW corners a wall face ends exposed and its slanted corner edge cuts across the wall base's
  // square corner, so the floor follows the slant between the wall line vertex and the face's base corner.
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

  // The base of each visible wall face is the face's ceiling segment dropped by the vertical projection. How a
  // face's base ends depends on the corner it ends at: at a convex corner the face's end edge is hidden behind
  // the side wall, so the base is trimmed back to meet the side wall's line; at a concave corner the face wraps
  // a protrusion into the room, its end edge stands exposed, so the base keeps its projected length and the
  // slanted end edge connects it back to the ceiling corner. Each face run is returned as its ceiling and base
  // polylines plus the exposed corner edges, top vertex first.
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

  // The exterior wall geometry of the rooms nested inside this one, in this room's local pixels: each nested
  // room's ceiling outline plus its visible exterior faces. Nested exteriors are convex solids, so the faces
  // keep their full projected length at both ends — there are no occlusion trims.
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

  // Each face closes into a polygon — the ceiling out and the base back — so the wall band can carry a fill.
  function wallFacePolygons(faces) {
    return faces.map(face =>
      `<polygon class='wall-face' points='${points(face.ceiling.concat([...face.base].reverse()))}'/>`);
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
  // nested structure shows its south and east faces. The lines are outset by the wall inset, giving the nested
  // room the same breathing room on its outside that neighboring rooms give each other — which also lands the
  // exterior face bands exactly where an interior band would sit on the adjacent tiles, so doors on the nested
  // room's south and east sides line up with no special casing.
  function nestedWalls(floor, room) {
    // The projected solid covers the whole ceiling outline, so it's drawn first: its fill occludes the floor
    // texture beneath it without painting over the ceiling outline's own lines.
    return getNestedGeometry(floor, room).flatMap(nested => [
      `<polygon class='nested-wall' points='${points(GeometryHelper.shiftOutline(nested.wallLine, nestedWallShifts))}'/>`,
      `<polygon class='nested-wall' points='${points(nested.wallLine)}'/>`,
      ...wallFacePolygons(nested.faces),
      ...cornerLines(nested.wallLine, nestedWallShifts, 'nested-wall'),
    ]);
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
    getRoomGeometry,
    getNestedGeometry,
    getWallMetrics: () => { return { wallInset, wallDepth }; },
  });

})();
