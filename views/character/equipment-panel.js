global.EquipmentPanel = (function() {
  let character;
  let equipmentManager;
  let selectedSlot;
  let selectedCandidate;

  let rootElement;
  let itemDetailPanel;

  // The arrows step through the candidates so that the comparisons can be flipped through without clicking each one.
  // These aren't configurable bindings, so they're wired straight to the key codes. The arrows listen to keydown
  // directly rather than through X.onCodeDown() so that holding a key keeps stepping, and so that every repeat has its
  // default prevented, otherwise the repeats scroll the panel.
  function init() {
    window.addEventListener('keydown', handleArrowKey);
    X.onCodeDown(KeyCodes.Enter, isNavigable, () => { if (selectedCandidate) { toggleEquipped(selectedCandidate); } });
  }

  function handleArrowKey(event) {
    const deltas = { [KeyCodes.ArrowUp]:-1, [KeyCodes.ArrowDown]:1 };
    if (deltas[event.code] == null || isNavigable() === false) { return; }

    event.preventDefault();
    moveSelection(deltas[event.code]);
  }

  function isNavigable() {
    return selectedSlot != null
      && X.hasClass('#characterOverlay','hide') === false
      && X.hasClass('#equipmentTab','active')
      && Confirmation.isVisible() === false;
  }

  // Stepping off either end of the list stays put. With nothing selected, down starts at the top and up at the bottom.
  function moveSelection(delta) {
    const candidates = listCandidates();
    if (candidates.length === 0) { return; }

    const current = candidates.findIndex(candidate => candidate.itemId === selectedCandidate);
    const start = (current >= 0) ? current : (delta > 0 ? -1 : candidates.length);
    const next = Math.min(Math.max(start + delta, 0), candidates.length - 1);

    selectedCandidate = candidates[next].itemId;
    updateCandidates();
    updateDetails();

    rootElement.querySelector('.candidate.selected').scrollIntoView({ block:'nearest' });
  }

  // TODO: When we show a piece of equipment in this view, and it has a border, like in the slots panel or the
  //       weapons in the equipment summary, should we set the border color to the item rarity?

  function build(id) {
    character = Character(id);
    equipmentManager = EquipmentManager(id);
    selectedSlot = null;
    selectedCandidate = null;

    rootElement = X.createElement(`<div class='equipment-root'>
      <div class='slots-panel'><ul class='slots-list'></ul></div>
      <div class='candidate-panel hide'><ul class='candidate-list'></ul></div>
      <div class='detail-panel hide'><div class='empty hide'>Nothing equipped</div></div>
      <div class='equipment-summary-panel'></div>
    </div>`);

    itemDetailPanel = ItemDetailPanel();
    itemDetailPanel.setActions(item => [buildActionButton(item.getId())]);
    itemDetailPanel.setCharacter(id);
    rootElement.querySelector('.detail-panel').appendChild(itemDetailPanel.build());

    X.fill('#equipmentTab', rootElement);

    update();
  }

  function update() {
    updateSlots();
    updateCandidates();
    updateDetails();
    updateSummary();
  }

  function updateSlots() {
    const slotList = rootElement.querySelector('.slots-list');
    X.empty(slotList);
    character.getEquipmentSlots().forEach(slot => slotList.appendChild(buildEquipmentSlot(slot)));
  }

  function buildEquipmentSlot(slot) {
    const equippedId = equipmentManager.getSlot(slot);
    const itemName = equippedId ? ItemName({ itemId:equippedId, showIcon:true }).asString() : '';
    const element = X.createElement(`<li class='slot ${slot === selectedSlot ? 'selected' : ''}'>
      <div class='slot-name'>${StringHelper.titlecase(slot)}</div>
      <div class='slot-content'>${itemName}</div>
    </li>`);

    element.addEventListener('click', () => selectSlot(slot));
    return element;
  }

  function selectSlot(slot) {
    selectedSlot = (slot === selectedSlot) ? null : slot;
    selectedCandidate = null;
    update();
  }

  function selectCandidate(itemId) {
    selectedCandidate = (itemId === selectedCandidate) ? null : itemId;
    updateCandidates();
    updateDetails();
  }

  function updateCandidates() {
    const candidatePanel = rootElement.querySelector('.candidate-panel');
    const candidateList = rootElement.querySelector('.candidate-list');
    X.empty(candidateList);

    if (selectedSlot == null) { return X.addClass(candidatePanel,'hide'); }

    const candidates = listCandidates();
    if (candidates.length === 0) {
      candidateList.appendChild(X.createElement(`<li class='empty'>Nothing to equip</li>`));
    }

    candidates.forEach(candidate => candidateList.appendChild(buildCandidate(candidate.itemId, candidate.isEquipped)));
    X.removeClass(candidatePanel,'hide');
  }

  // The equipped item has left the party inventory, so it's added back in and sorted with the candidates by name.
  // That way the list keeps the same order as things are equipped and unequipped.
  function listCandidates() {
    const equippedId = equipmentManager.getSlot(selectedSlot);
    const candidates = InventorySystem.getEquipmentForSlot(character.getEntity(), selectedSlot).
      map(entry => ({ itemId:entry.itemId, name:entry.name, isEquipped:false }));

    if (equippedId) {
      candidates.push({ itemId:equippedId, name:Item(equippedId).getName(), isEquipped:true });
    }

    return candidates.sort(InventorySystem.compareCandidates);
  }

  function buildCandidate(itemId, isEquipped=false) {
    const itemName = ItemName({ itemId, showIcon:true }).asString();
    const selectedClass = (itemId === selectedCandidate) ? 'selected' : '';
    const equippedMark = `<span class='equipped-mark'>${isEquipped ? '▶' : ''}</span>`;
    const element = X.createElement(`<li class='candidate ${selectedClass}'>${equippedMark}${itemName}</li>`);

    element.addEventListener('click', () => selectCandidate(itemId));
    element.addEventListener('dblclick', () => toggleEquipped(itemId));
    return element;
  }

  // The two single clicks of a double click will have selected then deselected the candidate, so it's selected again
  // before the equipment changes.
  function toggleEquipped(itemId) {
    selectedCandidate = itemId;
    (itemId === equipmentManager.getSlot(selectedSlot)) ? unequip() : equip(itemId);
  }

  // The details show the selected candidate when there is one, otherwise whatever is in the selected slot.
  function updateDetails() {
    const detailPanel = rootElement.querySelector('.detail-panel');
    const emptyMessage = detailPanel.querySelector('.empty');

    if (selectedSlot == null) { return X.addClass(detailPanel,'hide'); }

    const equippedId = equipmentManager.getSlot(selectedSlot);
    const itemId = selectedCandidate || equippedId;

    itemDetailPanel.setComparison(itemId === equippedId ? null : equippedId);
    itemDetailPanel.update(itemId ? { id:itemId } : null);

    if (itemId == null) { X.removeClass(emptyMessage,'hide'); }
    if (itemId != null) { X.addClass(emptyMessage,'hide'); }

    X.removeClass(detailPanel,'hide');
  }

  // The shown item is either in the selected slot or in the party inventory, so there's always exactly one action.
  function buildActionButton(itemId) {
    if (itemId === equipmentManager.getSlot(selectedSlot)) {
      const button = X.createElement(`<a href='#' class='button unequip-button'>Unequip</a>`);
      button.addEventListener('click', () => unequip());
      return button;
    }

    const button = X.createElement(`<a href='#' class='button button-primary equip-button'>Equip</a>`);
    button.addEventListener('click', () => equip(itemId));
    return button;
  }

  // Equipping can knock items out of other slots, like a two-handed weapon clearing the off hand, so the whole tab is
  // rebuilt. The candidate stays selected so the details flip to the opposite action.
  function equip(itemId) {
    InventorySystem.equip(character.getEntity(), itemId, selectedSlot);
    update();
  }

  function unequip() {
    InventorySystem.unequip(character.getEntity(), selectedSlot);
    update();
  }

  function updateSummary() {
    if (selectedSlot) {
      EquipmentSummaryPanel.hide();
    } else {
      EquipmentSummaryPanel.update(character.getEntity());
      EquipmentSummaryPanel.show();
    }
  }

  return {
    init,
    build,
    update,
  };

})();
