global.Room = (function() {

  // The room model will also manage the contents of the room.
  function build() {
    let $mainBox;
    let $subBox;
    let $footprint;

    // Main box is always placed at (0,0);
    function setMainBox(width, height) {
      $mainBox = { x:0, y:0, width, height };
    }

    // When the sub box is set we can then adjust the bounds and footprint.
    function setSubBox(x, y, width, height) {
      $subBox = { x, y, width, height };
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
      if ($subBox == null) {
        return { xMin:0, xMax:$mainBox.width, yMin:0, yMax:$mainBox.height };
      }
      throw `Calculate bounds for two box rooms.`
    }

    return Object.freeze({
      getSubBox: () => { return { ...$subBox }; },
      getMainBox: () => { return { ...$mainBox }; },
      getFootprint: () => { return $footprint; },
      setMainBox,
      setSubBox,
      compileFootprint,
      calculateBounds,
    });
  }

  return Object.freeze({
    build
  });

})();
