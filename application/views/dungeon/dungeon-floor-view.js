global.DungeonFloorView = (function() {

  const gridSize = 64;

  function drawDungeon() {
    const floor = DungeonSystem.getDungeonFloor();
    const theme = DungeonTheme.lookup(floor.getTheme());
    const paintFloorTexture = theme.getFloorTextureFunction();
    const paintWallTexture = theme.getWallTextureFunction();

    X.empty('#dungeonFloor');

    const floorElement = X.first('#dungeonFloor');
    floorElement.style['height'] = `${floor.getFloorHeight() * gridSize}px`;
    floorElement.style['width'] = `${floor.getFloorWidth() * gridSize}px`;

    floor.getRooms().forEach(room => {
      floorElement.appendChild(DungeonRoomView.build(floor, room));
      paintFloorTexture(room);
      paintWallTexture(room);
    });

    floor.getDoors().forEach(door => {
      floorElement.appendChild(DungeonDoorView.build(floor, door));
      addDoorPads(floor, door);
    });
  }

  // Doors are visible when either of their rooms is revealed, so revealing a room can only unhide the doors that
  // touch it. The pads of those doors are recomputed: the pads sitting on the revealed room's own tiles are
  // removed and the pads leading into its unexplored neighbors are shown.
  function updateLocation(index, revealed) {
    X.removeClass('#dungeonFloor .room.current','current');
    X.addClass(`#dungeonFloor .room[data-index='${index}']`,'current');

    if (revealed) {
      const floor = DungeonSystem.getDungeonFloor();

      X.removeClass(`#dungeonFloor .room[data-index='${index}']`,'unrevealed');
      X.removeClass([
        `#dungeonFloor .door[data-from='${index}']`,
        `#dungeonFloor .door[data-to='${index}']`,
      ].join(','),'hide');
      X.addClass(`#dungeonFloor .door[data-from='${index}']`,'anchored');

      X.each(`#dungeonFloor .door-pad[data-from='${index}'], #dungeonFloor .door-pad[data-to='${index}']`, pad => {
        const own = parseInt(pad.dataset.room);
        const other = (parseInt(pad.dataset.from) === own) ? parseInt(pad.dataset.to) : parseInt(pad.dataset.from);
        pad.classList.toggle('hide', padIsHidden(floor, own, other));
      });
    }
  }

  // A pad sits on one room's tile, its own side of the door. It's only shown while its own room is unexplored and
  // the room on the other side of the door has been revealed, so it's never obstructed by the rooms.
  function padIsHidden(floor, ownRoom, otherRoom) {
    return floor.isRevealed(ownRoom) || floor.isRevealed(otherRoom) === false;
  }

  // Doors themselves aren't drawn yet; they'll eventually be painted into the walls. Their pads still render as the
  // affordance for stepping into unexplored neighbors.
  function addDoorPads(floor, door) {
    const position = door.position;
    const direction = door.direction;

    addDoorPad(floor, door, door.from, door.to, position.x, position.y);
    addDoorPad(floor, door, door.to, door.from,
      (direction === 'N') ? position.x : position.x - 1,
      (direction === 'N') ? position.y - 1 : position.y);
  }

  function addDoorPad(floor, door, ownRoom, otherRoom, tileX, tileY) {
    const hide = padIsHidden(floor, ownRoom, otherRoom) ? ' hide' : '';
    const padElement = X.createElement(`<div class='door-pad${hide}' data-from='${door.from}' data-to='${door.to}' data-room='${ownRoom}'>?</div>`);
    padElement.style['left'] = `${tileX * gridSize}px`;
    padElement.style['top'] = `${tileY * gridSize}px`;
    padElement.style['height'] = `${gridSize}px`;
    padElement.style['width'] = `${gridSize}px`;

    X.first('#dungeonFloor').appendChild(padElement);
  }

  return Object.freeze({
    drawDungeon,
    updateLocation,
    getGridSize: () => { return gridSize; },
  });

})();
