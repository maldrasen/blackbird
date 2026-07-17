global.GeometryHelper = (function() {

  // Walking an outline clockwise (with y growing downward), each direction knows its step vector, the offsets of
  // the two cells ahead of the current lattice point, and which directions a left or right turn lead to.
  const outlineDirections = {
    E: { move:{ x:1,  y:0  }, left:{ x:0,  y:-1 }, right:{ x:0,  y:0  }, turnLeft:'N', turnRight:'S' },
    S: { move:{ x:0,  y:1  }, left:{ x:0,  y:0  }, right:{ x:-1, y:0  }, turnLeft:'E', turnRight:'W' },
    W: { move:{ x:-1, y:0  }, left:{ x:-1, y:0  }, right:{ x:-1, y:-1 }, turnLeft:'S', turnRight:'N' },
    N: { move:{ x:0,  y:-1 }, left:{ x:-1, y:-1 }, right:{ x:0,  y:-1 }, turnLeft:'W', turnRight:'E' },
  };

  // Trace the boundary of a footprint (a 2D boolean grid of filled cells) as a single clockwise polygon, walking
  // with the interior always on the right. Vertices are lattice corners in cell coordinates, so a single filled
  // cell yields (0,0) (1,0) (1,1) (0,1). The filled region must be connected and have no holes.
  function traceOutline(footprint) {
    const filled = (x,y) => footprint[y] != null && footprint[y][x] === true;

    const start = startCorner(footprint);
    const vertices = [{ x:start.x, y:start.y }];

    let x = start.x;
    let y = start.y;
    let direction = 'E';

    const maxSteps = (footprint.length + 1) * (footprint[0].length + 1) * 4;
    for (let steps = 0; steps < maxSteps; steps++) {
      x += outlineDirections[direction].move.x;
      y += outlineDirections[direction].move.y;
      if (x === start.x && y === start.y) { return vertices; }

      const next = nextDirection(filled, x, y, direction);
      if (next !== direction) { vertices.push({ x, y }); }
      direction = next;
    }

    throw `The footprint outline never closed.`;
  }

  // Each edge of a clockwise outline shifts toward the interior on its own axis: top edges (E) move down, right
  // edges (S) move left, bottom edges (W) move up, left edges (N) move right.
  const insetShifts = {
    E: { x:0,  y:1  },
    S: { x:-1, y:0  },
    W: { x:0,  y:-1 },
    N: { x:1,  y:0  },
  };

  // Shrink a clockwise rectilinear outline by moving every edge toward the interior. A vertex joins a horizontal
  // and a vertical edge, and each edge's shift only affects one axis, so the new vertex is the old one moved by
  // both adjacent edge shifts. The inset is either a single number for every edge or a per-direction map like
  // { E:28, S:8, W:8, N:18 }, keyed by the direction the edge is walked in; negative amounts move edges outward.
  // Every inset must stay less than half the outline's narrowest span.
  function insetOutline(vertices, inset) {
    const amounts = (typeof inset === 'number') ? { E:inset, S:inset, W:inset, N:inset } : inset;

    return vertices.map((vertex, i) => {
      const previous = vertices[(i + vertices.length - 1) % vertices.length];
      const next = vertices[(i + 1) % vertices.length];
      const incoming = edgeDirection(previous, vertex);
      const outgoing = edgeDirection(vertex, next);

      return {
        x: vertex.x + (insetShifts[incoming].x * amounts[incoming]) + (insetShifts[outgoing].x * amounts[outgoing]),
        y: vertex.y + (insetShifts[incoming].y * amounts[incoming]) + (insetShifts[outgoing].y * amounts[outgoing]),
      };
    });
  }

  // Translate each edge of a clockwise outline by the vector given for its walk direction, e.g. projecting wall
  // tops to wall bases in an oblique perspective. Where two edges with the same shift meet, the vertex stays a
  // single mitered point; where edges with different shifts meet, the vertex splits into both shifted copies and
  // the polygon gains the slanted joining edge between them.
  function shiftOutline(vertices, shifts) {
    return vertices.flatMap((vertex, i) => {
      const previous = vertices[(i + vertices.length - 1) % vertices.length];
      const next = vertices[(i + 1) % vertices.length];
      const incoming = shifts[edgeDirection(previous, vertex)];
      const outgoing = shifts[edgeDirection(vertex, next)];

      const arrival = { x: vertex.x + incoming.x, y: vertex.y + incoming.y };
      const departure = { x: vertex.x + outgoing.x, y: vertex.y + outgoing.y };

      if (arrival.x === departure.x && arrival.y === departure.y) { return [arrival]; }
      return [arrival, departure];
    });
  }

  function edgeDirection(from, to) {
    if (to.x > from.x) { return 'E'; }
    if (to.x < from.x) { return 'W'; }
    return (to.y > from.y) ? 'S' : 'N';
  }

  // Collect the maximal runs of consecutive edges walked in the given directions, each returned as a vertex chain.
  // Runs crossing the outline's starting vertex come back whole.
  function outlineRuns(vertices, directions) {
    const count = vertices.length;
    const included = i => directions.includes(edgeDirection(vertices[i], vertices[(i + 1) % count]));

    let start = 0;
    while (start < count && included(start)) { start++; }
    if (start === count) { return [vertices.concat([vertices[0]])]; }

    const runs = [];
    let run = null;

    for (let step = 1; step <= count; step++) {
      const edge = (start + step) % count;

      if (included(edge) === false) {
        if (run != null) { runs.push(run); }
        run = null;
        continue;
      }

      if (run == null) { run = [vertices[edge]]; }
      run.push(vertices[(edge + 1) % count]);
    }

    if (run != null) { runs.push(run); }
    return runs;
  }

  // The top-left corner of the topmost-leftmost filled cell, which is always a convex corner of the outline.
  function startCorner(footprint) {
    for (let y = 0; y < footprint.length; y++) {
      for (let x = 0; x < footprint[y].length; x++) {
        if (footprint[y][x]) { return { x, y }; }
      }
    }
  }

  // At a lattice point the walk continues along the boundary between the two cells ahead: interior on the right
  // means turn left when both are filled, go straight while only the right one is, and turn right otherwise.
  function nextDirection(filled, x, y, direction) {
    const ahead = outlineDirections[direction];
    const left = filled(x + ahead.left.x, y + ahead.left.y);
    const right = filled(x + ahead.right.x, y + ahead.right.y);

    if (left && right) { return ahead.turnLeft; }
    if (right) { return direction; }
    return ahead.turnRight;
  }

  return Object.freeze({
    traceOutline,
    insetOutline,
    shiftOutline,
    outlineRuns,
    edgeDirection,
  });

})();
