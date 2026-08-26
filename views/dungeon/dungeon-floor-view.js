
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
      floorElement.appendChild(DungeonDoorView.build(floor, door));
    });
  }

  // A door is visible from the moment either of its rooms is revealed, and each half of its wall caps tracks the
  // revealed and current state of the room on its side.
  function updateLocation(index, revealed) {
    X.removeClass('#dungeonFloor .room.current','current');
    X.addClass(`#dungeonFloor .room[data-index='${index}']`,'current');

    X.removeClass('#dungeonFloor .door.from-current','from-current');
    X.removeClass('#dungeonFloor .door.to-current','to-current');
    X.addClass(`#dungeonFloor .door[data-from='${index}']`,'from-current');
    X.addClass(`#dungeonFloor .door[data-to='${index}']`,'to-current');

    if (revealed) {
      X.removeClass(`#dungeonFloor .room[data-index='${index}']`,'unrevealed');
      X.removeClass(`#dungeonFloor .door[data-from='${index}']`,'from-unrevealed');
      X.removeClass(`#dungeonFloor .door[data-to='${index}']`,'to-unrevealed');
    }
  }

  return {
    drawDungeon,
    updateLocation,
    getGridSize: () => { return gridSize; },
  };

})();
