Ability.register('basic-defend',{
  name: 'Defend',
  category: 'basic',
  needsTarget: false,

  canBeUsed: () => { return true; },

  execute: () => {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.setTime(1000);
    round.addMessage({ text:`{S/act}{A:baseName}{/S} takes a defensive stance, becoming {S/pst}Poised{/S}.` });

    BattleSystem.getState().addStatus(BattleStatusEffect(round.getActing(), 'poised', { duration:1 }));
  },

});
