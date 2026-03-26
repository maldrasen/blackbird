global.PositionController = (function() {

  function repositionIfNecessary(sexAction) {
    if (PositionController.isPositionAligned(sexAction) === false) {
      const move = findAlignedPosition(sexAction);
      move ? shiftPosition(move) : changePosition(sexAction);
    }
  }

  function isPositionAligned(sexAction) {
    const state = TrainingController.getState();
    const actionAlignment = sexAction.getAlignment();

    return checkAlignment(actionAlignment.player, state.getPlayerAlignment()) &&
           checkAlignment(actionAlignment.partner, state.getPartnerAlignment());
  }

  // The sex action alignment will have a map of parts with each part having an alignment value:
  //   { cock:CockAlignment.sucked }
  // The position alignment will have a map of parts with each part having an array of alignment values:
  //   { cock:[CockAlignment.rubbed, CockAlignment.sucked] }
  // This function checks to see that each value in the sex action alignment map has a corresponding value in the
  // position alignment array.
  function checkAlignment(action, position) {
    return ['ass','breasts','cock','hands','mouth'].map(key => {
      return (action[key] == null) ? true : (position[key]||[]).includes(action[key]);
    }).includes(false) === false;
  }

  function findAlignedPosition(sexAction) {
    const actionAlignment = sexAction.getAlignment();
    const state = TrainingController.getState();
    const playerFirst = state.getPositionContext().A === state.getPlayer();

    const canShift = state.getPosition().getMoves().filter(move => {
      const adjacent = SexPosition.lookup(move.code);
      const flip = move.swap ? !playerFirst : playerFirst;
      const { first, second } = adjacent.getAlignment();
      const [playerAlignment, partnerAlignment] = flip ? [first, second] : [second, first];

      return checkAlignment(actionAlignment.player, playerAlignment) &&
             checkAlignment(actionAlignment.partner, partnerAlignment);
    });

    return canShift.length > 0 ? Random.from(canShift) : null;
  }

  // TODO: Shift position needs to reconsider all persisted actions.

  function shiftPosition(move) {
    const state = TrainingController.getState();
    const context = state.getPositionContext();
    const [first, second] = move.swap ? [context.B, context.A] : [context.A, context.B];
    const message = move.generator({ A:first, B:second });

    state.addMessage('shift-position',message);
    state.setPositionData({ code:move.code, first:first, second:second });
  }

  // TODO: Change position needs to remove all persisted actions.

  function changePosition(sexAction) {
    const actionAlignment = sexAction.getAlignment();
    const state = TrainingController.getState();
    const player = state.getPlayer();
    const partner = state.getPartner();
    const valid = [];

    SexPosition.getAllCodes().forEach(code => {
      const sexPosition = SexPosition.lookup(code);
      const alignment = sexPosition.getAlignment();

      if (checkAlignment(actionAlignment.player, alignment.first) &&
          checkAlignment(actionAlignment.partner, alignment.second)) {
        valid.push({ code:code, first:player, second:partner });
      }
      else if (checkAlignment(actionAlignment.player, alignment.second) &&
               checkAlignment(actionAlignment.partner, alignment.first)) {
        valid.push({ code:code, first:partner, second:player });
      }
    });

    const positionData = Random.from(valid);
    const position = SexPosition.lookup(positionData.code);

    state.addMessage('change-position', position.getRearrange({ A:positionData.first, B:positionData.second }));
    state.setPositionData(positionData)
  }

  return Object.freeze({
    isPositionAligned,
    repositionIfNecessary,
    findAlignedPosition,
    shiftPosition,
    changePosition,
  });

})();
