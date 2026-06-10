global.UseItem = (function() {

  // TODO: Using an item will need to first show an item select dialog, showing
  //       only the items that can be used in combat. Depending on the item
  //       picked we'll need to then hide the dialog so that a target can be
  //       picked.

  function start() {
    const state = BattleInterface.getState();
    const character = Character(state.getActingCharacter());

    BattleInterface.showCharacterResult({
      time: 500,
      messages: [{ text:`TODO: ${character.getName()} uses item...` }],
    });
  }

  return Object.freeze({
    start,
  })

})();