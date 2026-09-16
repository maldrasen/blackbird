global.Feature = function(type) {

  const rooms = [];
  const doors = [];

  let position;
  let index;
  let footprint;
  let bounds;
  let location;

  function addRoom(room) {
    bounds = null;
    location = null;
    rooms.push(room);
  }

  // Set the position of the feature within the floor.
  function setPosition(x,y) {
    location = null;
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

  // The bounds of the feature only describes it size, using the bounds from each room (offset by the room's position
  // within the feature) to find the overall bounding box. To get the bounds translated by the position use
  // getLocation().
  //
  // Claude's Performance Fix:
  //    Both boxes are cached and frozen rather than built on every call. The getLocation() function sits inside the
  //    floor factory's closest-pair search, which calls it tens of thousands of times per floor, and a fresh object
  //    per call is not just garbage: once a major GC lands mid-generation V8 drops the maps of those short-lived
  //    objects, recreates them with new identities, and the allocation sites end up megamorphic and dozens of times
  //    slower for the rest of the process. Rooms are positioned before they're added, so the bounds only change when
  //    a room is added.
  function getBounds() {
    if (bounds == null) { bounds = buildBounds(); }
    return bounds;
  }

  function buildBounds() {
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;

    rooms.forEach(room => {
      const roomPosition = room.getPosition();
      const roomBounds = room.getBounds();
      if (roomPosition.x + roomBounds.xMin < xMin) { xMin = roomPosition.x + roomBounds.xMin; }
      if (roomPosition.x + roomBounds.xMax > xMax) { xMax = roomPosition.x + roomBounds.xMax; }
      if (roomPosition.y + roomBounds.yMin < yMin) { yMin = roomPosition.y + roomBounds.yMin; }
      if (roomPosition.y + roomBounds.yMax > yMax) { yMax = roomPosition.y + roomBounds.yMax; }
    });

    return Object.freeze({ xMin, xMax, yMin, yMax });
  }

  // Combine position and bounds to get a location box. The lower bounds are inclusive, but the upper bounds are
  // exclusive so if a feature box is at { xMin:4, xMax:8, yMin:8, yMax:12} nothing will be in column 12 or row 8
  // within the grid. The location maths are all easier with this being the case though.
  function getLocation() {
    if (location == null) {
      const featureBounds = getBounds();
      location = Object.freeze({
        xMin: featureBounds.xMin + position.x,
        xMax: featureBounds.xMax + position.x,
        yMin: featureBounds.yMin + position.y,
        yMax: featureBounds.yMax + position.y,
      });
    }
    return location;
  }

  function getFootprint() {
    if (footprint == null) {
      const bounds = getBounds();
      const height = bounds.yMax;
      const width = bounds.xMax;

      footprint = Array.from({ length: height }, () => new Array(width).fill(false));

      rooms.forEach(room => {
        const position = room.getPosition();
        room.getFootprint().forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell != null) { footprint[position.y + y][position.x + x] = true; }
          });
        });
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

    return tiles.filter(tile => wallAllowsDoor(tile, direction));
  }

  // An edge tile sits one step outside the footprint, so the wall a corridor would knock through belongs to the
  // floor tile one step back toward the feature. Overlapping rooms paint the floor grid in room order with the last
  // room winning, so the owning room is resolved the same way here.
  function wallAllowsDoor(tile, direction) {
    const step = { N:{x:0,y:1}, S:{x:0,y:-1}, E:{x:-1,y:0}, W:{x:1,y:0} }[direction];
    const floorTile = { x: tile.x + step.x, y: tile.y + step.y };

    for (let i=rooms.length-1; i>=0; i--) {
      const roomPosition = rooms[i].getPosition();
      const local = { x: floorTile.x - roomPosition.x, y: floorTile.y - roomPosition.y };
      const roomBounds = rooms[i].getBounds();
      if (local.x >= 0 && local.y >= 0 && local.x < roomBounds.xMax && local.y < roomBounds.yMax &&
          rooms[i].getFootprint()[local.y][local.x] != null) {
        return rooms[i].doorIsAllowed(local.x, local.y, direction);
      }
    }

    return false;
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
      doors: doors.map(door => ({ ...door })),
      rooms: rooms.map(room => room.pack()),
    }
  }

  // Internal doors connect the feature's own rooms. They're stored as plain specs — the position is feature-local
  // and from/to are indices into the feature's room array — and are converted into real Door records with global
  // room indices when the floor is built.
  return {
    getType: () => { return type; },
    getRooms: () => { return [...rooms]; },
    getDoors: () => { return [...doors]; },
    addRoom,
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
  };
}
