
// Trim max is half of (length-2) in order to allow at least a 2 tile wide corridor when notch is taken from either
// side. (Copy of code used in the tea-room, but it probably shouldn't be a utility function in case the features
// need to diverge)
function getTrimMax(length) {
  return (length === 3) ? 1 : Math.floor((length-2) / 2);
}

FeatureType.register('cross-room',{

  // The cross room only takes a room size option. The notch size is determined by the room size, and they'll either
  // be square notches or match the room's aspect ratio.
  //   size:    [min,max]
  build: function(options) {
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

    const feature = Feature('cross-room');
    feature.addRoom(room);
    return feature;
  }

});
