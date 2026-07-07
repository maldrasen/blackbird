global.GameController = (function() {

  // TODO: None of these functions are actually async at all, at least they're
  //       not yet. Consider making them normal once we're starting real games.
  //       (load will always be async because it needs to load a file)

  async function startNewGame(options={}) {
    GameState.initialize(options);

    if (options.setup) { return options.setup(); }

    EpisodeSystem.startEpisode(getGameStartEpisode(), {});
    GameState.setGameMode(GameMode.episode);
  }

  // TODO: Once a lineage exists this should return whatever scenario the
  //       lineage has unlocked instead of always the first one.
  function getGameStartEpisode() {
    return 'game-start-1';
  }

  async function loadLastGame() {
    console.log("TODO: Load Last Game");
  }

  async function openGame() {
    // console.clear();
    MainContent.showCover();
    MainContent.removeStylesheet('mocha');
    MainContent.hideCover({ fadeTime:2500 });
  }

  return Object.freeze({
    startNewGame,
    loadLastGame,
    openGame,
  });

})();
