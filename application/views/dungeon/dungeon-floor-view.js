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

    floor.getFeatures().forEach(feature => {
      addFeatureElement(floor, feature);
    });

    floor.getDoors().forEach(door => {
      addDoorElement(floor, door);
    });
  }

  // Doors and door pads are visible when either of their features is revealed, so revealing a feature can only
  // unhide the doors that touch it.
  function updateLocation(index, revealed) {
    X.removeClass('#dungeonFloor .feature.current','current');
    X.addClass(`#dungeonFloor .feature[data-index='${index}']`,'current');

    if (revealed) {
      X.removeClass(`#dungeonFloor .feature[data-index='${index}']`,'hide');
      X.removeClass([
        `#dungeonFloor .door[data-from='${index}']`,
        `#dungeonFloor .door[data-to='${index}']`,
        `#dungeonFloor .door-pad[data-from='${index}']`,
        `#dungeonFloor .door-pad[data-to='${index}']`,
      ].join(','),'hide');
    }
  }

  function addFeatureElement(floor, feature) {
    const index = feature.getIndex();
    const position = feature.getPosition();
    const bounds = feature.getBounds();

    let classname = 'feature';
    if (floor.isRevealed(index) === false) { classname += ' hide'; }
    if (index === floor.getLocation()) { classname += ' current'; }

    const featureElement = X.createElement(`<div class='${classname}' data-index='${index}'></div>`);
    featureElement.style['left'] = `${(position.x * gridSize)}px`;
    featureElement.style['top'] = `${(position.y * gridSize)}px`;
    featureElement.style['height'] = `${bounds.yMax * gridSize}px`;
    featureElement.style['width'] = `${bounds.xMax * gridSize}px`;

    feature.getRooms().forEach(room => {
      room.getBoxes().forEach(box => {
        addRoomBox(featureElement, box);
        addRoomBox(featureElement, box, true);
      });
    });

    addStairsElement(featureElement, feature, 'up');
    addStairsElement(featureElement, feature, 'down');

    X.first('#dungeonFloor').appendChild(featureElement)
  }

  function addStairsElement(featureElement, feature, direction) {
    const stairs = DungeonSystem.getDungeonFloor().getStairs(direction);
    if (stairs.featureIndex !== feature.getIndex()) { return; }

    const position = feature.getPosition();
    const glyph = (direction === 'up') ? '▲' : '▼';

    const stairsElement = X.createElement(`<div class='stairs ${direction}' data-direction='${direction}'>${glyph}</div>`);
    stairsElement.style['left'] = `${(stairs.position.x - position.x) * gridSize}px`;
    stairsElement.style['top'] = `${(stairs.position.y - position.y) * gridSize}px`;
    stairsElement.style['height'] = `${gridSize}px`;
    stairsElement.style['width'] = `${gridSize}px`;

    featureElement.appendChild(stairsElement);
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

    addDoorPad(door, hide, position.x, position.y);
    addDoorPad(door, hide,
      (direction === 'S') ? position.x : position.x + 1,
      (direction === 'S') ? position.y + 1 : position.y);
  }

  function addDoorPad(door, hide, tileX, tileY) {
    const padElement = X.createElement(`<div class='door-pad${hide}' data-from='${door.getFrom()}' data-to='${door.getTo()}'>?</div>`);
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
