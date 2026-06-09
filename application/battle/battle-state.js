global.BattleState = function(data) {

  const AMBUSH_REACTION_TIME = 1000;

  // TODO: Should check if the after battle return point is a valid point. Returning to the main menu should not be
  //       possible during a normal game for instance. This will usually be set to the dungeon or a running event.
  const afterBattle = data.afterBattle || 'dungeon';
  const encounter = findEncounter(data);
  const turnOrder = [];

  // TODO: The party formation is a copy of the formation in the configuration, that way if party characters are moved
  //       around they'll return to their original positions after the battle. If a character is killed or disabled
  //       though we'll need to make a persistent change to put any character that was behind the fallen character into
  //       the front rank.
  const partyFormation = { ...PartyConfiguration.getConfiguration() };
  const monsterFormation = {};

  let ambushState = 'normal';

  // Theoretically these can change and should be based off of the position values as defined in the formation (or
  // from the encounter formation itself) It's fine to leave these hard coded for now though I think.
  function getMaxMonsterRank() { return 5; }
  function getMaxMonsterColumn() { return 5; }
  function getMaxPartyRank() { return 2; }
  function getMaxPartyColumn() { return 5; }

  // The cleanup() function needs to be called after the battle to remove the temporary monsters that were built.
  //
  // TODO: If a monster is to be made permanent it should either be removed from the array or in some way should
  //       be flagged as persistent. Sometimes monsters will need to be used in a follow on event, so maybe cleanup
  //       should be done after that event instead.
  //
  // TODO: Actually, we'll need to change this as dead monsters should be removed from the formation. If we move dead
  //       monsters into a 'dead pile' I think they can all be safely deleted. Monsters that are incapacitated
  //       shouldn't take up space in the formation either though. Something to think about.
  function cleanup() {
    Object.values(monsterFormation).forEach(id => {
      Registry.deleteEntity(id);
    });
  }

  // The encounter code might be set directly in the battle data. If not, fall back by picking an encounter from the
  // current dungeon floor.
  function findEncounter(data) {
    if (data.encounter) { return Encounter.lookup(data.encounter); }
    throw `Battle needs to find encounter in some other way.`
  }

  function addMonster(id, position) {
    if (position.match(/\d\.\d/) === false) { throw `Position[${position}] is invalid` }
    monsterFormation[position] = id;
  }

  function getPositionOf(id) {
    const monsters = Object.entries(monsterFormation);
    const characters = Object.entries(partyFormation);

    for (let i=0; i<monsters.length; i++) {
      if (monsters[i][1] === id) { return monsters[i][0]; }
    }
    for (let i=0; i<characters.length; i++) {
      if (characters[i][1] === id) { return characters[i][0]; }
    }

    throw new Error(`Entity[${id}] is not in a battle formation.`);
  }

  function getMonsterAtPosition(rank, position) {
    return monsterFormation[`${rank}.${position}`] || null;
  }

  function getCharacterAtPosition(rank, position) {
    return partyFormation[`${rank}.${position}`] || null;
  }

  function isMonsterRankOccupied(rank) {
    for (let p=0; p<getMaxMonsterColumn(); p++) {
      if (getMonsterAtPosition(rank, p)) { return true; }
    }
    return false;
  }

  function getMonsters() { return Object.values(monsterFormation); }
  function getCharacters() { return Object.values(partyFormation); }
  function isMonster(id) { return getMonsters().includes(id); }

  // === Turn Order ====================================================================================================

  // The turn order is modeled as a simple queue, ordered by the time value of the actors in the array. Once an entity
  // has an entry in the array, we can update its time value as the other values should be immutable.
  //   data.time - time for next scheduled action
  //   data.type - monster, character, status-effect
  //   data.id - entity id (status effects will also have the id of the entity with the status effect)
  //   data.code - code for status effects
  function setTurnOrder(data) {
    const key = buildKey(data);
    const index = turnOrderIndex(key);

    if (index >= 0) {
      turnOrder[index].time = data.time;
    } else {
      turnOrder.push({ ...data, key });
    }

    sortTurnOrder();
  }

  function sortTurnOrder() {
    turnOrder.sort((a,b) => { return a.time - b.time });
  }

  // Setting the ambush state also adjusts the turn order accordingly.
  // State can be normal, party-ambushed, monsters-ambushed
  function setAmbushState(state) {
    ambushState = state;

    if (ambushState === 'party-ambushed') {
      turnOrder.forEach(data => {
        if (data.type === 'character') { data.time += AMBUSH_REACTION_TIME; }
      });
      sortTurnOrder();
    }

    if (ambushState === 'monsters-ambushed') {
      turnOrder.forEach(data => {
        if (data.type === 'monster') { data.time += AMBUSH_REACTION_TIME; }
      });
      sortTurnOrder();
    }
  }

  function buildKey(data) {
    return data.code ? `${data.type}.${data.id}.${data.code}` : `${data.type}.${data.id}`;
  }

  function turnOrderIndex(key) {
    for (let i=0; i<turnOrder.length; i++) {
      if (turnOrder[i].key === key) { return i; }
    }
    return -1;
  }

  function getNext() {
    return { ...turnOrder[0] };
  }

  function removeFromTurnOrder(data) {
    const key = buildKey(data);
    const index = turnOrderIndex(key);

    if (index < 0) {
      throw `Key:${key} is not in turn order.`
    }

    turnOrder.splice(index, 1)
  }

  return Object.freeze({
    cleanup,
    getAfterBattle: () => { return afterBattle; },
    getEncounter: () => { return encounter; },
    addMonster,
    getMonsterFormation: () => { return { ...monsterFormation }; },
    getPartyFormation: () => { return { ...partyFormation }; },
    getMaxMonsterRank,
    getMaxMonsterColumn,
    getMaxPartyRank,
    getMaxPartyColumn,

    getPositionOf,
    getMonsterAtPosition,
    getCharacterAtPosition,
    isMonsterRankOccupied,
    getMonsters,
    getCharacters,
    isMonster,

    setTurnOrder,
    getTurnOrder: () => { return [ ...turnOrder ]; },
    setAmbushState,
    getAmbushState: () => { return ambushState; },
    getNext,
    removeFromTurnOrder,
  });

}
