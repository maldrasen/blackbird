global.EquipmentPanel = (function() {
  let character;
  let equipmentManager;
  let selectedSlot;
  let selectedCandidate;

  let rootElement;
  let itemDetailPanel;

  function init() {}

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
    return element;
  }

  // The details show the selected candidate when there is one, otherwise whatever is in the selected slot.
  function updateDetails() {
    const detailPanel = rootElement.querySelector('.detail-panel');
    const emptyMessage = detailPanel.querySelector('.empty');

    if (selectedSlot == null) { return X.addClass(detailPanel,'hide'); }

    const itemId = selectedCandidate || equipmentManager.getSlot(selectedSlot);
    itemDetailPanel.update(itemId ? { id:itemId } : null);

    if (itemId == null) { X.removeClass(emptyMessage,'hide'); }
    if (itemId != null) { X.addClass(emptyMessage,'hide'); }

    X.removeClass(detailPanel,'hide');
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
