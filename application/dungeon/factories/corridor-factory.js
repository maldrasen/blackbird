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
    const strategies = [
      attemptSingleTurnCorridor,
      attemptDoglegCorridor
    ];

    console.log("=== Dig Between ===")
    console.log(`[${first}]`, originFeature.getLocation());
    console.log(`[${second}]`,targetFeature.getLocation());
    console.log("Alignment:",alignment);

    if (alignment === 'O') {
      throw new Error('Handle Special Case: Overlapping Features');
    }

    if (['N','S','E','W'].includes(alignment)) {
      strategies.push(attemptStraightCorridor);
    }

    Random.shuffle(strategies);

    let result;
    while(strategies.length > 0 && result == null) {
      result = (strategies.shift())(alignment);
    }
    return result
  }

  function attemptStraightCorridor(alignment) {
    const ray = corridorRayCast(alignment);
    if (ray) {
      const index = features.length;
      const { start, end } = ray;

      const isVertical = start.x === end.x;
      const x = isVertical ? start.x : Math.min(start.x, end.x);
      const y = isVertical ? Math.min(start.y, end.y) : start.y;

      const feature = Feature('corridor');
      feature.setPosition(x, y);
      feature.setIndex(index);
      feature.addRoom(buildRoomBetween(start, end));

      addFeatureToGrid(feature)

      let originDoorPosition;
      let targetDoorPosition;
      let direction;

      switch(alignment) {
        case 'N': // corridor is above origin; target is above corridor
          originDoorPosition = { x:start.x, y:start.y };
          targetDoorPosition = { x:end.x, y:end.y-1 };
          direction = 'S';
          break;
        case 'S': // origin is above corridor; corridor is above target
          originDoorPosition = { x:start.x, y:start.y-1};
          targetDoorPosition = { x:end.x, y:end.y };
          direction = 'S';
          break;
        case 'E': // corridor is left of origin; target is left of corridor
          originDoorPosition = { x:start.x, y:start.y };
          targetDoorPosition = { x:end.x-1, y:end.y };
          direction = 'E';
          break;
        case 'W': // origin is left of corridor; corridor is left of target
          originDoorPosition = { x:start.x-1, y:start.y };
          targetDoorPosition = { x:end.x, y:end.y };
          direction = 'E';
          break;
      }

      return { feature, doors:[
        Door(originDoorPosition, direction, originFeature, feature),
        Door(targetDoorPosition, direction, targetFeature, feature)
      ]};
    }
  }

  // To find a single turn path, we get all the start tiles for the origin and target features. For a SE alignment we
  // get all the edge tiles on the S and E sides of the origin, and all the tiles on the N and W sides of the target.
  // We then take every permutation of origin start tile and target end tile and draw an L shape between them. If there
  // are no collisions we add it to a list of possible solutions and pick one at random.
  function attemptSingleTurnCorridor(alignment) {
    console.log("=== Attempt Single Turn Corridor ===");
    return null;
  }

  function attemptDoglegCorridor(alignment) {
    console.log("=== Attempt Bendy Corridor ===");
    return null;
  }

  function buildRoomBetween(start,end) {
    const isVertical = start.x === end.x;
    const width  = isVertical ? 1 : Math.abs(end.x - start.x) + 1;
    const height = isVertical ? Math.abs(end.y - start.y) + 1 : 1;

    const room = Room();
    room.setMainBox(width, height);

    return room;
  }

  // Corridors can be composed of many rooms, but each room only has one box. This is to allow for "dog leg" shaped
  // features with two turns. When a feature is added we need to set the cells that it covers in the floor grid.
  function addFeatureToGrid(feature) {
    const position = feature.getPosition();
    const index = feature.getIndex();

    feature.getRooms().forEach(room => {
      const box = room.getMainBox();
      const yMin = position.y + box.y;
      const xMin = position.x + box.x;

      for (let y=yMin; y<(yMin + box.height); y++) {
        for (let x=xMin; x<(xMin + box.width); x++) {
          grid[y][x] = index;
        }
      }
    });
  }

  // If two features are aligned we can attempt to find a straight path between them. We first find all the
  // overlapping tiles. Then we draw a line through the grid from the origin tiles to the feature. A ray will fail if
  // it encounters a feature other than the target.
  function corridorRayCast(alignment) {
    const startTiles = findOverlappingStartTiles(alignment);
    const rays = []

    startTiles.forEach(start => {
      let cursor = {...start};
      let end = {...start};

      while(true) {
        switch(alignment) {
          case 'N': cursor = { y:cursor.y-1, x:cursor.x }; break;
          case 'S': cursor = { y:cursor.y+1, x:cursor.x }; break;
          case 'E': cursor = { y:cursor.y, x:cursor.x-1 }; break;
          case 'W': cursor = { y:cursor.y, x:cursor.x+1 }; break;
        }

        let cell = grid[cursor.y][cursor.x];
        if (cell == null) { end = cursor; }

        // A ray is only valid if it finds the target feature at the end.
        if (cell != null) {
          if (cell === targetFeature.getIndex()) {
            rays.push({ start, end });
          }
          return;
        }
      }
    });

    return (rays.length > 0) ? Random.from(rays) : null;
  }

  // The overlapping start tiles are the edge tiles in the direction of the target feature where the tiles are empty
  // and intersect with the target feature bounds.
  function findOverlappingStartTiles(alignment) {
    const pos = originFeature.getPosition();
    const target = targetFeature.getLocation();

    const inTargetOverlap = ['N','S'].includes(alignment) ?
      (tile) => tile.x >= target.xMin && tile.x < target.xMax :
      (tile) => tile.y >= target.yMin && tile.y < target.yMax;

    return originFeature.getEdgeTiles(alignment).
      map(tile => ({ x: tile.x + pos.x, y: tile.y + pos.y })).
      filter(tile => grid[tile.y][tile.x] == null).
      filter(inTargetOverlap);
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
