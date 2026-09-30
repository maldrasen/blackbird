global.DungeonView = (function() {

  const walkStepTime = 200;
  const runStepTime = 100;

  let lastStepAt = 0;
  let resolving = false;
  let heldDirection = null;
  let running = false;
  let runTimer = null;

  // The repeats are asked for even though they're ignored, so that the dispatcher still keeps them from the browser.
  // Repeating arrow keys would scroll the page otherwise.
  function init() {
    DungeonViewport.init();
    KeyBindingDispatcher.register('dungeon', {
      isActive:isShowing, perform:pressDirection, release:releaseDirection, allowRepeat:true });
  }

  function show() {
    MainContent.setMainContent("views/templates/dungeon.html");
    DungeonControls.build();
    drawDungeon();
  }

  function close() {
    stopRun();
    DungeonPartyMarker.stop();
    DungeonCamera.stop();
    DungeonViewport.stopDrag();
  }

  function drawDungeon() {
    DungeonFloorView.drawDungeon();
    DungeonViewport.reset();
    DungeonViewport.centerOn(tileCenter(DungeonSystem.getDungeonFloor().getPartyPosition()));
    DungeonControls.refreshRoom();
  }

  // Taking the stairs up from the first level leaves the dungeon, so there may not be a floor left to draw.
  function floorChanged() {
    if (isShowing()) { drawDungeon(); }
  }

  function isShowing() {
    return GameSystem.getState().getGameMode() === GameMode.dungeon && X.first('#dungeonView') != null;
  }

  function tileCenter(position) {
    return { x:position.x + 0.5, y:position.y + 0.5 };
  }

  // A press is never ignored. It cuts short whatever is left of the step being animated and the new step plays
  // instead. The operating system's key repeats are ignored, because the pause before they start is too long. A key
  // that's still down once the walking step has finished breaks into a run instead, and a press in a new direction
  // during a run turns the run that way. Nothing gets through while a step's trap, episode, or encounter is waiting
  // to start.
  function pressDirection(direction, { repeat }) {
    if (repeat || resolving) { return; }

    clearTimeout(runTimer);
    heldDirection = direction;
    continueRun(takeStep(direction));
  }

  // Only the direction pressed last is tracked, so letting go of an earlier key while changing direction does nothing.
  function releaseDirection(direction) {
    if (direction === heldDirection) { stopRun(); }
  }

  function runStep() {
    if (isShowing() === false || resolving || WindowManager.isModalOpen()) { return stopRun(); }

    running = true;
    continueRun(takeStep(heldDirection));
  }

  // Running is for getting back across explored ground quickly. The key has to be pressed again to carry on past
  // anything that stops a run.
  function continueRun(result) {
    if (endsRun(result)) { return stopRun(); }
    runTimer = setTimeout(runStep, currentStepTime());
  }

  // A closed door is the only way into a room that hasn't been visited, so opening one covers entering an unexplored
  // room as well as coming into an explored room by a new way. The revealed check is only there for a room that was
  // opened up some other way. Spotting a trap stops the run as well, so that the next step onto it is a choice.
  function endsRun(result) {
    return result.hasMoved() === false
        || result.hasOpenedDoor()
        || result.hasRevealedRoom()
        || result.getFoundTraps().length > 0
        || resolving;
  }

  function stopRun() {
    clearTimeout(runTimer);
    runTimer = null;
    running = false;
    heldDirection = null;
  }

  function currentStepTime() {
    return running ? runStepTime : walkStepTime;
  }

  function isStepping() {
    return performance.now() - lastStepAt < currentStepTime();
  }

  // Take a single step and bring the view up to date with it. The controls are only rebuilt when there's something
  // new to show, on entering a room or on stepping onto or off of a tile with something on it, because rebuilding
  // them flashes the command buttons.
  function takeStep(direction) {
    const hadTileFeature = DungeonTileSystem.hasTileFeature();
    const result = DungeonNavigationSystem.step(direction);
    if (result.hasMoved() === false) { return result; }

    if (isStepping()) { DungeonPartyMarker.finishMove(); }

    lastStepAt = performance.now();
    DungeonPartyMarker.moveTo(result.getPosition(), currentStepTime());
    DungeonViewport.panTo(tileCenter(result.getPosition()));

    if (result.hasOpenedDoor()) {
      DungeonFloorView.openDoor(result.getOpenedDoor());
    }
    if (result.getEnteredRoom() != null || hadTileFeature || DungeonTileSystem.hasTileFeature()) {
      DungeonControls.refreshRoom();
    }

    refreshTrapGlyphs(result);

    if (result.getTrap() || result.getEpisode() || result.hasEncounter()) {
      resolveStep(result);
    }

    return result;
  }

  // A trap the scout just found gets its glyph, and a trap the party just stepped on has its glyph replaced with
  // the resolved one. Both happen on the tile straight away, while the marker is still on its way.
  function refreshTrapGlyphs(result) {
    const trap = result.getTrap();

    result.getFoundTraps().forEach(position => DungeonFloorView.refreshTileGlyph(position));
    if (trap) { DungeonFloorView.refreshTileGlyph(trap.position); }
  }

  // Whatever the step set off waits for the party to finish arriving on the tile before it starts.
  function resolveStep(result) {
    resolving = true;

    setTimeout(() => {
      resolving = false;
      if (isShowing()) { startStepEvent(result); }
    }, currentStepTime());
  }

  function startStepEvent(result) {
    if (result.getTrap()) { return showTrapResult(result.getTrap()); }
    if (result.getEpisode()) { return DungeonSystem.startRoomEpisode(result.getEpisode()); }
    if (result.hasEncounter()) { return DungeonSystem.startRandomEncounter(); }
  }

  // A disarmed trap is routine enough for an alert. A sprung one gets the overlay, because taking damage matters.
  function showTrapResult(trap) {
    if (trap.state === 'disarmed') { return showDisarmAlert(trap); }

    if (trap.damage > 0) {
      const card = X.first(`#dungeonControls .party-card[data-id='${trap.target}']`);
      if (card) { FlashSquare.flashDamage(card); }
      DungeonControls.refreshHealth();
    }
    RoomContentOverlay.open(trap);
  }

  function showDisarmAlert(trap) {
    Alert.show({
      title: trap.title,
      message: trap.text,
      position: AlertPosition.side,
      type: LogType.info,
      fadeTime: 4000,
    });
  }

  return {
    init,
    show,
    close,
    drawDungeon,
    floorChanged,
  };

})();
