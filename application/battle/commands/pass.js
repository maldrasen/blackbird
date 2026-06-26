global.Pass = (function() {

  function execute() {
    const round = BattleSystem.getRound();
    const state = BattleSystem.getState();
    const acting = round.getActing();

    round.setTime(500);

    if (state.hasStatusEffect(acting,'stun')) {
      const duration = state.getStatusEffects(acting)['stun'].getDuration();
      round.addMessage({
        text: (duration === 1) ? `{A:baseName} recovers from being {S/nst}Stunned{/S}` : `{A:baseName} can't act this turn.`
      });
    }

    if (round.getMessages().length === 0) {
      throw new Error(`Entity:${acting} passed their turn, but no message was added.`);
    }

    if (round.isActingCharacter()) {
      BattleSystem.finishCharacterRound()
    }
  }

  return Object.freeze({
    execute,
  });

})()