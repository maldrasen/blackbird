global.BattleController = (function() {

  let state;

  // A battle needs to have a location set which it will look up a table detailing what kind of monsters can be
  // found there. Not every battle will be in the dungeon though, so for event driven encounters and such we should
  // be able to set that directly on the battle controller and have it fall back to the dungeon floor.

  // Battle will need to generate entities from the encounter table.

  // Once enemies are generated as entities we need to determine combat order.
  //  - It's possible that one side or the other could have a surprise round. This can be set by the initial battle
  //    data if the initializing event has the player being ambushed or ambushing.
  //
  //  - Assuming the sides start at the same time, we probably roll for reaction time to determine the initial order.
  //    Reaction time should be dex based, but could be influenced by feats or spells or such. I think it's best to
  //    represent the battle order as reaction time in milliseconds. Assume everyone starts at 0, higher values are
  //    slower. Each action chosen by the character has an associated time in milliseconds that it takes, and we just
  //    keep a running tally as they take actions. The character with the lowest 'time at next action' goes next.
  //
  // - Keeping track of battle time in ms keeps the speed of actions granular. Action values should be pretty high, but
  //   the difference between attacking every 550ms vs every 500ms is somewhat noticeable.

  function startBattle(data) {
    console.log("=== Start Battle ===");
    state = BattleState(data);
  }

  return Object.freeze({
    startBattle,
  });

})();