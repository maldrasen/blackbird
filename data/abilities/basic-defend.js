Ability.register('basic-defend',{
  name: 'Defend',
  category: 'basic',

  canBeUsed: () => { return true; },

  execute: () => {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.addTime(1000,false);
    round.addMessage({ text:`{S/act}{A:baseName}{/S} takes a defensive stance, becoming {S/pst}Poised{/S}.` });

    BattleSystem.getState().addStatus(BattleStatusEffect(round.getActing(), 'poised', { duration:1 }));
  },

});
