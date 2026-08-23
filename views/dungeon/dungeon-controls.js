global.DungeonControls = (function() {

  let positionCells;

  function init() {
    X.onClick('#dungeonControls .open-party', () => { PartyOverlay.open('normal') });
    X.onClick('#dungeonControls .party-card', openCharacterOverlay);
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

  // Show the description of the room the party is currently in. Called when the floor is drawn and again each time
  // the party steps into a new room.
  function refreshRoom() {
    const floor = DungeonSystem.getDungeonFloor();
    const room = floor.getRooms()[floor.getLocation()];
    X.first('#dungeonControls .room-description').innerHTML = room.getDescription();
  }

  return {
    init,
    build,
    update,
    refreshRoom,
  };

})();
