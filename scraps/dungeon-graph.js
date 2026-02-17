/*
class Room {
  constructor(id, x, y, width, height) {
    this.id = id;
    this.bounds = {x, y, width, height}; // grid coordinates
    this.doors = new Set(); // door IDs
    this.type = null; // corridor, chamber, safe room, etc.
  }

  // Check if this room occupies a grid tile
  containsTile(x, y) {
    return x >= this.bounds.x && x < this.bounds.x + this.bounds.width &&
      y >= this.bounds.y && y < this.bounds.y + this.bounds.height;
  }

  // Get all edge tiles where doors could go
  getEdgeTiles() {  }
}

class Door {
  constructor(id, x, y, orientation) {
    this.id = id;
    this.position = {x, y};
    this.orientation = orientation; // 'horizontal' or 'vertical'
    this.rooms = []; // [roomId1, roomId2]
    this.locked = false;
    this.open = true;
  }
}

class DungeonFloor {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => Array(width).fill(null));
    this.rooms = new Map(); // id -> Room
    this.doors = new Map(); // id -> Door
  }
}

// Build adjacency graph from rooms/doors
function buildConnectivityGraph(floor) {
  const graph = new Map(); // roomId -> Set of connected roomIds

  for (const room of floor.rooms.values()) {
    graph.set(room.id, new Set());
  }

  for (const door of floor.doors.values()) {
    const [roomA, roomB] = door.rooms;
    graph.get(roomA).add(roomB);
    graph.get(roomB).add(roomA);
  }

  return graph;
}

// Verify all rooms are reachable from start room
function isFullyConnected(floor, startRoomId) {
  const graph = buildConnectivityGraph(floor);
  const visited = new Set();
  const queue = [startRoomId];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;

    visited.add(current);
    for (const neighbor of graph.get(current)) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return visited.size === floor.rooms.size;
}

function findDisconnectedComponents(floor) {
  const graph = buildConnectivityGraph(floor);
  const components = [];
  const visited = new Set();

  for (const roomId of floor.rooms.keys()) {
    if (visited.has(roomId)) continue;

    // BFS to find all rooms in this component
    const component = new Set();
    const queue = [roomId];

    while (queue.length > 0) {
      const current = queue.shift();
      if (component.has(current)) continue;

      component.add(current);
      visited.add(current);

      for (const neighbor of graph.get(current)) {
        if (!component.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    components.push(component);
  }

  return components;
}
 */