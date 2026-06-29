global.DungeonFloorView = (function() {

  const gridSize = 16;

  function drawDungeon() {
    const floor = DungeonSystem.getDungeonFloor();

    X.empty('#dungeonFloor');

    const floorElement = X.first('#dungeonFloor');
    floorElement.style['height'] = `${floor.getFloorHeight() * gridSize}px`;
    floorElement.style['width'] = `${floor.getFloorWidth() * gridSize}px`;

    floor.getFeatures().forEach(feature => {
      addFeatureElement(feature);
    });
  }

  function addFeatureElement(feature) {
    const position = feature.getPosition();
    const bounds = feature.getBounds();

    const featureElement = X.createElement(`<div class='feature' data-index='${feature.getIndex()}'></div>`);
    featureElement.style['left'] = `${(position[0] * gridSize)}px`;
    featureElement.style['top'] = `${(position[1] * gridSize)}px`;
    featureElement.style['height'] = `${bounds.yMax * gridSize}px`;
    featureElement.style['width'] = `${bounds.xMax * gridSize}px`;

    feature.getRooms().forEach(room => {
      addRoomBox(featureElement, room.getMainBox());
      addRoomBox(featureElement, room.getSubBox());
      addRoomBox(featureElement, room.getMainBox(), true);
      addRoomBox(featureElement, room.getSubBox(), true);
    });

    X.first('#dungeonFloor').appendChild(featureElement)
  }

  function addRoomBox(featureElement, box, innerBox=false) {
    if (box) {
      const offset = innerBox ? 2 : 0
      const classname = innerBox ? 'inner' : 'outer';

      const roomBox = X.createElement(`<div class='${classname} room-box'></div>`);
      roomBox.style['left'] = `${(box.x * gridSize) + offset}px`;
      roomBox.style['top'] = `${(box.y * gridSize) + offset}px`;
      roomBox.style['height'] = `${(box.height * gridSize) - (2 * offset)}px`;
      roomBox.style['width'] = `${(box.width * gridSize) - (2 * offset)}px`;
      featureElement.appendChild(roomBox);
    }
  }

  return Object.freeze({
    drawDungeon,
  });

})();
