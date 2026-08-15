global.EpisodeInterface = (function() {

  function viewActive() {
    if (Environment.viewPresent() === false) { return false }
    return GameSystem.getState().getGameMode() === GameMode.episode;
  }

  function showPage(page) {
    if (viewActive()) { EpisodeView.setPageContent(page); }
  }

  function showDamageEffect() {
    if (viewActive()) { EpisodeView.showDamageEffect(); }
  }

  return {
    showPage,
    showDamageEffect,
  };

})();
