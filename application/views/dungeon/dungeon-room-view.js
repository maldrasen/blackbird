global.DungeonRoomView = (function() {

  // Build a room as a single SVG in room-local coordinates. Rooms of a multi-room feature overlap, with later rooms
  // painted inside earlier ones; the room's depth within its feature drives the z-index layering in the stylesheet.
  // Unrevealed rooms still render (in the floor color), so the map doesn't show holes where nested rooms are hiding.
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

    // Strokes straddle the outline, and while the SVG viewport clips away the outside half along the bounds, the
    // edges of notches sit inside the viewport and would show at double width. Clipping the floor to its own shape
    // keeps every stroke a uniform inner stroke.
    const points = GeometryHelper.traceOutline(room.getFootprint())
      .map(vertex => `${vertex.x * gridSize},${vertex.y * gridSize}`).join(' ');
    const content = [
      `<clipPath id='roomClip${index}'><polygon points='${points}'/></clipPath>`,
      `<polygon class='floor' clip-path='url(#roomClip${index})' points='${points}'/>`,
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
