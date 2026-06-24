global.BasicDefend = (function() {

  // TODO: We could add more variety to the "take a defensive stance" message...
  function execute() {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.setTime(1000);
    round.addMessage({ text:`{S/act}{A:baseName}{/S} takes a defensive stance, becoming {S/pst}Poised{/S}.` });

    BattleSystem.getState().addStatus(BattleStatusEffect(round.getActing(), 'poised', { duration:1 }));

    if (round.isActingCharacter()) {
      BattleSystem.finishCharacterRound()
    }
  }

  return Object.freeze({
    execute,
  });

})();
