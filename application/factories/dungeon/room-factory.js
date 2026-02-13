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

    console.log("=== Building Leg ===")
    console.log('Bounds:',bounds);

    if (Random.flipCoin()) {
      legThick = Math.min(Math.max(1,Math.round(bounds.xMax * ratio)),bounds.xMax-1);
      console.log(`Vert Placement: ${legThick} x ${legLength}`);
      console.log(`  legV:${legV} legH:${legH}`);
      if (legV === 'T' && legH === 'L') { origin = [0,bounds.yMax]; }
      if (legV === 'T' && legH === 'R') { origin = [bounds.xMax - legThick, bounds.yMax]; }
      if (legV === 'B' && legH === 'L') { origin = [0,-legLength]; }
      if (legV === 'B' && legH === 'R') { origin = [bounds.xMax - legThick, -legLength]; }
      console.log(`  Origin(${origin[0]},${origin[1]})`);
      room.setSubBox(origin[0],origin[1],legThick,legLength);
    }
    else {
      legThick = Math.min(Math.max(1,Math.round(bounds.yMax * ratio)),bounds.yMax-1);
      console.log(`Hors Placement: ${legLength} x ${legThick}`);
      console.log(`  legV:${legV} legH:${legH}`);
      if (legV === 'T' && legH === 'L') { origin = [-legLength, bounds.yMax - legThick]; }
      if (legV === 'T' && legH === 'R') { origin = [bounds.xMax, bounds.yMax - legThick]; }
      if (legV === 'B' && legH === 'L') { origin = [-legLength,0]; }
      if (legV === 'B' && legH === 'R') { origin = [bounds.xMax,0]; }
      console.log(`  Origin(${origin[0]},${origin[1]})`)
      room.setSubBox(origin[0],origin[1],legLength,legThick)
    }

    return room;
  }

  // The options for the tea room should usually have the width greater than the height. We trim whatever value we roll
  // for the width. We can build a left or right T by using the width as the height though.
  //   height:    [min,max]
  //   width:     [min,max]
  //   legRatio:  [low,high] (20%-80% range)
  //   legLength: [min,max]
  //
  function buildTeaRoom(options) {
    const room = Room.build();
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
  });

})();
