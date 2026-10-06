global.EquipmentPanel = (function() {
  let character;
  let equipmentManager;
  let selectedSlot;
  let selectedCandidate;

  let rootElement;

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
      <div class='equipment-summary-panel'></div>
    </div>`);

    X.fill('#equipmentTab', rootElement);

    update();
  }

  function update() {
    updateSlots();
    updateCandidates();
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
  }

  function updateCandidates() {
    const candidatePanel = rootElement.querySelector('.candidate-panel');
    const candidateList = rootElement.querySelector('.candidate-list');
    X.empty(candidateList);

    if (selectedSlot == null) { return X.addClass(candidatePanel,'hide'); }

    const candidates = InventorySystem.getEquipmentForSlot(character.getEntity(), selectedSlot);
    if (candidates.length === 0) {
      candidateList.appendChild(X.createElement(`<li class='empty'>Nothing to equip</li>`));
    }

    candidates.forEach(candidate => candidateList.appendChild(buildCandidate(candidate)));
    X.removeClass(candidatePanel,'hide');
  }

  function buildCandidate(candidate) {
    const itemName = ItemName({ itemId:candidate.itemId, showIcon:true }).asString();
    const element = X.createElement(`<li class='candidate ${candidate.itemId === selectedCandidate ? 'selected' : ''}'>
      ${itemName}
    </li>`);

    element.addEventListener('click', () => selectCandidate(candidate.itemId));
    return element;
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
