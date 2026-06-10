global.ChangeEquipment = (function() {

  // TODO: Changing equipment in battle needs to be a different interface from
  //       the normal equipment change screen. We only allow characters to
  //       change small things. Probably just weapons, but rings and charms and
  //       such should be possible as well as it might be important to add a
  //       resistance in a battle. This can be a smaller control as well,
  //       probably just a dialog.

  function start() {
    const state = BattleSystem.getState();
    const character = Character(state.getActingCharacter());

    BattleSystem.finishCharacterTurn({
      time: 500,
      messages: [{ text:`TODO: ${character.getName()} changes equipment...` }],
    });
  }

  return Object.freeze({
    start,
  });

})();
