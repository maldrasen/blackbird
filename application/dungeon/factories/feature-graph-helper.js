global.FeatureGraphHelper = (function() {

  // Finding the closest disconnected features is a two step process. First we go through the spanning forest, finding
  // the two disconnected trees that are closest to each other. We then search through every node in the two trees,
  // finding the two rooms that are closest to each other. This function returns the two indices of the features.
  function getClosestDisconnectedFeatures(forest) {
    const [first, second] = findClosestIslands(forest);
    return findClosestFeatures(forest[first], forest[second]);
  }

  function findClosestFeatures(treeA, treeB) {
    const features = DungeonSystem.getDungeonFloor().getFeatures();
    const vertsA = treeA.getVertices();
    const vertsB = treeB.getVertices();
    const featuresA = vertsA.map(i => features[i].getLocation());
    const featuresB = vertsB.map(i => features[i].getLocation());

    let leastDistance = 10000;
    let first;
    let second;

    for (let a=0; a<featuresA.length; a++) {
      for (let b=0; b<featuresB.length; b++) {
        const distance = boxDistance(featuresA[a], featuresB[b]);

        if (distance < leastDistance) {
          leastDistance = distance;
          first = vertsA[a];
          second = vertsB[b];
        }
      }
    }

    return [first,second];
  }

  function findClosestIslands(forest) {
    const bounds = forest.map(tree => tree.getBounds());

    let leastDistance = 10000;
    let first;
    let second;

    for (let i=0; i<forest.length; i++) {
      for (let j=0; j<forest.length; j++) {
        if (i !== j) {
          const distance = boxDistance(bounds[i], bounds[j]);
          if (distance < leastDistance) {
            leastDistance = distance;
            first = i;
            second = j;
          }
        }
      }
    }

    return [first,second];
  }

  function boxDistance(a, b) {
    const dx = Math.max(0, Math.max(a.xMin - b.xMax, b.xMin - a.xMax));
    const dy = Math.max(0, Math.max(a.yMin - b.yMax, b.yMin - a.yMax));
    return Math.round(Math.sqrt((dx * dx) + (dy * dy)));
  }

  return Object.freeze({
    getClosestDisconnectedFeatures,
  });

})();
