global.BattleSpellSystem = (function() {

  // The spell's casting time was already spent when the cast began, so the release itself only takes a moment.
  function castSpell() {
    const spellData = BattleSystem.getState().finishCastingSpell();
    const spell = Spell.lookup(spellData.code);

    BattleSystem.getRound().addTime(500);
    EffectSystem.applyDuringBattle(spell, spellData.powerLevel);
  }

  return {
    castSpell,
  };

})();