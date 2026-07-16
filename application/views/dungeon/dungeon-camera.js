global.DungeonCamera = (function() {

  // Camera motion is a critically damped spring: the viewport accelerates toward its target and brakes as it
  // arrives, never overshooting. Retargeting mid-flight keeps the current velocity, so panning through a string of
  // rooms flows as one continuous motion instead of easing to a stop at every room along the way.
  //
  // The camera works in floor coordinate space, not pixels: its state is a focus point (the floor position sitting
  // at the center of the viewport, in tile units) plus the scale, each springing toward its own target. The pixel
  // projection happens once per frame in DungeonViewport.applyCamera, so panning and zooming compose naturally —
  // a pan target can never be invalidated by a zoom in flight.
  const smoothTime = 300;
  const settleDistance = 0.02;
  const settleSpeed = 0.0005;
  const settleScale = 0.001;
  const settleScaleSpeed = 0.00005;

  let focus = { x:0, y:0 };
  let scale = 1;
  let velocity = { x:0, y:0, scale:0 };
  let focusTarget = null;
  let scaleTarget = null;
  let frameId = null;
  let lastTimestamp = null;

  // Glide toward centering a floor position. Nothing ever waits on the camera arriving; it just chases the latest
  // target.
  function moveTo(point) {
    focusTarget = { ...point };
    start();
  }

  // Glide the scale toward a new value. With no focus target in play the focus stays put, so the zoom anchors on
  // whatever is at the center of the viewport, and while walking it anchors on the party.
  function zoomTo(value) {
    scaleTarget = value;
    start();
  }

  // Abandon the current targets, leaving the viewport wherever it is.
  function stop() {
    focusTarget = null;
    scaleTarget = null;
    velocity = { x:0, y:0, scale:0 };
    lastTimestamp = null;

    if (frameId != null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  function isMoving() {
    return focusTarget != null || scaleTarget != null;
  }

  // Waking the camera adopts whatever the viewport is currently showing, so motion picks up seamlessly from drags,
  // instant centering, and floor redraws.
  function start() {
    if (frameId != null) { return; }

    const state = DungeonViewport.deriveCamera();
    focus = state.focus;
    scale = state.scale;
    lastTimestamp = null;
    frameId = requestAnimationFrame(step);
  }

  function step(timestamp) {
    if (isMoving() === false) { return stop(); }

    // The first frame only records the clock, and a long gap between frames (an inactive tab) is capped so the
    // spring math stays stable.
    const dt = (lastTimestamp == null) ? 0 : Math.min(timestamp - lastTimestamp, 50);
    lastTimestamp = timestamp;

    if (dt > 0) {
      if (focusTarget != null) { advanceFocus(dt); }
      if (scaleTarget != null) { advanceScale(dt); }

      DungeonViewport.applyCamera(focus, scale);

      if (isMoving() === false) { return stop(); }
    }

    frameId = requestAnimationFrame(step);
  }

  function advanceFocus(dt) {
    focus.x = dampen(focus.x, focusTarget.x, 'x', dt);
    focus.y = dampen(focus.y, focusTarget.y, 'y', dt);

    if (focusHasSettled()) {
      focus = { x:focusTarget.x, y:focusTarget.y };
      focusTarget = null;
      velocity.x = 0;
      velocity.y = 0;
    }
  }

  function advanceScale(dt) {
    scale = dampen(scale, scaleTarget, 'scale', dt);

    if (scaleHasSettled()) {
      scale = scaleTarget;
      scaleTarget = null;
      velocity.scale = 0;
    }
  }

  // Advance one scalar of the spring, storing the new velocity. (The standard SmoothDamp formulation, a stable
  // approximation of a critically damped spring.)
  function dampen(current, targetValue, axis, dt) {
    const omega = 2 / smoothTime;
    const x = omega * dt;
    const decay = 1 / (1 + x + (0.48 * x * x) + (0.235 * x * x * x));
    const change = current - targetValue;
    const temp = (velocity[axis] + (omega * change)) * dt;

    velocity[axis] = (velocity[axis] - (omega * temp)) * decay;

    return targetValue + ((change + temp) * decay);
  }

  function focusHasSettled() {
    const distance = Math.sqrt(((focus.x - focusTarget.x) ** 2) + ((focus.y - focusTarget.y) ** 2));
    return distance < settleDistance
        && Math.abs(velocity.x) < settleSpeed
        && Math.abs(velocity.y) < settleSpeed;
  }

  function scaleHasSettled() {
    return Math.abs(scale - scaleTarget) < settleScale
        && Math.abs(velocity.scale) < settleScaleSpeed;
  }

  return Object.freeze({
    moveTo,
    zoomTo,
    stop,
    isMoving,
  });

})();
