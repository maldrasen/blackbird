Ability.register('use-item',{
  name: 'Use Item',
  category: 'utility',

  // TODO: Use Item might need a target. We first need to select the item and when the item is selected bring up the
  //       targeting interface if it needs one.
  needsTarget: false,

  canBeUsed: () => { return true; },

  // TODO: Using an item will need to first show an item select dialog, showing
  //       only the items that can be used in combat. Depending on the item
  //       picked we'll need to then hide the dialog so that a target can be
  //       picked.

  execute: () => {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.setTime(500);
    round.addMessage({ text:`TODO: {A:name} uses item...` });
  },

});
