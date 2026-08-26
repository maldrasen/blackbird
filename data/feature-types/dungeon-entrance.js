FeatureType.register('dungeon-entrance',{
  build: function(options) {
    const feature = Feature('dungeon-entrance');
    const room = Room(feature);
    room.setBounds(1, 1);
    room.addBox(0, 0, 1, 1);

    feature.addRoom(room);

    return feature;
  }
});
