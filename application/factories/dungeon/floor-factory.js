global.FloorFactory = (function() {

  // depth: (number) The depth of this floor.
  // theme: (string) The dungeon theme for this floor, or randomly picked if null.
  function build(level, theme=null) {
    if (level == null) { throw "The floor number is required" }
    if (theme == null) { theme = pickTheme(level); }

    return Floor.build({ level, theme });
  }

  function pickTheme(floor) {
    return `stuff:${floor}`
  }

  return Object.freeze({
    build
  });

})();
