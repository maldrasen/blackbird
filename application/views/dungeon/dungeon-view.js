global.DungeonView = (function() {

  function init() {

  }

  function show() {
    MainContent.setMainContent("views/dungeon.html");
    MainContent.setBackground("backgrounds/dungeon.jpg");

  }

  return Object.freeze({
    init,
    show,
  });

})();
