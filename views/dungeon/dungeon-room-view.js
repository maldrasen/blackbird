global.DungeonRoomView = (function() {
  const wallInset = 10;

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
      `<polygon class='floor' points='${points(geometry.floor)}'/>`,
      `<polygon class='walls' points='${points(geometry.wallLine)}'/>`,
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

    return { outline, wallLine, floor: wallLine };
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

      return { outline, wallLine };
    });
  }

  function nestedWalls(floor, room) {
    return getNestedGeometry(floor, room).map(nested =>
      `<polygon class='nested-wall' points='${points(nested.wallLine)}'/>`);
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

  return {
    build,
    getRoomGeometry,
    getNestedGeometry,
    getWallInset: () => { return wallInset; },
  };

})();
