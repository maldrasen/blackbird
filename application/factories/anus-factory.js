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

  // === Triggers ======================================================================================================

  // Seems overkill for one trigger, but it follows the same pattern
  // as the others, and it will be easy to add more if necessary.
  function applyTriggers(anusData, triggers) {

    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'AnusFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    [...triggers].forEach(trigger => {

      // Change shape to horse and increase the size by 120% - 150%.
      if (trigger === 'horse-anus') {
        anusData.shape = 'horse';
        anusData.maxWidth = Math.round(anusData.maxWidth * (1.2 + Random.roll(30)/100));
        andRemove(trigger);
      }

    });
  }

  return Object.freeze({ build, applyTriggers });

})();
