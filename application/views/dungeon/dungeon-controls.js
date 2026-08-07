global.DungeonControls = (function() {

  let positionCells = {};

  function init() {
    X.onClick('#dungeonControls .open-party', PartyOverlay.open);
    X.onClick('#dungeonControls .party-card', cardClicked);
  }

  // The dungeon template is reloaded every time the dungeon view is shown, so the controls are rebuilt along with it.
  function build() {
    X.fill('#dungeonControls', X.createElement(`<div class='controls-frame'>
      <ul class='control-buttons'>
        <li><a href='#' class='open-party button button-primary'>Party</a></li>
      </ul>
      <div class='formation-display'>
        <div class='rank front-rank'></div>
        <div class='rank back-rank'></div>
      </div>
    </div>`));

    positionCells = {};
    buildRank(0,'.front-rank');
    buildRank(1,'.back-rank');

    update();
  }

  function buildRank(rank, selector) {
    const parent = X.first(`#dungeonControls ${selector}`);

    for (let p=0; p<5; p++) {
      const positionPanel = PositionPanel('P',rank,p);
      positionCells[`P.${rank}.${p}`] = positionPanel.getElement();
      parent.appendChild(positionPanel.getElement());
    }
  }

  function update() {
    Object.values(positionCells).forEach(cell => X.empty(cell));

    Object.entries(PartyConfiguration.getConfiguration()).forEach(([id, position]) => {
      const element = PartyCard(id).getElement();
      if (id === GameSystem.getState().getPlayer()) { X.addClass(element,'player'); }
      X.append(positionCells[position], element);
    });
  }

  function cardClicked(event) {
    CharacterOverlay.open(event.target.closest('.party-card').dataset.id);
  }

  return Object.freeze({
    init,
    build,
    update,
  });

})();
