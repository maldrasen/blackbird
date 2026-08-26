FeatureType.register('dungeon-entrance',{
  build: function() {
    const feature = Feature('dungeon-entrance');
    const room = Room(feature);
    room.setBounds(21, 9);
    room.addBox(0, 0, 21, 9);
    room.setCenterPoint(4,4);
    room.setStairs('up');

    room.forbidAllDoors();
    room.allowDoor(20,4);

    room.setDescription('TODO: Dungeon Entrance Description');

    // Add two 21x3 strips of water onto floor.
    // room.setGlyph(1,1,'◉') // Add rows of statues

    feature.addRoom(room);

    return feature;
  }
});
