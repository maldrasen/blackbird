FeatureType.register('generic',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature.build();
    feature.addRoom(RoomFactory.buildSingleRoom(options));
    return feature;
  }

});
