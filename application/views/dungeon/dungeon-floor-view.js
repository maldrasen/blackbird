global.DungeonFloorView = (function() {

  const gridSize = 16;

  function drawDungeon() {
    X.empty('#dungeonFloor');

    const floor = DungeonSystem.getDungeonFloor();
    floor.getFeatures().forEach(feature => {
      addFeatureElement(feature);
    });
  }

  function addFeatureElement(feature) {
    const position = feature.getPosition();
    const bounds = feature.getBounds();

    const featureElement = X.createElement(`<div class='feature'></div>`);
    featureElement.style['left'] = `${(position[0] * gridSize)}px`;
    featureElement.style['top'] = `${(position[1] * gridSize)}px`;
    featureElement.style['height'] = `${bounds.yMax * gridSize}px`;
    featureElement.style['width'] = `${bounds.xMax * gridSize}px`;

    feature.getRooms().forEach(room => {
      addRoomBox(featureElement, room.getMainBox());
      addRoomBox(featureElement, room.getSubBox());
    });

    X.first('#dungeonFloor').appendChild(featureElement)
  }

  function addRoomBox(featureElement, box) {
    if (box) {
      const roomBox = X.createElement(`<div class='room-box'></div>`);
      roomBox.style['left'] = `${(box.x * gridSize)}px`;
      roomBox.style['top'] = `${(box.y * gridSize)}px`;
      roomBox.style['height'] = `${box.height * gridSize}px`;
      roomBox.style['width'] = `${box.width * gridSize}px`;
      featureElement.appendChild(roomBox);
    }
  }

  return Object.freeze({
    drawDungeon,
  });

})();
