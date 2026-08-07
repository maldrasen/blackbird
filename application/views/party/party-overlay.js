global.PartyOverlay = (function() {

  let mode;
  let draft;
  let positionPanels;
  let rosterScrollingPanel = null;

  function init() {
    X.onClick('#partyOverlay .close-button', close);
    X.onClick('#partyOverlay .confirm-button', confirm);

    DragonDrop.register({
      source: '#partyOverlay .party-card',
      targets: ['#partyCardLayer .party-card','#partyOverlay .position','#partyOverlay .roster-panel'],
      onDrop: cardDropped,
    });
  }

  function open(m) {
    mode = m;

    X.loadDocument('#partyOverlay','views/party-overlay.html');
    X.addClass(`#partyOverlay`,mode);

    WindowManager.push(PartyOverlay);
    X.removeClass('#partyOverlay','hide');
    X.removeClass('#overlayCover','hide');

    rosterScrollingPanel = ScrollingPanel({ selector:'#partyOverlay #rosterList' });

    buildGrid();
    buildDraft();
    buildCaptives();
    refresh();
  }

  function close() {
    rosterScrollingPanel = null;
    X.empty('#partyOverlay');
    X.removeAttribute('#partyOverlay','class');
    X.addClass('#partyOverlay','hide');
    X.addClass('#overlayCover','hide');
    WindowManager.remove(PartyOverlay);
  }

  function confirm() {
    PartyConfiguration.setConfiguration(draft);
    close();

    if (GameSystem.getState().getGameMode() === GameMode.dungeon) {
      DungeonControls.update();
    }
  }

  // ==============
  //    Building
  // ==============

  function buildGrid() {
    positionPanels = {};
    buildRank(0,'.front-row');
    buildRank(1,'.back-row');
  }

  function buildRank(rank, selector) {
    const parent = X.first(`#partyOverlay ${selector}`);

    for (let p=0; p<5; p++) {
      const positionPanel = PositionPanel('P',rank,p);
      positionPanels[`P.${rank}.${p}`] = positionPanel;
      parent.appendChild(positionPanel.getElement());
    }
  }

  function buildDraft() {
    draft = { ...PartyConfiguration.getConfiguration() };
  }

  function buildRoster() {
    const list = X.first('#partyOverlay #rosterList');

    X.empty(list);
    X.removeClass('#partyOverlay .roster-panel','hide');

    const roster = GameSystem.getState().getRoster().
      filter(id => draft[id] == null).
      map(id => ({ id, name: Character(id).getFullName() })).
      sort((a,b) => a.name.localeCompare(b.name)).
      map(entry => entry.id);

    roster.forEach(id => {
      const item = X.createElement(`<li class='roster-item'></li>`)
      item.appendChild(PartyCard(id).getElement());
      item.appendChild(buildRosterDetails(id));
      list.appendChild(item);
    });
  }

  function buildRosterDetails(id) {
    const character = Character(id);
    return X.createElement(`<div class='details'>
      <div class='top-row'>${character.getFullName()}</div>
      <div class='detail-row'>Level ${character.getLevel()}</div>
      <div class='detail-row'>${character.getGenderName()} ${Species.lookup(character.getSpecies()).getName()}</div>
    </div>`);
  }

  // TODO: Captives aren't implemented in the game yet. When they are though new captives are displayed in the party
  //       formation. The max number of captives that the party can have at a time may change as the game progresses.

  function buildCaptives() {
    const maxCaptives = 4;
    const captiveList = X.first('#partyOverlay #captiveList');
    for (let i=0; i<maxCaptives; i++) {
      captiveList.appendChild(X.createElement(`<li class='captive-panel'></li>`));
    }
  }

  // ================
  //    On Refresh
  // ================

  function refresh() {
    placeCards();
    highlightVacancies();
    updateConfirmButton();
    rosterScrollingPanel.resize();
    if (mode === 'transfer') { buildRoster(); }
  }

  function placeCards() {
    const player = GameSystem.getState().getPlayer();

    X.empty('#partyCardLayer');

    Object.entries(draft).forEach(([id, position]) => {
      const element = PartyCard(id).getElement();
      const coords = cardCoords(position);

      element.style['left'] = `${coords.left}px`;
      element.style['top'] = `${coords.top}px`;
      if (id === player) { X.addClass(element,'player'); }
      X.append('#partyCardLayer', element);
    });
  }

  function cardCoords(position) {
    const positionCoords = X.getPosition(positionPanels[position].getElement());
    const layerCoords = X.getPosition(X.first('#partyCardLayer'));

    return {
      left: positionCoords.left - layerCoords.left,
      top: positionCoords.top - layerCoords.top,
    };
  }

  function highlightVacancies() {
    X.removeClass('#partyOverlay .position.exposed','exposed');
    PartyConfiguration.getVacantFrontPositions(draft).forEach(position => {
      X.addClass(positionPanels[position].getElement(),'exposed');
    });
  }

  function updateConfirmButton() {
    const button = X.first('#partyOverlay .confirm-button');
    PartyConfiguration.isValid(draft) ? X.removeClass(button,'disabled') : X.addClass(button,'disabled');
  }

  // =================
  //    Drag & Drop
  // =================

  function cardDropped(card, target) {
    if (target == null) { return; }

    const id = card.dataset.id;

    if (X.hasClass(target,'roster-panel')) {
      removeFromParty(id);
    } else {
      placeInParty(id, targetPosition(target));
    }
  }

  function targetPosition(target) {
    if (X.hasClass(target,'position')) { return target.dataset.position; }
    return draft[target.dataset.id];
  }

  function removeFromParty(id) {
    if (draft[id] == null) { return; }
    if (canRemove(id) === false) { return; }

    delete draft[id];
    refresh();
  }

  // TODO: The maximum number of party members should start at 6, though like the max captives this number can change
  //       over time. I'm thinking that the player may be able to learn leadership type special abilities to increase
  //       the maximum party size up to 10.

  function placeInParty(id, position) {
    const previous = draft[id];

    if (previous == null && mode !== 'transfer') { return; }

    const occupant = Object.keys(draft).find(x => draft[x] === position && x !== id);

    if (occupant && previous == null) {
      // A roster character dropped on an occupied position replaces the occupant, sending them back to the roster.
      if (canRemove(occupant) === false) { return; }
      delete draft[occupant];
    }
    if (occupant && previous != null) {
      draft[occupant] = previous;
    }

    draft[id] = position;
    refresh();
  }

  function canRemove(id) {
    return id !== GameSystem.getState().getPlayer();
  }

  return Object.freeze({
    init,
    open,
    close,
  });

})();
