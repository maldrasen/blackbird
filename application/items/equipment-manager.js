global.EquipmentManager = function(characterId) {
  const maxReduction = 80;

  function fetch() { return EquipmentComponent.lookup(characterId); }
  function update(equipment) { EquipmentComponent.update(characterId, equipment); }
  function getSlot(slot) { return fetch()[slot] || null; }
  function getBase(itemId) { return Item(itemId).getBase(); }

  function getEquippedSlot(itemId) {
    return Object.values(EquipmentSlot).find(slot => fetch()[slot] === itemId) || null;
  }

  function getValidSlots(itemId) {
    return Object.values(EquipmentSlot).filter(slot => canEquipItem(itemId, slot));
  }

  // The record decides which slots an item can go in, so equipping never has to ask what kind of thing it's holding.
  //
  // This function only checks to see if the equipment slots match. It's possible that equipment could also have other
  // requirements in the future such as minimum attribute levels or unlocked skills. The game doesn't really have
  // classes at all, so what happens when you equip a person with a wand when they have no idea how to use it? We
  // should not allow a sprite to equip a two-handed battle axe though. I could see there being feats that bypass this
  // rule though.
  function canEquipItem(itemId, slot) {
    return getBase(itemId).getSlots().includes(slot);
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

    if (isTwoHandedWeapon(itemId)) {
      equipment[EquipmentSlot.secondary] = null;
    }
    if (itemId != null && slot === EquipmentSlot.secondary && isTwoHandedWeapon(equipment[EquipmentSlot.primary])) {
      equipment[EquipmentSlot.primary] = null;
    }

    update(equipment);
  }

  // A two-handed weapon needs both hands, so equipping one clears the secondary slot, and equipping an off-hand
  // item clears a two-handed primary.
  function isTwoHandedWeapon(itemId) {
    return itemId != null && getBase(itemId).getHands() === WeaponHandedness.two;
  }

  // The id of the armor worn at a hit location. Hit locations (chest/feet/hands/head/legs) are exactly the armor
  // slot keys.
  function getArmorAt(slot) {
    const itemId = fetch()[slot];
    if (itemId == null) { return null; }
    return getBase(itemId).hasReduction() ? itemId : null;
  }

  // The id of the shield in the secondary weapon slot; anything else there (a dagger, nothing) means no shield.
  function getEquippedShield() {
    const itemId = fetch()[EquipmentSlot.secondary];
    if (itemId == null) { return null; }
    return getBase(itemId).isShield() ? itemId : null;
  }

  function hasEquippedWeaponType(type) {
    return [EquipmentSlot.primary, EquipmentSlot.secondary].some(slot => {
      const itemId = fetch()[slot];
      return itemId != null && getBase(itemId).getType() === type;
    });
  }

  // Percent of a damage type absorbed at a hit location: the worn piece plus the whole-body shield bonus.
  function getDamageReduction(hitLocation, damageType) {
    const armorId = getArmorAt(hitLocation);
    const shieldId = getEquippedShield();
    const total = (armorId ? Item(armorId).getReduction(damageType) : 0)
                + (shieldId ? Item(shieldId).getReduction(damageType) : 0);
    return Math.min(total, maxReduction);
  }

  function unequipItem(itemId) {
    const slot = getEquippedSlot(itemId);
    if (slot != null) { equipItem(null, slot); }
  }

  return {
    getSlot,
    getEquippedSlot,
    getValidSlots,
    canEquipItem,
    equipItem,
    unequipItem,
    getArmorAt,
    getEquippedShield,
    hasEquippedWeaponType,
    getDamageReduction,
  };

}
