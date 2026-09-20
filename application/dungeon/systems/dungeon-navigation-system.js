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

    const entry = enterRoom(index);
    const encounterRate = DungeonTheme.lookup(floor.getTheme()).getEncounterRate(entry.isFirstVisit);
    const encounter = entry.episode == null && Random.roll(100) < encounterRate * Difficulty.getEncounterFactor();

    floor.setLocation(index);

    return { encounter, revealed:entry.revealed, episode:entry.episode, trap:entry.trap };
  }

  // Everything that happens as the party crosses into a room, which has to be worked out before the party is moved
  // because moving them marks the room as visited. A room is only scouted the first time it's entered, which is also
  // the only time its trap can be sprung or its episode can start.
  function enterRoom(index) {
    const floor = DungeonSystem.getDungeonFloor();
    const room = floor.getRooms()[index];
    const isFirstVisit = floor.isVisited(index) === false;
    const revealed = floor.isRevealed(index) === false;
    if (isFirstVisit) { scoutRoom(room); }

    const episode = isFirstVisit ? getRoomEpisode(room) : null;
    const trap = isFirstVisit ? TrapSystem.springTrap(room) : null;
    GameSystem.getState().advanceGameTime(isFirstVisit ? exploreTime : backtrackTime);

    return { enteredRoom:index, isFirstVisit, revealed, episode, trap };
  }

  function scoutRoom(room) {
    room.setScoutingRoll(SkillCheck(PartyConfiguration.getScout(), 'scouting').value);
  }

  function getRoomEpisode(room) {
    if (room.hasContents() === false) { return null; }
    return RoomContents.lookup(room.getContents()).getAvailableEpisode();
  }

  // ===================
  //    Grid Movement
  // ===================

  // Doors live on the north or west wall of a tile, so a step to the south or east finds its door on the tile being
  // stepped onto rather than on the tile being left.
  const headings = {
    north:     { x:0,  y:-1, wall:'N', doorOnTarget:false },
    south:     { x:0,  y:1,  wall:'N', doorOnTarget:true },
    west:      { x:-1, y:0,  wall:'W', doorOnTarget:false },
    east:      { x:1,  y:0,  wall:'W', doorOnTarget:true },
    northeast: { x:1,  y:-1 },
    northwest: { x:-1, y:-1 },
    southeast: { x:1,  y:1 },
    southwest: { x:-1, y:1 },
  };

  // Find where a step from a tile would lead, returning the tile stepped onto and the door passed through on the
  // way (if there was one), or null when the way is blocked. Nothing moves. The position is a parameter rather than
  // the party's own so that a path can be searched for from any tile.
  function findStep(position, direction) {
    const heading = headings[direction];
    if (heading == null) { throw new Error(`Bad direction [${direction}]`); }

    return (heading.wall == null) ? findDiagonalStep(position, heading) : findCardinalStep(position, heading);
  }

  // A step between two tiles of the same room is always open. A step between rooms needs a door in the wall.
  function findCardinalStep(position, heading) {
    const floor = DungeonSystem.getDungeonFloor();
    const target = { x:position.x + heading.x, y:position.y + heading.y };
    const toRoom = floor.getRoomIndexAt(target.x, target.y);
    if (toRoom == null) { return null; }

    const doorTile = heading.doorOnTarget ? target : position;
    const door = floor.getDoorAt(doorTile.x, doorTile.y, heading.wall);
    if (door == null && toRoom !== floor.getRoomIndexAt(position.x, position.y)) { return null; }

    return { position:target, door };
  }

  // A diagonal step passes through the corner point shared by four tiles: the tile being left, the tile being
  // stepped onto, and the two tiles beside them. It's only open when one room owns all four, because then no wall
  // or door can touch that corner. This keeps diagonal steps from cutting corners or slipping past doors.
  function findDiagonalStep(position, heading) {
    const floor = DungeonSystem.getDungeonFloor();
    const room = floor.getRoomIndexAt(position.x, position.y);
    const target = { x:position.x + heading.x, y:position.y + heading.y };
    const corner = [target, { x:target.x, y:position.y }, { x:position.x, y:target.y }];

    if (room == null) { return null; }
    if (corner.some(tile => floor.getRoomIndexAt(tile.x, tile.y) !== room)) { return null; }

    return { position:target, door:null };
  }

  function canStep(direction) {
    return findStep(getPartyPosition(), direction) != null;
  }

  const stayedInRoom = Object.freeze({ enteredRoom:null, isFirstVisit:false, revealed:false, episode:null, trap:null });

  // Move the party a single step, opening the door if they pass through one. Nothing happens when the way is blocked.
  function step(direction) {
    const floor = DungeonSystem.getDungeonFloor();
    const from = getPartyPosition();
    const found = findStep(from, direction);
    if (found == null) { return { moved:false }; }

    const { position, door } = found;
    const openedDoor = (door != null && door.open === false) ? door : null;
    if (openedDoor) { openedDoor.open = true; }

    const fromRoom = floor.getRoomIndexAt(from.x, from.y);
    const toRoom = floor.getRoomIndexAt(position.x, position.y);
    const { isFirstVisit, ...entry } = (toRoom === fromRoom) ? stayedInRoom : enterRoom(toRoom);
    const encounter = rollEncounter(isFirstVisit, entry.episode);

    floor.setPartyPosition(position.x, position.y);

    return { moved:true, position, openedDoor, ...entry, encounter };
  }

  // Walking into a room for the first time is when the party is most likely to be ambushed, unless the room has an
  // episode of its own to play out. Every other step only carries a slight chance of a wandering encounter, low
  // enough that it needs a finer roll than a percentage.
  function rollEncounter(isFirstVisit, episode) {
    const theme = DungeonTheme.lookup(DungeonSystem.getDungeonFloor().getTheme());
    const factor = Difficulty.getEncounterFactor();

    if (episode != null) { return false; }
    if (isFirstVisit) { return Random.roll(100) < theme.getNewRoomEncounterRate() * factor; }
    return Random.roll(1000) < theme.getStepEncounterRate() * 10 * factor;
  }

  function getPartyPosition() {
    const position = DungeonSystem.getDungeonFloor().getPartyPosition();
    if (position == null) { throw new Error('The party has not been placed on the floor.'); }
    return position;
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
    findStep,
    canStep,
    step,
    getPathToRoom,
    getPathThroughDoor,
  };

})();
