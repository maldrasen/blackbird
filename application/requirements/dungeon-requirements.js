global.DungeonRequirements = (function() {

  function currentRoom() { return DungeonSystem.getDungeonFloor().getCurrentRoom(); }
  function roomSizeAtMost(size) { return currentRoom().getSize() <= size; }
  function roomSizeAtLeast(size) { return currentRoom().getSize() >= size; }

  function roomSizeBetween(min, max) {
    const room = currentRoom();
    return roomSizeAtLeast(room,min) && roomSizeAtMost(room,max);
  }

  return {
    isSmallRoom: () =>            { return () => { return roomSizeAtMost(16); }},
    isMediumRoom: () =>           { return () => { return roomSizeBetween(16, 49); }},
    isLargeRoom: () =>            { return () => { return roomSizeBetween(49, 100); }},
    isHugeRoom: () =>             { return () => { return roomSizeAtLeast(100); }},
    roomSizeAtMost: max =>        { return () => { return roomSizeAtMost(max); }},
    roomSizeAtLeast: min =>       { return () => { return roomSizeAtLeast(min); }},
    roomSizeBetween: (min,max) => { return () => { return roomSizeBetween(min,max); }},
  };

})();
