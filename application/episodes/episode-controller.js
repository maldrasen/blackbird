global.EpisodeController = (function() {
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

    StateMachine.returnToPreviousMode();
  }

  function nextPage() {
    const page = state.getNextPage();
    if (page == null) {
      return endEpisode();
    }
    EpisodeView.setPageContent(page);
  }

  return Object.freeze({
    getState: () => { return state; },
    getContext: () => { return state.getContext(); },
    getPartner: () => { return state.getContext().T; },
    getPlayer: () => { return state.getContext().P; },
    getEpisode: () => { return state.getEpisode(); },
    getProperties: () => { return state.getProperties() },
    setPropertyValue: (key, value) => { state.setPropertyValue(key, value); },
    getPropertyValue: key => { return state.getPropertyValue(key); },

    startEpisode,
    endEpisode,
    nextPage,
  });

})();
