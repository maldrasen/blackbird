global.FeatureGraphHelper = (function() {

  // Finding the closest disconnected rooms requires comparing every room in every tree against every room in every
  // other tree, and returning the two room indices of the closest pair. Distance is measured between the features
  // containing the rooms, since corridors are dug between features. The blacklist is an optional set of room pair
  // keys already known to be unconnectable, skipped when scanning for the closest pair. This returns null if every
  // candidate pair is blacklisted. (Which would be a fatal condition in the floor generation.)
  function getClosestDisconnectedRooms(forest, blacklist=new Set()) {
    const floor = DungeonSystem.getDungeonFloor();

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

            const distance = boxDistance(floor.getFeatureForRoom(a).getLocation(), floor.getFeatureForRoom(b).getLocation());

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

  // A canonical, order-independent key for a pair of room indices.
  function pairKey(a,b) {
    return (a < b) ? `${a}-${b}` : `${b}-${a}`;
  }

  function boxDistance(a, b) {
    const dx = Math.max(0, Math.max(a.xMin - b.xMax, b.xMin - a.xMax));
    const dy = Math.max(0, Math.max(a.yMin - b.yMax, b.yMin - a.yMax));
    return Math.round(Math.sqrt((dx * dx) + (dy * dy)));
  }

  return Object.freeze({
    getClosestDisconnectedRooms,
    pairKey,
  });

})();
