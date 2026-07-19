global.Room = function(type='normal') {

  // The room model will also manage the contents of the room.
  const boxes = [];
  let position = { x:0, y:0 };
  let index;
  let featureIndex;
  let floorPosition;
  let stairsAllowed = false;
  let overlapping = false;

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

  function getFootprint() {
    const bounds = getBounds();
    const footprint = Array.from({ length: bounds.yMax }, () => new Array(bounds.xMax).fill(false));

    getBoxes().forEach(box => {
      for (let y = box.y; y < box.y + box.height; y++) {
        for (let x = box.x; x < box.x + box.width; x++) {
          footprint[y][x] = true;
        }
      }
    });

    return footprint;
  }

  // Center of bounds in floor coordinates, which can fall outside the room itself if the room is L-shaped.
  function getFloorCenter() {
    const bounds = getBounds();
    return {
      x: floorPosition.x + (bounds.xMax / 2),
      y: floorPosition.y + (bounds.yMax / 2),
    };
  }

  // The isOverlapping() function takes a door as an argument (the door object has a position and a direction) though
  // currently the only overlapping room is the nested room where every tile is overlapping. We need to know this in
  // order to draw the 'hanging' door above an overlapping room. Hanging doors are normally the lowest in the z-order,
  // but need to be pulled on top of the overlapping room in this case.
  function isOverlapping(door) { return overlapping; }

  function pack() {
    return {
      position,
      boxes: getBoxes(),
    }
  }

  return Object.freeze({
    getType: () => { return type },
    setIndex: i => { index = i; },
    getIndex: () => { return index; },
    setFeatureIndex: i => { featureIndex = i; },
    getFeatureIndex: () => { return featureIndex; },
    setFloorPosition: (x,y) => { floorPosition = {x,y}; },
    getFloorPosition: () => { return {...floorPosition}; },
    setPosition,
    getPosition: () => { return {...position}; },
    addBox,
    getBoxes,
    getBounds,
    getFootprint,
    getFloorCenter,
    allowStairs: () => { stairsAllowed = true; },
    stairsAreAllowed: () => { return stairsAllowed; },
    markOverlapping: () => { overlapping = true; },
    isOverlapping,
    pack,
  });
}
