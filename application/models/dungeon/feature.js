global.Feature = (function() {

  function build() {
    const $rooms = [];
    const $doors = [];

    let $position;
    let $footprint;

    // Set the position of the feature within the floor.
    function setPosition(x,y) {
      $position = [x,y];
    }

    function compileFootprint() {
      throw `Implement compileFootprint()`;
    }

    function calculateBounds() {
      if ($rooms.length === 1) { return $rooms[0].calculateBounds(); }
      throw `Implement calculation for more than one room.`
    }

    return Object.freeze({
      getRooms: () => { return [...$rooms]; },
      getDoors: () => { return [...$doors]; },
      addRoom: (room) => { $rooms.push(room); },
      addDoor: (door) => { $doors.push(door); },
      compileFootprint,
      calculateBounds,
    });
  }

  return Object.freeze({
    build,
  });

})();
