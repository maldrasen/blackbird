global.EncounterBuilder = (function() {

  // When building the monsters we take the formation from the encounter and loop though the arrays that represent the
  // ranks and columns. The values in the arrays are passed to the monster factory to build the monster then its entity
  // ID is added to the state at the proper position in the monster formation.
  function buildMonsters(state) {
    const formation = state.getEncounter().buildFormation();
    for (let r=0; r<formation.length; r++) {
      for (let p=0; p<formation[r].length; p++) {
        if (formation[r][p]) {
          const monster = MonsterFactory.build(formation[r][p]);
          state.addMonster(monster,`M.${r}.${p}`);
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
  function rollReactionTimes(state) {
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
  function populateThreatTables(state) {
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
    buildMonsters,
    rollReactionTimes,
    populateThreatTables,
    rollAmbush,
  });

})();
