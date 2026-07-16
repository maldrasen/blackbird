global.DungeonViewport = (function() {

  const scaleSteps = [0.5, 0.75, 1, 1.5, 2];

  let dragContext;
  let dragMoved = false;
  let currentLocation = { x:0, y:0 };
  let currentScale = 1;

  function init() {
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', event => {
      if (event.target.closest('#dungeonViewport')) { startDrag(); }
    });
    window.addEventListener('wheel', event => {
      if (event.target.closest('#dungeonViewport')) { zoom(event.deltaY < 0 ? 1 : -1); }
    });
  }

  function isDragging() {
    return dragContext != null;
  }

  function startDrag() {
    DungeonCamera.stop();

    const position = MouseMonitor.getPosition();

    dragContext = {
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

      const dx = position.x - dragContext.origin.x;
      const dy = position.y - dragContext.origin.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) { dragContext.moved = true; }

      setLocation({
        x: dragContext.startLocation.x + dx,
        y: dragContext.startLocation.y + dy,
      });
    }
  }

  function stopDrag() {
    if (dragContext != null) { dragMoved = dragContext.moved === true; }
    dragContext = null;
  }

  // A click event still fires after dragging the viewport, so click handlers use this to tell an actual click apart
  // from the tail end of a drag.
  function didDrag() {
    return dragMoved;
  }

  function getLocation() {
    return { ...currentLocation };
  }

  function setLocation(position) {
    currentLocation.x = position.x;
    currentLocation.y = position.y;

    const floorElement = X.first('#dungeonFloor');
    floorElement.style['top'] = `${currentLocation.y}px`;
    floorElement.style['left'] = `${currentLocation.x}px`;
  }

  // Glide the camera over to center a tile position. The camera chases the target on its own; callers never wait
  // on it.
  function panTo(tilePosition) {
    DungeonCamera.moveTo(locationCentering(tilePosition));
  }

  // Center the viewport on a position given in tile coordinates.
  function centerOn(tilePosition) {
    setLocation(locationCentering(tilePosition));
  }

  // The floor location that puts the given tile position at the center of the viewport.
  function locationCentering(tilePosition) {
    const viewport = X.first('#dungeonViewport');
    const gridSize = DungeonFloorView.getGridSize();

    return {
      x: (viewport.clientWidth / 2) - (tilePosition.x * gridSize * currentScale),
      y: (viewport.clientHeight / 2) - (tilePosition.y * gridSize * currentScale),
    };
  }

  function zoom(step) {
    const index = scaleSteps.indexOf(currentScale) + step;
    if (index < 0 || index >= scaleSteps.length) { return; }
    setScale(scaleSteps[index]);
  }

  // Change the scale while keeping the point at the center of the viewport fixed in place. A moving camera's target
  // was computed for the old scale, so it stops rather than chase a stale location.
  function setScale(scale) {
    DungeonCamera.stop();

    const viewport = X.first('#dungeonViewport');
    const center = { x: viewport.clientWidth/2, y: viewport.clientHeight/2 };
    const factor = scale / currentScale;

    currentScale = scale;
    X.first('#dungeonFloor').style['transform'] = `scale(${scale})`;

    setLocation({
      x: center.x - ((center.x - currentLocation.x) * factor),
      y: center.y - ((center.y - currentLocation.y) * factor),
    });
  }

  // The floor element is rebuilt every time the dungeon view is shown, dropping any applied transform, so the scale
  // has to start over at 1.
  function reset() {
    currentScale = 1;
    stopDrag();
    DungeonCamera.stop();
  }

  return Object.freeze({
    init,
    reset,
    isDragging,
    didDrag,
    startDrag,
    onMove,
    stopDrag,
    getLocation,
    setLocation,
    centerOn,
    panTo,
    zoom,
    setScale,
    getScale: () => { return currentScale; },
  });

})();
