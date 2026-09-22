global.VisibilityHelper = (function() {

  // Rays are cast just to either side of every endpoint as well as straight at it, so that a ray grazing the end of
  // a wall carries on to whatever lies behind it. The offset is small enough that the extra hits at a corner land
  // within a hundredth of a pixel of it and are merged away.
  const angleOffset = 0.00001;
  const mergeDistance = 0.05;
  const endpointTolerance = 1e-9;
  const spanTolerance = 1e-9;

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

  // Whether nothing stands between the origin and a point. A wall the point sits on doesn't block it.
  function isVisible(origin, point, segments) {
    const length = distanceBetween(origin, point);
    if (length === 0) { return true; }

    const direction = { x: (point.x - origin.x) / length, y: (point.y - origin.y) / length };

    return segments.every(segment => {
      const distance = rayDistance(origin, direction, segment);
      return distance == null || distance >= length - spanTolerance;
    });
  }

  // Cut a rectangle out of a set of segments, keeping whatever lies outside it. Door openings are cut out of the
  // wall lines this way. A segment that only touches the rectangle is kept whole.
  function subtractRect(segments, rect) {
    return segments.flatMap(segment => {
      const span = insideSpan(segment, rect);
      if (span == null) { return [segment]; }

      const pieces = [];
      if (span.t0 > spanTolerance) { pieces.push({ a:segment.a, b:pointAlong(segment, span.t0) }); }
      if (span.t1 < 1 - spanTolerance) { pieces.push({ a:pointAlong(segment, span.t1), b:segment.b }); }
      return pieces;
    });
  }

  // A regular polygon as a closed loop of segments, standing in for the shadow-casting body of a glyph. The first
  // vertex is turned half a step past the x axis so the polygon has flat sides facing the four directions.
  function regularPolygon(center, radius, sides) {
    return loopSegments(Array.from({ length:sides }, (_, i) => {
      const angle = ((2 * Math.PI * i) + Math.PI) / sides;
      return { x: center.x + (radius * Math.cos(angle)), y: center.y + (radius * Math.sin(angle)) };
    }));
  }

  function boxSegments(box) {
    return loopSegments([
      { x:box.xMin, y:box.yMin },
      { x:box.xMax, y:box.yMin },
      { x:box.xMax, y:box.yMax },
      { x:box.xMin, y:box.yMax },
    ]);
  }

  function loopSegments(vertices) {
    return vertices.map((vertex, i) => ({ a:vertex, b:vertices[(i + 1) % vertices.length] }));
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

  // Liang-Barsky clipping: the part of a segment inside a rectangle, as a range of the segment's own parameter
  // (0 at a, 1 at b), or null when the segment misses the rectangle or only touches it.
  function insideSpan(segment, rect) {
    const delta = { x: segment.b.x - segment.a.x, y: segment.b.y - segment.a.y };
    const edges = [
      { p:-delta.x, q:segment.a.x - rect.xMin },
      { p: delta.x, q:rect.xMax - segment.a.x },
      { p:-delta.y, q:segment.a.y - rect.yMin },
      { p: delta.y, q:rect.yMax - segment.a.y },
    ];

    let t0 = 0;
    let t1 = 1;

    for (const edge of edges) {
      if (edge.p === 0 && edge.q < 0) { return null; }
      if (edge.p < 0) { t0 = Math.max(t0, edge.q / edge.p); }
      if (edge.p > 0) { t1 = Math.min(t1, edge.q / edge.p); }
    }

    return (t0 < t1) ? { t0, t1 } : null;
  }

  function pointAlong(segment, t) {
    return {
      x: segment.a.x + ((segment.b.x - segment.a.x) * t),
      y: segment.a.y + ((segment.b.y - segment.a.y) * t),
    };
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
    isVisible,
    subtractRect,
    regularPolygon,
  };

})();
