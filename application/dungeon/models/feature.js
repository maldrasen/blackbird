global.Feature = function(type) {

  const rooms = [];
  const doors = [];

  let position;
  let index;
  let footprint;
  let highlight = false;

  // Set the position of the feature within the floor.
  function setPosition(x,y) {
    position = {x,y};
  }

  // Center of bounds, not center of mass. Center could be outside of room if the room is L-shaped.
  function getCenter() {
    const bounds = getBounds();
    return {
      x: position.x + (bounds.xMax / 2),
      y: position.y + (bounds.yMax / 2),
    }
  }

  // The bounds of the feature only describes it size, using the bounds from each room to find the overall bounding
  // box for the feature. To get the bounds translated by the position use getLocation().
  function getBounds() {
    const featureBounds = {
      xMin: Infinity,
      xMax: -Infinity,
      yMin: Infinity,
      yMax: -Infinity,
    };
    rooms.forEach(room => {
      const roomBounds = room.getBounds();
      if (roomBounds.xMin < featureBounds.xMin) { featureBounds.xMin = roomBounds.xMin; }
      if (roomBounds.xMax > featureBounds.xMax) { featureBounds.xMax = roomBounds.xMax; }
      if (roomBounds.yMin < featureBounds.yMin) { featureBounds.yMin = roomBounds.yMin; }
      if (roomBounds.yMax > featureBounds.yMax) { featureBounds.yMax = roomBounds.yMax; }
    });
    return featureBounds;
  }

  // Combine position and bounds to get a location box. The lower bounds are inclusive, but the upper bounds are
  // exclusive so if a feature box is at { xMin:4, xMax:8, yMin:8, yMax:12} nothing will be in column 12 or row 8
  // within the grid. The location maths are all easier with this being the case though.
  function getLocation() {
    const bounds = getBounds();
    return {
      xMin: bounds.xMin + position.x,
      xMax: bounds.xMax + position.x,
      yMin: bounds.yMin + position.y,
      yMax: bounds.yMax + position.y,
    };
  }

  function getFootprint() {
    if (footprint == null) {
      const bounds = getBounds();
      const height = bounds.yMax;
      const width = bounds.xMax;

      footprint = Array.from({ length: height }, () => new Array(width).fill(false));

      function addBox(pos,box) {
        if (box) {
          const xPos = pos.x + box.x;
          const yPos = pos.y + box.y;
          for (let y = yPos; y < yPos + box.height; y++) {
            for (let x = xPos; x < xPos + box.width; x++) {
              footprint[y][x] = true;
            }
          }
        }
      }

      rooms.forEach(room => {
        addBox(room.getPosition(), room.getMainBox());
        addBox(room.getPosition(), room.getSubBox());
      });
    }

    return footprint;
  }

  function getEdgeTiles(direction) {
    const footprint = getFootprint();
    const bounds = getBounds();
    const height = bounds.yMax;
    const width = bounds.xMax;
    const tiles = [];

    const findNorthTiles = () => {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (footprint[y][x]) { tiles.push({ x, y:y-1 }); break; }}}}

    const findSouthTiles = () => {
      for (let x = 0; x < width; x++) {
        for (let y = height-1; y >= 0; y--) {
          if (footprint[y][x]) { tiles.push({ x, y: y + 1 }); break; }}}}

    const findEastTiles = () => {
      for (let y = 0; y < height; y++) {
        for (let x = width - 1; x >= 0; x--) {
          if (footprint[y][x]) { tiles.push({ x: x + 1, y }); break; }}}}

    const findWestTiles = () => {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (footprint[y][x]) { tiles.push({ x: x - 1, y }); break; }}}}

    switch(direction) {
      case 'N': findNorthTiles(); break;
      case 'S': findSouthTiles(); break;
      case 'E': findEastTiles();  break;
      case 'W': findWestTiles();  break;
      default: throw new Error(`Bad Direction ${direction}`);
    }

    return tiles;
  }

  function inspect() {
    console.log(`=== Feature[${index}] ===`)
    console.log(JSON.stringify(getLocation()));

    const footprint = getFootprint();
    for (let y=0; y<footprint.length; y++) {
      console.log(`${y}`,footprint[y].map(cell => (cell === true) ? '[]' : '  ').join(''));
    }
  }

  function pack() {
    return {
      position,
      index,
      doors: doors.map(door => door.pack()),
      rooms: rooms.map(room => room.pack()),
    }
  }

  return Object.freeze({
    getType: () => { return type; },
    getRooms: () => { return [...rooms]; },
    getDoors: () => { return [...doors]; },
    addRoom: (room) => { rooms.push(room); },
    addDoor: (door) => { doors.push(door); },
    setPosition,
    getPosition: () => { return {...position}; },
    setIndex: i => { index = i; },
    getIndex: () => { return index; },
    getCenter,
    getBounds,
    getLocation,
    getFootprint,
    getEdgeTiles,
    inspect,
    pack,

    // TODO: Highlight is just temporary for now. Shows what features are being built.
    setHighlight: h => { highlight = h; },
    getHighlight: () => { return highlight; },
  });
}
