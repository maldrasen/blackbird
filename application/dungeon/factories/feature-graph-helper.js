global.FeatureGraphHelper = (function() {

  // Finding the closest disconnected features requires comparing every feature in every tree against every feature in
  // every other tree, and returning the two indices of the closest pair. There might be a more efficient way to do
  // this, but with a dungeon floor having at most around 100 features, doing 10,000 comparisons doesn't actually take
  // a noticeable amount of time.
  function getClosestDisconnectedFeatures(forest) {
    const features = DungeonSystem.getDungeonFloor().getFeatures();

    let leastDistance = 10000;
    let first;
    let second;

    for (let i=0; i<forest.length; i++) {
      for (let j=i+1; j<forest.length; j++) {
        const vertsA = forest[i].getVertices();
        const vertsB = forest[j].getVertices();

        vertsA.forEach(a => {
          vertsB.forEach(b => {
            const distance = boxDistance(features[a].getLocation(), features[b].getLocation());

            if (distance < leastDistance) {
              leastDistance = distance;
              first = a;
              second = b;
            }
          });
        });
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
