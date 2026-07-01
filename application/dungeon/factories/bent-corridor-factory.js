global.BentCorridorFactory = function(originFeature, targetFeature, alignment) {
  const floor = DungeonSystem.getDungeonFloor();
  const grid = floor.getFloorGrid();

  // To find a bent path, we get all the start tiles for the origin and target features. For a SE alignment we get all
  // the edge tiles on the S and E sides of the origin, and all the tiles on the N and W sides of the target. We then
  // take every permutation of origin start tile and target end tile and draw an L shape between them. If there are no
  // collisions we add it to a list of possible solutions and pick one at random.
  function build() {
    console.log("=== Building Bent Corridor ===")

    const opposite = { N:'S', S:'N', E:'W', W:'E' };
    const originTiles = FloorFactorySupport.getStartTiles(originFeature, alignment[0]);
    const targetTiles = FloorFactorySupport.getStartTiles(targetFeature, opposite[alignment[0]]);
    const validPaths = [];

    if (alignment.length === 2) {
      originTiles.push(...FloorFactorySupport.getStartTiles(originFeature, alignment[1]))
      targetTiles.push(...FloorFactorySupport.getStartTiles(targetFeature, opposite[alignment[1]]));
    }

    originTiles.forEach(originTile => {
      targetTiles.forEach(targetTile => {
        const hPath = buildBentPath(originTile, targetTile, 'H');
        const vPath = buildBentPath(originTile, targetTile, 'V');
        if (hPath) { validPaths.push(hPath); }
        if (vPath) { validPaths.push(vPath); }
      });
    });

    if (validPaths.length > 0) {
      const path = Random.from(validPaths);
      const index = floor.getFeatures().length;
      const room = Room();

      if (path.corner) {
        setMainBox(room, path.start, path.corner);
        setSubBox(room, path.corner, path.end);
      }
      if (path.corner == null) {
        setMainBox(room, path.start, path.end);
      }

      const feature = Feature('corridor');
      const x = Math.min(path.start.x, path.end.x);
      const y = Math.min(path.start.y, path.end.y);

      feature.setPosition(x,y);
      feature.setIndex(index);
      feature.addRoom(room);

      return {
        feature,
        doors: [],
      }
    }
  }

  function setMainBox(room,start,end) {

  }

  function setSubBox(room,start,end) {

  }



  // A bent path starts at the start position, and moves one tile at a time (horizontally or vertically) until the
  // corner is reached, then it moves to the end position. If grid location along the path is already occupied this
  // path isn't valid and will return null. If an uninterrupted bent path exists this returns { start, corner, end }
  // where each value is an {x,y} position. Single tile and straight line corridors will only return { start, end }
  function buildBentPath(start, end, direction) {

    // A single tile corridor just has the start position.
    if (start.x === end.x && start.y === end.y) { return { start, end }; }

    const corner = (direction === 'H') ?
      { x: end.x, y: start.y }:
      { x: start.x, y: end.y };

    // We should already know that start and end are empty, but just in case...
    if (grid[start.y][start.x] != null) { return null; }
    if (grid[end.y][end.x] != null) { return null; }
    if (grid[corner.y][corner.x] != null)  { return null; }

    function step(n) {
      if (n > 0) { return 1 }
      if (n < 0) { return -1 }
      return 0;
    }

    function searchSegment(from, to) {
      const dx = step(to.x - from.x);
      const dy = step(to.y - from.y);
      let cursor = { x: from.x + dx, y: from.y + dy };

      while (cursor.x !== to.x || cursor.y !== to.y) {
        if (grid[cursor.y][cursor.x] != null) { return false; }
        cursor = { x: cursor.x + dx, y: cursor.y + dy };
      }

      return true;
    }

    if (searchSegment(start, corner) === false) { return null; }
    if (searchSegment(corner, end) === false)   { return null; }

    const sameX = start.x === corner.x && end.x === corner.x;
    const sameY = start.y === corner.y && end.y === corner.y;
    return (sameX || sameY) ? { start, end } : { start, corner, end };
  }

  return Object.freeze({
    build,
  });

}
