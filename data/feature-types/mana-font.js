FeatureType.register('mana-font',{
  build: function() {
    const color = fontColor();
    const feature = Feature('mana-font');
    const room = Room(feature);

    room.setBounds(3, 3);
    room.addBox(0, 0, 3, 3);
    room.setCenterPoint(1.5,1.5);
    room.setChamfer(40);

    room.forbidAllDoors();
    room.allowDoor(0,1);
    room.allowDoor(1,0);
    room.allowDoor(2,1);
    room.allowDoor(1,2);
    room.setTileContents(1, 1, { canEnter:false, shadow:true, glyph:{ glyph:'◉', color:DungeonConstants.wallColor }});

    room.setFloorBox({ x:1, y:1, width:1, height:1, type:'water' });
    room.setFloorChamfer(20);
    room.setContents('mana-font', { color });

    feature.addRoom(room);

    return feature;
  }
});

// Every font is green until the player has seen the first-mana-font episode, which teaches the first spell.
function fontColor() {
  return GameSystem.getState().hasViewedEpisode('first-mana-font') ? Random.from(Object.values(Mana)) : Mana.green;
}
