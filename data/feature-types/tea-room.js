
// Trim max is half of (length-2) in order to allow at least a 2 tile wide corridor when notch is taken from either
// side. (Copy of code used in the cross room, but it probably shouldn't be a utility function in case the features
// need to diverge)
function getTrimMax(length) {
  return (length === 3) ? 1 : Math.floor((length-2) / 2);
}

FeatureType.register('tea-room',{

  // Build a "T" shaped room, rotated in any of the cardinal directions.
  //   size:    [min,max]
  build: function(options) {
    if (options.size[0] < 3) { throw new Error(`Minimum size needs to be at least 3`); }

    const rotation = Random.from(['N','S','E','W']);
    const totalWidth = Random.between(options.size[0], options.size[1]);
    const totalHeight = Random.between(options.size[0], options.size[1]);
    const notchWidth = Random.between(1, getTrimMax(totalWidth));
    const notchHeight = Random.between(1, getTrimMax(totalHeight));
    const legWidth = totalWidth-(notchWidth*2);
    const legHeight = totalHeight-(notchHeight*2);
    const room = Room();

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

    const feature = Feature('tea-room');
    feature.addRoom(room);
    return feature;
  }

});
