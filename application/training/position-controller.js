global.PositionController = (function() {

  function repositionIfNecessary(sexAction) {
    if (sexAction.getForcePosition() != null) { return forcePosition(sexAction); }

    if (PositionController.isPositionAligned(sexAction) === false) {
      const move = findAlignedPosition(sexAction);
      move ? shiftPosition(sexAction, move) : changePosition(sexAction);
    }
  }

  // If the sex action doesn't have an alignment then it should either force a
  // position (like lap-dance) or can be done in any position (like masturbate)
  function isPositionAligned(sexAction) {
    const state = TrainingController.getState();
    const actionAlignment = sexAction.getAlignment();

    if (actionAlignment == null) { return true; }

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

  function shiftPosition(sexAction, move) {
    const state = TrainingController.getState();
    const context = state.getPositionContext();
    const attitude = state.getAttitude();
    const [first, second] = move.swap ? [context.B, context.A] : [context.A, context.B];
    const message = move.generator({ A:first, B:second, attitude:attitude });

    state.addMessage(TrainingMessage.shiftPosition, message);
    state.setPositionData({ code:move.code, first:first, second:second });

    TrainingController.checkPersistedActions(sexAction);

    if ([Attitude.violent, Attitude.resistant, Attitude.fearful].includes(attitude)) {
      TrainingController.positionUsedHands();
    }
  }

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
    const positionContext = { A:positionData.first, B:positionData.second, attitude:state.getAttitude() };

    state.removeAllPersistedActions();
    state.addMessage(TrainingMessage.changePosition, position.getRearrange(positionContext));
    state.setPositionData(positionData)
  }

  function forcePosition(sexAction) {
    const forcePosition = sexAction.getForcePosition();
    const position = SexPosition.lookup(forcePosition.code);
    const state = TrainingController.getState();
    const currentPosition = state.getPosition().getCode();

    if (currentPosition !== forcePosition.code) {
      const player = state.getPlayer();
      const partner = state.getPartner();
      const [first,second] = forcePosition.playerFirst ? [player,partner] : [partner,player];
      const positionContext = { A:first, B:second, attitude:state.getAttitude() };

      state.removeAllPersistedActions();
      state.addMessage(TrainingMessage.changePosition, position.getRearrange(positionContext));
      state.setPositionData({ code:forcePosition.code, first:first, second:second });
    }
  }

  return Object.freeze({
    isPositionAligned,
    repositionIfNecessary,
    findAlignedPosition,
    shiftPosition,
    changePosition,
  });

})();
