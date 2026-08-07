global.PartyOverlay = (function() {

  let mode;

  let draft = {};
  let positionPanels = {};
  let atHome = false;
  let rosterScrollingPanel = null;

  function init() {
    X.onClick('#partyOverlay .close-button', close);
    X.onClick('#partyOverlay .confirm-button', confirm);
    X.onResize(() => X.first('#partyOverlay .position') != null, refresh);

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

    rosterScrollingPanel = ScrollingPanel({ selector:'#partyOverlay .roster-list' });

    buildGrid();
    buildDraft();
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

  function refresh() {
    // placeCards();
    if (mode === 'transfer') { buildRoster(); }
    // highlightVacancies();
    // updateConfirmButton();
    // if (rosterScrollingPanel) { rosterScrollingPanel.resize(); }
  }

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

    const player = GameSystem.getState().getPlayer();
    if (draft[player] == null) { draft[player] = firstOpenPosition(); }
  }



  function buildRoster() {
    const list = X.first('#partyOverlay .roster-list');

    X.empty(list);
    X.removeClass('#partyOverlay .roster-panel','hide');

    GameSystem.getState().getRoster().filter(id => draft[id] == null).forEach(id => {
      list.appendChild(PartyCard(id).getElement());
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



  function confirm() {
    PartyConfiguration.setConfiguration(draft);
    close();

    if (GameSystem.getState().getGameMode() === GameMode.dungeon) { DungeonControls.update(); }
  }


  function firstOpenPosition() {
    const taken = Object.values(draft);
    const centerOut = ['P.0.2','P.0.1','P.0.3','P.0.0','P.0.4','P.1.2','P.1.1','P.1.3','P.1.0','P.1.4'];
    return centerOut.find(position => taken.includes(position) === false);
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
