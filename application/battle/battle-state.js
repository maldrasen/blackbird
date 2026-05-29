global.BattleState = function(data) {

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

    turnOrder.sort((a,b) => { return a.time - b.time });
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
    getMonsters: () => { return Object.values(monsterFormation); },
    getMonsterFormation: () => { return { ...monsterFormation }; },
    getPartyFormation: () => { return { ...partyFormation }; },
    setTurnOrder,
    getTurnOrder: () => { return [ ...turnOrder ]; },
    getNext,
    removeFromTurnOrder,
  });

}
