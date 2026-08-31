global.BattleSpellSystem = (function() {

  function castSpell(entity) {
    const state = BattleSystem.getState();
    const spellData = state.finishCastingSpell(entity);
    // TODO: Cast spell using spell data.
  }

  return {
    castSpell,
  };

})();