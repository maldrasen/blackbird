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

    for (let r=state.getMaxMonsterRank()-1; r >= 0; r--) {
      let row =`<div class="rank rank-${r}">`;

      for (let p=0; p<state.getMaxMonsterColumn(); p++) {
        const monsterId = formation[`${r}.${p}`];
        row += `<div class="position position-${r}-${p}">`;

        if (monsterId) {
          const monsterComponent = MonsterComponent.lookup(monsterId);
          const monster = BaseMonster.lookup(monsterComponent.code);

          row += `<div class="monster" data-id="${monsterId}">
            <div class='name'>${monster.getName()}</div>
            <div class='status'></div>
            <div class='health-bar'></div>
          </div>`;
        }

        row += `</div>`
      }

      row += `</div>`

      X.first('#monsterFormation').appendChild(X.createElement(row));
    }

    // Hide unoccupied ranks past the second when they are unoccupied. We still keep them in case something is somehow
    // moved back beyond the second rank.
    for (let r=2; r<state.getMaxMonsterRank(); r++) {
      if (state.isMonsterRankOccupied(r) === false) {
        X.addClass(`#monsterFormation .rank-${r}`,'hide');
      }
    }

    state.getMonsters().forEach(monster => {
      addHealthBar(getMonsterElement(monster), monster, true)
    });
  }

  function buildPartyFormation(state) {
    const formation = state.getPartyFormation();

    for (let r=0; r<state.getMaxPartyRank(); r++) {
      let row =`<div class="rank rank-${r}">`;

      for (let p=0; p<state.getMaxPartyColumn(); p++) {
        const characterId = formation[`${r}.${p}`];
        row += `<div class="position position-${r}-${p}">`;

        if (characterId) {
          const actor = ActorComponent.lookup(characterId);
          row += `<div class="character" data-id="${characterId}">
            <div class='name'>${actor.name}</div>
            <div class='status'></div>
            <div class='health-bar'></div>
          </div>`;
        }

        row += `</div>`
      }

      row += `</div>`

      X.first('#partyFormation').appendChild(X.createElement(row));
    }
    state.getCharacters().forEach(character => {
      addHealthBar(getCharacterElement(character), character);
    });
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
