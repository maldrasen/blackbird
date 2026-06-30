```

  // Build a boolean grid the size of the feature's bounding box and paint every cell occupied by a room.
  // Returns an object with getEdgeTiles(direction) which yields feature-local coordinates of the empty
  // cell immediately adjacent to the outermost occupied cell in each column (N/S) or row (E/W).
  // Add the feature's position to translate these to floor coordinates.
  /*
  function getFootprint() {

    function getEdgeTiles(direction) {
      const tiles = [];
      if (direction === 'N') {
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            if (grid[y][x]) { tiles.push({ x, y: y - 1 }); break; }
          }
        }
      }
      if (direction === 'S') {
        for (let x = 0; x < width; x++) {
          for (let y = height - 1; y >= 0; y--) {
            if (grid[y][x]) { tiles.push({ x, y: y + 1 }); break; }
          }
        }
      }
      if (direction === 'E') {
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (grid[y][x]) { tiles.push({ x: x - 1, y }); break; }
          }
        }
      }
      if (direction === 'W') {
        for (let y = 0; y < height; y++) {
          for (let x = width - 1; x >= 0; x--) {
            if (grid[y][x]) { tiles.push({ x: x + 1, y }); break; }
          }
        }
      }
      return tiles;
    }

    return Object.freeze({ getEdgeTiles });
  }*/
```