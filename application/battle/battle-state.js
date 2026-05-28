global.BattleState = function(data) {

  // TODO: Should check if the after battle return point is a valid point. Returning to the main menu should not be
  //       possible during a normal game for instance. This will usually be set to the dungeon or a running event.
  Validate.exists('BattleState.afterBattle',data.afterBattle);

  const afterBattle = data.afterBattle;

  function getAfterBattle() { return afterBattle; }

  return Object.freeze({
    getAfterBattle,
  });

}
