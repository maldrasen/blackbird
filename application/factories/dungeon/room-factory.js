global.RoomFactory = (function() {

  // Build a single box room given the options:
  //   size: [min,max]
  function buildSingleRoom(options) {
    validateRanges(options);
    return startRoom(options);
  }

  // Build a leg (L-Shaped) room
  //   size:      [min,max]
  //   legRatio:  [low,high] (20%-80% range)
  //   legLength: [min,max]
  //
  // TODO: Might chance the way the leg width math works to work more like the cross notches.
  // TODO: Accept placement options so this can be tested.
  function buildLegRoom(options) {
    validateRanges(options);

    Validate.between('legRatio[0]',options.legRatio[0],20,80);
    Validate.between('legRatio[1]',options.legRatio[1],20,80);
    Validate.atLeast('legLength[0]',options.legLength[0],1);
    Validate.atLeast('legLength[1]',options.legLength[1],1);

    const room = startRoom(options);
    const bounds = room.getBounds();
    const ratio = Random.between(options.legRatio[0], options.legRatio[1]) / 100
    const legLength = Random.between(options.legLength[0], options.legLength[1]);

    const legV = Random.from(['T','B']);
    const legH = Random.from(['L','R']);

    let legThick;
    let origin;

    if (Random.flipCoin()) {
      legThick = Math.min(Math.max(1,Math.round(bounds.xMax * ratio)),bounds.xMax-1);
      if (legV === 'T' && legH === 'L') { origin = [0,bounds.yMax]; }
      if (legV === 'T' && legH === 'R') { origin = [bounds.xMax - legThick, bounds.yMax]; }
      if (legV === 'B' && legH === 'L') { origin = [0,-legLength]; }
      if (legV === 'B' && legH === 'R') { origin = [bounds.xMax - legThick, -legLength]; }
      room.setSubBox(origin[0],origin[1],legThick,legLength);
    }
    else {
      legThick = Math.min(Math.max(1,Math.round(bounds.yMax * ratio)),bounds.yMax-1);
      if (legV === 'T' && legH === 'L') { origin = [-legLength, bounds.yMax - legThick]; }
      if (legV === 'T' && legH === 'R') { origin = [bounds.xMax, bounds.yMax - legThick]; }
      if (legV === 'B' && legH === 'L') { origin = [-legLength,0]; }
      if (legV === 'B' && legH === 'R') { origin = [bounds.xMax,0]; }
      room.setSubBox(origin[0],origin[1],legLength,legThick)
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
    const room = Room.build(options);

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

  // Notch max is half of (length-2) in order to allow at least a 2 tile wide corridor when notch is taken from either
  // side. This function is used when making both the cross and T Rooms.
  function getTrimMax(length) {
    return (length === 3) ? 1 : Math.floor((length-2) / 2);
  }

  // The cross room only takes a room size option. The notch size is determined by the room size, and they'll either
  // be square notches or match the room's aspect ratio.
  //   size:    [min,max]
  //
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

    const room = Room.build(options);
    room.setMainBox(mainWidth,mainHeight);
    room.setSubBox(notchWidth,-notchHeight,subWidth,subHeight);
    return room;
  }

  function startRoom(options) {
    const room = Room.build();
    room.setMainBox(
      Random.between(options.size[0],options.size[1]),
      Random.between(options.size[0],options.size[1]),
    );
    return room;
  }

  // Ensure that the options have the height and width range in the correct format.
  function validateRanges(options) {
    Validate.exists('size',options.size);
    Validate.equals('size.length',options.size.length,2);
    Validate.atLeast('size[0]',options.size[0],1)
    Validate.atLeast('size[1]',options.size[1],1)
  }

  return Object.freeze({
    buildSingleRoom,
    buildLegRoom,
    buildTeaRoom,
    buildCrossRoom,
  });

})();
