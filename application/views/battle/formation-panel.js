global.FormationPanel = (function() {

  const healthBars = {};

  function build() {
    const state = BattleController.getState();

    buildMonsterFormation(state);
    buildPartyFormation(state);
    updateAll(state);
  }

  function buildMonsterFormation(state) {
    const formation = state.getMonsterFormation();

    for (let r=1; r >= 0; r--) {
      const rankElement = X.createElement(`<div class="rank rank-${r}"></div>`);
      X.first('#monsterFormation').appendChild(rankElement);

      for (let p=0; p<5; p++) {
        const monsterId = formation[`${r}.${p}`];
        const positionElement = X.createElement(`<div class="position position-${r}-${p}"></div>`)
        rankElement.appendChild(positionElement);

        if (monsterId) {
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
      const rankElement = X.createElement(`<div class="rank rank-${r}"></div>`);
      X.first('#partyFormation').appendChild(rankElement);

      for (let p=0; p<5; p++) {
        const characterId = formation[`${r}.${p}`];
        const positionElement = X.createElement(`<div class="position position-${r}-${p}"></div>`)
        rankElement.appendChild(positionElement);

        if (characterId) {
          positionElement.appendChild(buildCharacterElement(characterId))
        }
      }
    }

    state.getCharacters().forEach(character => {
      addHealthBar(getCharacterElement(character), character);
    });
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
      const health = HealthComponent.lookup(monster)
      healthBars[monster].setCurrentValue(health.currentHealth);
    });
    state.getCharacters().forEach(character => {
      const health = HealthComponent.lookup(character)
      healthBars[character].setCurrentValue(health.currentHealth);
    });
  }


  return Object.freeze({
    build,
    clearHighlight,
    highlightActingMonster,
    highlightActingCharacter,
    updateAll,
  });

})();
