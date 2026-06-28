global.DungeonView = (function() {

  function init() {
    DungeonViewport.init();
  }

  function show() {
    MainContent.setMainContent("views/dungeon.html");
    drawDungeon();
  }

  // TODO: The Viewport should be centered this once we know the dimensions
  function drawDungeon() {
    DungeonFloorView.drawDungeon();
    DungeonViewport.setLocation({ x:0, y:0 });
  }

  return Object.freeze({
    init,
    show,
    drawDungeon,
  });

})();
