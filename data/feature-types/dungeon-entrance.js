FeatureType.register('dungeon-entrance',{
  build: function() {
    const feature = Feature('dungeon-entrance');
    const room = Room(feature);
    room.setBounds(11, 5);
    room.addBox(0, 0, 11, 5);
    room.setCenterPoint(2.5,2.5);
    room.allowStairs();
    room.setStairs('up');
    room.forbidAllDoors();
    room.allowDoor(10,2);

    room.setFloorBox({ x:0, y:0, width:4, height:1, type:'water' });
    room.setFloorBox({ x:0, y:4, width:4, height:1, type:'water' });
    room.setFloorBox({ x:0, y:1, width:1, height:3, type:'water' });
    room.setFloorBox({ x:4, y:0, width:7, height:2, type:'water' });
    room.setFloorBox({ x:4, y:3, width:7, height:2, type:'water' });

    room.setDescription('TODO: Dungeon Entrance Description');

    // Add rows of statues with something like room.setGlyph(1,1,'◉')

    feature.addRoom(room);

    return feature;
  }
});
