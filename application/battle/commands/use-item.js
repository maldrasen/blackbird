global.UseItem = (function() {

  // TODO: Using an item will need to first show an item select dialog, showing
  //       only the items that can be used in combat. Depending on the item
  //       picked we'll need to then hide the dialog so that a target can be
  //       picked.

  function start() {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.setTime(500);
    round.addMessage({ text:`TODO: {A:name} uses item...` });

    BattleSystem.finishCharacterRound();
  }

  return Object.freeze({
    start,
  })

})();
