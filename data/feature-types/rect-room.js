FeatureType.register('rect-room',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature('rect-room');
    feature.addRoom(RoomFactory.buildSingleRoom(options));
    return feature;
  }

});
