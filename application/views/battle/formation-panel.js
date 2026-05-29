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

  return Object.freeze({
    build
  });

})();
