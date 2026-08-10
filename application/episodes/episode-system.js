global.EpisodeSystem = (function() {
  let state;

  function startEpisode(code, context) {
    state = EpisodeState(code, context);
  }

  function endEpisode() {
    const episode = state.getEpisode();
    const endFunction = episode.getEndFunction();

    if (typeof endFunction === 'function') {
      return endFunction();
    }

    GameSystem.returnToPreviousMode();
  }

  function nextPage() {
    const page = state.getNextPage();
    if (page == null) {
      return endEpisode();
    }
    applyFlags(page);
    EpisodeView.setPageContent(page);
    applyDamage(page);
    page.executeOnShow();
  }

  function applyFlags(page) {
    Object.entries(page.getFlags()).forEach(([key,value]) => {
      GameSystem.getState().setFlag(key,value);
    });
  }

  // Scripted episode damage goes straight to the player's health, skipping armor and the battle damage pipeline. The
  // page clamps the damage so it can never drop the player below 1 health. This must run after setPageContent() so
  // the page's damage result block is built from the same pre-damage health.
  function applyDamage(page) {
    const damage = page.getDamage();
    if (damage == null || damage === 0) { return; }

    const player = GameSystem.getState().getPlayer();
    const health = HealthComponent.lookup(player);
    health.currentHealth -= damage;
    HealthComponent.update(player, health);

    EpisodeView.showDamageEffect();
  }

  function jumpToPage(label) {
    state.setNextPage(label);
    nextPage();
  }

  return Object.freeze({
    getState: () => { return state; },
    getContext: () => { return state.getContext(); },
    getPartner: () => { return state.getContext().T; },
    getPlayer: () => { return state.getContext().P; },
    getEpisode: () => { return state.getEpisode(); },
    setPropertyValue: (key, value) => { state.setPropertyValue(key, value); },
    getPropertyValue: key => { return state.getPropertyValue(key); },

    startEpisode,
    endEpisode,
    nextPage,
    jumpToPage,
  });

})();
