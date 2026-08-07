global.PartyOverlay = (function() {

  let draft = {};
  let positionPanels = {};

  function init() {
    X.onClick('#partyOverlay .close-button', close);
    X.onClick('#partyOverlay .confirm-button', confirm);
    X.onResize(() => X.first('#partyOverlay .position') != null, refresh);

    // A card dropped on an occupied position is actually dropped on the card covering it, so cards are targets too.
    DragDrop.register({
      source: '#partyCardLayer .party-card',
      targets: ['#partyCardLayer .party-card','#partyOverlay .position'],
      onDrop: cardDropped,
    });
  }

  function cardDropped(card, target) {
    if (target == null) { return; }

    const id = card.dataset.id;
    const position = targetPosition(target);
    const occupant = Object.keys(draft).find(x => draft[x] === position && x !== id);

    if (occupant) { draft[occupant] = draft[id]; }
    draft[id] = position;

    refresh();
  }

  function targetPosition(target) {
    if (X.hasClass(target,'position')) { return target.dataset.position; }
    return draft[target.dataset.id];
  }

  function open() {
    X.loadDocument('#partyOverlay','views/party-overlay.html');

    WindowManager.push(PartyOverlay);
    X.removeClass('#partyOverlay','hide');
    X.removeClass('#overlayCover','hide');

    buildGrid();
    buildDraft();
    refresh();

    Console.log(`Open Party Overlay`,{ system:'PartyOverlay' });
  }

  function close() {
    X.empty('#partyOverlay');
    X.addClass('#partyOverlay','hide');
    X.addClass('#overlayCover','hide');
    WindowManager.remove(PartyOverlay);
  }

  function confirm() {
    PartyConfiguration.setConfiguration(draft);
    close();
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
  }

  function placeCards() {
    X.empty('#partyCardLayer');

    Object.entries(draft).forEach(([id, position]) => {
      const element = PartyCard(id).getElement();
      const coords = cardCoords(position);

      element.style['left'] = `${coords.left}px`;
      element.style['top'] = `${coords.top}px`;
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

    if (PartyConfiguration.isValidConfiguration(draft)) {
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
