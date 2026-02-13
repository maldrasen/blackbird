FeatureType.register('leg-room',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature.build();
    feature.addRoom(RoomFactory.buildLegRoom(options));
    return feature;
  }

});
