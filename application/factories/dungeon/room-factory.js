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

  // I've changed the other rooms to just have a size, rather than height and width. The T-shaped rooms though needed
  // to keep these options separate. The room width will usually be greater than the height because the 'T' is placed
  // along the long side. We get the 'T' width by trimming whatever value we roll for the main width. T shaped rooms
  // might be roted, using the width value for the vertical dimension.
  //   height:    [min,max]
  //   width:     [min,max]
  //   trim:      [min,max] (trimmed from both ends to make the T symmetrical)
  //   teaLength: [min,max]
  //
  function buildTeaRoom(options) {
    if (options.width[0] <= options.trim[1] * 2) {
      throw `Bad options: width[0] must be > trim[1]*2`
    }

    const room = Room.build();
    const vertical = Random.flipCoin();
    const widthRange = vertical ? options.height : options.width;
    const heightRange = vertical ? options.width : options.height;
    const mainWidth = Random.between(widthRange[0],widthRange[1]);
    const mainHeight = Random.between(heightRange[0],heightRange[1]);
    const trim = Random.between(options.trim[0],options.trim[1]);

    let subHeight;
    let subWidth;
    let subX;
    let subY;

    if (vertical) {
      subHeight = mainHeight - (trim * 2);
      subWidth = Random.between(options.teaLength[0],options.teaLength[1]);

      // Left Side / Right Side
      if (Random.flipCoin()) {
        subX = -subWidth;
        subY = trim;
      } else {
        subX = mainWidth;
        subY = trim;
      }
    }
    if (!vertical) {
      subWidth = mainWidth - (trim * 2);
      subHeight = Random.between(options.teaLength[0],options.teaLength[1]);

      // Top Side / Bottom Side
      if (Random.flipCoin()) {
        subX = trim;
        subY = mainHeight;
      } else {
        subX = trim;
        subY = -subHeight;
      }
    }

    room.setMainBox(mainWidth,mainHeight);
    room.setSubBox(subX, subY, subWidth, subHeight);

    return room;
  }

  // The cross room only takes a room size option. The notch size is determined by the room size, and
  // they'll either be square notches or match the room's aspect ratio.
  //   size:    [min,max]
  //
  function buildCrossRoom(options) {
    const room = Room.build(options);
    room.setMainBox(1,1);
    // const box = room.getMainBox();

    // console.log("=== Cross Room ===")
    // console.log("Box",box);
    //
    // let notchX =1;
    // let notchY =1;

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
