global.DungeonView = (function() {

  const stepTime = 250;

  let currentWalk = 0;
  let walking = false;

  function init() {
    DungeonViewport.init();
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

  // Walk the party through the path one room at a time on a steady beat, targeting the camera at each new room as
  // they go. Clicking a new destination mid-walk starts a fresh walk that supersedes this one, and escape abandons the
  // path outright. A random encounter also stops the party in the room that triggered it. This resolves false if the
  // party will never arrive.
  async function walkPath(path) {
    if (path == null) { return false; }
    if (path.length === 0) { return true; }

    const walkId = ++currentWalk;
    walking = true;

    for (const index of path) {
      const result = DungeonNavigationSystem.moveToRoom(index);
      DungeonFloorView.updateLocation(index, result.revealed);
      DungeonViewport.panTo(getCurrentRoom().getFloorCenter());
      await new Promise(resolve => setTimeout(resolve, stepTime));

      // A newer walk owns the party now; any encounter rolled on this step is quietly forgotten.
      if (walkId !== currentWalk) { return false; }

      if (result.encounter) {
        walking = false;
        DungeonSystem.startRandomEncounter();
        return false;
      }
    }

    walking = false;
    return true;
  }

  function isWalking() {
    return walking;
  }

  function stopWalking() {
    currentWalk += 1;
    walking = false;
  }

  return Object.freeze({
    init,
    show,
    drawDungeon,
    isWalking,
    stopWalking,
  });

})();
