FeatureType.register('mana-font',{

  build: function() {
    const color = Random.from(Object.values(Mana));
    const feature = Feature('mana-font');
    const room = Room(feature);

    room.setBounds(3, 3);
    room.addBox(0, 0, 3, 3);
    room.setCenterPoint(1.5,1.5);
    room.setChamfer(100);

    room.forbidAllDoors();
    room.allowDoor(0,1);
    room.allowDoor(1,0);
    room.allowDoor(2,1);
    room.allowDoor(1,2);

    room.setFloorBox({ x:1, y:1, width:1, height:1, type:'water' });
    room.setFloorChamfer(33);
    room.setContents('mana-font', { color });

    feature.addRoom(room);

    return feature;
  }

});

