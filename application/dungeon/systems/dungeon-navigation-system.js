global.DungeonNavigationSystem = (function() {

  function getAdjacentFeatureIndices(index) {
    const adjacent = new Set();

    DungeonSystem.getDungeonFloor().getDoors().forEach(door => {
      if (door.getFrom() === index) { adjacent.add(door.getTo()); }
      if (door.getTo() === index) { adjacent.add(door.getFrom()); }
    });

    return [...adjacent].sort((a,b) => a-b);
  }

  function canMoveTo(index) {
    const currentIndex = DungeonSystem.getDungeonFloor().getLocation();
    return getAdjacentFeatureIndices(currentIndex).includes(index);
  }

  // Every move rolls for a random encounter, so the move result tells the caller whether a battle breaks out in the
  // new room. The roll happens against the pre-move state — entering an unexplored room is dangerous, backtracking
  // through rooms we've already seen is much safer.
  // TODO: The encounter rates should come from the dungeon theme once themes define them.
  function moveToFeature(index) {
    const floor = DungeonSystem.getDungeonFloor();

    if (canMoveTo(index) === false) {
      throw new Error(`Cannot move to feature ${index} from feature ${floor.getLocation()}`);
    }

    const chance = floor.isRevealed(index) ? 2 : 20;
    const encounter = Random.roll(100) < chance;

    floor.setLocation(index);

    return { encounter };
  }

  // A breadth first search through the revealed features, returning the path as the indices of the features to step
  // through, not including the starting feature. Returns null when no path exists.
  function findPath(fromIndex, toIndex) {
    const floor = DungeonSystem.getDungeonFloor();

    if (fromIndex === toIndex) { return []; }

    const cameFrom = new Map([[fromIndex, null]]);
    const queue = [fromIndex];

    while (queue.length > 0) {
      const current = queue.shift();

      for (const neighbor of getAdjacentFeatureIndices(current)) {
        if (cameFrom.has(neighbor)) { continue; }
        if (floor.isRevealed(neighbor) === false) { continue; }

        cameFrom.set(neighbor, current);
        if (neighbor === toIndex) { return buildPath(cameFrom, toIndex); }
        queue.push(neighbor);
      }
    }

    return null;
  }

  function buildPath(cameFrom, toIndex) {
    const path = [];

    let step = toIndex;
    while (cameFrom.get(step) != null) {
      path.unshift(step);
      step = cameFrom.get(step);
    }

    return path;
  }

  function getPathToFeature(index) {
    return findPath(DungeonSystem.getDungeonFloor().getLocation(), index);
  }

  // Clicking a door means walking to its near side and stepping through it. The near side is whichever side is fewer
  // rooms away; an unrevealed side can never be pathed to, so it's always the far side.
  function getPathThroughDoor(from, to) {
    const currentIndex = DungeonSystem.getDungeonFloor().getLocation();
    const pathToFrom = findPath(currentIndex, from);
    const pathToTo = findPath(currentIndex, to);

    if (pathToFrom == null && pathToTo == null) { return null; }
    if (pathToFrom == null) { return [...pathToTo, from]; }
    if (pathToTo == null) { return [...pathToFrom, to]; }

    return (pathToFrom.length <= pathToTo.length) ? [...pathToFrom, to] : [...pathToTo, from];
  }

  return Object.freeze({
    getAdjacentFeatureIndices,
    canMoveTo,
    moveToFeature,
    findPath,
    getPathToFeature,
    getPathThroughDoor,
  });

})();
