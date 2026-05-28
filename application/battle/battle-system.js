global.BattleSystem = (function() {

  // There isn't a player command that just directly starts a battle. Random battles usually happen as the result of a
  // move command, or can be triggered from an event choice. When a battle is started from a dungeon move the battle
  // mode is changed to battle, but we need to be able to easily switch back to the dungeon view once the battle is
  // over. If the battle came from an event though we need to go back to the position in the event...
  //
  // Battle commands will usually be in the form of orders given to characters; attack this target, cast this spell,
  // etc.
  function run(command) {

  }

  return Object.freeze({
    run
  })

})();
