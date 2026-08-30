global.GameFlags = (function() {

  const flags = {
    oathTaken: 'oath-taken',
    sixBladeStatus: 'six-blade.status',
    sixBladeRespect: 'six-blade.respect',
  }

  function seed() {
    const state = GameSystem.getState();
    if (state.getFlag(flags.sixBladeStatus) != null) {
      throw new Error(`This game's flags have already been seeded.`);
    }

    state.setFlag(flags.sixBladeStatus,'unknown');
    state.setFlag(flags.sixBladeRespect,0);
  }

  return {
    ...flags,
    seed
  };

})();
