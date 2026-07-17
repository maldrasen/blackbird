global.DungeonRoomView = (function() {

  const wallInset = 8;

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
    const content = [
      `<polygon class='footprint' points='${points(outline)}'/>`,
      `<polygon class='walls' points='${points(GeometryHelper.insetOutline(outline, wallInset))}'/>`,
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

  // The exterior faces of any rooms nested inside this one are part of this room's view of its own interior, so
  // they reveal along with this room whether or not the nested room has been entered. The line is outset by half
  // its stroke width so the nested room's footprint, which paints above this room, never covers it.
  function nestedWalls(floor, room, gridSize) {
    const feature = floor.getFeatureForRoom(room.getIndex());
    const position = room.getFloorPosition();
    const depth = roomDepth(floor, room.getIndex());

    return feature.getRooms().slice(depth + 1).map(nested => {
      const nestedPosition = nested.getFloorPosition();
      const outline = GeometryHelper.traceOutline(nested.getFootprint()).map(vertex => ({
        x: ((nestedPosition.x - position.x) + vertex.x) * gridSize,
        y: ((nestedPosition.y - position.y) + vertex.y) * gridSize,
      }));

      return `<polygon class='nested-wall' points='${points(GeometryHelper.insetOutline(outline, -1))}'/>`;
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
  });

})();
