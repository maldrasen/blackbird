global.DungeonNavigationSystem = (function() {
  const exploreTime = 1;
  const backtrackTime = 0.2;

  function canStep(direction) {
    return Step(getPartyPosition(), direction).canMove();
  }

  // The tiles a single step from a position could land on, which is what the party can reach next and what the
  // scout looks over as they arrive.
  function getReachableTiles(position) {
    return Object.keys(DungeonConstants.headings).
      map(direction => Step(position, direction)).
      filter(step => step.canMove()).
      map(step => step.getPosition());
  }

  const stayedInRoom = Object.freeze({ enteredRoom:null, isFirstVisit:false, revealed:false, episode:null });

  // Move the party a single step, opening the door if they pass through one. Nothing happens when the way is blocked.
  // Whatever is on the tile stepped onto happens first, then the scout looks over the tiles around it, and only a
  // step that set nothing off risks an encounter.
  function step(direction) {
    const floor = DungeonSystem.getDungeonFloor();
    const from = getPartyPosition();
    const found = Step(from, direction);
    if (found.canMove() == false) { return StepResult({ moved:false }); }

    const position = found.getPosition();
    const opened = openDoor(found.getDoor());

    const fromRoom = floor.getRoomIndexAt(from.x, from.y);
    const toRoom = floor.getRoomIndexAt(position.x, position.y);
    const { isFirstVisit, ...entry } = (toRoom === fromRoom) ? stayedInRoom : enterRoom(toRoom);
    const trap = TrapSystem.enterTile(position);
    const foundTraps = ScoutingSystem.scoutAround(position);
    const encounter = rollEncounter(isFirstVisit, entry.episode, trap);

    floor.setPartyPosition(position.x, position.y);

    return StepResult({ moved:true, position, ...opened, ...entry, trap, foundTraps, encounter });
  }

  // Only a closed door needs opening, and only a door that was opened is reported.
  function openDoor(door) {
    if (door == null || door.open) { return {}; }

    DungeonSystem.getDungeonFloor().openDoor(door.position.x, door.position.y, door.direction);
    return { doorPosition:{ ...door.position }, doorDirection:door.direction };
  }

  // TODO: The encounter rate could also be changed by items the party uses or events. Maybe they use something that
  //       makes them quieter, or they trip an alarm in an event. We'll need to add a property to the floor state that
  //       keeps track of dungeon conditions like this.

  // Walking into a room for the first time is when the party is most likely to be ambushed, unless the room has an
  // episode of its own to play out or the step set off a trap. Every other step only carries a slight chance of a
  // wandering encounter, low enough that it needs a finer roll than a percentage.
  function rollEncounter(isFirstVisit, episode, trap) {
    const theme = DungeonTheme.lookup(DungeonSystem.getDungeonFloor().getTheme());
    const factor = Difficulty.getEncounterFactor();

    if (episode != null || trap != null) { return false; }
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
  // the only time its episode can start.
  function enterRoom(index) {
    const floor = DungeonSystem.getDungeonFloor();
    const room = floor.getRooms()[index];
    const isFirstVisit = floor.isVisited(index) === false;
    const revealed = floor.isRevealed(index) === false;
    if (isFirstVisit) { scoutRoom(room); }

    const episode = isFirstVisit ? getRoomEpisode(room) : null;

    GameSystem.getState().advanceGameTime(isFirstVisit ? exploreTime : backtrackTime);

    return { enteredRoom:index, isFirstVisit, revealed, episode };
  }

  function scoutRoom(room) {
    room.setScoutingRoll(SkillCheck(PartyConfiguration.getScout(), 'scouting').value);
  }

  function getRoomEpisode(room) {
    if (room.hasContents() === false) { return null; }
    return RoomContents.lookup(room.getContents()).getAvailableEpisode();
  }

  return {
    canStep,
    getReachableTiles,
    step,
  };

})();
