global.FloorFactory = (function() {

  function buildFloor() {
    const floor = DungeonSystem.getDungeonFloor();
    console.log("=== Build Floor ===");
    console.log(`Level:${floor.getLevel()} Theme:${floor.getTheme()}`);
  }

  return Object.freeze({
    buildFloor,
  })

})();
