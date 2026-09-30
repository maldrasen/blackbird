// What came of a single step through the dungeon. A blocked step only says that the party didn't move. The door is
// only set when the step opened one, and it's kept as the wall the door is on rather than the door itself, so that
// the door is always read fresh from the floor.
global.StepResult = function({ moved, position=null, doorPosition=null, doorDirection=null, enteredRoom=null,
  revealed=false, episode=null, trap=null, foundTraps=[], encounter=false }) {

  const floor = DungeonSystem.getDungeonFloor();

  function getOpenedDoor() {
    return doorPosition ? floor.getDoorAt(doorPosition.x, doorPosition.y, doorDirection) : null;
  }

  function getTrap() {
    return trap ? { ...trap, position:{ ...trap.position } } : null;
  }

  return {
    hasMoved: () => { return moved; },
    getPosition: () => { return position ? { ...position } : null; },
    hasOpenedDoor: () => { return doorPosition != null; },
    getOpenedDoor,
    getEnteredRoom: () => { return enteredRoom; },
    hasRevealedRoom: () => { return revealed; },
    getEpisode: () => { return episode; },
    getTrap,
    getFoundTraps: () => { return foundTraps.map(tile => ({ ...tile })); },
    hasEncounter: () => { return encounter; },
  }
}
