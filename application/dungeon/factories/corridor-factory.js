global.CorridorFactory = function() {

  let originFeature;
  let targetFeature;

  function digBetween(first, second) {
    const floor = DungeonSystem.getDungeonFloor();

    originFeature = floor.getFeatureForRoom(first);
    targetFeature = floor.getFeatureForRoom(second);

    const alignment = getFeatureAlignment();
    const corridorFactories = [
      DoglegCorridorFactory,
      BentCorridorFactory,
    ];

    if (['N','S','E','W'].includes(alignment)) {
      corridorFactories.push(StraightCorridorFactory);
    }

    Random.shuffle(corridorFactories);

    let result;
    while(corridorFactories.length > 0 && result == null) {
      result = (corridorFactories.shift())(originFeature, targetFeature, alignment).build();
    }
    return result
  }

  // Alignment can be one of eight values. A cardinal direction (N,S,E,W) indicates that the two features are at least
  // somewhat aligned and share at least a pair of tiles on a single axis. Other alignments (NE,NW,SE,SW) indicate that
  // the target feature is not aligned, but lies in the indicated direction. Because features can be L or Z shaped
  // (bent/dogleg corridors) their bounding boxes can cross on both axes even when the features don't actually come
  // anywhere near each other. The bounding box includes "dead space" the feature doesn't occupy. So when the boxes
  // cross we check find the closest pair of occupied tiles to pick a direction.
  function getFeatureAlignment() {
    const a = originFeature.getLocation();
    const b = targetFeature.getLocation();

    const xOverlap = Math.min(a.xMax, b.xMax) - Math.max(a.xMin, b.xMin) > 0;
    const yOverlap = Math.min(a.yMax, b.yMax) - Math.max(a.yMin, b.yMin) > 0;

    if (xOverlap && yOverlap) {
      return closestTileAlignment(originFeature, targetFeature);
    }

    // These directions are only true if the locations don't overlap at all.
    const isNorth = b.yMax <= a.yMin;
    const isSouth = b.yMin >= a.yMax;
    const isEast = b.xMin >= a.xMax;
    const isWest = b.xMax <= a.xMin;

    if (xOverlap) { return isNorth ? 'N' : 'S'; }
    if (yOverlap) { return isEast ?  'E' : 'W'; }

    if (isNorth && isWest) { return 'NW'; }
    if (isNorth && isEast) { return 'NE'; }
    if (isSouth && isWest) { return 'SW'; }
    if (isSouth && isEast) { return 'SE'; }
  }

  function getOccupiedTiles(feature) {
    const footprint = feature.getFootprint();
    const position = feature.getPosition();
    const tiles = [];

    for (let y=0; y<footprint.length; y++) {
      for (let x=0; x<footprint[y].length; x++) {
        if (footprint[y][x]) { tiles.push({ x:x+position.x, y:y+position.y }); }
      }
    }

    return tiles;
  }

  // When the bounding boxes overlap we find the closest pair of tiles (one from each feature) and derive a direction
  // from that single pair.
  function closestTileAlignment(a, b) {
    const tilesA = getOccupiedTiles(a);
    const tilesB = getOccupiedTiles(b);
    let closestA, closestB, leastDistance = Infinity;

    tilesA.forEach(tileA => {
      tilesB.forEach(tileB => {
        const distance = ((tileA.x-tileB.x) ** 2) + ((tileA.y-tileB.y) ** 2);
        if (distance < leastDistance) {
          leastDistance = distance;
          closestA = tileA;
          closestB = tileB;
        }
      });
    });

    const dx = closestB.x - closestA.x;
    const dy = closestB.y - closestA.y;

    if (dx === 0) { return dy < 0 ? 'N' : 'S'; }
    if (dy === 0) { return dx > 0 ? 'E' : 'W'; }
    return (dy < 0 ? 'N' : 'S') + (dx > 0 ? 'E' : 'W');
  }

  return Object.freeze({
    digBetween,
  });
}
