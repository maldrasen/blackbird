global.DungeonView = (function() {

  const stepTime = 250;

  function init() {
    DungeonViewport.init();
    X.onClick('#dungeonFloor .door', doorClicked);
    X.onClick('#dungeonFloor .door-pad', doorClicked);
    X.onClick('#dungeonFloor .stairs', stairsClicked);
    X.onClick('#dungeonFloor .room', roomClicked);
  }

  function show() {
    MainContent.setMainContent("views/dungeon.html");
    drawDungeon();
  }

  function drawDungeon() {
    DungeonFloorView.drawDungeon();
    DungeonViewport.reset();
    DungeonViewport.centerOn(getCurrentRoom().getFloorCenter());
  }

  function getCurrentRoom() {
    const floor = DungeonSystem.getDungeonFloor();
    return floor.getRooms()[floor.getLocation()];
  }

  function roomClicked(event) {
    if (DungeonViewport.didDrag()) { return; }
    if (event.target.closest('.stairs')) { return; }

    const index = parseInt(event.target.closest('.room').dataset.index);
    walkPath(DungeonNavigationSystem.getPathToRoom(index));
  }

  async function stairsClicked(event) {
    if (DungeonViewport.didDrag()) { return; }

    const stairsElement = event.target.closest('.stairs');
    const direction = stairsElement.dataset.direction;
    const roomIndex = parseInt(stairsElement.closest('.room').dataset.index);
    const path = DungeonNavigationSystem.getPathToRoom(roomIndex);
    const arrived = await walkPath(path);
    if (arrived === false) { return; }

    (direction === 'up') ? DungeonSystem.goUpStairs() : DungeonSystem.goDownStairs();

    if (GameSystem.getState().getGameMode() === GameMode.dungeon) { drawDungeon(); }
  }

  function doorClicked(event) {
    if (DungeonViewport.didDrag()) { return; }

    const doorElement = event.target.closest('.door, .door-pad');
    walkPath(DungeonNavigationSystem.getPathThroughDoor(
      parseInt(doorElement.dataset.from),
      parseInt(doorElement.dataset.to)));
  }

  // Walk the party through the features in the path one room at a time on a steady beat, pointing the camera at each
  // new room as they go — the camera chases the party on its own and is never waited on. The halt cover blocks user
  // interaction until the party arrives. A random encounter stops the party in the room that triggered it, abandoning
  // the rest of the path, so this resolves false when the party never arrived.
  async function walkPath(path) {
    if (path == null) { return false; }

    if (path.length > 0) {
      MainContent.halt();

      for (const index of path) {
        const result = DungeonNavigationSystem.moveToRoom(index);
        DungeonFloorView.updateLocation(index, result.revealed);
        DungeonViewport.panTo(getCurrentRoom().getFloorCenter());
        await new Promise(resolve => setTimeout(resolve, stepTime));

        if (result.encounter) {
          MainContent.unhalt();
          DungeonSystem.startRandomEncounter();
          return false;
        }
      }

      MainContent.unhalt();
    }

    return true;
  }

  return Object.freeze({
    init,
    show,
    drawDungeon,
  });

})();
