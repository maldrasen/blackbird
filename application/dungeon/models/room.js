global.Room = function(feature, type='normal') {
  const boxes = [];

  let description;
  let position = { x:0, y:0 };
  let index;
  let floorPosition;
  let stairsAllowed = false;
  let overlapping = false;
  let contents = null;
  let stairs = null;
  let usedCommands = [];

  let footprint;
  let size;

  // Add a box to the room. Boxes can be added in any order using any shared coordinate system (eg. plain absolute
  // grid coordinates) - the room's own origin isn't pinned to (0,0) until something actually reads the boxes/bounds,
  // so there's no need to keep re-normalizing (and no risk of earlier boxes drifting out of sync with later ones)
  // as more boxes get added.
  function addBox(x, y, width, height) {
    if (footprint) {
      throw new Error(`You cannot add a box to a room whose footprint has been calculated.`);
    }
    boxes.push({ x, y, width, height });
  }

  // Position of this room within the feature.
  function setPosition(x,y) {
    position = {x,y};
  }

  // The raw bounds of the stored boxes, before normalizing the room's origin to (0,0).
  function rawBounds() {
    const bounds = { xMin:Infinity, xMax:-Infinity, yMin:Infinity, yMax:-Infinity };

    boxes.forEach(box => {
      if (box.x < bounds.xMin) { bounds.xMin = box.x; }
      if (box.y < bounds.yMin) { bounds.yMin = box.y; }
      if (box.x + box.width  > bounds.xMax) { bounds.xMax = box.x + box.width; }
      if (box.y + box.height > bounds.yMax) { bounds.yMax = box.y + box.height; }
    });

    return bounds;
  }

  // Return the room bounds in an object { xMin, xMax, yMin, yMax }, normalized so xMin/yMin are always 0.
  function getBounds() {
    const raw = rawBounds();
    return { xMin:0, yMin:0, xMax: raw.xMax - raw.xMin, yMax: raw.yMax - raw.yMin };
  }

  // Return every box, shifted so the room's overall bounds start at (0,0).
  function getBoxes() {
    const raw = rawBounds();
    return boxes.map(box => ({ x: box.x - raw.xMin, y: box.y - raw.yMin, width: box.width, height: box.height }));
  }

  // A room's footprint shouldn't change after the room has been built, so it should be safe to cache it once it's
  // been calculated once.
  function getFootprint() {
    if (footprint) { return footprint; }

    const bounds = getBounds();
    footprint = Array.from({ length: bounds.yMax }, () => new Array(bounds.xMax).fill(false));
    size = 0;

    getBoxes().forEach(box => {
      for (let y = box.y; y < box.y + box.height; y++) {
        for (let x = box.x; x < box.x + box.width; x++) {
          if (footprint[y][x] === false) {
            footprint[y][x] = true;
            size++;
          }
        }
      }
    });

    return footprint;
  }

  // To get a room's actual size (as opposed to a bounding box) we need to calculate the room's footprint. Rather than
  // doing this in four nested loops, we just calculate the room's size when the footprint is built, and cache both
  // values. The getSize() function will be called in a loop when checking room description predicates, so this is an
  // actual performance concern. This function should only be called after all the room's boxes have been added.
  function getSize() {
    if (size == null) { getFootprint(); }
    return size;
  }

  // Center of bounds in floor coordinates, which can fall outside the room itself if the room is L-shaped.
  function getFloorCenter() {
    const bounds = getBounds();
    return {
      x: floorPosition.x + (bounds.xMax / 2),
      y: floorPosition.y + (bounds.yMax / 2),
    };
  }

  // TODO: No features have contents yet, but eventually some features will have rooms with preset content. If any
  //       room in a feature record has content then the placer shouldn't place randomized content into it.
  function canHaveContents() {
    return feature.getType() !== 'corridor' && stairs == null;
  }

  function stairsAreAllowed() {
    return stairsAllowed && boxes[0].width > 1 && boxes[0].height > 1;
  }

  // The isOverlapping() function takes a door as an argument (the door object has a position and a direction) though
  // currently the only overlapping room is the nested room where every tile is overlapping. We need to know this in
  // order to draw the 'hanging' door above an overlapping room. Hanging doors are normally the lowest in the z-order,
  // but need to be pulled on top of the overlapping room in this case.
  function isOverlapping(door) { return overlapping; }

  function pack() {
    return {
      position,
      contents,
      stairs,
      usedCommands: [...usedCommands],
      boxes: getBoxes(),
    }
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

  return {
    getType: () => { return type },
    setIndex: i => { index = i; },
    getIndex: () => { return index; },
    getFeature: () => { return feature; },
    getFeatureIndex: () => { return feature.getIndex(); },
    setDescription,
    getDescription,
    setFloorPosition: (x,y) => { floorPosition = {x,y}; },
    getFloorPosition: () => { return {...floorPosition}; },
    setPosition,
    getPosition: () => { return {...position}; },
    addBox,
    getBoxes,
    getBounds,
    getFootprint,
    getSize,
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
    getAvailableCommands,
    useCommand,
    pack,
  };
}
