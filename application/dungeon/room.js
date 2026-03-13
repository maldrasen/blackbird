global.Room = () => {

  // The room model will also manage the contents of the room.
  let $mainBox;
  let $subBox;
  let $position = [0,0];
  let $footprint;

  // Main box is always placed at (0,0);
  function setMainBox(width, height) {
    $mainBox = { x:0, y:0, width, height };
  }

  // We need to recalculate the origin whenever we set a sub box, ensuring
  // that even if the box is to the left or below the main box, the room
  // origin will always remain at (0,0)
  function setSubBox(x, y, width, height) {
    if ($mainBox == null) { throw `Main box must be set first.` }

    $subBox = { x, y, width, height };

    const bounds = getBounds();

    if (bounds.xMin > 0) { throw 'This should never happen'; }
    if (bounds.yMin > 0) { throw 'This should never happen'; }

    if (bounds.xMin < 0) {
      const xAdjust = - $subBox.x;
      $mainBox.x += xAdjust;
      $subBox.x += xAdjust;
    }
    if (bounds.yMin < 0) {
      const yAdjust = - $subBox.y;
      $mainBox.y += yAdjust;
      $subBox.y += yAdjust;
    }
  }

  // Position of this room within the feature.
  function setPosition(x,y) {
    $position = [x,y];
  }

  // Return the room bounds in an object { xMin, xMax, yMin, yMax }
  function getBounds() {
    // When there is only one box the room origin is always at (0,0)
    if ($subBox == null) {
      return { xMin:0, xMax:$mainBox.width, yMin:0, yMax:$mainBox.height };
    }

    // This needs to work both before and after we recalculate the room origin point.
    return {
      xMin: Math.min($mainBox.x, $subBox.x),
      xMax: Math.max(($mainBox.x + $mainBox.width), ($subBox.x + $subBox.width)),
      yMin: Math.min($mainBox.y, $subBox.y),
      yMax: Math.max(($mainBox.y + $mainBox.height), ($subBox.y + $subBox.height)),
    };
  }

  function containsTile(x,y) {
    return boxContains($mainBox,x,y) || boxContains($subBox,x,y);
  }

  function boxContains(box,x,y) {
    if (box == null) { return false; }
    if (x < box.x) { return false; }
    if (y < box.y) { return false; }
    if (x > box.x + box.width-1) { return false; }
    if (y > box.y + box.height-1) { return false; }
    return true;
  }

  // Get a string representation of this room.
  function inspect() {
    let inspection = `Room{${$position[0]},${$position[1]}}`;
    inspection += ` M:(${$mainBox.x},${$mainBox.y})[${$mainBox.width},${$mainBox.height}]`;
    if ($subBox) {
      inspection += ` S:(${$subBox.x},${$subBox.y})[${$subBox.width},${$subBox.height}]`;
    }
    return inspection;
  }

  return Object.freeze({
    getSubBox: () => { return { ...$subBox }; },
    getMainBox: () => { return { ...$mainBox }; },
    getPosition: () => { return $position; },
    getFootprint: () => { return $footprint; },
    setMainBox,
    setSubBox,
    setPosition,
    getBounds,
    containsTile,
    inspect,
  });
}

