
// Notch range allows for larger notches while ensuring that any leg is at least 2 tiles wide.
function notchRange(length) {
  const min = Math.max(Math.round(length * 0.33), 1);
  const max = Math.min(Math.round(length * 0.66), length-2);
  return [min,max]
}

FeatureType.register('leg-room',{
  variety:'plain',

  // Build a leg shaped room
  //   size:      [min,max]
  build: function(options) {
    if (options.size[0] < 3) { throw new Error(`Minimum size needs to be at least 3`); }

    const rotation = Random.from(['NE','NW','SE','SW']);
    const totalWidth = Random.between(options.size[0], options.size[1]);
    const totalHeight = Random.between(options.size[0], options.size[1]);
    const widthRange = notchRange(totalWidth);
    const heightRange = notchRange(totalHeight);
    const notchWidth = Random.between(widthRange[0],widthRange[1]);
    const notchHeight = Random.between(heightRange[0],heightRange[1]);
    const feature = Feature('leg-room');
    const room = Room(feature);
    room.setBounds(totalWidth, totalHeight);

    switch (rotation) {
      case 'NE':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, 0, totalWidth, totalHeight-notchHeight);
        break;
      case 'NW':
        room.addBox(notchWidth, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, 0, totalWidth, totalHeight-notchHeight);
        break;
      case 'SE':
        room.addBox(0, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, notchHeight, totalWidth, totalHeight-notchHeight);
        break;
      case 'SW':
        room.addBox(notchWidth, 0, totalWidth-notchWidth, totalHeight);
        room.addBox(0, notchHeight, totalWidth, totalHeight-notchHeight);
        break;
    }

    // Center of the full-height leg, which sits against the west side for E rotations and the east side for W ones.
    const legCenter = ['NE','SE'].includes(rotation) ?
      (totalWidth-notchWidth) / 2 : (totalWidth+notchWidth) / 2;
    room.setCenterPoint(legCenter, totalHeight / 2);
    room.allowStairs();

    feature.addRoom(room);
    return feature;
  }

});
