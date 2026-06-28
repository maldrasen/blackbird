FeatureType.register('cross-room',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature('cross-room');
    feature.addRoom(RoomFactory.buildCrossRoom(options));
    return feature;
  }

});
