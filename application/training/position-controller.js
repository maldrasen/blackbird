global.PositionController = (function() {

  function isPositionAligned(sexAction) {
    const state = TrainingController.getState();
    const actionAlignment = sexAction.getAlignment();

    return checkAlignment(actionAlignment.player, state.getPlayerAlignment()) &&
           checkAlignment(actionAlignment.partner, state.getPartnerAlignment())
  }

  // The sex action alignment will have a map of parts with each part having an alignment value:
  //   { cock:CockAlignment.sucked }
  // The position alignment will have a map of parts with each part having an array of alignment values:
  //   { cock:[CockAlignment.rubbed, CockAlignment.sucked] }
  // This function checks to see that each value in the sex action alignment map has a corresponding value in the
  // position alignment array.
  function checkAlignment(action, position) {
    return ['ass','breasts','cock','hands','mouth'].map(key => {
      return (action[key] == null) ? true : position[key].includes(action[key]);
    }).includes(false) === false;
  }

  return Object.freeze({
    isPositionAligned
  });

})();
