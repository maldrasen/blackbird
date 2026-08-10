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
    page.executeOnShow();
  }

  function applyFlags(page) {
    Object.entries(page.getFlags()).forEach(([key,value]) => {
      GameSystem.getState().setFlag(key,value);
    });
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
