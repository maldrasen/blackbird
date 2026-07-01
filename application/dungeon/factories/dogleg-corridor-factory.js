global.DoglegCorridorFactory = function(originFeature, targetFeature, alignment) {
  const floor = DungeonSystem.getDungeonFloor();
  const grid = floor.getFloorGrid();

  function build() {
    const opposite = { N:'S', S:'N', E:'W', W:'E' };
    const cardinalDirection = pickDirection();

    if (cardinalDirection) {
      const originTiles = FloorFactorySupport.getStartTiles(originFeature, cardinalDirection);
      const targetTiles = FloorFactorySupport.getStartTiles(targetFeature, opposite[cardinalDirection]);
      const validPaths = [];

      console.log(`=== Building Dogleg Corridor (${cardinalDirection}) ===`);
      console.log("Origin Tiles:",originTiles);
      console.log("Target Tiles:",targetTiles);
    }
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
