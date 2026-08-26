FeatureType.register('rect-room',{
  variety:'plain',

  // Generic room only has a single square room.
  //   size:      [min,max]
  build: function(options) {
    const feature = Feature('rect-room');
    const room = Room(feature);
    const width = Random.between(options.size[0], options.size[1]);
    const height = Random.between(options.size[0], options.size[1]);

    room.setBounds(width, height);
    room.addBox(0, 0, width, height);
    room.allowStairs();

    feature.addRoom(room);
    return feature;
  }

});
