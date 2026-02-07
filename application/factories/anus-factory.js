global.AnusFactory = (function() {

  // We clamp the minWidth to 24 to make anal penetration easier for
  // small species. Halflings and kobolds have big assholes I guess.
  function build(actor) {
    const species = Species.lookup(actor.species);
    const reference = species.getBody().anus || {};

    return {
      placement: 'normal',
      shape: reference.shape || Random.fromFrequencyMap({ normal:70, puffy:15, wrinkled:15 }),
      minWidth: 0,
      maxWidth: Math.max(24, Math.round(Random.roll(35,55) * species.getLengthRatio())),
      prolapseLength: 0,
    };
  }

  return Object.freeze({ build });

})();
