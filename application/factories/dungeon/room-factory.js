global.RoomFactory = (function() {

  // Build a single box room given the options:
  //   height: [min,max]
  //   width:  [min,max]
  function buildSingleRoom(options) {
    validateRanges(options);
    return startRoom(options);
  }

  // Build a leg (L-Shaped) room
  //   height:    [min,max]
  //   width:     [min,max]
  //   legRatio:  [low,high] (20%-80% range)
  //   legLength: [min,max]
  //
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

  // The options for the tea room should usually have the width greater than the height. We trim whatever value we roll
  // for the width. We can build a left or right T by using the width as the height though.
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

    room.setMainBox(mainWidth,mainHeight);

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

    room.setSubBox(subX, subY, subWidth, subHeight);

    return room;
  }

  function startRoom(options) {
    const room = Room.build();
    room.setMainBox(
      Random.between(options.width[0],options.width[1]),
      Random.between(options.height[0],options.height[1]),
    );
    return room;
  }

  // Ensure that the options have the height and width range in the correct format.
  function validateRanges(options) {
    Validate.exists('height',options.height);
    Validate.exists('width',options.width);
    Validate.equals('height.length',options.height.length,2);
    Validate.equals('width.length',options.width.length,2);
    Validate.atLeast('height[0]',options.height[0],1)
    Validate.atLeast('height[1]',options.height[1],1)
    Validate.atLeast('width[0]',options.width[0],1)
    Validate.atLeast('width[1]',options.width[1],1)
  }

  return Object.freeze({
    buildSingleRoom,
    buildLegRoom,
    buildTeaRoom,
  });

})();
