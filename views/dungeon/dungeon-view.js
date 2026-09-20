global.DungeonView = (function() {

  const stepTime = 160;

  let lastStepAt = 0;
  let resolving = false;

  function init() {
    DungeonViewport.init();
    KeyBindingDispatcher.register('dungeon', { isActive:isShowing, perform:stepInDirection, allowRepeat:true });
  }

  function show() {
    MainContent.setMainContent("views/templates/dungeon.html");
    DungeonControls.build();
    drawDungeon();
  }

  function close() {
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

  // Key presses can arrive far faster than the party can walk, from a held key especially, so steps are held to a
  // steady beat. Nothing gets through while a step's trap, episode, or encounter is waiting to start.
  function stepInDirection(direction) {
    if (resolving) { return; }
    if (performance.now() - lastStepAt < stepTime) { return; }
    takeStep(direction);
  }

  // Take a single step and bring the view up to date with it. The controls are only rebuilt when there's something
  // new to show, on entering a room or on stepping onto or off of a tile with something on it, because rebuilding
  // them flashes the command buttons.
  function takeStep(direction) {
    const hadTileFeature = DungeonTileSystem.hasTileFeature();
    const result = DungeonNavigationSystem.step(direction);
    if (result.moved === false) { return result; }

    lastStepAt = performance.now();
    DungeonPartyMarker.moveTo(result.position);
    DungeonViewport.panTo(tileCenter(result.position));

    if (result.openedDoor) {
      DungeonFloorView.openDoor(result.openedDoor);
    }
    if (result.enteredRoom != null) {
      DungeonFloorView.updateLocation(result.enteredRoom, result.revealed);
    }
    if (result.enteredRoom != null || hadTileFeature || DungeonTileSystem.hasTileFeature()) {
      DungeonControls.refreshRoom();
    }
    if (result.trap || result.episode || result.encounter) {
      resolveStep(result);
    }

    return result;
  }

  // Whatever the step set off waits for the party to finish arriving on the tile before it starts.
  function resolveStep(result) {
    resolving = true;

    setTimeout(() => {
      resolving = false;
      if (isShowing()) { startStepEvent(result); }
    }, stepTime);
  }

  function startStepEvent(result) {
    if (result.trap) { return showTrapResult(result.trap); }
    if (result.episode) { return DungeonSystem.startRoomEpisode(result.episode); }
    if (result.encounter) { return DungeonSystem.startRandomEncounter(); }
  }

  function showTrapResult(trap) {
    if (trap.damage > 0) {
      const card = X.first(`#dungeonControls .party-card[data-id='${trap.target}']`);
      if (card) {
        FlashSquare.flash({ element:card, color:'rgb(75,10,10)', duration:BattleConstants.damageEffectTime });
      }
    }
    RoomContentOverlay.open(trap);
  }

  return {
    init,
    show,
    close,
    drawDungeon,
    floorChanged,
    getStepTime: () => { return stepTime; },
  };

})();
