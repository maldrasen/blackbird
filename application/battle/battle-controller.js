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
  //
  // - Some status effects have periodic effects. Rather than being dependent on the character they should go into the
  //   turn order.

  function startBattle(data) {
    console.log("=== Start Battle ===");
    state = BattleState(data);

    buildMonsters(state.getEncounter().buildFormation());

    console.log("Starting Formation")
    console.log(state.getPartyFormation());
    console.log(state.getMonsterFormation());

  }

  // When building the monsters we take the formation from the encounter and loop though the arrays that represent the
  // ranks and columns. The values in the arrays are passed to the monster factory to build the monster then its entity
  // ID is added to the state at the proper position in the monster formation.
  function buildMonsters(formation) {
    for (let r=0; r<formation.length; r++) {
      for (let p=0; p<formation[r].length; p++) {
        if (formation[r][p]) {
          const monster = MonsterFactory.build(formation[r][p]);
          state.addMonster(monster,`${r}.${p}`);
        }
      }
    }
  }

  function endBattle() {
    state.cleanup();
    state = null;
  }

  return Object.freeze({
    startBattle,
    endBattle,
    getState: () => { return state; },
  });

})();
