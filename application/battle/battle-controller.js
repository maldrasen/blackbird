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
    state = BattleState(data);

    buildMonsters(state.getEncounter().buildFormation());
    rollReactionTimes();
    populateThreatTables();

    state.setAmbushState(data.ambushState || rollAmbush());
  }

  function endBattle() {
    state.cleanup();
    state = null;
  }

  function advanceBattle() {
    const next = state.getNext();

    console.log("=== Advance Battle ===");
    console.log("Next:",next)

    if (next.type === 'monster') {
      const result = MonsterSimulator.executeBattleTurn(next.id);
      FormationPanel.highlightActingMonster(next.id);
      next.time += result.time;
      state.setTurnOrder(next);

      console.log("Result:",result)
      BattleText.setMessages(result.messages);
    }
    if (next.type === 'character') {
      console.log("Show Commands");
      next.time += 1000;
      state.setTurnOrder(next);

      FormationPanel.highlightActingCharacter(next.id);

      const actor = ActorComponent.lookup(next.id);
      BattleText.setMessages([
        { text:`${actor.name} jacks off.` }
      ]);
    }
    // TODO: Now update UI. All monsters and characters will need to be redrawn.
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

  // Still thinking about how this is going to work. There will probably be feats and abilities or something that
  // effect a character's reaction time. For now though each character will just get a random number between 0 and
  // 1000. This is assuming each action takes a second or so. (Faster than D&D 6 second rounds) The tricky part is that
  // there might be actions that reasonably take 10 seconds or so, perhaps even a minute. It seems wrong to allow a
  // character 10 actions in the time it takes another to do one 10 second action. But all this depends on what kind of
  // actions there are to work around. We could adjust this so that a basic attack takes 5 seconds, and do something
  // like in Wizardry where a character may actually attack 5 times in that single action. Even if the average action
  // time becomes 5 seconds though, reaction time shouldn't be longer that a second. If the average action time is 5
  // seconds though an ambush should add 5,000 to the ambushed side's reaction in order for everyone on the ambushing
  // side to get an attack in.
  //
  // A high dex could also affect reaction time, again like D&D, even though reaction time seems more mental than
  // physical to me. Still, I'm not sure what kind of effect it should really have, and there should be diminishing
  // returns so that a 100 dex character doesn't always have a 0ms reaction time or something. We could look at all the
  // character's dexterities and compare them, applying the ratios of the fastest and slowest characters. That way it
  // doesn't matter what the dex cap ends up being as only the difference between the characters' dex matters. But then
  // could you bring a super clumsy character to juice the player's relative dex?
  function rollReactionTimes() {
    Object.values(state.getMonsterFormation()).forEach(id => {
      state.setTurnOrder({
        type: 'monster',
        id: id,
        time: Random.roll(1000),
      });
    });

    Object.values(state.getPartyFormation()).forEach(id => {
      state.setTurnOrder({
        type: 'character',
        id: id,
        time: Random.roll(1000),
      });
    });
  }

  // Monsters decide their target based on their threat table, but these tables need to have some value for each
  // character. The monster brains set different weights on the functions used to determine threat, that way different
  // monsters will have different target priorities. They could simply target the closest first, or the least armored,
  // or the most injured.
  function populateThreatTables() {
    state.getMonsters().forEach(id => {
      Monster(id).populateThreatTable();
    });
  }

  // TODO: Keeping the ambush state super simple, stupid, and frequent for now. There will eventually be variables
  //       that effect the ambush chances here. Scouting ahead or something to make favorable ambushes more likely.
  //       Some monster types (sneaky ones) will also be more likely to ambush, whereas big stompy monsters will be
  //       easier for you to ambush.
  function rollAmbush() {
    const ambushRoll = Random.roll(100);
    if (ambushRoll < 30) { return 'party-ambushed'; }
    if (ambushRoll > 70) { return 'monsters-ambushed'; }
    return 'normal';
  }

  return Object.freeze({
    startBattle,
    endBattle,
    advanceBattle,
    getState: () => { return state; },
  });

})();
