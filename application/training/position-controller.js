global.PositionController = (function() {

  function repositionIfNecessary(sexAction) {
    if (PositionController.isPositionAligned(sexAction) === false) {
      const newPosition = findAlignedPosition(sexAction);

      if (newPosition) {
        const playerFirst = state.getPositionContext().A === state.getPlayer();
        const newContext = {
          first: playerFirst ? state.getPlayer() : state.getPartner(),
          second: playerFirst ? state.getPartner() : state.getPlayer(),
        };
        state.changePosition(newPosition.code, newContext);
      }

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
      return (action[key] == null) ? true : position[key].includes(action[key]);
    }).includes(false) === false;
  }

  // TODO: This keeps the same first/second roles. We need to also consider
  //   moves where the roles swap.
  function findAlignedPosition(sexAction) {
    const actionAlignment = sexAction.getAlignment();
    const state = TrainingController.getState();
    const playerFirst = state.getPositionContext().A === state.getPlayer();

    const canShift = state.getPosition().getMoves().filter(move => {
      const adjacent = SexPosition.lookup(move.code);
      const playerAlignment = adjacent.getAlignment()[playerFirst ? 'first' : 'second'];
      const partnerAlignment = adjacent.getAlignment()[playerFirst ? 'second' : 'first'];

      return checkAlignment(actionAlignment.player, playerAlignment) &&
             checkAlignment(actionAlignment.partner, partnerAlignment);
    });

    return canShift.length > 0 ? Random.from(canShift) : null;
  }

  return Object.freeze({
    isPositionAligned,
    repositionIfNecessary,
    findAlignedPosition,
  });

})();
