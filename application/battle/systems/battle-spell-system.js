global.BattleSpellSystem = (function() {

  function castSpell() {
    const state = BattleSystem.getState();
    const spellData = state.finishCastingSpell();
    // TODO: Cast spell using spell data.
  }

  return {
    castSpell,
  };

})();