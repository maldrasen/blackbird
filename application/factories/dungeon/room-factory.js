global.RoomFactory = (function() {

  // Build a single box room given the options:
  //   height: [min,max]
  //   width:  [min,max]
  function buildSingleRoom(options) {
    validateRanges(options);

    const room = Room.build();
    room.setMainBox(
      Random.between(options.width[0],options.width[1]),
      Random.between(options.height[0],options.height[1]),
    );
    room.compileFootprint();

    return room;
  }

  // Ensure that the options have the height and width range in the correct format.
  function validateRanges(options) {
    Validate.exists('height',options.height);
    Validate.exists('width',options.width);
    Validate.equals('height.length',options.height.length,2);
    Validate.equals('width.length',options.width.length,2);
    Validate.atLeast('height[0]',options.height[0],1)
    Validate.atLeast('height[1]',options.height[0],1)
    Validate.atLeast('width[0]',options.width[0],1)
    Validate.atLeast('width[1]',options.width[0],1)
  }

  return Object.freeze({
    buildSingleRoom
  });

})();
