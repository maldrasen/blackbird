global.FormationPanel = (function() {

  let positionPanels = {};
  let combatantPanels = {};
  let pendingMoves = new Map();

  function init() {
    X.onClick('#battleView.target-mode .valid-target', targetSelected);
    X.onClick('#battleView.inspect-mode .combatant', inspectPosition);
    X.onClick('#commandPanel .cancel-button', cancelTargeting);
    X.onResize(() => X.first('#combatantLayer') != null, handleResize);
  }

  // ==============
  //    Building
  // ==============

  function build() {
    const state = BattleSystem.getState();

    positionPanels = {};
    combatantPanels = {};
    cancelPendingMoves();

    buildRank('monster',1);
    buildRank('monster',0);
    buildRank('party',0);
    buildRank('party',1);

    buildCombatantPanels(state);
    updateAll(state);
  }

  function buildRank(type, rank) {
    const parent = (type === 'monster') ? X.first('#monsterFormation') : X.first('#partyFormation');
    const side = (type === 'monster') ? 'M' : 'P';
    const rankElement = X.createElement(`<div class='rank'></div>`);

    for (let p=0; p<5; p++) {
      const positionPanel = PositionPanel(side,rank,p);
      positionPanels[`${side}.${rank}.${p}`] = positionPanel;
      rankElement.appendChild(positionPanel.getElement());
    }

    parent.appendChild(rankElement);
  }

  function buildCombatantPanels(state) {
    const monsterFormation = state.getMonsterFormation();
    const partyFormation = state.getPartyFormation();

    state.getActiveMonsters().forEach(monster => {
      buildCombatantPanel(monster, 'monster', monsterFormation);
    });
    state.getActiveCharacters().forEach(character => {
      buildCombatantPanel(character, 'character', partyFormation);
    });
  }

  function buildCombatantPanel(entity, type, formation) {
    const combatantPanel = CombatantPanel(type, entity);

    combatantPanel.build();
    combatantPanel.setPosition(formation[entity]);
    X.append('#combatantLayer',combatantPanel.getElement());
    combatantPanels[entity] = combatantPanel;
    placeCombatant(combatantPanel);
  }

  function getPositionPanel(side, rank=null, position=null) {
    return positionPanels[side] || positionPanels[`${side}.${rank}.${position}`];
  }

  function getCombatantPanel(id) {
    return combatantPanels[id];
  }

  function updateAll(state) {
    Object.values(combatantPanels).forEach(combatantPanel => {
      combatantPanel.update(state);
    });
  }

  function updateCombatant(id) {
    combatantPanels[id].update(BattleSystem.getState());
  }

  // =======================
  //       Inspecting
  // =======================

  function inspectPosition(event) {
    const combatant = event.target.closest('.combatant');
    console.log(`TODO: Inspect[${combatant.dataset.id}] (${combatant.dataset.position})`);
  }

  // ======================
  //       Targeting
  // ======================

  function startTargeting(monsterPositions, characterPositions) {
    X.addClass('#battleView','target-mode');
    X.removeClass('#battleView','inspect-mode');

    X.each('#monsterFormation .position', element => {
      X.addClass(element, monsterPositions.includes(element.dataset.position) ?
        'valid-target' :
        'invalid-target');
    });

    X.each('#partyFormation .position', element => {
      X.addClass(element, characterPositions.includes(element.dataset.position) ?
        'valid-target' :
        'invalid-target');
    });

    const validPositions = [...monsterPositions, ...characterPositions];
    Object.values(combatantPanels).forEach(combatantPanel => {
      X.addClass(combatantPanel.getElement(), validPositions.includes(combatantPanel.getPosition()) ?
        'valid-target' :
        'invalid-target');
    });
  }

  function cancelTargeting() {
    stopTargeting();
    TargetingController.cancelTargeting();
  }

  function stopTargeting() {
    X.removeClass('.valid-target','valid-target')
    X.removeClass('.invalid-target','invalid-target')
    X.removeClass('#battleView','target-mode');
    X.addClass('#battleView','inspect-mode');
  }

  // Targeting always returns a position because some abilities (like AoE attacks) might target an empty position.
  function targetSelected(event) {
    const position = event.target.closest('[data-position]').dataset.position;

    event.stopPropagation();
    event.stopImmediatePropagation();
    stopTargeting();

    TargetingController.targetSelected(position);
  }

  // =====================
  //       Movement
  // =====================

  function killEntity(id) {
    const element = combatantPanels[id].getElement();

    X.removeClass('#battleView','inspect-mode');
    X.addClass(element,'dead');

    requestAnimationFrame(() => {
      X.addClass(element,'removed');
    });

    setTimeout(()=>{
      element.remove();
    }, BattleConstants.killEffectTime);

    // Inspect mode stays off long enough to cover any follow-up death moves.
    setTimeout(()=>{
      X.addClass('#battleView','inspect-mode');
    }, BattleConstants.killEffectTime + BattleConstants.moveEffectTime + 100);
  }

  // This function animates moving a character from the back rank to the front. This should only be called once a
  // character has died and has already been removed from the formation. Because of the animations being played the
  // UI might lag a little behind the actual formation, though I don't think this will be a problem.
  function moveForwardOnDeath(columnData) {
    moveEntity(combatantPanels[columnData.back.id], columnData.front.position);
  }

  function moveInwardOnDeath(moves) {
    moves.forEach(move => {
      moveEntity(combatantPanels[move.id], move.to);
    });
  }

  // The move is delayed so it plays after the death fade of the entity that freed the position. Coordinates are
  // resolved when the timer fires, not when the move is scheduled, so a resize during the delay can't leave the
  // combatant at a stale location.
  function moveEntity(combatantPanel, targetKey) {
    const id = combatantPanel.getEntity();
    const element = combatantPanel.getElement();
    const record = {};

    record.timer = setTimeout(() => {
      combatantPanel.setPosition(targetKey);
      X.addClass(element,'moving');

      record.animation = MoveAnimation.move({
        element,
        ...combatantCoords(targetKey),
        duration: BattleConstants.moveEffectTime,
        onComplete: () => {
          X.removeClass(element,'moving');
          pendingMoves.delete(id);
          validatePositions();
        },
      });
    }, BattleConstants.killEffectTime);

    pendingMoves.set(id, record);
  }

  function combatantCoords(positionKey) {
    const positionCoords = X.getPosition(positionPanels[positionKey].getElement());
    const layerCoords = X.getPosition(X.first('#combatantLayer'));

    return {
      left: positionCoords.left - layerCoords.left,
      top: positionCoords.top - layerCoords.top,
    };
  }

  function placeCombatant(combatantPanel) {
    const coords = combatantCoords(combatantPanel.getPosition());
    const element = combatantPanel.getElement();

    element.style.left = `${coords.left}px`;
    element.style.top = `${coords.top}px`;
  }

  // The battle state is always the source of truth for positions, so this both realigns the panels after a window
  // resize and snaps any interrupted moves to where they were headed.
  function placeAllCombatants() {
    const state = BattleSystem.getState();

    const placeAll = formation => {
      Object.entries(formation).forEach(([id, position]) => {
        const combatantPanel = combatantPanels[id];
        combatantPanel.setPosition(position);
        placeCombatant(combatantPanel);
      });
    };

    placeAll(state.getMonsterFormation());
    placeAll(state.getPartyFormation());
  }

  // Cancelling an animation leaves the element at its destination because MoveAnimation commits the target
  // coordinates up front, and it skips the onComplete callback.
  function cancelPendingMoves() {
    pendingMoves.forEach(move => {
      clearTimeout(move.timer);
      if (move.animation) { move.animation.cancel(); }
    });
    pendingMoves.clear();
    X.removeClass('.combatant.moving','moving');
  }

  function handleResize() {
    cancelPendingMoves();
    placeAllCombatants();
    validatePositions();
  }

  // The battle state updates its formations as soon as an entity dies, but the panels only catch up once the move
  // animations complete, so only validate when no moves are still in flight.
  function validatePositions() {
    if (pendingMoves.size > 0) { return; }
    const state = BattleSystem.getState();

    Object.entries(state.getMonsterFormation()).forEach(([id, position]) => {
      const elementPosition = getCombatantPanel(id).getPosition();
      if (elementPosition !== position) {
        throw new Error(`Monster[${id}] should be at ${position} but is at ${elementPosition}`);
      }
    });

    Object.entries(state.getPartyFormation()).forEach(([id, position]) => {
      const elementPosition = getCombatantPanel(id).getPosition();
      if (elementPosition !== position) {
        throw new Error(`Character[${id}] should be at ${position} but is at ${elementPosition}`);
      }
    });
  }

  // ===============
  //     Effects
  // ===============

  // Data: { entity, damage, damageTypes, isCrit, killed, knockedOut }
  function showDamageEffect(data) {
    FlashSquare.flash({
      element: combatantPanels[data.entity].getElement(),
      color: getDamageColor(data),
      duration: BattleConstants.damageEffectTime,
    });
  }

  function getDamageColor(data) {
    if (data.killed) { return `rgb(200,25,25)`; }
    if (data.isCrit) { return `rgb(150,20,20)`; }
    return `rgb(75,10,10)`;
  }

  function highlightActing(id) {
    clearHighlight();
    X.addClass(combatantPanels[id].getElement(), 'acting')
  }

  function clearHighlight() {
    X.removeClass('.combatant.acting','acting');
  }

  return {
    init,
    build,
    getPositionPanel,
    getCombatantPanel,
    updateAll,
    updateCombatant,
    startTargeting,
    killEntity,
    moveForwardOnDeath,
    moveInwardOnDeath,
    showDamageEffect,
    highlightActing,
    clearHighlight,
  };

})();
