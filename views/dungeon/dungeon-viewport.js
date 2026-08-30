global.DungeonViewport = (function() {

  const scaleSteps = [0.125, 0.25, 0.375, 0.5, 0.75, 1];
  const defaultScale = 0.5;
  const wheelThreshold = 100;
  const wheelResetDelay = 150;

  let dragContext;
  let dragMoved = false;
  let currentLocation = { x:0, y:0 };
  let currentScale = defaultScale;
  let scaleTarget = defaultScale;
  let wheelDistance = 0;
  let lastWheelTime = 0;

  function init() {
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', event => {
      if (event.target.closest('#dungeonViewport')) { startDrag(); }
    });
    window.addEventListener('wheel', event => {
      if (event.target.closest('#dungeonViewport')) { onWheel(event); }
    });
  }

  // A mouse wheel notch arrives as a single event with a large delta, but a trackpad swipe arrives as a stream of
  // small ones (plus a momentum tail after the fingers lift), so zoom steps come from accumulated scroll distance
  // rather than event count. The accumulator resets when the direction flips or the stream pauses, so leftover
  // distance and momentum from one gesture don't bleed into the next.
  function onWheel(event) {
    if (event.timeStamp - lastWheelTime > wheelResetDelay) { wheelDistance = 0; }
    lastWheelTime = event.timeStamp;

    if (Math.sign(event.deltaY) !== Math.sign(wheelDistance)) { wheelDistance = 0; }
    wheelDistance += event.deltaY;

    while (Math.abs(wheelDistance) >= wheelThreshold) {
      zoom(wheelDistance < 0 ? 1 : -1);
      wheelDistance -= Math.sign(wheelDistance) * wheelThreshold;
    }
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
    DungeonCamera.moveTo(tilePosition);
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

  // Apply one frame of camera motion: the scale, and the location that centers the camera's focus at that scale.
  function applyCamera(focus, scale) {
    currentScale = scale;
    X.first('#dungeonFloor').style['transform'] = `scale(${scale})`;
    setLocation(locationCentering(focus));
  }

  // The camera state implied by whatever the viewport is currently showing (the inverse of locationCentering), so
  // the camera can pick up seamlessly after drags and instant centering.
  function deriveCamera() {
    const viewport = X.first('#dungeonViewport');
    const gridSize = DungeonFloorView.getGridSize();

    return {
      focus: {
        x: ((viewport.clientWidth / 2) - currentLocation.x) / (gridSize * currentScale),
        y: ((viewport.clientHeight / 2) - currentLocation.y) / (gridSize * currentScale),
      },
      scale: currentScale,
    };
  }

  // The wheel steps the scale target through the fixed stops while the camera glides the actual scale toward it, so
  // scaleTarget rather than currentScale (usually somewhere between stops, mid-glide) tracks the position in the
  // list. With no pan in play the zoom anchors on the center of the viewport.
  function zoom(step) {
    const index = scaleSteps.indexOf(scaleTarget) + step;
    if (index < 0 || index >= scaleSteps.length) { return; }

    scaleTarget = scaleSteps[index];
    DungeonCamera.zoomTo(scaleTarget);
  }

  // The floor element is rebuilt every time the dungeon view is shown, dropping any applied transform, so the scale
  // has to be reapplied explicitly because a bare element renders at scale 1. The zoom level itself carries over
  // from the last visit, snapped to the target in case the camera was mid-glide when the view closed.
  function reset() {
    currentScale = scaleTarget;
    X.first('#dungeonFloor').style['transform'] = `scale(${currentScale})`;
    stopDrag();
    DungeonCamera.stop();
  }

  return {
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
    applyCamera,
    deriveCamera,
    getScale: () => { return currentScale; },
  };

})();
