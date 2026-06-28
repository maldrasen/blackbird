FeatureType.register('leg-room',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature('leg-room');
    feature.addRoom(RoomFactory.buildLegRoom(options));
    return feature;
  }

});
