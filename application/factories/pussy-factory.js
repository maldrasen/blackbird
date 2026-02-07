global.PussyFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const pussyData = {
      placement: 'normal',
    };

    return pussyData;
  }

  return Object.freeze({ build });

})();
