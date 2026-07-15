FeatureType.register('rect-room',{

  // Generic room only has a single square room.
  //   size:      [min,max]
  build: function(options) {
    const room = Room();
    room.addBox(0, 0,
      Random.between(options.size[0], options.size[1]),
      Random.between(options.size[0], options.size[1]));

    const feature = Feature('rect-room');
    feature.addRoom(room);
    return feature;
  }

});
