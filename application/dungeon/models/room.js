global.Room = function() {

  // The room model will also manage the contents of the room.
  const boxes = [];
  let position = { x:0, y:0 };

  // Add a box to the room, positioned as an offset from the room's own origin. There's no "main" box - a box is
  // just a shape, and a room can be made up of any number of them (a single box, an L made of two, a dogleg made of
  // three, etc). Adding a box can push the room's bounds below (0,0), so every box gets shifted back to keep the
  // room's overall origin pinned at (0,0).
  function addBox(x, y, width, height) {
    boxes.push({ x, y, width, height });

    const bounds = getBounds();
    const xAdjust = -bounds.xMin;
    const yAdjust = -bounds.yMin;

    if (xAdjust !== 0 || yAdjust !== 0) {
      boxes.forEach(box => { box.x += xAdjust; box.y += yAdjust; });
    }
  }

  // Position of this room within the feature.
  function setPosition(x,y) {
    position = {x,y};
  }

  // Return the room bounds in an object { xMin, xMax, yMin, yMax }
  function getBounds() {
    const bounds = { xMin:Infinity, xMax:-Infinity, yMin:Infinity, yMax:-Infinity };

    boxes.forEach(box => {
      if (box.x < bounds.xMin) { bounds.xMin = box.x; }
      if (box.y < bounds.yMin) { bounds.yMin = box.y; }
      if (box.x + box.width  > bounds.xMax) { bounds.xMax = box.x + box.width; }
      if (box.y + box.height > bounds.yMax) { bounds.yMax = box.y + box.height; }
    });

    return bounds;
  }

  // Get a string representation of this room.
  function inspect() {
    let inspection = `Room{${position[0]},${position[1]}}`;
    boxes.forEach(box => {
      inspection += ` (${box.x},${box.y})[${box.width},${box.height}]`;
    });
    return inspection;
  }

  function pack() {
    return {
      position,
      boxes,
    }
  }

  return Object.freeze({
    setPosition,
    getPosition: () => { return {...position}; },
    addBox,
    getBoxes: () => { return boxes.map(box => ({...box})); },
    getBounds,
    inspect,
    pack,
  });
}
