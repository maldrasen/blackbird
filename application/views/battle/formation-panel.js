global.FormationPanel = (function() {

  const positionPanels = {};
  const combatantPanels = {};

  let targetModeCallback;

  function init() {
    X.onClick('#battleView.target-mode .position.valid-target', targetSelected);
    X.onClick('#battleView.normal-mode .position.occupied', inspectPosition);
    X.onClick('#commandPanel .cancel-button', stopTargeting);
  }

  // ==============
  //    Building
  // ==============

  function build() {
    const state = BattleSystem.getState();

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
    positionPanel.setCombatantPanel(combatantPanel);
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

  function startTargeting(monsterPositions, characterPositions, callback) {
    targetModeCallback = callback;

    X.addClass('#battleView','target-mode');
    X.removeClass('#battleView','normal-mode');

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

  function stopTargeting() {
    X.removeClass('.position.valid-target','valid-target')
    X.removeClass('.position.invalid-target','invalid-target')
    X.removeClass('#battleView','target-mode');
    X.addClass('#battleView','normal-mode');
  }

  // Targeting always returns a position because some abilities (like AoE attacks) might target an empty position.
  function targetSelected(event) {
    const position = event.target.closest('.position').dataset.position;

    event.stopPropagation();
    event.stopImmediatePropagation();
    stopTargeting();

    targetModeCallback(position);
    targetModeCallback = null;
  }


  // =====================
  //       Movement
  // =====================

  function killEntity(id) {
    const element = combatantPanels[id].getElement();
    const position = element.closest('.position');

    X.addClass(element,'dead');

    requestAnimationFrame(() => {
      X.addClass(element,'removed');
    });

    setTimeout(()=>{
      element.remove();
      X.removeClass(position,'occupied');
    },_battleKillEffectTime);
  }

  // This function animates moving a character from the back rank to the front. This should only be called once a
  // character has died and has already been removed from the formation. Because of the animations being played the
  // UI might lag a little behind the actual formation, though I don't think this will be a problem.
  function moveForwardOnDeath(columnData) {
    const element = combatantPanels[columnData.back.id].getElement();
    const target = positionPanels[columnData.front.position].getElement();
    moveEntity(element,target)
  }

  function moveInwardOnDeath(moves) {
    moves.forEach(move => {
      const element = combatantPanels[move.id].getElement();
      const target = positionPanels[move.to].getElement();
      moveEntity(element,target);
    });
  }

  function moveEntity(element, targetElement) {
    X.removeClass(element.closest('.position'),'occupied');

    const targetCoords = X.getPosition(targetElement);
    const currentCoords = X.getPosition(element);

    function detach() {
      X.addClass(element, 'moving');
      element.setAttribute('style', [
        `left:${currentCoords.left}px;`,
        `top:${currentCoords.top}px;`,
      ].join(' '));
    }

    function move() {
      element.setAttribute('style',[
        `left:${targetCoords.left + 1}px;`,
        `top:${targetCoords.top + 1}px;`,
      ].join(' '));
    }

    function attach() {
      targetElement.appendChild(element);
      X.addClass(targetElement,'occupied');
      X.removeClass(element,'moving');
      element.removeAttribute('style');
    }

    // Yes, we need to request two animation frames between detach and move.
    setTimeout(() => {
      detach();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { move(); });
      });
    }, _battleKillEffectTime);

    setTimeout(() => {
      attach();
    },_battleKillEffectTime + 600);
  }

  // ===============
  //     Effects
  // ===============

  // Data: { entity, damage, damageTypes, isCrit, killed }
  function showDamageEffect(data) {
    FlashSquare.flash({
      element: combatantPanels[data.entity].getElement(),
      color: BattleView.getDamageColor(data),
      duration: _battleDamageEffectTime,
    });
  }

  function highlightActing(id) {
    clearHighlight();
    X.addClass(combatantPanels[id].getElement().parentElement, 'acting')
  }

  function clearHighlight() { X.removeClass('.position.acting','acting'); }

  return Object.freeze({
    init,
    build,
    getPositionPanel,
    getCombatantPanel,
    updateAll,
    // updateEntity,

    startTargeting,

    killEntity,
    moveForwardOnDeath,
    moveInwardOnDeath,

    showDamageEffect,
    highlightActing,
    clearHighlight,
  });

})();
