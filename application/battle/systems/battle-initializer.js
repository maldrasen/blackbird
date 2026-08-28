global.BattleInitializer = (function() {

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
    const state = BattleSystem.getState();

    Object.keys(state.getMonsterFormation()).forEach(id => {
      state.setTurnOrder({
        type: 'monster',
        id: id,
        time: Random.roll(1000),
      });
    });

    Object.keys(state.getPartyFormation()).forEach(id => {
      state.setTurnOrder({
        type: 'character',
        id: id,
        time: Random.roll(1000),
      });
    });
  }

  // Monsters decide their target based on their threat table, but these tables need to have some value for each
  // character. The monster types set different weights on the functions used to determine threat, that way different
  // monsters will have different target priorities. They could simply target the closest first, or the least armored,
  // or the most injured.
  function populateThreatTables() {
    BattleSystem.getState().getActiveMonsters().forEach(id => {
      Monster(id).populateThreatTable();
    });
  }

  // Every monster ability with a cooldown starts the battle already on a random cooldown of up to its full time.
  // Otherwise every monster of the same type would open the battle with the same highest priority ability. A roll of
  // zero leaves the ability ready to use immediately.
  function rollInitialCooldowns() {
    const state = BattleSystem.getState();

    state.getActiveMonsters().forEach(id => {
      const monster = Monster(id);
      monster.getPrioritizedAbilities().forEach(ability => {
        const cooldown = monster.getAbilityCooldown(ability.code);
        if (cooldown) {
          const initial = Random.roll(cooldown + 1);
          if (initial > 0) { state.setCooldown(id, ability.code, initial); }
        }
      });
    });
  }

  // TODO: Keeping the ambush state super simple, stupid, and frequent for now. There will eventually be variables
  //       that effect the ambush chances here. Scouting ahead or something to make favorable ambushes more likely.
  //       Some monster types (sneaky ones) will also be more likely to ambush, whereas big stompy monsters will be
  //       easier for you to ambush.
  function rollAmbush() {
    const ambushRoll = Random.roll(100);
    if (ambushRoll < 30) { return AmbushState.partyAmbushed; }
    if (ambushRoll > 70) { return AmbushState.monstersAmbushed; }
    return AmbushState.normal;
  }

  return {
    rollReactionTimes,
    populateThreatTables,
    rollInitialCooldowns,
    rollAmbush,
  };

})();
