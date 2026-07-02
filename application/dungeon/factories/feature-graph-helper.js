global.FeatureGraphHelper = (function() {

  // Finding the closest disconnected features requires comparing every feature in every tree against every feature in
  // every other tree, and returning the two indices of the closest pair. The blacklist is an optional set of feature
  // pair keys already known to be unconnectable, skipped when scanning for the closest pair. This returns null if
  // every candidate pair is blacklisted. (Which would be a fatal condition in the floor generation.)
  function getClosestDisconnectedFeatures(forest, blacklist=new Set()) {
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
            if (blacklist.has(pairKey(a,b))) { return; }

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

    return (first != null) ? [first,second] : null;
  }

  // A canonical, order-independent key for a pair of feature indices.
  function pairKey(a,b) {
    return (a < b) ? `${a}-${b}` : `${b}-${a}`;
  }

  function boxDistance(a, b) {
    const dx = Math.max(0, Math.max(a.xMin - b.xMax, b.xMin - a.xMax));
    const dy = Math.max(0, Math.max(a.yMin - b.yMax, b.yMin - a.yMax));
    return Math.round(Math.sqrt((dx * dx) + (dy * dy)));
  }

  return Object.freeze({
    getClosestDisconnectedFeatures,
    pairKey,
  });

})();
