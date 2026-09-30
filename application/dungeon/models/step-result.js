// What came of a single step through the dungeon, filled in by the navigation system as the step plays out. A new
// result is a blocked step: the party has moved once it's been given a position. The door is only set when the step
// opened one, and it's kept as the wall the door is on rather than the door itself, so that the door is always read
// fresh from the floor.
global.StepResult = function() {
  const floor = DungeonSystem.getDungeonFloor();

  let position = null;
  let doorPosition = null;
  let doorDirection = null;
  let enteredRoom = null;
  let revealedRoom = false;
  let episode = null;
  let trap = null;
  let foundTraps = [];
  let encounter = false;

  function setOpenedDoor(door) {
    doorPosition = { ...door.position };
    doorDirection = door.direction;
  }

  function getOpenedDoor() {
    return doorPosition ? floor.getDoorAt(doorPosition.x, doorPosition.y, doorDirection) : null;
  }

  function getTrap() {
    return trap ? { ...trap, position:{ ...trap.position } } : null;
  }

  return {
    hasMoved: () => { return position != null; },
    setPosition: value => { position = { ...value }; },
    getPosition: () => { return position ? { ...position } : null; },
    hasOpenedDoor: () => { return doorPosition != null; },
    setOpenedDoor,
    getOpenedDoor,
    setEnteredRoom: index => { enteredRoom = index; },
    getEnteredRoom: () => { return enteredRoom; },
    setRevealedRoom: value => { revealedRoom = value; },
    hasRevealedRoom: () => { return revealedRoom; },
    setEpisode: code => { episode = code; },
    getEpisode: () => { return episode; },
    setTrap: value => { trap = value; },
    getTrap,
    setFoundTraps: tiles => { foundTraps = tiles; },
    getFoundTraps: () => { return foundTraps.map(tile => ({ ...tile })); },
    setEncounter: value => { encounter = value; },
    hasEncounter: () => { return encounter; },
  }
}
