global.GeometryHelper = (function() {

  // Walking an outline clockwise (with y growing downward), each direction knows its step vector, the offsets of
  // the two cells ahead of the current lattice point, and which directions a left or right turn lead to.
  const outlineDirections = {
    E: { move:{ x:1,  y:0  }, left:{ x:0,  y:-1 }, right:{ x:0,  y:0  }, turnLeft:'N', turnRight:'S' },
    S: { move:{ x:0,  y:1  }, left:{ x:0,  y:0  }, right:{ x:-1, y:0  }, turnLeft:'E', turnRight:'W' },
    W: { move:{ x:-1, y:0  }, left:{ x:-1, y:0  }, right:{ x:-1, y:-1 }, turnLeft:'S', turnRight:'N' },
    N: { move:{ x:0,  y:-1 }, left:{ x:-1, y:-1 }, right:{ x:0,  y:-1 }, turnLeft:'W', turnRight:'E' },
  };

  // Trace the boundary of a footprint as a single clockwise polygon, walking with the interior always on the
  // right. A cell is filled unless it holds null or false, covering both feature footprints (booleans) and room
  // footprints (floor type indices, where 0 is a valid type). Vertices are lattice corners in cell coordinates,
  // so a single filled cell yields (0,0) (1,0) (1,1) (0,1). The filled region must be connected and have no holes.
  function traceOutline(footprint) {
    const filled = (x,y) => footprint[y] != null && footprint[y][x] != null && footprint[y][x] !== false;

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

  function edgeDirection(from, to) {
    if (to.x > from.x) { return 'E'; }
    if (to.x < from.x) { return 'W'; }
    return (to.y > from.y) ? 'S' : 'N';
  }

  // The top-left corner of the topmost-leftmost filled cell, which is always a convex corner of the outline.
  function startCorner(footprint) {
    for (let y = 0; y < footprint.length; y++) {
      for (let x = 0; x < footprint[y].length; x++) {
        if (footprint[y][x] != null && footprint[y][x] !== false) { return { x, y }; }
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

  // Split a grid into its orthogonally connected regions of cells matching the given predicate. Each region comes
  // back as a boolean grid with the same dimensions as the input, so it can be passed directly to traceOutline().
  function findRegions(grid, match) {
    const height = grid.length;
    const width = grid[0].length;
    const seen = Array.from({ length:height }, () => new Array(width).fill(false));
    const regions = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (seen[y][x] || match(grid[y][x]) === false) { continue; }

        const region = Array.from({ length:height }, () => new Array(width).fill(false));
        const stack = [{ x, y }];
        seen[y][x] = true;

        while (stack.length > 0) {
          const tile = stack.pop();
          region[tile.y][tile.x] = true;

          [{ x:tile.x+1, y:tile.y }, { x:tile.x-1, y:tile.y }, { x:tile.x, y:tile.y+1 }, { x:tile.x, y:tile.y-1 }]
            .forEach(next => {
              if (next.x >= 0 && next.y >= 0 && next.x < width && next.y < height &&
                  seen[next.y][next.x] === false && match(grid[next.y][next.x])) {
                seen[next.y][next.x] = true;
                stack.push(next);
              }
            });
        }

        regions.push(region);
      }
    }

    return regions;
  }

  return {
    traceOutline,
    insetOutline,
    findRegions,
  };

})();
