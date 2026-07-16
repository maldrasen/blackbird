global.DungeonNavigationSystem = (function() {

  function canMoveTo(index) {
    const currentIndex = DungeonSystem.getDungeonFloor().getLocation();
    return getAdjacentRoomIndices(currentIndex).includes(index);
  }

  function getAdjacentRoomIndices(index) {
    const adjacent = new Set();

    DungeonSystem.getDungeonFloor().getDoors().forEach(door => {
      if (door.from === index) { adjacent.add(door.to); }
      if (door.to === index) { adjacent.add(door.from); }
    });

    return [...adjacent].sort((a,b) => a-b);
  }

  // TODO: When entering a new room, we need to read the room's contents to actually determine what happens on
  //       entering a new room. It's sometimes a battle, sometimes an event, sometimes we want to print a description,
  //       or nothing may happen. Since we don't have any room contents yet, we're simply starting a battle sometimes,
  //       though this is a temporary behavior.
  //
  // TODO: When backtracking through the revealed rooms though we do want to keep this slim chance of a random
  //       encounter. This random encounter rate should come from the dungeon theme. This base encounter rate could
  //       also by changed by items the party uses or events. Maybe they use something that makes them quieter, or
  //       they trip an alarm in an event. We'll need to add a property to the floor state that keeps track of dungeon
  //       conditions like this.
  //
  // TODO: Moving from room to room should also advance the game time. Opening a new room should take at least a
  //       minute. Backtracking could be faster but then game time would have to become a float. The minimum time
  //       anything can take is a minute. Would that really be a problem if we allow for more granular time? We could
  //       still save the time as an int, as the extra seconds don't really matter.
  //
  function moveToRoom(index) {
    const floor = DungeonSystem.getDungeonFloor();

    if (canMoveTo(index) === false) {
      throw new Error(`Cannot move to room ${index} from room ${floor.getLocation()}`);
    }

    const revealed = floor.isRevealed(index) === false;
    const encounter = Random.roll(100) < (revealed ? 20 : 2);

    floor.setLocation(index);

    return { encounter, revealed };
  }

  // =============
  //    Pathing
  // =============

  function getPathToRoom(index) {
    return findPath(DungeonSystem.getDungeonFloor().getLocation(), index);
  }

  function getPathThroughDoor(from, to) {
    const currentIndex = DungeonSystem.getDungeonFloor().getLocation();
    const pathToFrom = findPath(currentIndex, from);
    const pathToTo = findPath(currentIndex, to);

    if (pathToFrom == null && pathToTo == null) { return null; }
    if (pathToFrom == null) { return [...pathToTo, from]; }
    if (pathToTo == null) { return [...pathToFrom, to]; }

    return (pathToFrom.length <= pathToTo.length) ? [...pathToFrom, to] : [...pathToTo, from];
  }

  // A breadth first search through the revealed rooms, returning the path as the indices of the rooms to step
  // through, not including the starting room.
  function findPath(fromIndex, toIndex) {
    const floor = DungeonSystem.getDungeonFloor();

    if (fromIndex === toIndex) { return []; }

    const cameFrom = new Map([[fromIndex, null]]);
    const queue = [fromIndex];

    while (queue.length > 0) {
      const current = queue.shift();

      for (const neighbor of getAdjacentRoomIndices(current)) {
        if (cameFrom.has(neighbor)) { continue; }
        if (floor.isRevealed(neighbor) === false) { continue; }

        cameFrom.set(neighbor, current);
        if (neighbor === toIndex) { return buildPath(cameFrom, toIndex); }
        queue.push(neighbor);
      }
    }
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

  return Object.freeze({
    canMoveTo,
    getAdjacentRoomIndices,
    moveToRoom,
    getPathToRoom,
    getPathThroughDoor,
  });

})();
