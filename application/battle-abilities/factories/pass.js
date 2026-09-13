Ability.Pass = function() {
  const ability = Ability();

  return ability;
}

/*
Ability.register('pass',{
  name: 'Pass',
  category: 'basic',

  canBeUsed: () => {
    const statusEffects = StatusEffects(BattleSystem.getRound().getActing());
    return statusEffects.hasStun() || statusEffects.hasParalysis();
  },

  execute: () => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const status = StatusEffects(acting);

    round.addTime(1000,false);

    if (status.hasStun()) {
      const count = status.get('stun').count;
      round.addMessage({
        text: (count === 1) ? `{A:ActingName} recovers from being {S/nst}Stunned{/S}` : `{A:ActingName} can't act this turn.`
      });
    }

    if (round.getMessages().length === 0) {
      throw new Error(`Entity:${acting} passed their turn, but no message was added.`);
    }
  },

});
*/