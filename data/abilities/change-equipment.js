Ability.register('change-equipment',{
  name: 'Change Equipment',
  category: 'utility',
  needsTarget: false,

  canBeUsed: () => { return true; },

  // TODO: Changing equipment in battle needs to be a different interface from the normal equipment change screen. We
  //       only allow characters to change small things. Probably just weapons, but rings and charms and such should be
  //       possible as well as it might be important to add a resistance in a battle. This can be a smaller control as
  //       well, probably just a dialog.

  execute: () => {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.setTime(500);
    round.addMessage({ text:`TODO: {A:name} changes equipment...` });
  },

});
