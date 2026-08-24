global.DungeonNavigationSystem = (function() {
  const exploreTime = 1;
  const backtrackTime = 0.2;

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

  function getDoorInDirection(direction) {
    const floor = DungeonSystem.getDungeonFloor();
    const current = floor.getLocation();
    const matches = {
      north: door => door.direction === 'N' && door.from === current,
      south: door => door.direction === 'N' && door.to === current,
      west:  door => door.direction === 'W' && door.from === current,
      east:  door => door.direction === 'W' && door.to === current,
    }[direction];

    if (matches == null) { throw new Error(`Bad direction [${direction}]`); }

    return floor.getDoors().filter(matches).sort((a,b) =>
      (a.position.x - b.position.x) || (a.position.y - b.position.y))[0] || null;
  }

  // TODO: The encounter rate could also be changed by items the party uses or events. Maybe they use something that
  //       makes them quieter, or they trip an alarm in an event. We'll need to add a property to the floor state that
  //       keeps track of dungeon conditions like this.

  function moveToRoom(index) {
    const floor = DungeonSystem.getDungeonFloor();

    if (canMoveTo(index) === false) {
      throw new Error(`Cannot move to room ${index} from room ${floor.getLocation()}`);
    }

    const newRoom = floor.isRevealed(index) === false;
    const episode = newRoom ? getRoomEpisode(floor.getRooms()[index]) : null;
    const encounterRate = DungeonTheme.lookup(floor.getTheme()).getEncounterRate(newRoom);
    const encounter = episode == null && Random.roll(100) < encounterRate * Difficulty.getEncounterFactor();

    floor.setLocation(index);
    GameSystem.getState().advanceGameTime(newRoom ? exploreTime : backtrackTime);

    return { encounter, revealed:newRoom, episode };
  }

  function getRoomEpisode(room) {
    if (room.hasContents() === false) { return null; }
    return RoomContents.lookup(room.getContents()).getEpisode() || null;
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

  return {
    canMoveTo,
    getAdjacentRoomIndices,
    getDoorInDirection,
    moveToRoom,
    getPathToRoom,
    getPathThroughDoor,
  };

})();
