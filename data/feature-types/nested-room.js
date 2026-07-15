FeatureType.register('nested-room',{

  // A rectangular room with a second room nested in its center, joined by a single authored door.
  build: function(options) {
    const feature = Feature('nested-room');
    const { outer, inner, door } = RoomFactory.buildNestedRooms(options);

    feature.addRoom(outer);
    feature.addRoom(inner);
    feature.addDoor(door);

    return feature;
  }

});
