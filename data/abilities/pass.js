Ability.register('pass',{
  name: 'Pass',
  category: 'basic',

  // There might be other reasons a character has to pass. Being stunned is the only one we have now though.
  canBeUsed: () => {
    const round = BattleSystem.getRound();
    const state = BattleSystem.getState();
    const acting = round.getActing();

    return state.hasStatusEffect(acting,'stun');
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const state = BattleSystem.getState();
    const acting = round.getActing();

    round.addTime(1000,false);

    if (state.hasStatusEffect(acting,'stun')) {
      const duration = state.getStatusEffects(acting)['stun'].getDuration();
      round.addMessage({
        text: (duration === 1) ? `{A:baseName} recovers from being {S/nst}Stunned{/S}` : `{A:baseName} can't act this turn.`
      });
    }

    if (round.getMessages().length === 0) {
      throw new Error(`Entity:${acting} passed their turn, but no message was added.`);
    }
  },

});
