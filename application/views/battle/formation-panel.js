global.FormationPanel = (function() {

  let positionPanels = {};
  let combatantPanels = {};

  function init() {
    X.onClick('#battleView.target-mode .position.valid-target', targetSelected);
    X.onClick('#battleView.inspect-mode .position:has(.combatant)', inspectPosition);
    X.onClick('#commandPanel .cancel-button', cancelTargeting);
  }

  // ==============
  //    Building
  // ==============

  function build() {
    const state = BattleSystem.getState();

    positionPanels = {};
    combatantPanels = {};

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

    state.getMonsters().forEach(monster => {
      buildCombatantPanel(monster, 'monster', monsterFormation);
    });
    state.getCharacters().forEach(character => {
      buildCombatantPanel(character, 'character', partyFormation);
    });
  }

  function buildCombatantPanel(entity, type, formation) {
    const positionPanel = positionPanels[formation[entity]]
    const combatantPanel = CombatantPanel(type, entity);

    combatantPanel.build();
    X.append(positionPanel.getElement(),combatantPanel.getElement());
    combatantPanels[entity] = combatantPanel;
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
    const position = event.target.closest('.position').dataset.position;
    const id = event.target.closest('.combatant').dataset.id;
    console.log(`TODO: Inspect[${id}] (${position})`);
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
  }

  function cancelTargeting() {
    stopTargeting();
    TargetingController.cancelTargeting();
  }

  function stopTargeting() {
    X.removeClass('.position.valid-target','valid-target')
    X.removeClass('.position.invalid-target','invalid-target')
    X.removeClass('#battleView','target-mode');
    X.addClass('#battleView','inspect-mode');
  }

  // Targeting always returns a position because some abilities (like AoE attacks) might target an empty position.
  function targetSelected(event) {
    const position = event.target.closest('.position').dataset.position;

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
    },_battleKillEffectTime);

    setTimeout(()=>{
      X.addClass('#battleView','inspect-mode');
    },_battleKillEffectTime + 600);
  }

  // This function animates moving a character from the back rank to the front. This should only be called once a
  // character has died and has already been removed from the formation. Because of the animations being played the
  // UI might lag a little behind the actual formation, though I don't think this will be a problem.
  function moveForwardOnDeath(columnData) {
    const combatant = combatantPanels[columnData.back.id].getElement();
    const target = positionPanels[columnData.front.position].getElement();
    moveEntity(combatant,target);
  }

  function moveInwardOnDeath(moves) {
    moves.forEach(move => {
      const combatant = combatantPanels[move.id].getElement();
      const target = positionPanels[move.to].getElement();
      moveEntity(combatant,target);
    });
  }

  function moveEntity(combatant, target) {
    const currentCoords = X.getPosition(combatant);
    const targetCoords = X.getPosition(target);

    function detach() {
      X.addClass(combatant, 'moving');
      combatant.setAttribute('style', [
        `left:${currentCoords.left}px;`,
        `top:${currentCoords.top}px;`,
      ].join(' '));
    }

    function move() {
      combatant.setAttribute('style',[
        `left:${targetCoords.left + 0.5}px;`,
        `top:${targetCoords.top + 0.5}px;`,
      ].join(' '));
    }

    function attach() {
      target.appendChild(combatant);
      X.removeClass(combatant,'moving');
      combatant.removeAttribute('style');
    }

    // Yes, we need to request two animation frames between detach and move,
    // or attach and validate.

    setTimeout(() => {
      detach();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { move(); });
      });
    }, _battleKillEffectTime);

    setTimeout(() => {
      attach();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { validatePositions(); });
      });
    },_battleKillEffectTime + 600);
  }

  function validatePositions() {
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
        throw new Error(`Monster[${id}] should be at ${position} but is at ${elementPosition}`);
      }
    });
  }

  // ===============
  //     Effects
  // ===============

  // Data: { entity, damage, damageTypes, isCrit, killed }
  function showDamageEffect(data) {
    FlashSquare.flash({
      element: combatantPanels[data.entity].getElement(),
      color: getDamageColor(data),
      duration: _battleDamageEffectTime,
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

  return Object.freeze({
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
  });

})();
