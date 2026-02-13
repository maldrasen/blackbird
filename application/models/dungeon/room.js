global.Room = (function() {

  // The room model will also manage the contents of the room.
  function build() {
    let $mainBox;
    let $subBox;
    let $position = [0,0];
    let $footprint;

    // Main box is always placed at (0,0);
    function setMainBox(width, height) {
      $mainBox = { x:0, y:0, width, height };
    }

    // When the sub box is set we can then adjust the bounds and footprint.
    function setSubBox(x, y, width, height) {
      $subBox = { x, y, width, height };
    }

    // Position of this room within the feature.
    function setPosition(x,y) {
      $position = [x,y];
    }

    // Like the Feature, the Room footprint is a two dimensional array used to determine if a tile is empty or not. An
    // empty till will be null. A full tile will be set to 1. It's possible that we'll also use the footprint to
    // include other symbols on the room, representing furniture or other features.
    //
    // For two dimensional grids I think grid[y][x] is the customary format.
    //
    function compileFootprint() {
      if ($mainBox == null) { throw `Main box must be set first.` }

      const bounds = calculateBounds();
      const yRange = bounds.yMax - bounds.yMin;
      const xRange = bounds.xMax - bounds.xMin;

      $footprint = new Array(yRange);
      for (let y=bounds.yMin; y<bounds.yMax; y++) {
        $footprint[y] = new Array(xRange);
      }

      for (let y=0; y<$mainBox.height; y++) {
        for (let x=0; x<$mainBox.width; x++) {
          $footprint[y][x] = 1;
        }
      }
    }

    function calculateBounds() {
      // When there is only one box the room origin is always at (0,0)
      if ($subBox == null) {
        return { xMin:0, xMax:$mainBox.width, yMin:0, yMax:$mainBox.height };
      }

      // This should work both before and after we recalculate the room origin point.
      return {
        xMin: Math.min($mainBox.x, $subBox.x),
        xMax: Math.max(($mainBox.x + $mainBox.width), ($subBox.x + $subBox.width)),
        yMin: Math.min($mainBox.y, $subBox.y),
        yMax: Math.max(($mainBox.y + $mainBox.height), ($subBox.y + $subBox.height)),
      };
    }

    function containsTile(x,y) {
      if ($subBox == null) { return true; }
      throw `Check both boxes for point`
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
      compileFootprint,
      calculateBounds,
      containsTile,
      inspect,
    });
  }

  return Object.freeze({
    build
  });

})();
