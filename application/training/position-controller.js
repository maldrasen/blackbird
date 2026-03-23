global.PositionController = (function() {

  // TODO: Make sure this new action is compatible with existing position. If it isn't then determine the closest
  //   position that is. We can set the current position to the one we found. If there was no connection between
  //   positions then all the persisted actions are removed. If there was a connection between the connections then
  //   we'll need to check the existing persisted actions for the ones that are still possible. Changing the position
  //   also adds a message to the state detailing the move that was made.
  function checkPosition(sexAction) {

    const state = TrainingController.getState();
    const position = state.getPosition();
    const alignment = position.getAlignment();
    const actionUses = sexAction.getUses();

    console.log(`Check Position [${position.getName()}] against ${sexAction.getName()}`);

    let playerAlignment;
    let partnerAlignment;
    let isAligned = true;

    if (state.getPositionContext().first === state.getPlayer()) {
      playerAlignment = alignment.first;
      partnerAlignment = alignment.second;
    } else {
      playerAlignment = alignment.second;
      partnerAlignment = alignment.first;
    }

    console.log(`  Player`,playerAlignment);
    console.log(`  Partner`,partnerAlignment);

    actionUses.player.forEach(playerSlot => {
      actionUses.partner.forEach(partnerSlot => {

        console.log(`    Are slots aligned?`,playerSlot,partnerSlot);

        if (['mouth','hands','cock','ass'].includes(partnerSlot)) {
          console.log(`    ${playerSlot} included in `,partnerAlignment[partnerSlot])
          partnerAlignment[partnerSlot].includes(playerSlot);
        }
        if (['mouth','hands','cock','ass'].includes(playerSlot)) {
          console.log(`    ${partnerSlot} included in `,playerAlignment[playerSlot])
          playerAlignment[playerSlot].includes(partnerSlot);
        }

      });
    })
  }







  return Object.freeze({
    checkPosition
  });

})();
