global.FormationPanel = (function() {

  const positionPanels = {};
  const combatantPanels = {};

  let targetModeCallback;

  function init() {
    // X.onClick('#battleView.target-mode .position.valid-target', targetSelected);
    // X.onClick('#battleView.normal-mode .position.occupied', inspectPosition);
    // X.onClick('#commandPanel .cancel-button', stopTargeting);
  }

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
      combatantPanel.update();
    });
  }




  /*

  // Look up position element given an entity ID.
  // function getPositionElement(entity) {
  //   return X.first(`#formationPanel [data-id="${entity}"]`).closest('.position');
  // }


  function getMonsterElement(id) { return X.first(`.monster[data-id='${id}']`); }
  function getCharacterElement(id) { return X.first(`.character[data-id='${id}']`); }
  function clearHighlight() { X.removeClass('.position.acting','acting'); }

  function highlightActingMonster(id) {
    clearHighlight();
    X.addClass(getMonsterElement(id).parentElement,'acting');
  }

  function highlightActingCharacter(id) {
    clearHighlight();
    X.addClass(getCharacterElement(id).parentElement,'acting');
  }



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

  function inspectPosition(event) {
    const position = event.target.closest('.position').dataset.position;
    const id = (event.target.closest('.monster') || event.target.closest('.character')).dataset.id;
    console.log(`Inspect[${id}] (${position})`)
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

  // Data: { entity, damage, damageTypes, isCrit, killed }
  function showDamageEffect(data) {
    FlashSquare.flash({
      element: getPositionElement(data.entity),
      color: BattleView.getDamageColor(data),
      duration: _battleDamageEffectTime,
    });
  }

  function killEntity(id) {
    const state = BattleSystem.getState();
    const element = state.isMonster(id) ? getMonsterElement(id) : getCharacterElement(id);
    const position = element.closest('.position');

    X.addClass(element,'dead');

    setTimeout(()=>{
      X.addClass(element,'removed');
    },1);

    setTimeout(()=>{
      element.remove();
      X.removeClass(position,'occupied');
    },_battleKillEffectTime);
  }

  // This function animates moving a character from the back rank to the front. This should only be called once a
  // character has died and has already been removed from the formation. Because of the animations being played the
  // UI might lag a little behind the actual formation, though I don't think this will be a problem.
  function moveForwardOnDeath(columnData) {
    const isMonster = (columnData.side === 'monster');
    const formationId = isMonster ? `#monsterFormation` : `#partyFormation`;
    const element = isMonster ? getMonsterElement(columnData.back.id) : getCharacterElement(columnData.back.id);
    const target = X.first(`${formationId} [data-position='${columnData.front.position}']`)
    moveEntity(element,target)
  }

  function moveInwardOnDeath(moves) {
    moves.forEach(move => {
      const element = getMonsterElement(move.id);

      // Saw this happen, but only once...
      if (element == null) {
        throw new Error(`Couldn't find monster element [${move.id}]`)
      }

      const target = X.first(`#monsterFormation [data-position='${move.to}']`);
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
*/
  return Object.freeze({
    init,
    build,
    getPositionPanel,
    getCombatantPanel,
    // clearHighlight,
    // highlightActingMonster,
    // highlightActingCharacter,
    // updateAll,
    // updateEntity,
    // startTargeting,
    // showDamageEffect,
    // killEntity,
    // moveForwardOnDeath,
    // moveInwardOnDeath,
  });

})();
