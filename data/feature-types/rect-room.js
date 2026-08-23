FeatureType.register('rect-room',{

  // Generic room only has a single square room.
  //   size:      [min,max]
  build: function(options) {
    const feature = Feature('rect-room');
    const room = Room(feature);
    room.allowStairs();
    room.addBox(0, 0,
      Random.between(options.size[0], options.size[1]),
      Random.between(options.size[0], options.size[1]));

    feature.addRoom(room);
    return feature;
  }

});
