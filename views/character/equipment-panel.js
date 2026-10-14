global.EquipmentPanel = (function() {
  const ammunitionSlot = 'ammunition';

  let character;
  let equipmentManager;
  let selectedSlot;
  let selectedCandidate;

  let rootElement;
  let itemDetailPanel;

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

    const current = candidates.findIndex(candidate => candidate.key === selectedCandidate);
    const start = (current >= 0) ? current : (delta > 0 ? -1 : candidates.length);
    const next = Math.min(Math.max(start + delta, 0), candidates.length - 1);

    selectedCandidate = candidates[next].key;
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
    itemDetailPanel.setActions(selected => [buildActionButton(keyOf(selected))]);
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
    listSlots().forEach(slot => slotList.appendChild(buildEquipmentSlot(slot)));
  }

  // Ammunition isn't an equipment slot, but it reads as one, so it's listed with the weapons that use it.
  function listSlots() {
    return character.getEquipmentSlots().flatMap(slot => slot === EquipmentSlot.secondary ? [slot, ammunitionSlot] : [slot]);
  }

  function isAmmunitionSlot(slot=selectedSlot) {
    return slot === ammunitionSlot;
  }

  function buildEquipmentSlot(slot) {
    const nameOptions = equippedNameOptions(slot);
    const itemName = nameOptions ? ItemName({ ...nameOptions, showIcon:true }).asString() : '';
    const element = X.createElement(`<li class='slot ${slot === selectedSlot ? 'selected' : ''}'>
      <div class='slot-name'>${StringHelper.titlecase(slot)}</div>
      <div class='slot-content'>${itemName}</div>
    </li>`);

    element.addEventListener('click', () => selectSlot(slot));
    return element;
  }

  function equippedNameOptions(slot) {
    if (isAmmunitionSlot(slot)) { return quiverNameOptions(); }
    const equippedId = equipmentManager.getSlot(slot);
    return equippedId ? { itemId:equippedId } : null;
  }

  function quiverNameOptions() {
    const quiver = QuiverComponent.lookup(character.getEntity());
    return quiver.ammunition ? { articleCode:quiver.ammunition, quantity:quiver.quantity } : null;
  }

  function getEquipped() {
    if (isAmmunitionSlot()) { return QuiverComponent.lookup(character.getEntity()).ammunition; }
    return equipmentManager.getSlot(selectedSlot);
  }

  function selectSlot(slot) {
    selectedSlot = (slot === selectedSlot) ? null : slot;
    selectedCandidate = null;
    update();
  }

  function selectCandidate(key) {
    selectedCandidate = (key === selectedCandidate) ? null : key;
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

    candidates.forEach(candidate => candidateList.appendChild(buildCandidate(candidate)));
    X.removeClass(candidatePanel,'hide');
  }

  function listCandidates() {
    return isAmmunitionSlot() ? listAmmunitionCandidates() : listItemCandidates();
  }

  function listAmmunitionCandidates() {
    return AmmunitionSystem.getAmmunitionFor(character.getEntity()).
      map(entry => ({ key:entry.code, nameOptions:{ articleCode:entry.code }, isEquipped:entry.isLoaded }));
  }

  // The equipped item has left the party inventory, so it's added back in and sorted with the candidates by name.
  // That way the list keeps the same order as things are equipped and unequipped.
  function listItemCandidates() {
    const equippedId = getEquipped();
    const candidates = InventorySystem.getEquipmentForSlot(character.getEntity(), selectedSlot).
      map(entry => ({ itemId:entry.itemId, name:entry.name }));

    if (equippedId) {
      candidates.push({ itemId:equippedId, name:Item(equippedId).getName() });
    }

    return candidates.sort(InventorySystem.compareCandidates).
      map(entry => ({ key:entry.itemId, nameOptions:{ itemId:entry.itemId }, isEquipped:entry.itemId === equippedId }));
  }

  function buildCandidate(candidate) {
    const itemName = ItemName({ ...candidate.nameOptions, showIcon:true }).asString();
    const selectedClass = (candidate.key === selectedCandidate) ? 'selected' : '';
    const equippedMark = `<span class='equipped-mark'>${candidate.isEquipped ? '▶' : ''}</span>`;
    const element = X.createElement(`<li class='candidate ${selectedClass}'>${equippedMark}${itemName}</li>`);

    element.addEventListener('click', () => selectCandidate(candidate.key));
    element.addEventListener('dblclick', () => toggleEquipped(candidate.key));
    return element;
  }

  // The two single clicks of a double click will have selected then deselected the candidate, so it's selected again
  // before the equipment changes.
  function toggleEquipped(key) {
    selectedCandidate = key;
    (key === getEquipped()) ? unequip() : equip(key);
  }

  // The details show the selected candidate when there is one, otherwise whatever is in the selected slot.
  function updateDetails() {
    const detailPanel = rootElement.querySelector('.detail-panel');
    const emptyMessage = detailPanel.querySelector('.empty');

    if (selectedSlot == null) { return X.addClass(detailPanel,'hide'); }

    const equipped = getEquipped();
    const key = selectedCandidate || equipped;

    itemDetailPanel.setComparison(key === equipped ? null : equipped);
    itemDetailPanel.update(key ? describe(key) : null);

    if (key == null) { X.removeClass(emptyMessage,'hide'); }
    if (key != null) { X.addClass(emptyMessage,'hide'); }

    X.removeClass(detailPanel,'hide');
  }

  function describe(key) {
    return isAmmunitionSlot() ? { code:key } : { id:key };
  }

  function keyOf(selected) {
    return selected.id ? selected.id : selected.code;
  }

  // The shown item is either in the selected slot or in the party inventory, so there's always exactly one action.
  function buildActionButton(key) {
    if (key === getEquipped()) {
      const button = X.createElement(`<a href='#' class='button unequip-button'>Unequip</a>`);
      button.addEventListener('click', () => unequip());
      return button;
    }

    const button = X.createElement(`<a href='#' class='button button-primary equip-button'>Equip</a>`);
    button.addEventListener('click', () => equip(key));
    return button;
  }

  // Equipping can knock items out of other slots, like a two-handed weapon clearing the off hand, so the whole tab is
  // rebuilt. The candidate stays selected so the details flip to the opposite action.
  function equip(key) {
    const id = character.getEntity();
    isAmmunitionSlot() ? AmmunitionSystem.loadQuiver(id, key) : InventorySystem.equip(id, key, selectedSlot);
    update();
  }

  function unequip() {
    const id = character.getEntity();
    isAmmunitionSlot() ? AmmunitionSystem.unloadQuiver(id) : InventorySystem.unequip(id, selectedSlot);
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
