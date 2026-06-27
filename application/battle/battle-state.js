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
  const abilityCooldowns = {};
  const conditions = {};
  const skillImprovements = {};
  const statusEffects = {};

  let ambushState = 'normal';
  let interrupt;

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
    Object.keys(monsterFormation).forEach(id => {
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
    if (position.match(_positionPattern) == null) { throw new Error(`Invalid Position: ${position}`); }
    monsterFormation[id] = position;
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

  function getMonsters() { return Object.keys(monsterFormation); }
  function getCharacters() { return Object.keys(partyFormation); }
  function isMonster(id) { return getMonsters().includes(id); }
  function isCharacter(id) { return getCharacters().includes(id); }
  function removeFromFormation(id) { delete (isMonster(id) ? monsterFormation : partyFormation)[id]; }

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

  // Conditions are for character states that are not status effects; status effects are their own entities that
  // are part of the turn order. Currently, the only status I can think of is "dead" so this might just be used to
  // track deaths.
  function addCondition(id, key) {
    if (conditions[id]==null) { conditions[id]=[] }
    conditions[id].push(key);
  }

  function canBeTargeted(id) {
    return isAlive(id) && isHidden(id) === false
  }

  function isAlive(id) {
    return conditions[id] == null || conditions[id].includes('dead') === false;
  }

  function isHidden(id) {
    return hasStatusEffect(id, 'hidden')
  }

  function addStatus(statusEffect) {
    const entity = statusEffect.getEntity();
    const code = statusEffect.getCode();

    if (statusEffects[entity] == null) {
      statusEffects[entity] = {}
    }

    // If the character already has this status effect we should simply set the effect's duration. (but only if it's
    // longer) We don't want to extend the duration as being blinded twice in the same turn wouldn't result in being
    // blinded for twice as long. This just renews the timer on the existing effect.
    if (statusEffects[entity][code] != null) {
      if (statusEffects[entity][code].getDuration() < statusEffect.getDuration()) {
        return statusEffects[entity][code].setDuration(statusEffect.getDuration())
      }
    }

    statusEffects[entity][code] = statusEffect;

    // TODO: We need to make a more general way of removing opposing status effects (if there are any) Becoming poised
    //       might also clear a stunned effect for instance, or perhaps it's impossible to become poised while stunned.
    //       Something to think about at least.

    if (code === 'poised' && hasStatusEffect(entity, 'off-balance')) {
      removeStatus(entity, 'off-balance');
    }
    if (code === 'off-balance' && hasStatusEffect(entity, 'poised')) {
      removeStatus(entity, 'poised');
    }

    if (statusEffect.getDurationType() === StatusEffectDurationType.fixedTime) {
      // TODO: If a status effect has a fixed time it is removed after a given time has passed. That removal time
      //       needs to be added to the turn order because the effect goes away independent of the character's actions.
      //       These status effects (poison and burn) can also trigger periodically, in which case the next trigger
      //       time is also added to the turn order.
    }
  }

  // TODO: We also need to remove the effect from the turn order once we're adding them.
  function removeStatus(entity, code) {
    if (statusEffects[entity][code] == null) {
      throw new Error(`Entity[${entity}] does not have ${code}`);
    }
    delete statusEffects[entity][code];
    BattleInterface.updateCombatantView(entity);
  }

  function getStatusEffects(id) {
    return statusEffects[id] || {};
  }

  function hasStatusEffect(id, code) {
    return getStatusEffects(id)[code] != null;
  }

  // ==============================
  //    Leveling Up / Battle End
  // ==============================

  // When a character improves a skill we add it to an array of skill improvements to be displayed at the end of the
  // battle. I think it's better to show all the improvements in the level up screen rather than during the battle
  // itself. While it's possible for a monster to get captured and added to the party, I don't think we bother showing
  // their skill improvements in the level up screen yet.
  function skillImproved(id, code, level) {
    if (isCharacter(id)) {
      if (skillImprovements[id] == null) { skillImprovements[id] = {}; }
      skillImprovements[id][code] = level;
      console.log("Skill Improved:",skillImprovements[id]);
    }
  }

  return Object.freeze({
    cleanup,
    getAfterBattle: () => { return afterBattle; },
    getEncounter: () => { return encounter; },

    addMonster,
    getMonsterFormation: () => { return { ...monsterFormation }; },
    getPartyFormation: () => { return { ...partyFormation }; },
    removeFromFormation,
    getPosition,
    setPosition,
    isInFront,
    isInBack,
    getColumnContaining,
    getEntityAtPosition,
    getMonsters,
    getCharacters,
    isMonster,
    isCharacter,

    setTurnOrder,
    updateTime,
    getTurnOrder: () => { return [ ...turnOrder ]; },
    setAmbushState,
    getAmbushState: () => { return ambushState; },
    getNext,
    removeFromTurnOrder,

    setCooldown,
    isOnCooldown,
    reduceCooldowns,

    addCondition,
    canBeTargeted,
    isAlive,
    isHidden,
    addStatus,
    removeStatus,
    getStatusEffects,
    hasStatusEffect,

    battleWon: () => { interrupt = 'victory' },
    battleLost: () => { interrupt = 'game-over' },
    getInterrupt: () => { return interrupt; },

    skillImproved,
    getSkillImprovements: () => { return skillImprovements; },
  });

}
