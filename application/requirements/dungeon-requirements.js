global.DungeonRequirements = (function() {

  function roomSizeAtMost(room, size) { return room.getSize() <= size; }
  function roomSizeAtLeast(room, size) { return room.getSize() >= size; }
  function roomSizeBetween(room, min, max) { return roomSizeAtLeast(room,min) && roomSizeAtMost(room,max);  }

  return {
    isSmallRoom: () =>            { return room => { return roomSizeAtMost(room, 16); }},
    isMediumRoom: () =>           { return room => { return roomSizeBetween(room, 16, 49); }},
    isLargeRoom: () =>            { return room => { return roomSizeBetween(room, 49, 100); }},
    isHugeRoom: () =>             { return room => { return roomSizeAtLeast(room, 100); }},
    roomSizeAtMost: max =>        { return room => { return roomSizeAtMost(room,max); }},
    roomSizeAtLeast: min =>       { return room => { return roomSizeAtLeast(room,min); }},
    roomSizeBetween: (min,max) => { return room => { return roomSizeBetween(room,min,max); }},
  };

})();
