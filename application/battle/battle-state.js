global.BattleState = function(data) {

  // TODO: Should check if the after battle return point is a valid point. Returning to the main menu should not be
  //       possible during a normal game for instance. This will usually be set to the dungeon or a running event.
  const afterBattle = data.afterBattle;
  const encounter = findEncounter(data);
  const turnOrder = {};

  Validate.exists('BattleState.afterBattle',afterBattle);


  // The encounter code might be set directly in the battle data. If not, fall back by picking an encounter from the
  // current dungeon floor.
  function findEncounter(data) {
    if (data.encounter) { return Encounter.lookup(data.encounter); }
    throw `Battle needs to find encounter in some other way.`
  }

  return Object.freeze({
    getAfterBattle: () => { return afterBattle; },
    getEncounter: () => { return encounter; },
  });

}
