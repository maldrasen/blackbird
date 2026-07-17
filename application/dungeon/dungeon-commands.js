global.DungeonCommands = (function() {

  // This can be called from the console, so make sure that the floor actually exists. Though originally intended as a
  // debug command, this would also be a powerful spell effect, or perhaps some dungeon rooms have a map of the current
  // floor.
  function revealAll() {
    const floor = DungeonSystem.getDungeonFloor();
    if (floor) {
      floor.getRooms().forEach(room => floor.revealRoom(room.getIndex()));
      DungeonFloorView.drawDungeon();
    }
  }

  return Object.freeze({
    revealAll,
  })

})();
