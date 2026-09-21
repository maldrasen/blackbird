global.DungeonControls = (function() {

  let positionCells;

  function init() {
    X.onClick('#dungeonControls .open-party', () => { PartyOverlay.open('normal') });
    X.onClick('#dungeonControls .party-card', openCharacterOverlay);
    X.onClick('#dungeonControls #commandButtons .command', commandClicked);
  }

  function build() {
    positionCells = {};
    buildRank(0,'.front-rank');
    buildRank(1,'.back-rank');
    update();
  }

  function buildRank(rank, selector) {
    const parent = X.first(`#dungeonControls ${selector}`);

    X.empty(parent);

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

  function openCharacterOverlay(event) {
    CharacterOverlay.open(event.target.closest('.party-card').dataset.id);
  }

  // Show the description and command buttons for the tile the party is standing on, which for most tiles are those
  // of the room. Called when the floor is drawn, and again whenever a step gives the party something new to look at.
  function refreshRoom() {
    refreshDescription();
    buildCommandButtons();
  }

  // Not every room has something worth describing, but the description is always rendered so that the command
  // buttons stay where they are.
  function refreshDescription() {
    const element = X.first('#dungeonControls #description');
    const description = DungeonTileSystem.getTileInfo().description || '';

    X.empty(element);
    element.appendChild(X.createElement(`<div class='room-description'>${description}</div>`));
  }

  function buildCommandButtons() {
    const list = X.first('#dungeonControls #commandButtons');
    X.empty(list);

    DungeonTileSystem.getTileInfo().commands.forEach(command => {
      const button = X.createElement(
        `<li><a href='#' class='command button' data-code='${command.code}'>${command.label}</a></li>`);

      list.appendChild(button);
      FlashSquare.flash({ element:button, color:'rgb(200 200 250)' });
    });
  }

  function commandClicked(event) {
    const code = event.target.closest('.command').dataset.code;
    const result = DungeonTileSystem.useCommand(code);
    if (result.episode) { return DungeonSystem.startRoomEpisode(result.episode); }
    if (result.floorChanged) { return DungeonView.floorChanged(); }

    refreshRoom();
    RoomContentOverlay.open(result);
  }

  return {
    init,
    build,
    update,
    refreshRoom,
    refreshDescription,
  };

})();
