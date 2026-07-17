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
  });

})();
