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
  const conditions = {};

  let ambushState = 'normal';
  let actingMonster;
  let actingCharacter;

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

  function isInFront(id) {
    return getPositionOf(id)[0] === '0';
  }

  function isInBack(id) {
    return getPositionOf(id)[0] === '1';
  }

  // Get the column that contains the entity, returning if this is a character or a monster, their ids and positions.
  function getColumnContaining(entity) {
    const position = getPositionOf(entity);
    const inFront = isInFront(entity);
    const monster = isMonster(entity);

    const formation = monster ? monsterFormation : partyFormation;
    const otherPosition = `${inFront ? '1' : '0'}.${position[2]}`;
    const first = { id:entity, position:position };
    const second = { id:formation[otherPosition], position:otherPosition };

    const column = { side:monster ? 'monster' : 'party' };
    column.front = inFront ? first : second;
    column.back = inFront ? second : first;

    return column;
  }

  // Will either accept a rank and position or a string in the format r.p
  function getMonsterAtPosition(rank, position=null) {
    if (position == null) { return monsterFormation[rank] || null }
    return monsterFormation[`${rank}.${position}`] || null;
  }

  // Will either accept a rank and position or a string in the format r.p
  function getCharacterAtPosition(rank, position=null) {
    if (position == null) { return partyFormation[rank] || null }
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

  function removeFromFormation(id) {
    const formation = isMonster(id) ? monsterFormation : partyFormation;
    const position = getPositionOf(id);
    delete formation[position];
  }

  // === Turn Order ====================================================================================================

  // The turn order is modeled as a simple queue, ordered by the time value of the actors in the array. Once an entity
  // has an entry in the array, we can update its time value as the other values should be immutable.
  //   data.time - time for next scheduled action
  //   data.type - monster, character, status
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

  // Data: { type, id, code } or { type, id }
  function buildKey(data) {
    Validate.isIn('data.type', data.type, ['monster','character','status']);
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

  // Data: { type, id, code } or { type, id }
  function removeFromTurnOrder(data) {
    const key = buildKey(data);
    const index = turnOrderIndex(key);

    if (index < 0) {
      throw new Error(`Key:${key} is not in turn order.`);
    }

    turnOrder.splice(index, 1)
  }

  // Conditions are for character states that are not status effects; status effects are their own entities that
  // are part of the turn order. Currently the only status I can think of is "dead" so this might just be used to
  // track deaths.
  function addCondition(id, key) {
    if (conditions[id]==null) { conditions[id]=[] }
    conditions[id].push(key);
  }

  function isAlive(id) {
    return conditions[id] == null || conditions[id].includes('dead') === false;
  }

  function setActingCharacter(id) {
    FormationPanel.highlightActingCharacter(id);
    actingCharacter = id;
    actingMonster = null;
  }

  function setActingMonster(id) {
    FormationPanel.highlightActingMonster(id);
    actingCharacter = null;
    actingMonster = id;
  }

  return Object.freeze({
    cleanup,
    getAfterBattle: () => { return afterBattle; },
    getEncounter: () => { return encounter; },
    addMonster,
    getMonsterFormation: () => { return { ...monsterFormation }; },
    getPartyFormation: () => { return { ...partyFormation }; },
    removeFromFormation,

    getPositionOf,
    isInFront,
    isInBack,
    getColumnContaining,
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

    addCondition,
    isAlive,

    setActingCharacter,
    getActingCharacter: () => { return actingCharacter; },
    setActingMonster,
    getActingMonster: () => { return actingMonster; },
  });

}
