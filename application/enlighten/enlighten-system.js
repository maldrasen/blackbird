global.EnlightenSystem = (function() {
  let state;

  // TODO: We start the enlighten system when either a battle or training is complete. In either case we want to show
  //       skill increases. Otherwise the two versions are fairly different and will probably require entirely
  //       different views.

  function startEnlightenment(from,data) {
    state = EnlightenState(from,data);
  }

  return Object.freeze({
    getState: () => { return state; },
    startEnlightenment,
  });

})();
