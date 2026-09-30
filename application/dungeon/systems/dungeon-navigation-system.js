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

  // Move the party a single step, opening the door if they pass through one. Nothing happens when the way is blocked.
  // Whatever is on the tile stepped onto happens first, then the scout looks over the tiles around it, and only a
  // step that set nothing off risks an encounter. Whether this is the party's first visit to the room has to be
  // worked out before they're moved, because moving them marks the room as visited.
  function step(direction) {
    const floor = DungeonSystem.getDungeonFloor();
    const from = getPartyPosition();
    const step = Step(from, direction);
    const result = StepResult();

    if (step.canMove()) {
      const position = step.getPosition();
      const toRoom = floor.getRoomIndexAt(position.x, position.y);
      const isFirstVisit = floor.isVisited(toRoom) === false;

      result.setPosition(position);
      openDoor(step.getDoor(), result);

      if (toRoom !== floor.getRoomIndexAt(from.x, from.y)) { enterRoom(toRoom, isFirstVisit, result); }

      result.setTrap(TrapSystem.enterTile(position));
      result.setFoundTraps(ScoutingSystem.scoutAround(position));
      result.setEncounter(rollEncounter(isFirstVisit, result));

      floor.setPartyPosition(position.x, position.y);
    }

    return result;
  }

  // Only a closed door needs opening, and only a door that was opened is reported.
  function openDoor(door, result) {
    if (door == null || door.open) { return; }

    DungeonSystem.getDungeonFloor().openDoor(door.position.x, door.position.y, door.direction);
    result.setOpenedDoor(door);
  }

  // TODO: The encounter rate could also be changed by items the party uses or events. Maybe they use something that
  //       makes them quieter, or they trip an alarm in an event. We'll need to add a property to the floor state that
  //       keeps track of dungeon conditions like this.

  // Walking into a room for the first time is when the party is most likely to be ambushed, unless the room has an
  // episode of its own to play out or the step set off a trap. Every other step only carries a slight chance of a
  // wandering encounter, low enough that it needs a finer roll than a percentage.
  function rollEncounter(isFirstVisit, result) {
    const theme = DungeonTheme.lookup(DungeonSystem.getDungeonFloor().getTheme());
    const factor = Difficulty.getEncounterFactor();

    if (result.getEpisode() != null || result.getTrap() != null) { return false; }
    if (isFirstVisit) { return Random.roll(100) < theme.getNewRoomEncounterRate() * factor; }
    return Random.roll(1000) < theme.getStepEncounterRate() * 10 * factor;
  }

  function getPartyPosition() {
    const position = DungeonSystem.getDungeonFloor().getPartyPosition();
    if (position == null) { throw new Error('The party has not been placed on the floor.'); }
    return position;
  }

  // Everything that happens as the party crosses into a room. A room is only scouted the first time it's entered,
  // which is also the only time its episode can start.
  function enterRoom(index, isFirstVisit, result) {
    const floor = DungeonSystem.getDungeonFloor();
    const room = floor.getRooms()[index];

    result.setEnteredRoom(index);
    result.setRevealedRoom(floor.isRevealed(index) === false);

    if (isFirstVisit) {
      scoutRoom(room);
      result.setEpisode(getRoomEpisode(room));
    }

    GameSystem.getState().advanceGameTime(isFirstVisit ? exploreTime : backtrackTime);
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
