global.CorridorFactory = function(grid) {
  const floor = DungeonSystem.getDungeonFloor();
  const features = floor.getFeatures();

  let originFeature;
  let targetFeature;

  // Create a corridor that goes between these two features.

  // We need to first find which cell to start digging at. If the target feature is above this one we should pick an
  // empty cell above the top most box. Or if the target feature is to the west we need to pick a cell along the left
  // hand side.

  // We then pick a target cell. Pretty much the exact opposite of finding an origin cell. Just need to pick an empty
  // cell in the direction of the other feature.

  // With two empty cells we can then find a path between the two. Path should be an L shape. If we can't find a
  // solution with an L shaped corridor, maybe give up on connecting these features, add them to a black list and
  // find the next closest? That or we add a "three box" room.

  // The corridor itself should be a feature. It gets added to the feature list. We add two doors for it as well.
  // We need to add the two new edges to the connectivity tree and rebuild the spanning forest. Loop until there are
  // no disconnected trees.

  function digBetween(first, second) {
    originFeature = features[first];
    targetFeature = features[second];

    originFeature.setHighlight(true);
    targetFeature.setHighlight(true);

    const alignment = getFeatureAlignment();

    console.log("=== Dig Between ===")
    console.log(`[${first}]`, originFeature.getLocation());
    console.log(`[${second}]`,targetFeature.getLocation());
    console.log("Alignment:",alignment);

    if (alignment === 'O') {
      throw new Error('Handle special case: Overlapping Features')
    }
    if (['N','S','E','W'].includes(alignment)) {
      attemptStraightCorridor(alignment);
    }
    if (['NE','NW','SE','SW'].includes(alignment)) {
      attemptBendyCorridor(alignment);
    }

    return {
      feature: null,
      doors: [],
    }
  }

  function attemptStraightCorridor(alignment) {
    const origins = findOverlapOriginTiles(alignment);

    const rays = origins.map(origin => {
      let cursor = {...origin};
      let last = {...origin};
      let searching = true;

      while(searching) {
        switch(alignment) {
          case 'N': cursor = { y:cursor.y-1, x:cursor.x }; break;
          case 'S': cursor = { y:cursor.y+1, x:cursor.x }; break;
          case 'E': cursor = { y:cursor.y, x:cursor.x+1 }; break;
          case 'W': cursor = { y:cursor.y, x:cursor.x-1 }; break;
        }

        (grid[cursor.y][cursor.x] != null) ? (searching = false) : (last = cursor);
      }

      console.log("Cast ray from ",origin);
      console.log("Ending At",last);

      return [origin,last]
    });

    console.log("Rays:",rays);
  }

  function attemptBendyCorridor(alignment) {
    console.log("=== Attempt Bendy Corridor ===");
  }

  function findOverlapOriginTiles(alignment) {
    const a = originFeature.getLocation();
    const b = targetFeature.getLocation();
    const tiles = [];

    if (alignment === 'N') {
      for (let x = Math.max(a.xMin, b.xMin); x < Math.min(a.xMax, b.xMax); x++) {
        tiles.push({ x, y:a.yMin - 1 });
      }
    }
    if (alignment === 'S') {
      for (let x = Math.max(a.xMin, b.xMin); x < Math.min(a.xMax, b.xMax); x++) {
        tiles.push({ x, y:a.yMax });
      }
    }
    if (alignment === 'E') {
      for (let y = Math.max(a.yMin, b.yMin); y < Math.min(a.yMax, b.yMax); y++) {
        tiles.push({ x:a.xMin - 1, y });
      }
    }
    if (alignment === 'W') {
      for (let y = Math.max(a.yMin, b.yMin); y < Math.min(a.yMax, b.yMax); y++) {
        tiles.push({ x:a.xMax, y });
      }
    }

    return tiles;
  }

  // Alignment can be one of eight values. A cardinal direction (N,S,E,W) indicates that the two features are at least
  // somewhat aligned and share at least a pair of tiles on a single axis. Other alignments (NE,NW,SE,SW) indicate that
  // the target feature is not aligned, but lies in the indicated direction. Because features can be L or X shaped both
  // the X and Y can overlap. In this case this function returns 'O' which will need special handling.
  function getFeatureAlignment() {
    const a = originFeature.getLocation();
    const b = targetFeature.getLocation();

    const xOverlap = Math.min(a.xMax, b.xMax) - Math.max(a.xMin, b.xMin) > 0;
    const yOverlap = Math.min(a.yMax, b.yMax) - Math.max(a.yMin, b.yMin) > 0;

    if (xOverlap && yOverlap) { return 'O' }

    // These directions are only true if the locations don't overlap at all.
    const isNorth = b.yMax <= a.yMin;
    const isSouth = b.yMin >= a.yMax;
    const isEast = b.xMax <= a.xMin;
    const isWest = b.xMin >= a.xMax;

    if (xOverlap) { return isNorth ? 'N' : 'S'; }
    if (yOverlap) { return isEast ?  'E' : 'W'; }

    if (isNorth && isWest) { return 'NW'; }
    if (isNorth && isEast) { return 'NE'; }
    if (isSouth && isWest) { return 'SW'; }
    if (isSouth && isEast) { return 'SE'; }

    throw new Error(`Something has gone horribly wrong here.`);
  }

  return Object.freeze({
    digBetween
  });

}
