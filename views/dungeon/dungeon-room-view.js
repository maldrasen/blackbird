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
      ...floorLayers(room, geometry, index),
      `<polygon class='walls' points='${points(geometry.wallLine)}'/>`,
      ...nestedWalls(floor, room),
      ...roomGlyphs(room, gridSize),
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
    const chamfer = (room.getChamfer() / 100) * gridSize;
    let outline = GeometryHelper.traceOutline(room.getFootprint())
      .map(vertex => ({ x: vertex.x * gridSize, y: vertex.y * gridSize }));
    let wallLine = GeometryHelper.insetOutline(outline, wallInset);

    if (chamfer > 0) {
      outline = GeometryHelper.chamferOutline(outline, chamfer);
      wallLine = GeometryHelper.chamferOutline(wallLine, chamfer, wallInset);
    }

    return { outline, wallLine, floor: wallLine };
  }

  function getNestedGeometry(floor, room) {
    const gridSize = DungeonFloorView.getGridSize();
    const feature = floor.getFeatureForRoom(room.getIndex());
    const position = room.getFloorPosition();
    const depth = roomDepth(floor, room.getIndex());

    return feature.getRooms().slice(depth + 1).map(nested => {
      const nestedPosition = nested.getFloorPosition();
      const chamfer = (nested.getChamfer() / 100) * gridSize;
      const outline = GeometryHelper.traceOutline(nested.getFootprint()).map(vertex => ({
        x: ((nestedPosition.x - position.x) + vertex.x) * gridSize,
        y: ((nestedPosition.y - position.y) + vertex.y) * gridSize,
      }));
      let wallLine = GeometryHelper.insetOutline(outline, -wallInset);

      if (chamfer > 0) { wallLine = GeometryHelper.chamferOutline(wallLine, chamfer, -wallInset); }

      return { outline, wallLine };
    });
  }

  // Rooms with special floor tiles (water so far) render each connected region as a polygon between the floor and
  // the walls. The group is clipped to the floor polygon, which also trims the edge stroke wherever a region butts
  // up against a wall, so the stroke only separates special floor from normal floor.
  function floorLayers(room, geometry, index) {
    const gridSize = DungeonFloorView.getGridSize();

    const polygons = DungeonConstants.floorTypes.flatMap((type, typeIndex) => {
      if (typeIndex === 0) { return []; }

      return GeometryHelper.findRegions(room.getFootprint(), cell => cell === typeIndex).map(region => {
        const outline = GeometryHelper.traceOutline(region)
          .map(vertex => ({ x: vertex.x * gridSize, y: vertex.y * gridSize }));
        return `<polygon class='${type}' points='${points(outline)}'/>`;
      });
    });

    if (polygons.length === 0) { return []; }

    return [
      `<clipPath id='floorLayerClip-${index}'><polygon points='${points(geometry.floor)}'/></clipPath>`,
      `<g class='floor-layer' clip-path='url(#floorLayerClip-${index})'>${polygons.join('')}</g>`,
    ];
  }

  function nestedWalls(floor, room) {
    return getNestedGeometry(floor, room).map(nested =>
      `<polygon class='nested-wall' points='${points(nested.wallLine)}'/>`);
  }

  function roomGlyphs(room, gridSize) {
    return room.getGlyphs().map(glyph =>
      `<text class='glyph' x='${glyph.x * gridSize}' y='${glyph.y * gridSize}' fill='${glyph.color}'>${glyph.glyph}</text>`);
  }

  function stairsGlyph(floor, room, direction, gridSize) {
    if (floor.getStairs(direction).includes(room.getIndex()) === false) { return ''; }

    const center = room.getCenterPoint();
    const glyph = (direction === 'up') ? '▲' : '▼';
    const x = center.x * gridSize;
    const y = center.y * gridSize;

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
