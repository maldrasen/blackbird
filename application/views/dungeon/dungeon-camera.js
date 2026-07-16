global.DungeonCamera = (function() {

  // Camera motion is a critically damped spring: the viewport accelerates toward its target and brakes as it
  // arrives, never overshooting. Retargeting mid-flight keeps the current velocity, so panning through a string of
  // rooms flows as one continuous motion instead of easing to a stop at every room along the way.
  const smoothTime = 300;
  const settleDistance = 0.5;
  const settleSpeed = 0.01;

  let velocity = { x:0, y:0 };
  let target = null;
  let frameId = null;
  let lastTimestamp = null;

  // Glide toward a location. Nothing ever waits on the camera arriving; it just chases the latest target.
  function moveTo(location) {
    target = { ...location };

    if (frameId == null) {
      lastTimestamp = null;
      frameId = requestAnimationFrame(step);
    }
  }

  // Abandon the current target, leaving the viewport wherever it is.
  function stop() {
    target = null;
    velocity = { x:0, y:0 };
    lastTimestamp = null;

    if (frameId != null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  function isMoving() {
    return target != null;
  }

  function step(timestamp) {
    if (target == null) { return stop(); }

    // The first frame only records the clock, and a long gap between frames (an inactive tab) is capped so the
    // spring math stays stable.
    const dt = (lastTimestamp == null) ? 0 : Math.min(timestamp - lastTimestamp, 50);
    lastTimestamp = timestamp;

    if (dt > 0) {
      const current = DungeonViewport.getLocation();
      const next = {
        x: dampen(current.x, target.x, 'x', dt),
        y: dampen(current.y, target.y, 'y', dt),
      };

      DungeonViewport.setLocation(next);

      if (hasSettled(next)) { return arrive(); }
    }

    frameId = requestAnimationFrame(step);
  }

  // Advance one axis of the spring, storing the new velocity. (The standard SmoothDamp formulation, a stable
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

  function hasSettled(location) {
    return distanceToTarget(location) < settleDistance
        && Math.abs(velocity.x) < settleSpeed
        && Math.abs(velocity.y) < settleSpeed;
  }

  function distanceToTarget(location) {
    return Math.sqrt(((location.x - target.x) ** 2) + ((location.y - target.y) ** 2));
  }

  function arrive() {
    DungeonViewport.setLocation({ x:target.x, y:target.y });
    stop();
  }

  return Object.freeze({
    moveTo,
    stop,
    isMoving,
  });

})();
