global.EpisodeSystem = (function() {
  let state;

  function startEpisode(code, context) {
    state = EpisodeState(code, context);
    GameSystem.getState().recordEpisodeViewed(code);
  }

  // The end function runs before the state is cleared because it may still read the episode context. It may also
  // start a new episode, in which case the new state is left alone.
  function endEpisode() {
    const ending = state;
    const endFunction = ending.getEpisode().getEndFunction();

    const result = (typeof endFunction === 'function') ? endFunction() : GameSystem.returnToPreviousMode();
    if (state === ending) { state = null; }
    return result;
  }

  function nextPage() {
    const page = state.getNextPage();
    if (page == null) {
      return state.isGameOver() ? showGameOver() : endEpisode();
    }
    applyFlags(page);
    EpisodeInterface.showPage(page);
    applyDamage(page);
    page.executeOnShow();
  }

  function applyFlags(page) {
    Object.entries(page.getFlags()).forEach(([key,value]) => {
      GameSystem.getState().setFlag(key,value);
    });
  }

  // Scripted episode damage goes straight to the player's health, skipping armor and the battle damage pipeline. The
  // page clamps the damage so it can never drop the player below 1 health. This must run after showPage() so the
  // page's damage result block is built from the same pre-damage health.
  function applyDamage(page) {
    const damage = page.getDamage();
    if (damage == null || damage === 0) { return; }

    const player = GameSystem.getState().getPlayer();
    const health = HealthComponent.lookup(player);
    health.currentHealth -= damage;
    HealthComponent.update(player, health);

    EpisodeInterface.showDamageEffect();
  }

  // Advancing past a gameOver page abandons the current episode and starts the game-over episode in its place.
  // Setting the game mode shows the episode view again, which renders the new episode's first page.
  function showGameOver() {
    startEpisode('game-over', {});
    GameSystem.setGameMode(GameMode.episode);
  }

  function jumpToPage(label) {
    state.setNextPage(label);
    nextPage();
  }

  // A button can end its episode by starting a battle with a specific encounter record. The episode is over the
  // moment the fight starts, so the state is dropped without running the endFunction, and the return mode marked
  // when the episode began is left in place for the battle to resolve to.
  function startEncounter(options) {
    state = null;
    BattleSystem.startBattle({ encounter:options.record, ambushState:options.ambushState });
    GameSystem.setGameMode(GameMode.battle);
  }

  function reset() {
    state = null;
  }

  return {
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
    startEncounter,
    reset,
  };

})();
