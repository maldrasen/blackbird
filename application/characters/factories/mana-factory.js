global.ManaFactory = (function() {

  // Every character starts with a pool for each color, rolled from their species' mana grades. A color the species
  // has no affinity for starts empty, as does every pool for a human, who has no natural mana at all.
  function build() {
    const state = CharacterFactory.getState();
    const grades = state.getSpecies().getMana() || {};
    const mana = {};

    Object.values(Mana).forEach(color => {
      const max = ManaMath.startingPool(grades[color]);
      mana[color] = { current:max, max:max };
    });

    state.setMana(mana);
  }

  return { build };

})();
