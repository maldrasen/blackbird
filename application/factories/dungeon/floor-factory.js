global.FloorFactory = (function() {

  // floor: (number) The depth of this floor.
  // theme: (string) The dungeon theme for this floor, or randomly picked if null.
  function build(floor, theme) {
    if (floor == null) { throw "The floor number is required" }
    if (theme == null) { theme = pickTheme(floor); }
  }

  function pickTheme(floor) {

  }

  return Object.freeze({
    build
  });

})();