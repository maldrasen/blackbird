global.AnusFactory = (function() {

  // We clamp the minWidth to 24 to make anal penetration easier for small species. Havlins and kobolds just have big
  // assholes I guess.
  function build() {
    const state = CharacterFactory.getState();
    const species = state.getSpecies();
    const reference = species.getBody().anus || {};

    state.setAnus({
      placement: 'normal',
      shape: reference.shape || Random.fromFrequencyMap({ normal:70, puffy:15, wrinkled:15 }),
      minWidth: 0,
      maxWidth: Math.max(24, Math.round(Random.roll(35,55) * species.getLengthRatio())),
      prolapseLength: 0,
    });
  }

  // This seems overkill for one trigger, but it follows the same pattern as the others, and it will be easy to add
  // more if necessary.
  function applyTriggers() {
    const state = CharacterFactory.getState();
    const anusData = state.getAnus();

    function andRemove(trigger) {
      Console.log(`Applied ${trigger}`,{ system:'AnusFactory', level:3 });
      state.removeTrigger(trigger);
    }

    state.getTriggers().forEach(trigger => {

      // Change shape to horse and increase the size by 120% - 150%.
      if (trigger === 'horse-anus') {
        anusData.shape = 'horse';
        anusData.maxWidth = Math.round(anusData.maxWidth * (1.2 + Random.roll(30)/100));
        andRemove(trigger);
      }

    });

    state.setAnus(anusData);
  }

  return Object.freeze({ build, applyTriggers });

})();
