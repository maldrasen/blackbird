global.DungeonViewport = (function() {

  let $dragContext;
  let $currentLocation = { x:0, y:0 };

  function init() {
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', event => {
      if (event.target.closest('#dungeonViewport')) { startDrag(); }
    });
  }

  function isDragging() {
    return $dragContext != null;
  }

  function startDrag() {
    const position = MouseMonitor.getPosition();

    $dragContext = {
      startLocation: getLocation(),
      origin: {
        x: position.x,
        y: position.y,
      },
    }
  }

  function onMove(event) {
    if (isDragging()) {
      if (event.buttons === 0) { return stopDrag(); }

      const position = MouseMonitor.getPosition();
      const windowDimensions = X.windowDimensions()

      if (position.x < 0) { return stopDrag(); }
      if (position.y < 0) { return stopDrag(); }
      if (position.x > windowDimensions.width) { return stopDrag(); }
      if (position.y > windowDimensions.height) { return stopDrag(); }

      // TODO: Prevent dragging the dungeon out of view.

      setLocation({
        x: $dragContext.startLocation.x + position.x - $dragContext.origin.x,
        y: $dragContext.startLocation.y + position.y - $dragContext.origin.y,
      });
    }
  }

  function stopDrag() {
    $dragContext = null;
  }

  function getLocation() {
    return { ...$currentLocation };
  }

  function setLocation(position) {
    $currentLocation.x = position.x;
    $currentLocation.y = position.y;
    X.first('#dungeonFloor').setAttribute(`style`,`top:${$currentLocation.y}px;left:${$currentLocation.x}px`);
  }

  return Object.freeze({
    init,
    isDragging,
    startDrag,
    onMove,
    stopDrag,
    getLocation,
    setLocation,
  });

})();
