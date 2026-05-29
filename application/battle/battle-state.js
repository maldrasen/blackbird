global.BattleState = function(data) {

  // TODO: Should check if the after battle return point is a valid point. Returning to the main menu should not be
  //       possible during a normal game for instance. This will usually be set to the dungeon or a running event.
  const afterBattle = data.afterBattle;
  const encounter = findEncounter(data);
  const turnOrder = {};

  // TODO: The party formation is a copy of the formation in the configuration, that way if party characters are moved
  //       around they'll return to their original positions after the battle. If a character is killed or disabled
  //       though we'll need to make a persistent change to put any character that was behind the fallen character into
  //       the front rank.
  const partyFormation = { ...PartyConfiguration.getConfiguration() };
  const monsterFormation = {};

  Validate.exists('BattleState.afterBattle',afterBattle);


  // The encounter code might be set directly in the battle data. If not, fall back by picking an encounter from the
  // current dungeon floor.
  function findEncounter(data) {
    if (data.encounter) { return Encounter.lookup(data.encounter); }
    throw `Battle needs to find encounter in some other way.`
  }

  function addMonster(id, position) {

    console.log("Add monster:",id,position)

    if (position.match(/\d\.\d/) === false) { throw `Position[${position}] is invalid` }
    monsterFormation[position] = id;
  }

  // The cleanup() function needs to be called after the battle to remove the temporary monsters that were built.
  //
  // TODO: If a monster is to be made permanent it should either be removed from the array or in some way should
  //       be flagged as persistent. Sometimes monsters will need to be used in a follow on event, so maybe cleanup
  //       should be done after that event instead.
  //
  function cleanup() {
    monsterFormation.values().forEach(id => {
      Registry.deleteEntity(id);
    });
  }

  return Object.freeze({
    getAfterBattle: () => { return afterBattle; },
    getEncounter: () => { return encounter; },
    addMonster,
    getMonsters: () => { return monsterFormation.values(); },
    getMonsterFormation: () => { return { ...monsterFormation }; },
    getPartyFormation: () => { return { ...partyFormation }; },
    cleanup,
  });

}
