global.FormationPanel = (function() {

  const healthBars = {};

  let targetModeCallback;

  function init() {
    X.onClick('#battleView.target-mode .position.valid-target', targetSelected);
    X.onClick('#battleView.normal-mode .position.occupied', inspectPosition);
    X.onClick('#commandPanel .cancel-button', stopTargeting);
  }

  function build() {
    const state = BattleSystem.getState();

    buildMonsterFormation(state);
    buildPartyFormation(state);
    updateAll(state);
  }

  function buildMonsterFormation(state) {
    const formation = state.getMonsterFormation();

    for (let r=1; r >= 0; r--) {
      const rankElement = X.createElement(`<div class='rank'></div>`);
      X.first('#monsterFormation').appendChild(rankElement);

      for (let p=0; p<5; p++) {
        const monsterId = formation[`${r}.${p}`];
        const positionElement = buildPositionElement(r,p);
        rankElement.appendChild(positionElement);

        if (monsterId) {
          X.addClass(positionElement, 'occupied');
          positionElement.appendChild(buildMonsterElement(monsterId));
        }
      }
    }

    state.getMonsters().forEach(monster => {
      addHealthBar(getMonsterElement(monster), monster, true)
    });
  }

  function buildPartyFormation(state) {
    const formation = state.getPartyFormation();

    for (let r=0; r<2; r++) {
      const rankElement = X.createElement(`<div class='rank'></div>`);
      X.first('#partyFormation').appendChild(rankElement);

      for (let p=0; p<5; p++) {
        const characterId = formation[`${r}.${p}`];
        const positionElement = buildPositionElement(r,p);
        rankElement.appendChild(positionElement);

        if (characterId) {
          X.addClass(positionElement, 'occupied');
          positionElement.appendChild(buildCharacterElement(characterId))
        }
      }
    }

    state.getCharacters().forEach(character => {
      addHealthBar(getCharacterElement(character), character);
    });
  }

  function buildPositionElement(r, p) {
    return X.createElement(`<div class='position' data-position='${r}.${p}'></div>`)
  }

  // Look up position element given an entity ID.
  function getPositionElement(entity) {
    return X.first(`#formationPanel [data-id="${entity}"]`).closest('.position');
  }

  function buildMonsterElement(monsterId) {
    const monsterComponent = MonsterComponent.lookup(monsterId);
    const monster = BaseMonster.lookup(monsterComponent.code);

    return X.createElement(`<div class="monster" data-id="${monsterId}">
      <div class='name'>${monster.getName()}</div>
      <div class='status'></div>
      <div class='health-bar'></div>
    </div>`);
  }

  function buildCharacterElement(characterId) {
    return X.createElement(`<div class="character" data-id="${characterId}">
      <div class='name'>${Character(characterId).getName()}</div>
      <div class='status'></div>
      <div class='health-bar'></div>
    </div>`);
  }

  function addHealthBar(element, entity, hideValues=false) {
    const health = HealthComponent.lookup(entity);
    const healthBar = BarDisplay({
      label: 'Health',
      currentValue: health.currentHealth,
      minValue: 0,
      maxValue: health.maxHealth,
      color: 'health',
    });

    if (hideValues) {
      healthBar.hideValues();
    }
    healthBars[entity] = healthBar;

    element.querySelector('.health-bar').appendChild(healthBar.getElement());
  }

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

  function updateAll(state) {
    state.getMonsters().forEach(monster => {
      if (state.isAlive(monster)) {
        const health = HealthComponent.lookup(monster);
        healthBars[monster].setCurrentValue(health.currentHealth);
      }
    });
    state.getCharacters().forEach(character => {
      if (state.isAlive(character)) {
        const health = HealthComponent.lookup(character);
        healthBars[character].setCurrentValue(health.currentHealth);
      }
    });
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
    console.log("Inspect Position",position);
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

  // Data: { entity, damage, type, isCrit, killed }
  function showDamageEffect(data) {
    FlashSquare.flash({
      element: getPositionElement(data.entity),
      color: getDamageColor(data),
      duration: _battleDamageEffectTime,
    });
  }

  function getDamageColor(data) {
    if ([DamageType.crush, DamageType.pierce, DamageType.slash].includes(data.type)) {
      if (data.killed) { return `rgb(200,25,25)`; }
      if (data.isCrit) { return `rgb(150,20,20)`; }
      return `rgb(75,10,10)`;
    }
    throw new Error(`TODO: Implement colors for damage type ${data.type}`)
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

  // Moves the character in the back rank to the front. The character in the front should be dead, so it's removed
  // from the formation, replaced by the character that was behind.
  function moveForwardOnDeath(columnData) {
    MainContent.halt();

    const isMonster = (columnData.side === 'monster');
    const formationId = isMonster ? `#monsterFormation` : `#partyFormation`;
    const element = isMonster ? getMonsterElement(columnData.back.id) : getCharacterElement(columnData.back.id);
    const targetElement = X.first(`${formationId} [data-position='${columnData.front.position}']`)
    const targetCoords = X.getPosition(targetElement);
    const currentCoords = X.getPosition(element);

    X.removeClass(element.closest('.position'),'occupied');

    setTimeout(() => {
      X.addClass(element,'moving');
      element.setAttribute('style',[
        `left:${currentCoords.left}px;`,
        `top:${currentCoords.top}px;`,
      ].join(' '))
    },_battleKillEffectTime + 10)

    setTimeout(() => {
      element.setAttribute('style',[
        `left:${targetCoords.left + 1}px;`,
        `top:${targetCoords.top + 1}px;`,
      ].join(' '));

    },_battleKillEffectTime + 11);

    setTimeout(() => {
      targetElement.appendChild(element);
      X.addClass(targetElement,'occupied');
      X.removeClass(element,'moving');
      element.removeAttribute('style');
      MainContent.unhalt();
    },_battleKillEffectTime + 512);
  }

  return Object.freeze({
    init,
    build,
    clearHighlight,
    highlightActingMonster,
    highlightActingCharacter,
    updateAll,
    startTargeting,
    showDamageEffect,
    killEntity,
    moveForwardOnDeath,
  });

})();
