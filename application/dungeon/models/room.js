global.Room = function(feature, type='normal') {

  let description;
  let stairsDescription;
  let position = { x:0, y:0 };
  let index;
  let floorPosition;
  let stairsAllowed = false;
  let contentsAllowed = true;
  let overlapping = false;
  let contents = null;
  let contentsOptions;
  let usedCommands = [];
  let scoutingRoll;
  let doorMode = 'blacklist';
  let doorWalls = new Set();
  let footprint;
  let size;
  let centerPoint;
  let bounds;
  let boundsBox;
  let chamfer = 0;
  let floorChamfer = 0;
  let tileContents = new Map();

  // =======================
  //    Building & Layout
  // =======================

  // Decide the room's bounds up front, creating an empty footprint grid of the correct size. Every box added after
  // this just paints tiles into the grid, so boxes must use room-local coordinates that fit inside the bounds. Each
  // cell holds an index into DungeonConstants.floorTypes, or null for tiles that aren't part of the room.
  function setBounds(width, height) {
    if (bounds) { throw new Error(`This room's bounds have already been set.`); }

    bounds = { width, height };
    boundsBox = Object.freeze({ xMin:0, yMin:0, xMax:width, yMax:height });
    footprint = Array.from({ length:height }, () => new Array(width).fill(null));
    size = 0;
  }

  // Paint a box of tiles into the footprint grid. The size is maintained here rather than counted on demand because
  // getSize() is called in a loop when checking room description predicates, so it's an actual performance concern.
  function addBox(x, y, width, height) {
    if (bounds == null) { throw new Error(`Set the room's bounds before adding a box.`); }
    if (x < 0 || y < 0 || x + width > bounds.width || y + height > bounds.height) {
      throw new Error(`Box (${x},${y} ${width}x${height}) doesn't fit in the room's ${bounds.width}x${bounds.height} bounds.`);
    }

    for (let yy = y; yy < y + height; yy++) {
      for (let xx = x; xx < x + width; xx++) {
        if (footprint[yy][xx] == null) {
          footprint[yy][xx] = 0;
          size++;
        }
      }
    }
  }

  // Change the floor type of tiles already painted into the footprint. Tiles hold the floor type's index rather
  // than its name to keep packed rooms small.
  function setFloor(x, y, type) {
    const floorIndex = DungeonConstants.floorTypes.indexOf(type);
    if (floorIndex < 0) { throw new Error(`Unknown floor type [${type}]`); }
    if (footprint[y] == null || footprint[y][x] == null) {
      throw new Error(`(${x},${y}) is not a floor tile in this room.`);
    }

    footprint[y][x] = floorIndex;
  }

  function setFloorBox(options) {
    const { x, y, width, height, type } = options;
    for (let yy = y; yy < y + height; yy++) {
      for (let xx = x; xx < x + width; xx++) {
        setFloor(xx, yy, type);
      }
    }
  }

  function getFloor(x, y) {
    if (footprint[y] == null || footprint[y][x] == null) { return null; }
    return DungeonConstants.floorTypes[footprint[y][x]];
  }

  // Put something on a single tile of the room, given in room-local coordinates. Options:
  //  - glyph        { glyph, color, size, offset } drawn at the center of the tile, moved by the offset ({ x, y } in
  //                 tiles) if it has one.
  //  - canEnter     boolean or a boolean function. True if omitted.
  //  - description
  function setTileContents(x, y, options) {
    if (getFloor(x, y) == null) { throw new Error(`(${x},${y}) is not a floor tile in this room.`); }
    tileContents.set(`${x},${y}`, { x, y, ...options });
  }

  function getTileContents(x, y) {
    const tile = tileContents.get(`${x},${y}`);
    return tile ? { ...tile } : null;
  }

  function canEnterTile(x, y) {
    const tile = tileContents.get(`${x},${y}`);
    if (tile == null || tile.canEnter == null) { return true; }
    return (typeof tile.canEnter === 'function') ? tile.canEnter() : tile.canEnter;
  }

  function getGlyphs() {
    return [...tileContents.values()].filter(tile => tile.glyph).map(tile => {
      const { offset={ x:0, y:0 }, ...glyph } = tile.glyph;
      return { x:tile.x + 0.5 + offset.x, y:tile.y + 0.5 + offset.y, ...glyph };
    });
  }

  // Return the room bounds in an object { xMin, xMax, yMin, yMax }. The mins are always 0; the shape is what the
  // feature and floor maths expect. The box is frozen and shared: it's read in the floor factory's hot loops, where a
  // fresh object per call is what lets V8's allocation sites go megamorphic (see Feature.getBounds).
  function getBounds() {
    return boundsBox;
  }

  function getCenterPoint() {
    if (centerPoint) { return { ...centerPoint }; }
    return { x: bounds.width / 2, y: bounds.height / 2 };
  }

  // Center of bounds in floor coordinates, which can fall outside the room itself if the room is L-shaped.
  function getFloorCenter() {
    return {
      x: floorPosition.x + (bounds.width / 2),
      y: floorPosition.y + (bounds.height / 2),
    };
  }

  function stairsAreAllowed() {
    return stairsAllowed && bounds.width > 1 && bounds.height > 1;
  }

  // Stairs are the contents of a single tile of the room, given in room-local coordinates. A room only ever has one
  // set of stairs, so setting them again moves them.
  function setStairs(direction, x, y) {
    Validate.isIn('direction', direction, ['up','down']);
    if (footprint == null || getFloor(x, y) == null) {
      throw new Error(`(${x},${y}) is not a floor tile in this room.`);
    }

    const previous = findStairs();
    if (previous) { tileContents.delete(`${previous.x},${previous.y}`); }

    setTileContents(x, y, {
      type: 'stairs',
      direction: direction,
      glyph: { glyph:DungeonConstants.stairsGlyphs[direction], color:DungeonConstants.stairsColor, size:80 },
    });
  }

  function findStairs() {
    return [...tileContents.values()].find(tile => tile.type === 'stairs') || null;
  }

  function hasStairs() {
    return findStairs() != null;
  }

  function getStairsTile() {
    const stairs = findStairs();
    return stairs ? { x:stairs.x, y:stairs.y } : null;
  }

  function getStairsFloorPosition() {
    const stairs = findStairs();
    return stairs ? { x: floorPosition.x + stairs.x, y: floorPosition.y + stairs.y } : null;
  }

  // ========================
  //    Door Permissions
  // ========================

  // Door permissions work in either a blacklist mode (the default, where every exterior wall allows a door unless
  // forbidden) or a whitelist mode (entered with forbidAllDoors(), where only explicitly allowed walls can have
  // doors). Walls are addressed by a room-local floor tile plus the side the wall is on; when the direction is
  // omitted the call applies to every exterior wall of that tile.

  function forbidAllDoors() {
    doorMode = 'whitelist';
    doorWalls = new Set();
  }

  function allowDoor(x, y, direction=null) {
    wallKeys(x, y, direction).forEach(key => {
      (doorMode === 'whitelist') ? doorWalls.add(key) : doorWalls.delete(key);
    });
  }

  function forbidDoor(x, y, direction=null) {
    wallKeys(x, y, direction).forEach(key => {
      (doorMode === 'blacklist') ? doorWalls.add(key) : doorWalls.delete(key);
    });
  }

  function doorIsAllowed(x, y, direction) {
    const listed = doorWalls.has(`${x},${y},${direction}`);
    return (doorMode === 'whitelist') ? listed : listed === false;
  }

  function wallKeys(x, y, direction) {
    if (bounds == null || x < 0 || y < 0 || x >= bounds.width || y >= bounds.height || footprint[y][x] == null) {
      throw new Error(`(${x},${y}) is not a floor tile in this room.`);
    }

    const exterior = [];
    if (y === 0 || footprint[y-1][x] == null) { exterior.push('N'); }
    if (y === bounds.height-1 || footprint[y+1][x] == null) { exterior.push('S'); }
    if (x === bounds.width-1 || footprint[y][x+1] == null) { exterior.push('E'); }
    if (x === 0 || footprint[y][x-1] == null) { exterior.push('W'); }

    if (direction != null) {
      if (exterior.includes(direction) === false) {
        throw new Error(`(${x},${y}) has no exterior wall to the ${direction}.`);
      }
      return [`${x},${y},${direction}`];
    }

    if (exterior.length === 0) {
      throw new Error(`(${x},${y}) is an interior tile with no exterior walls.`);
    }

    return exterior.map(side => `${x},${y},${side}`);
  }

  // ==============
  //    Contents
  // ==============

  function canHaveContents() {
    return contentsAllowed && feature.getType() !== 'corridor' && findStairs() == null && contents == null;
  }

  function setContents(code, options={}) {
    contents = code;
    contentsOptions = options;
  }

  // Get the description for this room. We lazy load the description if it hasn't been set yet, but once a description
  // has been set it shouldn't change.
  function getDescription() {
    const theme = DungeonTheme.lookup(DungeonSystem.getDungeonFloor().getTheme());

    if (description == null && contents) {
      description = RoomContents.lookup(contents).getDescription(contentsOptions);
    }
    if (description == null) {
      const variety = (feature.getType() === 'corridor') ?
        'corridor' : FeatureType.lookup(feature.getType()).getVariety();
      description = theme.getDescription(variety);
    }
    return description;
  }

  // The stairs are described on their own, as they're only a single tile of the room. The room's description has
  // nothing to say about them.
  function getStairsDescription() {
    const stairs = findStairs();
    if (stairs == null) { return null; }

    if (stairsDescription == null) {
      const theme = DungeonTheme.lookup(DungeonSystem.getDungeonFloor().getTheme());
      stairsDescription = theme.getDescription(`${stairs.direction}Stairs`);
    }
    return stairsDescription;
  }

  function updateDescription(text) {
    description = text;
    DungeonInterface.refreshDescription();
  }

  function getAvailableCommands() {
    if (contents == null) { return []; }
    return RoomContents.lookup(contents).getCommands().filter(command => usedCommands.includes(command.code) === false);
  }

  function useCommand(code) {
    const command = getAvailableCommands().find(command => command.code === code);
    if (command == null) { throw new Error(`Command [${code}] is not available in this room.`); }
    if (command.startEpisode) { return { episode:command.startEpisode }; }

    usedCommands.push(code);
    const result = command.execute();
    const inventory = InventoryManager();

    (result.loot || []).forEach(entry =>
      inventory.addArticle(entry.articleCode, entry.quantity));

    return result;
  }

  function pack() {
    const stairs = findStairs();

    return {
      position,
      contents,
      stairs: stairs ? { direction:stairs.direction, x:stairs.x, y:stairs.y } : null,
      usedCommands: [...usedCommands],
      footprint: footprint.map(row => [...row]),
    }
  }

  return {
    getType: () => { return type },
    setIndex: i => { index = i; },
    getIndex: () => { return index; },
    getFeature: () => { return feature; },
    getFeatureIndex: () => { return feature.getIndex(); },
    setFloorPosition: (x,y) => { floorPosition = {x,y}; },
    getFloorPosition: () => { return {...floorPosition}; },
    setPosition: (x,y) => { position = {x,y}; },
    getPosition: () => { return {...position}; },
    setBounds,
    addBox,
    setFloor,
    setFloorBox,
    getFloor,
    getGlyphs,
    setTileContents,
    getTileContents,
    canEnterTile,
    getBounds,
    getFootprint: () => { return footprint },
    getSize: () => { return size; },
    setCenterPoint: (x,y) => { centerPoint = {x,y}; },
    getCenterPoint,
    getFloorCenter,
    setChamfer: percent => { chamfer = percent; },
    getChamfer: () => { return chamfer; },
    setFloorChamfer: percent => { floorChamfer = percent; },
    getFloorChamfer: () => { return floorChamfer; },

    allowStairs: () => { stairsAllowed = true; },
    setStairs,
    getStairs: () => { return hasStairs() ? findStairs().direction : null; },
    getStairsTile,
    getStairsFloorPosition,
    hasStairs,
    stairsAreAllowed,

    allowDoor,
    forbidDoor,
    forbidAllDoors,
    doorIsAllowed,

    forbidContents: () => { contentsAllowed = false; },
    getContents: () => { return contents; },
    getContentsOptions: () => { return contentsOptions; },
    hasContents: () => { return contents != null; },
    canHaveContents,
    setContents,

    markOverlapping: () => { overlapping = true; },
    isOverlapping: () => { return overlapping; },
    getDescription,
    getStairsDescription,
    updateDescription,
    getAvailableCommands,
    useCommand,
    setScoutingRoll: roll => { scoutingRoll = roll; },
    getScoutingRoll: () => { return scoutingRoll; },
    checkScoutingRoll: () => { return scoutingRoll >= RoomContents.lookup(contents).getSecrecy(); },
    pack,
  };
}
