global.BattleSpellSystem = (function() {

  // The spell's casting time was already spent when the cast began, so the release itself only takes a moment.
  function castSpell() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const spellData = BattleSystem.getState().finishCastingSpell();
    const spell = Spell.lookup(spellData.code);
    const check = spell.rollSkillCheck(acting, spellData.powerLevel);

    round.addTime(500);
    if (check.result === 'fail') {
      return round.addMessage({ text:`{A:ActingName} fucked up casting {A:his} spell.` });
    }

    EffectSystem.applyDuringBattle(spell, { ...spellData, powerLevel:check.powerLevel });
  }

  return {
    castSpell,
  };

})();