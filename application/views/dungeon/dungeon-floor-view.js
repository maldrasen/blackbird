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
      addFeatureElement(feature);
    });

    floor.getDoors().forEach(door => {
      addDoorElement(door);
    });

    updateNavigation();
  }

  // TODO: When we change rooms we only need to update the visibility of a newly revealed room. This is looping though
  //       every feature, door, and door pad every time we change room, including when pathing through already
  //       revealed rooms.
  function updateNavigation() {
    const floor = DungeonSystem.getDungeonFloor();

    X.each('#dungeonFloor .feature', element => {
      const index = parseInt(element.dataset.index);
      element.classList.toggle('hide', floor.isRevealed(index) === false);
      element.classList.toggle('current', index === floor.getLocation());
    });

    X.each('#dungeonFloor .door, #dungeonFloor .door-pad', element => {
      const revealed = floor.isRevealed(parseInt(element.dataset.from)) || floor.isRevealed(parseInt(element.dataset.to));
      element.classList.toggle('hide', revealed === false);
    });
  }

  function addFeatureElement(feature) {
    const position = feature.getPosition();
    const bounds = feature.getBounds();

    const featureElement = X.createElement(`<div class='feature' data-index='${feature.getIndex()}'></div>`);
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

  function addDoorElement(door) {
    const position = door.getPosition();
    const direction = door.getDirection();

    const wallOffset = doorThickness / 2;
    const insetOffset = (gridSize - doorLength) / 2;

    let left = ((position.x + 1) * gridSize) - wallOffset;
    let top = (position.y * gridSize) + insetOffset;

    if (direction === 'S') {
      left = (position.x * gridSize) + insetOffset;
      top = ((position.y + 1) * gridSize) - wallOffset;
    }

    const doorElement = X.createElement(`<div class='door ${direction}' data-from='${door.getFrom()}' data-to='${door.getTo()}'></div>`);
    doorElement.style['left'] = `${left}px`;
    doorElement.style['top'] = `${top}px`;
    doorElement.style['height'] = `${(direction === 'S') ? doorThickness : doorLength}px`;
    doorElement.style['width'] = `${(direction === 'S') ? doorLength : doorThickness}px`;

    X.first('#dungeonFloor').appendChild(doorElement);

    addDoorPad(door, position.x, position.y);
    addDoorPad(door,
      (direction === 'S') ? position.x : position.x + 1,
      (direction === 'S') ? position.y + 1 : position.y);
  }

  function addDoorPad(door, tileX, tileY) {
    const padElement = X.createElement(`<div class='door-pad' data-from='${door.getFrom()}' data-to='${door.getTo()}'>?</div>`);
    padElement.style['left'] = `${tileX * gridSize}px`;
    padElement.style['top'] = `${tileY * gridSize}px`;
    padElement.style['height'] = `${gridSize}px`;
    padElement.style['width'] = `${gridSize}px`;

    X.first('#dungeonFloor').appendChild(padElement);
  }

  return Object.freeze({
    drawDungeon,
    updateNavigation,
    getGridSize: () => { return gridSize; },
  });

})();
