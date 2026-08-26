
// TODO: Actually, let's also completely change how rooms are built first.

FeatureType.register('dungeon-entrance',{
  build: function(options) {
    const feature = Feature('dungeon-entrance');
    const room = Room(feature);

    feature.addRoom(room);

    return feature;
  }
});
