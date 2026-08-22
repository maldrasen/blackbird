global.BattleState = function(data) {

  // TODO: Should check if the after battle return point is a valid point. Returning to the main menu should not be
  //       possible during a normal game for instance. This will usually be set to the dungeon or a running event.
  //       The enlighten view will need this. Not sure if we should send it as a new argument for an enlighten state,
  //       or if the battle and training states should still exist until we close the enlighten view, and clean up
  //       everything then.

  const afterBattle = data.afterBattle || 'dungeon';
  const turnOrder = [];

  const partyFormation = { ...PartyConfiguration.getConfiguration() };
  const homePositions = { ...partyFormation };
  const monsterFormation = {};
  const characterIds = Object.keys(partyFormation);
  const monsterIds = [];
  const abilityCooldowns = {};
  const conditions = {};
  const skillImprovements = {};

  characterIds.forEach(id => { conditions[id] = BattleCondition.active; });

  let ambushState = 'normal';
  let startText;
  let negotiationAttempted = false;
  let interrupt;
  let forcedAbility;

  // The cleanup() function needs to be called after the battle to remove the monsters who were killed or ran away.
  function cleanup() {
    [...getDeadMonsters(), ...getFledMonsters()].forEach(id => {
      deleteCarriedItems(id);
      Registry.deleteEntity(id);
    });
  }

  // TODO: Rare items in the monster's inventory should be dropped as loot, though we need to start building rare
  //       items (task 128) before concerning ourselves with that.

  // A monster's equipment items are their own entities, not children of the monster, so they're deleted explicitly.
  function deleteCarriedItems(id) {
    const inventory = InventoryComponent.lookup(id);
    if (inventory) {
      inventory.items.forEach(itemId => Registry.deleteEntity(itemId));
    }
  }

  function addMonster(id, position) {
    if (position.match(BattleConstants.positionPattern) == null) { throw new Error(`Invalid Position: ${position}`); }
    monsterFormation[id] = position;
    monsterIds.push(id);
    conditions[id] = BattleCondition.active;
  }

  function getPosition(id) {
    if (monsterFormation[id]) { return monsterFormation[id]; }
    if (partyFormation[id]) { return partyFormation[id]; }
    throw new Error(`Entity:${id} is not in a formation.`)
  }

  function setPosition(id, position) {
    if (isMonster(id)) {
      delete monsterFormation[id];
      monsterFormation[id] = position;
    } else {
      delete partyFormation[id];
      partyFormation[id] = position;
    }
  }

  // The home positions record where each character returns to when the battle is won. A knock out never touches
  // them, but a death deletes the fallen character's entry and moves the back filler's home forward. The victory
  // commit then leaves the party configuration corpse-free with no exposed back row.
  function setHomePosition(id, position) { homePositions[id] = position; }
  function removeHomePosition(id) { delete homePositions[id]; }

  function isInFront(id) {
    return getPosition(id)[2] === '0';
  }

  function isInBack(id) {
    return getPosition(id)[2] === '1';
  }

  // Get the column that contains the entity, returning if this is a character or a monster, their ids and positions.
  function getColumnContaining(entity) {
    const position = getPosition(entity);
    const inFront = isInFront(entity);
    const monster = isMonster(entity);
    const otherPosition = `${monster ? 'M' : 'P'}.${inFront ? '1' : '0'}.${position[4]}`;

    const first = { id:entity, position:position };
    const second = { id:getEntityAtPosition(otherPosition), position:otherPosition };

    const column = { side:monster ? 'monster' : 'party' };
    column.front = inFront ? first : second;
    column.back = inFront ? second : first;

    return column;
  }

  // Argument is either a position key "M.0.1" or the side, rank, and position that forms the key.
  function getEntityAtPosition(side, rank, position) {
    const id = (rank == null) ? side : `${side}.${rank}.${position}`;
    const monsters = Object.entries(monsterFormation);
    const characters = Object.entries(partyFormation);

    for (let i=0; i<monsters.length; i++) {
      if (monsters[i][1] === id) { return monsters[i][0]; }
    }
    for (let i=0; i<characters.length; i++) {
      if (characters[i][1] === id) { return characters[i][0]; }
    }

    return null;
  }

  function getActiveMonsters() { return monsterIds.filter(id => getCondition(id) === BattleCondition.active); }
  function getActiveCharacters() { return characterIds.filter(id => getCondition(id) === BattleCondition.active); }
  function isMonster(id) { return monsterIds.includes(id); }
  function isCharacter(id) { return characterIds.includes(id); }
  function removeFromFormation(id) { delete (isMonster(id) ? monsterFormation : partyFormation)[id]; }

  function removeFromBattle(id) {
    removeFromTurnOrder({ type:isMonster(id) ? 'monster' : 'character', id });
    removeStatusEffectsFromTurnOrder(id);
    removeFromFormation(id);
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

  function updateTime(acting, time) {
    const next = getNext();

    if (next.id !== acting) {
      throw new Error(`BattleState Error: The next monster is not the acting monster.`);
    }

    // Every turn that someone acts we reduce the cooldown on their skills used.
    reduceCooldowns(next.id);

    next.time += time;
    setTurnOrder(next);
  }

  // Setting the ambush state also adjusts the turn order accordingly.
  // State can be normal, partyAmbushed, monstersAmbushed
  function setAmbushState(state) {
    ambushState = state;

    if (ambushState === AmbushState.partyAmbushed) {
      turnOrder.forEach(data => {
        if (data.type === 'character') { data.time += BattleConstants.ambushReactionTime; }
      });
      sortTurnOrder();
    }

    if (ambushState === AmbushState.monstersAmbushed) {
      turnOrder.forEach(data => {
        if (data.type === 'monster') { data.time += BattleConstants.ambushReactionTime; }
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

  // Data: { type, id, code } or { type, id }
  function hasTurnOrderEntry(data) {
    return turnOrderIndex(buildKey(data)) >= 0;
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

  function removeStatusEffectsFromTurnOrder(id, code=null) {
    for (let i=turnOrder.length-1; i>=0; i--) {
      const entry = turnOrder[i];
      if (entry.type === 'status' && entry.id === id && (code == null || entry.code === code)) {
        turnOrder.splice(i,1);
      }
    }
  }

  // Data: { type, id, code } or { type, id }
  function moveToTopOfTurnOrder(data, backwards=0) {
    const key = buildKey(data);
    const index = turnOrderIndex(key);

    if (index < 0) {
      throw new Error(`Key:${key} is not in turn order.`);
    }

    const [entry] = turnOrder.splice(index, 1);
    if (turnOrder.length > 0) { entry.time = Math.max(0,turnOrder[0].time - backwards); }
    turnOrder.unshift(entry);
  }

  // =======================
  //    Ability Cooldowns
  // =======================

  // The ability cooldowns really only apply to the monsters to prevent them from using their highest priority attack
  // every turn. Characters in the party can use abilities as often as they like, provided they spend the stamina or
  // mana to use the ability.

  // TODO: Come to think of it, when we start the battle we should set a random cooldown time for every monster
  //       ability so that the monsters aren't all doing the same thing on the first round.

  function setCooldown(id, code, time) {
    if (abilityCooldowns[id] == null) { abilityCooldowns[id] = {}; }
    abilityCooldowns[id][code] = time;
  }

  function isOnCooldown(id, code) {
    return abilityCooldowns[id] != null && abilityCooldowns[id][code] != null;
  }

  function reduceCooldowns(id) {
    const time = BattleSystem.getRound().getTime();
    Object.keys(abilityCooldowns[id]||[]).forEach(code => {
      const remaining = abilityCooldowns[id][code];
      if (remaining > time) {
        abilityCooldowns[id][code] = remaining - time;
      } else {
        delete abilityCooldowns[id][code];
      }
    });
  }

  // ===================================
  //    Status Effects and Conditions
  // ===================================

  function getCondition(id) { return conditions[id]; }
  function setCondition(id, condition) {
    Validate.isIn('BattleState.conditions', condition, Object.values(BattleCondition));
    Validate.exists('BattleState.conditions', conditions[id]);
    conditions[id] = condition;
  }

  function canBeTargeted(id) { return isDown(id) === false && StatusEffects(id).has('hidden') === false }
  function getKnockedOut() { return Object.keys(conditions).filter(id => isKnockedOut(id)); }
  function getDeadMonsters() { return monsterIds.filter(id => { return getCondition(id) === BattleCondition.dead }); }
  function getFledMonsters() { return monsterIds.filter(id => { return conditions[id] === BattleCondition.fled }); }
  function isAlive(id) { return getCondition(id) !== BattleCondition.dead; }
  function isDown(id) { return isAlive(id) === false || isKnockedOut(id); }
  function isKnockedOut(id) { return getCondition(id) === BattleCondition.knockedOut; }

  // ============================================
  //    Leveling Up / Negotiation / Battle End
  // ============================================

  // A failed negotiation can force a monster to use one of their abilities. This ability is used once when the monster
  // acts and is cleared after use. A forced ability will bypass ability cooldowns.
  function takeForcedAbility() {
    const ability = forcedAbility;
    forcedAbility = null;
    return ability;
  }

  function getTotalEssence() {
    return getDeadMonsters().reduce((sum,id) => sum + EssenceSystem.monsterEssenceValue(id), 0);
  }

  // When a character improves a skill we add it to an array of skill improvements to be displayed at the end of the
  // battle. I think it's better to show all the improvements in the level up screen rather than during the battle
  // itself. While it's possible for a monster to get captured and added to the party, I don't think we bother showing
  // their skill improvements in the level up screen yet.
  function skillImproved(id, code, level) {
    if (isCharacter(id)) {
      if (skillImprovements[id] == null) { skillImprovements[id] = {}; }
      skillImprovements[id][code] = level;
    }
  }

  return {
    cleanup,
    getAfterBattle: () => { return afterBattle; },

    addMonster,
    getMonsterFormation: () => { return { ...monsterFormation }; },
    getPartyFormation: () => { return { ...partyFormation }; },
    getHomePositions: () => { return { ...homePositions }; },
    setHomePosition,
    removeHomePosition,
    removeFromFormation,
    removeFromBattle,
    setCondition,
    getCondition,
    getDeadMonsters,
    getFledMonsters,
    getKnockedOut,
    getPosition,
    setPosition,
    isInFront,
    isInBack,
    getColumnContaining,
    getEntityAtPosition,
    getActiveMonsters,
    getActiveCharacters,
    isMonster,
    isCharacter,

    setTurnOrder,
    updateTime,
    getTurnOrder: () => { return [ ...turnOrder ]; },
    setAmbushState,
    getAmbushState: () => { return ambushState; },
    setStartText: (text) => { startText = text; },
    getStartText: () => { return startText; },
    getNext,
    hasTurnOrderEntry,
    removeFromTurnOrder,
    removeStatusEffectsFromTurnOrder,
    moveToTopOfTurnOrder,

    setCooldown,
    isOnCooldown,
    reduceCooldowns,

    canBeTargeted,
    isAlive,
    isKnockedOut,
    isDown,

    setNegotiationAttempted: () => { negotiationAttempted = true; },
    hasAttemptedNegotiation: () => { return negotiationAttempted; },
    setForcedAbility: (ability) => { forcedAbility = ability; },
    getForcedAbility: () => { return forcedAbility; },
    takeForcedAbility,

    battleWon: () => { interrupt = 'victory' },
    battleLost: () => { interrupt = 'game-over' },
    getInterrupt: () => { return interrupt; },

    getTotalEssence,
    skillImproved,
    getSkillImprovements: () => { return skillImprovements; },
  };

}
