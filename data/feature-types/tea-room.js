FeatureType.register('tea-room',{

  // Generic room only has a single square room.
  build: function(options) {
    const feature = Feature.build();
    feature.addRoom(RoomFactory.buildTeaRoom(options));
    return feature;
  }

});
