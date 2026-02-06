global.CockFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const cockData = {
      placement: 'normal',
      count: 1,
      shape: 'normal',
      testicleCount: 2,
    };

    return cockData;
  }

  return Object.freeze({ build });

})();
