global.DungeonView = (function() {

  function init() {
    DungeonViewport.init();
  }

  function show() {
    MainContent.setMainContent("views/dungeon.html");
    MainContent.setBackground("backgrounds/dungeon.jpg");

    // TODO: Should actually center this once we know the dimensions
    DungeonViewport.setLocation({ x:0, y:0 });
  }

  return Object.freeze({
    init,
    show,
  });

})();
