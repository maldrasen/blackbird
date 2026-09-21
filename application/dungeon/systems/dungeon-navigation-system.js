global.DungeonNavigationSystem = (function() {
  const exploreTime = 1;
  const backtrackTime = 0.2;

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
    if (floor.canEnterTile(target.x, target.y) === false) { return null; }

    const doorTile = heading.doorOnTarget ? target : position;
    const door = floor.getDoorAt(doorTile.x, doorTile.y, heading.wall);
    if (door == null && toRoom !== floor.getRoomIndexAt(position.x, position.y)) { return null; }

    return { position:target, door };
  }

  // A diagonal step passes through the corner point shared by four tiles: the tile being left, the tile being
  // stepped onto, and the two tiles beside them. It's only open when one room owns all four, because then no wall
  // or door can touch that corner. This keeps diagonal steps from cutting corners or slipping past doors. All of
  // those tiles have to be enterable as well, so the party can't squeeze past the corner of something standing on
  // a tile either.
  function findDiagonalStep(position, heading) {
    const floor = DungeonSystem.getDungeonFloor();
    const room = floor.getRoomIndexAt(position.x, position.y);
    const target = { x:position.x + heading.x, y:position.y + heading.y };
    const corner = [target, { x:target.x, y:position.y }, { x:position.x, y:target.y }];

    if (room == null) { return null; }
    if (corner.some(tile => floor.getRoomIndexAt(tile.x, tile.y) !== room)) { return null; }
    if (corner.some(tile => floor.canEnterTile(tile.x, tile.y) === false)) { return null; }

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

  // TODO: The encounter rate could also be changed by items the party uses or events. Maybe they use something that
  //       makes them quieter, or they trip an alarm in an event. We'll need to add a property to the floor state that
  //       keeps track of dungeon conditions like this.

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

  return {
    findStep,
    canStep,
    step,
  };

})();
