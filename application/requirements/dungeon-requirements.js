global.DungeonRequirements = (function() {

  function currentRoom() { return DungeonSystem.getDungeonFloor().getCurrentRoom(); }
  function roomSizeAtMost(size) { return currentRoom().getSize() <= size; }
  function roomSizeAtLeast(size) { return currentRoom().getSize() >= size; }

  function roomSizeBetween(min, max) {
    const room = currentRoom();
    return roomSizeAtLeast(room,min) && roomSizeAtMost(room,max);
  }

  function checkScoutingRoll() {
    return DungeonSystem.getDungeonFloor().getCurrentRoom().checkScoutingRoll();
  }

  return {
    isTinyRoom: () =>             { return () => { return roomSizeAtMost(1); }},
    isSmallRoom: () =>            { return () => { return roomSizeBetween(4, 16); }},
    isMediumRoom: () =>           { return () => { return roomSizeBetween(16, 49); }},
    isLargeRoom: () =>            { return () => { return roomSizeBetween(49, 100); }},
    isHugeRoom: () =>             { return () => { return roomSizeAtLeast(100); }},
    roomSizeAtMost: max =>        { return () => { return roomSizeAtMost(max); }},
    roomSizeAtLeast: min =>       { return () => { return roomSizeAtLeast(min); }},
    roomSizeBetween: (min,max) => { return () => { return roomSizeBetween(min,max); }},
    scoutingSuccess: () =>        { return () => { return checkScoutingRoll() === true; }},
    scoutingFailure: () =>        { return () => { return checkScoutingRoll() === false; }},
  };

})();
