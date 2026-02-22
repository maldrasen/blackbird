global.RoomFactory = (function() {

  // Build a single box room.
  //   size: [min,max]
  function buildSingleRoom(options) {
    const room = Room();
    room.setMainBox(
      Random.between(options.size[0],options.size[1]),
      Random.between(options.size[0],options.size[1]),
    );
    return room;
  }

  // Build a leg shaped room
  //   size:      [min,max]
  function buildLegRoom(options) {
    if (options.size[0] < 3) { throw `Minimum size needs to be at least 3` }

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
        room.setMainBox(totalWidth-notchWidth, totalHeight);
        room.setSubBox(0, 0, totalWidth, totalHeight-notchHeight);
        break;
      case 'NW':
        room.setMainBox(totalWidth-notchWidth, totalHeight);
        room.setSubBox(-notchWidth, 0, totalWidth, totalHeight-notchHeight);
        break;
      case 'SE':
        room.setMainBox(totalWidth-notchWidth, totalHeight);
        room.setSubBox(0, notchHeight, totalWidth, totalHeight-notchHeight);
        break;
      case 'SW':
        room.setMainBox(totalWidth-notchWidth, totalHeight);
        room.setSubBox(-notchWidth, notchHeight, totalWidth, totalHeight-notchHeight);
        break;
    }

    return room;
  }

  // Build a "T" shaped room, rotated in any of the cardinal directions.
  //   size:    [min,max]
  //
  function buildTeaRoom(options) {
    if (options.size[0] < 3) { throw `Minimum size needs to be at least 3` }

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
        room.setMainBox(totalWidth, totalHeight-notchHeight);
        room.setSubBox(notchWidth, 0, legWidth, totalHeight);
        break;
      case 'S':
        room.setMainBox(totalWidth, totalHeight-notchHeight);
        room.setSubBox(notchWidth, -notchHeight, legWidth, totalHeight);
        break;
      case 'E':
        room.setMainBox(totalWidth-notchWidth, totalHeight);
        room.setSubBox(0, notchHeight, totalWidth, legHeight);
        break;
      case 'W':
        room.setMainBox(totalWidth-notchWidth, totalHeight);
        room.setSubBox(-notchWidth, notchHeight, totalWidth, legHeight);
        break;
    }

    return room;
  }

  // The cross room only takes a room size option. The notch size is determined
  // by the room size, and they'll either be square notches or match the room's
  // aspect ratio.
  //   size:    [min,max]
  function buildCrossRoom(options) {
    if (options.size[0] < 3) { throw `Minimum size needs to be at least 3` }

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
    room.setMainBox(mainWidth,mainHeight);
    room.setSubBox(notchWidth,-notchHeight,subWidth,subHeight);
    return room;
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
  });

})();
