global.Feature = function(type) {

  const rooms = [];
  const doors = [];

  let position;
  let index;

  let highlight = false;

  // Set the position of the feature within the floor.
  function setPosition(x,y) {
    position = {x,y};
  }

  // Center of bounds, not center of mass. Center could be outside of room if the room is L-shaped.
  function getCenter() {
    const bounds = getBounds();
    return {
      x: position.x + (bounds.xMax / 2),
      y: position.y + (bounds.yMax / 2),
    }
  }

  // The bounds of the feature only describes it size, using the bounds from each room to find the overall bounding
  // box for the feature. To get the bounds translated by the position use getLocation().
  function getBounds() {
    const featureBounds = {
      xMin: Infinity,
      xMax: -Infinity,
      yMin: Infinity,
      yMax: -Infinity,
    };
    rooms.forEach(room => {
      const roomBounds = room.getBounds();
      if (roomBounds.xMin < featureBounds.xMin) { featureBounds.xMin = roomBounds.xMin; }
      if (roomBounds.xMax > featureBounds.xMax) { featureBounds.xMax = roomBounds.xMax; }
      if (roomBounds.yMin < featureBounds.yMin) { featureBounds.yMin = roomBounds.yMin; }
      if (roomBounds.yMax > featureBounds.yMax) { featureBounds.yMax = roomBounds.yMax; }
    });
    return featureBounds;
  }

  // Combine position and bounds to get a location box. The lower bounds are inclusive, but the upper bounds are
  // exclusive so if a feature box is at { xMin:4, xMax:8, yMin:8, yMax:12} nothing will be in column 12 or row 8
  // within the grid. The location maths are all easier with this being the case though.
  function getLocation() {
    const bounds = getBounds();
    return {
      xMin: bounds.xMin + position.x,
      xMax: bounds.xMax + position.x,
      yMin: bounds.yMin + position.y,
      yMax: bounds.yMax + position.y,
    };
  }

  return Object.freeze({
    getType: () => { return type; },
    getRooms: () => { return [...rooms]; },
    getDoors: () => { return [...doors]; },
    addRoom: (room) => { rooms.push(room); },
    addDoor: (door) => { doors.push(door); },
    setPosition,
    getPosition: () => { return {...position}; },
    setIndex: i => { index = i; },
    getIndex: () => { return index; },
    getBounds,
    getCenter,
    getLocation,

    setHighlight: h => { highlight = h; },
    getHighlight: () => { return highlight; },
  });
}
