FeatureType.register('dungeon-entrance',{
  build: function() {
    const feature = Feature('dungeon-entrance');
    const room = Room(feature);
    room.setBounds(15, 7);
    room.addBox(0, 0, 15, 7);
    room.setCenterPoint(3,3);
    room.allowStairs();
    room.setStairs('up');
    room.forbidAllDoors();
    room.allowDoor(14,3);

    room.setDescription('TODO: Dungeon Entrance Description');

    // Add two 15x2 strips of water onto floor.
    // Add rows of statues with something like room.setGlyph(1,1,'◉')

    feature.addRoom(room);

    return feature;
  }
});
