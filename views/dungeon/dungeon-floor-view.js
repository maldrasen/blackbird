
// === AI Disclaimer ===
// Yeah, so most of the floor view, the rooms, the doors, the wall and floor textures, were all vibe coded. I really
// don't know how most of this works. The thing is, building SVGs programmatically sucks. The dungeon graphics are one
// of those rare tasks that's difficult to write, but easy to verify. Bugs in this code will be loud and visible, so
// even if I'm not sure how most of it works, I'm happy with how it looks.

global.DungeonFloorView = (function() {
  const gridSize = 128;

  function drawDungeon() {
    const floor = DungeonSystem.getDungeonFloor();
    const theme = DungeonTheme.lookup(floor.getTheme());
    const paintFloorTexture = theme.getFloorTextureFunction();

    X.empty('#dungeonFloor');

    const floorElement = X.first('#dungeonFloor');
    floorElement.style['height'] = `${floor.getFloorHeight() * gridSize}px`;
    floorElement.style['width'] = `${floor.getFloorWidth() * gridSize}px`;

    floor.getRooms().forEach(room => {
      floorElement.appendChild(DungeonRoomView.build(floor, room));
      paintFloorTexture(room);
    });

    floor.getDoors().forEach(door => {
      floorElement.appendChild(DungeonDoorView.build(door));
    });

    floorElement.appendChild(DungeonVisionView.build(floor));
    floorElement.appendChild(DungeonPartyMarker.build(floor.getPartyPosition()));
    DungeonVisionView.render(floor.getPartyPosition());
  }

  // A wall can only hold one door, so a door is found by its tile and the wall of the tile it's on. The floor's own
  // doors are its direct children; the vision view keeps a copy of each door that it marks open itself.
  function openDoor(door) {
    X.addClass(`#dungeonFloor > .door.${door.direction}[data-x='${door.position.x}'][data-y='${door.position.y}']`,'open');
    DungeonVisionView.openDoor(door);
  }

  return {
    drawDungeon,
    openDoor,
    getGridSize: () => { return gridSize; },
  };

})();
