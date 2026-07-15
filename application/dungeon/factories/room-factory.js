global.RoomFactory = (function() {

  // Build a single box room.
  //   size: [min,max]
  function buildSingleRoom(options) {
    const room = Room();
    room.addBox(0, 0,
      Random.between(options.size[0], options.size[1]),
      Random.between(options.size[0], options.size[1]));
    return room;
  }

  // Build a leg shaped room
  //   size:      [min,max]
  function buildLegRoom(options) {
    if (options.size[0] < 3) { throw new Error(`Minimum size needs to be at least 3`); }

    const rotation = Random.from(['NE','NW','SE','SW']);
    const totalWidth = Random.between(options.size[0], options.size[1]);
    const totalHeight = Random.between(options.size[0], options.size[1]);
    const widthRange = notchRange(totalWidth);
    const heightRange = notchRange(totalHeight);
    const notchWidth = Random.between(widthRange[0],widthRange[1]);
    const notchHeight = Random.between(heightRange[0],heightRange[1]);
    const room = Room(options);

    switch (rotation) {
      case 'NE':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, 0, totalWidth, totalHeight-notchHeight);
        break;
      case 'NW':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(-notchWidth, 0, totalWidth, totalHeight-notchHeight);
        break;
      case 'SE':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, notchHeight, totalWidth, totalHeight-notchHeight);
        break;
      case 'SW':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(-notchWidth, notchHeight, totalWidth, totalHeight-notchHeight);
        break;
    }

    return room;
  }

  // Build a "T" shaped room, rotated in any of the cardinal directions.
  //   size:    [min,max]
  //
  function buildTeaRoom(options) {
    if (options.size[0] < 3) { throw new Error(`Minimum size needs to be at least 3`); }

    const rotation = Random.from(['N','S','E','W']);
    const totalWidth = Random.between(options.size[0], options.size[1]);
    const totalHeight = Random.between(options.size[0], options.size[1]);
    const notchWidth = Random.between(1, getTrimMax(totalWidth));
    const notchHeight = Random.between(1, getTrimMax(totalHeight));
    const legWidth = totalWidth-(notchWidth*2);
    const legHeight = totalHeight-(notchHeight*2);
    const room = Room(options);

    switch(rotation) {
      case 'N':
        room.addBox(0, 0, totalWidth, totalHeight-notchHeight);
        room.addBox(notchWidth, 0, legWidth, totalHeight);
        break;
      case 'S':
        room.addBox(0, 0, totalWidth, totalHeight-notchHeight);
        room.addBox(notchWidth, -notchHeight, legWidth, totalHeight);
        break;
      case 'E':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, notchHeight, totalWidth, legHeight);
        break;
      case 'W':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(-notchWidth, notchHeight, totalWidth, legHeight);
        break;
    }

    return room;
  }

  // The cross room only takes a room size option. The notch size is determined
  // by the room size, and they'll either be square notches or match the room's
  // aspect ratio.
  //   size:    [min,max]
  function buildCrossRoom(options) {
    if (options.size[0] < 3) { throw new Error(`Minimum size needs to be at least 3`); }

    const totalWidth = Random.between(options.size[0],options.size[1]);
    const totalHeight = Random.between(options.size[0],options.size[1]);
    const notchWidth = Random.between(1,getTrimMax(totalWidth));
    const notchHeight = Random.between(1,getTrimMax(totalHeight));

    // Main box is the horizontal box.
    const mainWidth = totalWidth;
    const mainHeight = totalHeight - (notchHeight*2);
    const subWidth = totalWidth - (notchWidth*2);
    const subHeight = totalHeight;

    const room = Room(options);
    room.addBox(0, 0, mainWidth, mainHeight);
    room.addBox(notchWidth, -notchHeight, subWidth, subHeight);
    return room;
  }

  // Build a rectangular outer room with a second room nested in its center, joined by a single door centered on a
  // random wall of the inner room. Both rooms are single boxes: the inner room overlaps the outer and simply paints
  // over it, in the grid (later rooms in a feature overwrite their tiles) and in the view (later rooms render at a
  // higher z-index). Returns both rooms and the door spec ({ position, direction, from, to }, where position is
  // feature-local and from/to index into the feature's rooms, outer first).
  //   outerSize: [min,max]  (min is at least 3)
  //   innerSize: [min,max]  (each dimension is clamped to 2 smaller than the rolled outer dimension)
  function buildNestedRooms(options) {
    if (options.outerSize[0] < 3) { throw new Error(`Minimum outer size needs to be at least 3`); }
    if (options.innerSize[0] > options.outerSize[0] - 2) {
      throw new Error(`Minimum inner size needs to be at least 2 smaller than the minimum outer size`); }

    const outerWidth = Random.between(options.outerSize[0], options.outerSize[1]);
    const outerHeight = Random.between(options.outerSize[0], options.outerSize[1]);
    const innerWidth = Math.min(Random.between(options.innerSize[0], options.innerSize[1]), outerWidth - 2);
    const innerHeight = Math.min(Random.between(options.innerSize[0], options.innerSize[1]), outerHeight - 2);

    const innerX = Math.floor((outerWidth - innerWidth) / 2);
    const innerY = Math.floor((outerHeight - innerHeight) / 2);

    const outer = Room();
    outer.addBox(0, 0, outerWidth, outerHeight);

    const inner = Room();
    inner.addBox(0, 0, innerWidth, innerHeight);
    inner.setPosition(innerX, innerY);

    return { outer, inner, door: buildNestedDoor(innerX, innerY, innerWidth, innerHeight) };
  }

  // Doors are stored on a tile's S or E wall, so doors on the inner room's N and W walls sit on the outer room's
  // tiles and run outer to inner, while S and E wall doors sit on the inner room's own tiles.
  function buildNestedDoor(innerX, innerY, innerWidth, innerHeight) {
    const wall = Random.from(['N','S','E','W']);
    const centerX = innerX + Math.floor((innerWidth - 1) / 2);
    const centerY = innerY + Math.floor((innerHeight - 1) / 2);

    switch (wall) {
      case 'N': return { position:{ x:centerX, y:innerY - 1 }, direction:'S', from:0, to:1 };
      case 'S': return { position:{ x:centerX, y:innerY + innerHeight - 1 }, direction:'S', from:1, to:0 };
      case 'E': return { position:{ x:innerX + innerWidth - 1, y:centerY }, direction:'E', from:1, to:0 };
      case 'W': return { position:{ x:innerX - 1, y:centerY }, direction:'E', from:0, to:1 };
    }
  }

  // Notch range is for L shaped rooms to allow for larger notches while
  // ensuring that any leg is at least 2 tiles wide.
  function notchRange(length) {
    const min = Math.max(Math.round(length * 0.33), 1);
    const max = Math.min(Math.round(length * 0.66), length-2);
    return [min,max]
  }

  // Trim max is half of (length-2) in order to allow at least a 2 tile wide
  // corridor when notch is taken from either side. This function is used when
  // making both the cross and T Rooms.
  function getTrimMax(length) {
    return (length === 3) ? 1 : Math.floor((length-2) / 2);
  }

  return Object.freeze({
    buildSingleRoom,
    buildLegRoom,
    buildTeaRoom,
    buildCrossRoom,
    buildNestedRooms,
  });

})();
