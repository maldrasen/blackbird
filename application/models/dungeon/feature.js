global.Feature = (function() {

  function build() {
    const $rooms = [];
    const $doors = [];
    const $footprint = [];

    return Object.freeze({
      getRooms: () => { return [...$rooms]; },
      getDoors: () => { return [...$doors]; },
      addRoom: (room) => { $rooms.push(room); },
      addDoor: (door) => { $doors.push(door); },
    });
  }

  return Object.freeze({
    build,
  });

})();
