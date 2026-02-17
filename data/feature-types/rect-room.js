FeatureType.register('rect-room',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature();
    feature.addRoom(RoomFactory.buildSingleRoom(options));
    return feature;
  }

});
