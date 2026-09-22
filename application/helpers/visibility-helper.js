global.VisibilityHelper = (function() {

  // Rays are cast just to either side of every endpoint as well as straight at it, so that a ray grazing the end of
  // a wall carries on to whatever lies behind it. The offset is small enough that the extra hits at a corner land
  // within a hundredth of a pixel of it and are merged away.
  const angleOffset = 0.00001;
  const mergeDistance = 0.05;
  const endpointTolerance = 1e-9;

  // The visibility polygon from an origin against a set of wall segments, each { a:{x,y}, b:{x,y} }. The box (an
  // { xMin, xMax, yMin, yMax } that must contain the origin) bounds the polygon: its edges are walls too, and
  // segments that don't reach it are ignored. Every vertex is pushed along its ray by the overshoot, which lets the
  // caller land the shadow's edge just past a wall's stroke rather than through the middle of it. The vertices come
  // back in angle order, with near duplicates and points along a straight edge dropped.
  function computePolygon(origin, segments, box, overshoot = 0) {
    const walls = [...boxSegments(box), ...segments.filter(segment => reachesBox(segment, box))];
    const hits = rayAngles(origin, walls).map(angle => castRay(origin, angle, walls)).filter(hit => hit != null);

    hits.sort((a, b) => a.angle - b.angle);

    return simplify(hits).map(hit => ({
      x: origin.x + (hit.direction.x * (hit.distance + overshoot)),
      y: origin.y + (hit.direction.y * (hit.distance + overshoot)),
    }));
  }

  function boxSegments(box) {
    const corners = [
      { x:box.xMin, y:box.yMin },
      { x:box.xMax, y:box.yMin },
      { x:box.xMax, y:box.yMax },
      { x:box.xMin, y:box.yMax },
    ];
    return corners.map((corner, i) => ({ a:corner, b:corners[(i + 1) % corners.length] }));
  }

  function reachesBox(segment, box) {
    return Math.max(segment.a.x, segment.b.x) >= box.xMin
        && Math.min(segment.a.x, segment.b.x) <= box.xMax
        && Math.max(segment.a.y, segment.b.y) >= box.yMin
        && Math.min(segment.a.y, segment.b.y) <= box.yMax;
  }

  function rayAngles(origin, walls) {
    return walls.flatMap(wall => [wall.a, wall.b].flatMap(point => {
      const angle = Math.atan2(point.y - origin.y, point.x - origin.x);
      return [normalizeAngle(angle - angleOffset), angle, normalizeAngle(angle + angleOffset)];
    }));
  }

  // The offset rays either side of a point straight behind the origin fall on opposite ends of the angle range, and
  // they have to sort there or the polygon crosses itself.
  function normalizeAngle(angle) {
    if (angle > Math.PI) { return angle - (2 * Math.PI); }
    if (angle <= -Math.PI) { return angle + (2 * Math.PI); }
    return angle;
  }

  // The nearest wall along a ray. The box guarantees a hit, but a ray running exactly along a wall is parallel to it
  // and skipped, so a ray can still come back empty.
  function castRay(origin, angle, walls) {
    const direction = { x:Math.cos(angle), y:Math.sin(angle) };
    let nearest = null;

    walls.forEach(wall => {
      const distance = rayDistance(origin, direction, wall);
      if (distance != null && (nearest == null || distance < nearest.distance)) {
        nearest = { angle, direction, distance };
      }
    });

    if (nearest == null) { return null; }

    nearest.point = {
      x: origin.x + (direction.x * nearest.distance),
      y: origin.y + (direction.y * nearest.distance),
    };
    return nearest;
  }

  // Distance along a ray to where it crosses a wall, or null when it doesn't. Solves origin + t·direction =
  // a + u·(b − a) with 2D cross products: t is the distance along the ray and u the position along the wall.
  function rayDistance(origin, direction, wall) {
    const edge = { x: wall.b.x - wall.a.x, y: wall.b.y - wall.a.y };
    const denominator = (direction.x * edge.y) - (direction.y * edge.x);
    if (Math.abs(denominator) < 1e-12) { return null; }

    const offset = { x: wall.a.x - origin.x, y: wall.a.y - origin.y };
    const t = ((offset.x * edge.y) - (offset.y * edge.x)) / denominator;
    const u = ((offset.x * direction.y) - (offset.y * direction.x)) / denominator;

    if (t <= 0 || u < -endpointTolerance || u > 1 + endpointTolerance) { return null; }
    return t;
  }

  // Merge hits that landed within a whisker of each other (the three rays at a corner) and drop hits lying on the
  // straight line between their neighbours, which is where a ray that meets a wall mid-span ends up. Both checks
  // wrap around from the last hit to the first.
  function simplify(hits) {
    const merged = hits.filter((hit, i) => i === 0 || distanceBetween(hit.point, hits[i-1].point) > mergeDistance);
    if (merged.length > 1 && distanceBetween(merged[0].point, merged[merged.length-1].point) <= mergeDistance) {
      merged.pop();
    }
    if (merged.length < 3) { return merged; }

    return merged.filter((hit, i) => {
      const previous = merged[(i + merged.length - 1) % merged.length];
      const next = merged[(i + 1) % merged.length];
      return isCollinear(previous.point, hit.point, next.point) === false;
    });
  }

  function distanceBetween(p, q) {
    return Math.hypot(q.x - p.x, q.y - p.y);
  }

  function isCollinear(a, b, c) {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const bc = { x: c.x - b.x, y: c.y - b.y };
    const cross = (ab.x * bc.y) - (ab.y * bc.x);
    return Math.abs(cross) <= 1e-6 * Math.hypot(ab.x, ab.y) * Math.hypot(bc.x, bc.y);
  }

  return {
    computePolygon,
  };

})();
