global.DoglegCorridorFactory = function(originFeature, targetFeature, alignment) {

  function build() {
    const opposite = { N:'S', S:'N', E:'W', W:'E' };
    const cardinalDirection = pickDirection();

    if (cardinalDirection) {
      const originTiles = FloorFactorySupport.getStartTiles(originFeature, cardinalDirection);
      const targetTiles = FloorFactorySupport.getStartTiles(targetFeature, opposite[cardinalDirection]);
      const validPaths = [];

      originTiles.forEach(start => {
        targetTiles.forEach(end => {
          const path = buildPath(start, end, cardinalDirection);
          if (validatePath(path)) {
            validPaths.push(path);
          }
        });
      });

      if (validPaths.length > 0) {
        const path = Random.from(validPaths);
        const feature = buildFeature(path);
        const doorTiles = [
          { point:path[0][0], feature:originFeature },
          { point:path[2][1], feature:targetFeature },
        ];

        return { feature, doorTiles };
      }
    }
  }

  function buildFeature(path) {
    const room = Room();

    path.forEach(segment => {
      FloorFactorySupport.addSegment(room, segment[0], segment[1]);
    });

    const start = path[0][0];
    const end = path[2][1];
    const feature = Feature('corridor');

    feature.setPosition(Math.min(start.x,end.x), Math.min(start.y,end.y));
    feature.addRoom(room);

    return feature;
  }

  function validatePath(path) {
    for (let i=0; i<path.length; i++) {
      if (FloorFactorySupport.segmentIsClear(path[i][0], path[i][1]) === false) { return false; }
    }
    return true;
  }

  function buildPath(start, end, direction) {
    let firstTurn;
    let secondTurn;

    if (direction === 'N') {
      const legLength = 1 + Random.roll(start.y - end.y - 2);
      firstTurn = { x:start.x, y:start.y - legLength };
      secondTurn = { x:end.x, y:firstTurn.y };
    }
    if (direction === 'S') {
      const legLength = 1 + Random.roll(end.y - start.y - 2);
      firstTurn = { x:start.x, y:start.y + legLength };
      secondTurn = { x:end.x, y:firstTurn.y };
    }
    if (direction === 'E') {
      const legLength = 1 + Random.roll(end.x - start.x - 2);
      firstTurn = { x:start.x + legLength, y:start.y };
      secondTurn = { x:firstTurn.x, y:end.y };
    }
    if (direction === 'W') {
      const legLength = 1 + Random.roll(start.x - end.x - 2);
      firstTurn = { x:start.x - legLength, y:start.y };
      secondTurn = { x:firstTurn.x, y:end.y };
    }

    return [[start,firstTurn],[firstTurn,secondTurn],[secondTurn,end]];
  }

  // If the alignment is an ordinal direction (like NE) we want to choose one of the cardinal directions instead.
  // If there isn't a wide enough gap between the origin and the target features, this function returns null. When
  // there is a large enough gap we set the alignment in the direction of the larger gap between the features.
  function pickDirection() {
    if (alignment.length === 1) {
      return (FloorFactorySupport.getGapBetweenFeatures(originFeature, targetFeature, alignment) >= 3) ? alignment : null;
    }

    const gap1 = FloorFactorySupport.getGapBetweenFeatures(originFeature, targetFeature, alignment[0]);
    const gap2 = FloorFactorySupport.getGapBetweenFeatures(originFeature, targetFeature, alignment[1]);
    if (Math.max(gap1,gap2) >= 3) {
      return (gap1 > gap2) ? alignment[0] : alignment[1];
    }
  }

  return Object.freeze({
    build,
  });

}
