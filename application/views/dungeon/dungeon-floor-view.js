global.DungeonFloorView = (function() {

  const gridSize = 64;
  const doorLength = 48;
  const doorThickness = 16;

  function drawDungeon() {
    const floor = DungeonSystem.getDungeonFloor();

    X.empty('#dungeonFloor');

    const floorElement = X.first('#dungeonFloor');
    floorElement.style['height'] = `${floor.getFloorHeight() * gridSize}px`;
    floorElement.style['width'] = `${floor.getFloorWidth() * gridSize}px`;

    floor.getRooms().forEach(room => {
      floorElement.appendChild(DungeonRoomView.build(floor, room));
    });

    floor.getDoors().forEach(door => {
      addDoorElement(floor, door);
    });
  }

  // Doors are visible when either of their rooms is revealed, so revealing a room can only unhide the doors that
  // touch it. The pads of those doors are recomputed: revealing a room removes the pads sitting on its own tiles
  // and shows the pads leading into its unexplored neighbors.
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

  function addDoorElement(floor, door) {
    const position = door.position;
    const direction = door.direction;
    const hide = (floor.isRevealed(door.from) || floor.isRevealed(door.to)) ? '' : ' hide';

    const wallOffset = doorThickness / 2;
    const insetOffset = (gridSize - doorLength) / 2;

    let left = (position.x * gridSize) - wallOffset;
    let top = (position.y * gridSize) + insetOffset;

    if (direction === 'N') {
      left = (position.x * gridSize) + insetOffset;
      top = (position.y * gridSize) - wallOffset;
    }

    const width = (direction === 'N') ? doorLength : doorThickness;
    const height = (direction === 'N') ? doorThickness : doorLength;

    const doorElement = X.createElement([
      `<svg class='door ${direction}${hide}' data-from='${door.from}' data-to='${door.to}' viewBox='0 0 ${width} ${height}'>`,
      `<rect x='0' y='0' width='${width}' height='${height}'/>`,
      `</svg>`,
    ].join(''));
    doorElement.style['left'] = `${left}px`;
    doorElement.style['top'] = `${top}px`;
    doorElement.style['height'] = `${height}px`;
    doorElement.style['width'] = `${width}px`;

    X.first('#dungeonFloor').appendChild(doorElement);

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
