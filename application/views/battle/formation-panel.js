global.FormationPanel = (function() {

  function build() {
    const state = BattleController.getState();

    buildMonsterFormation(state);
    buildPartyFormation(state);
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
          const monster = Monster.lookup(monsterComponent.code);
          row += `<div class="monster" data-id="${monsterId}">${monster.getName()}</div>`;
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
          row += `<div class="character" data-id="${characterId}">${actor.name}</div>`;
        }

        row += `</div>`
      }

      row += `</div>`

      X.first('#partyFormation').appendChild(X.createElement(row));
    }
  }

  function clearHighlight() {
    X.removeClass('.position.acting','acting');
  }

  function highlightActingMonster(id) {
    clearHighlight();
    X.addClass(X.first(`.monster[data-id='${id}']`).parentElement,'acting');
  }

  function highlightActingCharacter(id) {
    clearHighlight();
    X.addClass(X.first(`.character[data-id='${id}']`).parentElement,'acting');
  }

  return Object.freeze({
    build,
    clearHighlight,
    highlightActingMonster,
    highlightActingCharacter,
  });

})();
