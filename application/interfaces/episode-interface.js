global.EpisodeInterface = (function() {

  function showPage(page) {
    if (Environment.viewPresent() === false) { return; }
    EpisodeView.setPageContent(page);
  }

  function showDamageEffect() {
    if (Environment.viewPresent() === false) { return; }
    EpisodeView.showDamageEffect();
  }

  return Object.freeze({
    showPage,
    showDamageEffect,
  });

})();
