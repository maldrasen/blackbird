global.TileContentPlacer = function() {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());
  // const available = (contents || theme.getRoomContents()).filter(entry => isInRange(entry));


  function placeContents() {
    console.log("=== Place Contents ===");
    getEligibleRooms();
  }

  function getEligibleRooms() {
    return floor.getRooms().filter(room => room.canHaveTileContents());
  }

  return { placeContents };

}