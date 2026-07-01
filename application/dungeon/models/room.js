global.Room = function() {

  // The room model will also manage the contents of the room.
  const boxes = [];
  let position = { x:0, y:0 };

  // Add a box to the room. Boxes can be added in any order using any shared coordinate system (eg. plain absolute
  // grid coordinates) - the room's own origin isn't pinned to (0,0) until something actually reads the boxes/bounds,
  // so there's no need to keep re-normalizing (and no risk of earlier boxes drifting out of sync with later ones)
  // as more boxes get added.
  function addBox(x, y, width, height) {
    boxes.push({ x, y, width, height });
  }

  // Position of this room within the feature.
  function setPosition(x,y) {
    position = {x,y};
  }

  // The raw bounds of the stored boxes, before normalizing the room's origin to (0,0).
  function rawBounds() {
    const bounds = { xMin:Infinity, xMax:-Infinity, yMin:Infinity, yMax:-Infinity };

    boxes.forEach(box => {
      if (box.x < bounds.xMin) { bounds.xMin = box.x; }
      if (box.y < bounds.yMin) { bounds.yMin = box.y; }
      if (box.x + box.width  > bounds.xMax) { bounds.xMax = box.x + box.width; }
      if (box.y + box.height > bounds.yMax) { bounds.yMax = box.y + box.height; }
    });

    return bounds;
  }

  // Return the room bounds in an object { xMin, xMax, yMin, yMax }, normalized so xMin/yMin are always 0.
  function getBounds() {
    const raw = rawBounds();
    return { xMin:0, yMin:0, xMax: raw.xMax - raw.xMin, yMax: raw.yMax - raw.yMin };
  }

  // Return every box, shifted so the room's overall bounds start at (0,0).
  function getBoxes() {
    const raw = rawBounds();
    return boxes.map(box => ({ x: box.x - raw.xMin, y: box.y - raw.yMin, width: box.width, height: box.height }));
  }

  function pack() {
    return {
      position,
      boxes: getBoxes(),
    }
  }

  return Object.freeze({
    setPosition,
    getPosition: () => { return {...position}; },
    addBox,
    getBoxes,
    getBounds,
    pack,
  });
}
