FeatureType.register('mana-font',{

  build: function() {
    const color = Random.from(Object.values(Mana));
    const feature = Feature('mana-font');
    const room = Room(feature);

    room.setBounds(5, 5);
    room.addBox(0, 0, 5, 5);
    room.setCenterPoint(2.5,2.5);

    room.forbidAllDoors();
    room.allowDoor(0,2);
    room.allowDoor(2,0);
    room.allowDoor(4,2);
    room.allowDoor(2,4);

    room.setFloorBox({ x:1, y:1, width:3, height:3, type:'water' });
    room.setContents('mana-font', { color });

    return feature;
  }

});

