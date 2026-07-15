global.DungeonFloorView = (function() {

  const gridSize = 32;
  const doorLength = 24;
  const doorThickness = 8;

  function drawDungeon() {
    const floor = DungeonSystem.getDungeonFloor();

    X.empty('#dungeonFloor');

    const floorElement = X.first('#dungeonFloor');
    floorElement.style['height'] = `${floor.getFloorHeight() * gridSize}px`;
    floorElement.style['width'] = `${floor.getFloorWidth() * gridSize}px`;

    floor.getRooms().forEach(room => {
      addRoomElement(floor, room);
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

  // Rooms of a multi-room feature overlap, with later rooms painted inside earlier ones. The room's depth within
  // its feature drives the z-index layering in the stylesheet. Unrevealed rooms still render (in the floor color),
  // so the map doesn't show holes where nested rooms are hiding.
  function addRoomElement(floor, room) {
    const index = room.getIndex();
    const position = room.getFloorPosition();
    const bounds = room.getBounds();

    let classname = 'room';
    if (floor.isRevealed(index) === false) { classname += ' unrevealed'; }
    if (index === floor.getLocation()) { classname += ' current'; }

    const roomElement = X.createElement(`<div class='${classname}' data-index='${index}'></div>`);
    roomElement.style['left'] = `${(position.x * gridSize)}px`;
    roomElement.style['top'] = `${(position.y * gridSize)}px`;
    roomElement.style['height'] = `${bounds.yMax * gridSize}px`;
    roomElement.style['width'] = `${bounds.xMax * gridSize}px`;
    roomElement.style.setProperty('--depth', roomDepth(floor, index));

    room.getBoxes().forEach(box => {
      addRoomBox(roomElement, box);
      addRoomBox(roomElement, box, true);
    });

    addStairsElement(roomElement, room, 'up');
    addStairsElement(roomElement, room, 'down');

    X.first('#dungeonFloor').appendChild(roomElement)
  }

  function addStairsElement(roomElement, room, direction) {
    const stairs = DungeonSystem.getDungeonFloor().getStairs(direction);
    if (stairs.roomIndex !== room.getIndex()) { return; }

    const position = room.getFloorPosition();
    const glyph = (direction === 'up') ? '▲' : '▼';

    const stairsElement = X.createElement(`<div class='stairs ${direction}' data-direction='${direction}'>${glyph}</div>`);
    stairsElement.style['left'] = `${(stairs.position.x - position.x) * gridSize}px`;
    stairsElement.style['top'] = `${(stairs.position.y - position.y) * gridSize}px`;
    stairsElement.style['height'] = `${gridSize}px`;
    stairsElement.style['width'] = `${gridSize}px`;

    roomElement.appendChild(stairsElement);
  }

  function addRoomBox(featureElement, box, innerBox=false) {
    const offset = innerBox ? 2 : 0
    const classname = innerBox ? 'inner' : 'outer';

    const roomBox = X.createElement(`<div class='${classname} room-box'></div>`);
    roomBox.style['left'] = `${(box.x * gridSize) + offset}px`;
    roomBox.style['top'] = `${(box.y * gridSize) + offset}px`;
    roomBox.style['height'] = `${(box.height * gridSize) - (2 * offset)}px`;
    roomBox.style['width'] = `${(box.width * gridSize) - (2 * offset)}px`;
    featureElement.appendChild(roomBox);
  }

  function addDoorElement(floor, door) {
    const position = door.getPosition();
    const direction = door.getDirection();
    const hide = (floor.isRevealed(door.getFrom()) || floor.isRevealed(door.getTo())) ? '' : ' hide';

    const wallOffset = doorThickness / 2;
    const insetOffset = (gridSize - doorLength) / 2;

    let left = ((position.x + 1) * gridSize) - wallOffset;
    let top = (position.y * gridSize) + insetOffset;

    if (direction === 'S') {
      left = (position.x * gridSize) + insetOffset;
      top = ((position.y + 1) * gridSize) - wallOffset;
    }

    const doorElement = X.createElement(`<div class='door ${direction}${hide}' data-from='${door.getFrom()}' data-to='${door.getTo()}'></div>`);
    doorElement.style['left'] = `${left}px`;
    doorElement.style['top'] = `${top}px`;
    doorElement.style['height'] = `${(direction === 'S') ? doorThickness : doorLength}px`;
    doorElement.style['width'] = `${(direction === 'S') ? doorLength : doorThickness}px`;

    X.first('#dungeonFloor').appendChild(doorElement);

    // The door's position tile belongs to the from room, and the tile on its S/E side belongs to the to room.
    addDoorPad(floor, door, door.getFrom(), door.getTo(), position.x, position.y);
    addDoorPad(floor, door, door.getTo(), door.getFrom(),
      (direction === 'S') ? position.x : position.x + 1,
      (direction === 'S') ? position.y + 1 : position.y);
  }

  function addDoorPad(floor, door, ownRoom, otherRoom, tileX, tileY) {
    const hide = padIsHidden(floor, ownRoom, otherRoom) ? ' hide' : '';
    const padElement = X.createElement(`<div class='door-pad${hide}' data-from='${door.getFrom()}' data-to='${door.getTo()}' data-room='${ownRoom}'>?</div>`);
    padElement.style['left'] = `${tileX * gridSize}px`;
    padElement.style['top'] = `${tileY * gridSize}px`;
    padElement.style['height'] = `${gridSize}px`;
    padElement.style['width'] = `${gridSize}px`;

    X.first('#dungeonFloor').appendChild(padElement);
  }

  // How deeply the room is nested within its feature: the position of the room in the feature's room order.
  function roomDepth(floor, index) {
    return floor.getFeatureForRoom(index).getRooms().findIndex(room => room.getIndex() === index);
  }

  return Object.freeze({
    drawDungeon,
    updateLocation,
    getGridSize: () => { return gridSize; },
  });

})();
