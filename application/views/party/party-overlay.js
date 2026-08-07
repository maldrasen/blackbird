global.PartyOverlay = (function() {

  let draft = {};
  let positionPanels = {};
  let atHome = false;
  let rosterScrollingPanel = null;

  function init() {
    X.onClick('#locationControls .open-party', open);
    X.onClick('#partyOverlay .close-button', close);
    X.onClick('#partyOverlay .confirm-button', confirm);
    X.onResize(() => X.first('#partyOverlay .position') != null, refresh);

    // A card dropped on an occupied position is actually dropped on the card covering it, so cards are targets too.
    DragonDrop.register({
      source: '#partyOverlay .party-card',
      targets: ['#partyCardLayer .party-card','#partyOverlay .position','#partyOverlay .roster-panel'],
      onDrop: cardDropped,
    });
  }

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

  // Adding and removing party members can only be done at home, and the player can never be removed. Rejected drops
  // need no cleanup, the card snaps back on its own.
  function canRemove(id) {
    return atHome && id !== GameSystem.getState().getPlayer();
  }

  function removeFromParty(id) {
    if (draft[id] == null) { return; }
    if (canRemove(id) === false) { return; }

    delete draft[id];
    refresh();
  }

  function placeInParty(id, position) {
    const previous = draft[id];
    if (previous == null && atHome === false) { return; }

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

  // The formation can be edited anywhere the party isn't otherwise engaged, which for now means while looking at a
  // location or exploring the dungeon.
  function canOpen() {
    if (GameSystem.isLoaded() === false) { return false; }
    if (X.hasClass('#partyOverlay','hide') === false) { return false; }

    const mode = GameSystem.getState().getGameMode();
    return mode === GameMode.location || mode === GameMode.dungeon;
  }

  function open() {
    if (canOpen() === false) { return; }

    X.loadDocument('#partyOverlay','views/party-overlay.html');

    atHome = GameSystem.getState().getCurrentDistrict() === 'home';
    if (atHome) {
      X.removeClass('#partyOverlay','away');
    } else {
      X.addClass('#partyOverlay','away');
    }

    WindowManager.push(PartyOverlay);
    X.removeClass('#partyOverlay','hide');
    X.removeClass('#overlayCover','hide');

    // The scrolling panel measures itself when built, so the overlay has to be visible first.
    rosterScrollingPanel = ScrollingPanel({ selector:'#partyOverlay .roster-list' });

    buildGrid();
    buildDraft();
    refresh();

    Console.log(`Open Party Overlay`,{ system:'PartyOverlay' });
  }

  function close() {
    rosterScrollingPanel = null;
    X.empty('#partyOverlay');
    X.addClass('#partyOverlay','hide');
    X.addClass('#overlayCover','hide');
    WindowManager.remove(PartyOverlay);
  }

  function confirm() {
    PartyConfiguration.setConfiguration(draft);
    close();

    if (GameSystem.getState().getGameMode() === GameMode.dungeon) { DungeonControls.update(); }
  }

  // The grid has to be built after the overlay is shown, a hidden element has no size to measure card
  // coordinates against.
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

  // The overlay edits a draft copy of the party configuration. Nothing is persisted until the confirm button is
  // pressed, and closing any other way discards the changes. A player who isn't in the saved configuration yet is
  // seeded into the draft, as close to the center of the front rank as possible.
  function buildDraft() {
    draft = { ...PartyConfiguration.getConfiguration() };

    const player = GameSystem.getState().getPlayer();
    if (draft[player] == null) { draft[player] = firstOpenPosition(); }
  }

  function firstOpenPosition() {
    const taken = Object.values(draft);
    const centerOut = ['P.0.2','P.0.1','P.0.3','P.0.0','P.0.4','P.1.2','P.1.1','P.1.3','P.1.0','P.1.4'];
    return centerOut.find(position => taken.includes(position) === false);
  }

  function refresh() {
    placeCards();
    fillRoster();
    highlightVacancies();
    updateConfirmButton();
    if (rosterScrollingPanel) { rosterScrollingPanel.resize(); }
  }

  function placeCards() {
    X.empty('#partyCardLayer');

    Object.entries(draft).forEach(([id, position]) => {
      const element = PartyCard(id).getElement();
      const coords = cardCoords(position);

      element.style['left'] = `${coords.left}px`;
      element.style['top'] = `${coords.top}px`;
      if (id === GameSystem.getState().getPlayer()) { X.addClass(element,'player'); }
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

  function fillRoster() {
    const list = X.first('#partyOverlay .roster-list');

    X.empty(list);
    GameSystem.getState().getRoster().filter(id => draft[id] == null).forEach(id => {
      X.append(list, PartyCard(id).getElement());
    });
  }

  function highlightVacancies() {
    X.removeClass('#partyOverlay .position.exposed','exposed');
    PartyConfiguration.getVacantFrontPositions(draft).forEach(position => {
      X.addClass(positionPanels[position].getElement(),'exposed');
    });
  }

  function updateConfirmButton() {
    const button = X.first('#partyOverlay .confirm-button');

    if (PartyConfiguration.isValid(draft)) {
      X.removeClass(button,'disabled');
    } else {
      X.addClass(button,'disabled');
    }
  }

  return Object.freeze({
    init,
    open,
    close,
  });

})();
