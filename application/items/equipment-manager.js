global.EquipmentManager = function(characterId) {
  const maxReduction = 80;

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
      if (hands === WeaponHandedness.two)  { return EquipmentSlot.primary === slot; }
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
    if (itemId == null) { return false; }
    if (ItemComponent.lookup(itemId).type !== 'weapon') { return false; }

    const weapon = WeaponComponent.lookup(itemId);
    return BaseWeapon.lookup(weapon.base).getHands() === WeaponHandedness.two;
  }

  // The id of the armor worn at a hit location. Hit locations (chest/feet/hands/head/legs) are exactly the armor
  // slot keys.
  function getArmorAt(slot) {
    const itemId = fetch()[slot];
    if (itemId == null) { return null; }
    return ArmorComponent.lookup(itemId) ? itemId : null;
  }

  // The id of the shield in the secondary weapon slot; anything else there (a dagger, nothing) means no shield.
  function getEquippedShield() {
    const itemId = fetch()[EquipmentSlot.secondary];
    if (itemId == null) { return null; }

    const weapon = WeaponComponent.lookup(itemId);
    if (weapon == null) { return null; }

    return BaseWeapon.lookup(weapon.base).getType() === 'shield' ? itemId : null;
  }

  function hasEquippedWeaponType(type) {
    return [EquipmentSlot.primary, EquipmentSlot.secondary].some(slot => {
      const itemId = fetch()[slot];
      if (itemId == null) { return false; }

      const weapon = WeaponComponent.lookup(itemId);
      return weapon != null && BaseWeapon.lookup(weapon.base).getType() === type;
    });
  }

  // Percent of a damage type absorbed at a hit location: the worn piece plus the whole-body shield bonus.
  function getDamageReduction(hitLocation, damageType) {
    const armorId = getArmorAt(hitLocation);
    const shieldId = getEquippedShield();
    const total = (armorId ? Armor(armorId).getReduction(damageType) : 0)
                + (shieldId ? Weapon(shieldId).getReduction(damageType) : 0);
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