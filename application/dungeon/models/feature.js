global.Feature = function(type) {

  const rooms = [];
  const doors = [];

  let position;

  // Set the position of the feature within the floor.
  function setPosition(x,y) {
    position = [x,y];
  }

  function getBounds() {
    if (rooms.length === 1) { return rooms[0].getBounds(); }
    throw new Error(`Implement calculation for more than one room.`);
  }

  return Object.freeze({
    getType: () => { return type; },
    getRooms: () => { return [...rooms]; },
    getDoors: () => { return [...doors]; },
    addRoom: (room) => { rooms.push(room); },
    addDoor: (door) => { doors.push(door); },
    setPosition,
    getPosition: () => { return [...position]; },
    getBounds,
  });
}
