global.PositionController = (function() {

  // TODO: Make sure this new action is compatible with existing position. If it isn't then determine the closest
  //   position that is. We can set the current position to the one we found. If there was no connection between
  //   positions then all the persisted actions are removed. If there was a connection between the connections then
  //   we'll need to check the existing persisted actions for the ones that are still possible. Changing the position
  //   also adds a message to the state detailing the move that was made.
  function checkPosition(sexAction) {
    const state = TrainingController.getState();
    const position = state.getPosition();
    const playerAlignment = state.getPlayerAlignment();
    const partnerAlignment = state.getPartnerAlignment();

    console.log(`Check Position [${position.getName()}] against ${sexAction.getName()}`);
    console.log(`  Player`,playerAlignment);
    console.log(`  Partner`,partnerAlignment);

    return true;
  }

  return Object.freeze({
    checkPosition
  });

})();
