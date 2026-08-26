global.Room = function(feature, type='normal') {

  let description;
  let position = { x:0, y:0 };
  let index;
  let floorPosition;
  let stairsAllowed = false;
  let overlapping = false;
  let contents = null;
  let stairs = null;
  let usedCommands = [];
  let scoutingRoll;
  let footprint;
  let size;
  let centerPoint;
  let bounds;

  // =======================
  //    Building & Layout
  // =======================

  // Decide the room's bounds up front, creating an empty footprint grid of the correct size. Every box added after
  // this just paints tiles into the grid, so boxes must use room-local coordinates that fit inside the bounds.
  function setBounds(width, height) {
    if (bounds) { throw new Error(`This room's bounds have already been set.`); }

    bounds = { width, height };
    footprint = Array.from({ length:height }, () => new Array(width).fill(false));
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
        if (footprint[yy][xx] === false) {
          footprint[yy][xx] = true;
          size++;
        }
      }
    }
  }

  // Position of this room within the feature.
  function setPosition(x,y) {
    position = {x,y};
  }

  // Return the room bounds in an object { xMin, xMax, yMin, yMax }. The mins are always 0; the shape is what the
  // feature and floor maths expect.
  function getBounds() {
    return { xMin:0, yMin:0, xMax:bounds.width, yMax:bounds.height };
  }

  function getFootprint() {
    return footprint;
  }

  // The number of tiles actually painted into the footprint, as opposed to the area of the bounds.
  function getSize() {
    return size;
  }

  // The room's center point in room-local grid units. The game isn't strictly tile based, so this can be any point
  // in the room's grid — glyphs and graphics render at exactly this point. It defaults to the center of the bounds,
  // which suits any rectangular room, but the bounds center of an irregular room can sit outside the room itself,
  // so builders of those rooms should set a center point explicitly.
  function setCenterPoint(x,y) {
    centerPoint = {x,y};
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

  // Currently the only overlapping room is the nested room, where every tile overlaps the room it sits inside.
  function isOverlapping() { return overlapping; }

  // ==============
  //    Contents
  // ==============

  // TODO: No features have contents yet, but eventually some features will have rooms with preset content. If any
  //       room in a feature record has content then the placer shouldn't place randomized content into it.
  function canHaveContents() {
    return feature.getType() !== 'corridor' && stairs == null;
  }

  function setDescription(text) {
    if (description != null) { throw new Error(`A description for this room has already been set.`); }
    description = text;
  }

  // Get the description for this room. We lazy load the description if it hasn't been set yet, but once a description
  // has been set it shouldn't change.
  function getDescription() {
    const theme = DungeonTheme.lookup(DungeonSystem.getDungeonFloor().getTheme());

    if (description == null && contents) {
      description = RoomContents.lookup(contents).getDescription();
    }
    if (description == null && stairs) {
       description = theme.getDescription(`${stairs}Stairs`);
    }
    if (description == null) {
      const variety = (feature.getType() === 'corridor') ?
        'corridor' : FeatureType.lookup(feature.getType()).getVariety();
      description = theme.getDescription(variety);
    }
    return description;
  }

  function getAvailableCommands() {
    if (contents == null) { return []; }
    return RoomContents.lookup(contents).getCommands().filter(command => usedCommands.includes(command.code) === false);
  }

  function useCommand(code) {
    const command = getAvailableCommands().find(command => command.code === code);
    if (command == null) { throw new Error(`Command [${code}] is not available in this room.`); }

    usedCommands.push(code);
    return command.execute();
  }

  function pack() {
    return {
      position,
      contents,
      stairs,
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
    setPosition,
    getPosition: () => { return {...position}; },
    setBounds,
    addBox,
    getBounds,
    getFootprint,
    getSize,
    setCenterPoint,
    getCenterPoint,
    getFloorCenter,
    allowStairs: () => { stairsAllowed = true; },
    stairsAreAllowed,
    setStairs: direction => { stairs = direction; },
    getStairs: () => { return stairs; },
    hasStairs: () => { return stairs != null; },
    markOverlapping: () => { overlapping = true; },
    isOverlapping,
    setContents: code => { contents = code; },
    getContents: () => { return contents; },
    hasContents: () => { return contents != null; },
    canHaveContents,
    setDescription,
    getDescription,
    getAvailableCommands,
    useCommand,
    setScoutingRoll: roll => { scoutingRoll = roll; },
    getScoutingRoll: () => { return scoutingRoll; },
    checkScoutingRoll: () => { return scoutingRoll >= RoomContents.lookup(contents).getSecrecy(); },
    pack,
  };
}
