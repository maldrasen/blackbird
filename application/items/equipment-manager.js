global.EquipmentManager = function(characterId) {

  function fetch() { return EquipmentComponent.lookup(characterId); }
  function update(equipment) { EquipmentComponent.update(characterId, equipment); }
  function getSlot(slot) { return fetch()[slot] || null; }

  function getEquippedSlot(itemId) {
    return Object.values(EquipmentSlot).find(slot => fetch()[slot] === itemId) || null;
  }

  function getValidSlots(itemId) {
    return Object.values(EquipmentSlot).filter(slot => canEquipItem(itemId, slot));
  }

  // This function only checks to see if the equipment slots match. It's possible that equipment could also have other
  // requirements in the future such as minimum attribute levels or unlocked skills. The game doesn't really have
  // classes at all, so what happens when you equip a person with a wand when they have no idea how to use it? We
  // should not allow a sprite to equip a two-handed battle axe though. I could see there being feats that bypass this
  // rule though.
  function canEquipItem(itemId, slot) {
    const item = ItemComponent.lookup(itemId);

    if (item.type === 'armor') {
      const armor = ArmorComponent.lookup(itemId);
      const base = BaseArmor.lookup(armor.base);
      return base.getSlot() === slot;
    }

    if (item.type === 'weapon') {
      const weapon = WeaponComponent.lookup(itemId);
      const base = BaseWeapon.lookup(weapon.base);
      const hands = base.getHands();

      if (hands === WeaponHandedness.main) { return EquipmentSlot.primary === slot; }
      if (hands === WeaponHandedness.off)  { return EquipmentSlot.secondary === slot; }
      if (hands === WeaponHandedness.one)  { return [EquipmentSlot.primary, EquipmentSlot.secondary].includes(slot); }
      if (hands === WeaponHandedness.two)  { return [EquipmentSlot.primary, EquipmentSlot.secondary].includes(slot); }
    }

    return false;
  }

  // The canEquipItem() function does most of the work when equipping an item. If an item can be equipped, equipping it
  // is as simple as setting the equipment slot to the item id. An item can be unequipped by calling this function with
  // itemId = null
  function equipItem(itemId, slot) {
    if (itemId != null && canEquipItem(itemId, slot) === false) {
      throw new Error(`Cannot equip Item:${itemId} in Slot:${slot}`);
    }

    const equipment = fetch();
    equipment[slot] = itemId;
    update(equipment);
  }

  // TODO: I should know the slot here... That's a smell to track down.
  function unequipItem(itemId) {
    const slot = getEquippedSlot(itemId);
    if (slot != null) { equipItem(null, slot); }
  }

  return Object.freeze({
    getSlot,
    getEquippedSlot,
    getValidSlots,
    canEquipItem,
    equipItem,
    unequipItem,
  });

}