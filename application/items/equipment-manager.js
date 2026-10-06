global.EquipmentManager = function(characterId) {
  const maxReduction = 80;
  const physicalTypes = [DamageType.crush, DamageType.slash, DamageType.pierce];
  const hitLocations = [EquipmentSlot.head, EquipmentSlot.chest, EquipmentSlot.hands, EquipmentSlot.legs, EquipmentSlot.feet];

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
  // itemId = null. The ids of the items knocked out of their slots are returned, so that whoever owns the character's
  // spare equipment can take them back.
  function equipItem(itemId, slot) {
    if (itemId != null && canEquipItem(itemId, slot) === false) {
      throw new Error(`Cannot equip Item:${itemId} in Slot:${slot}`);
    }

    const equipment = fetch();
    const displaced = [equipment[slot]];
    equipment[slot] = itemId;

    if (isTwoHandedWeapon(itemId)) {
      displaced.push(equipment[EquipmentSlot.secondary]);
      equipment[EquipmentSlot.secondary] = null;
    }
    if (itemId != null && slot === EquipmentSlot.secondary && isTwoHandedWeapon(equipment[EquipmentSlot.primary])) {
      displaced.push(equipment[EquipmentSlot.primary]);
      equipment[EquipmentSlot.primary] = null;
    }

    update(equipment);

    return displaced.filter(id => id != null && id !== itemId);
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
    return (slot != null) ? equipItem(null, slot) : [];
  }

  // Build an equipment summary, displayed in the detail panel. Also can be used by the battle system to get a
  // character's resistance totals. These are the effective resistances, with the wearer's innate resistance included.
  // Physical damage lands on a hit location, so those reductions are listed per location. The other damage types are
  // whole body.
  //   { physical:{ head:{ crush, slash, pierce }, ... }, magical:{ fire, shock, ... } }
  //
  // TODO: Equipment doesn't carry elemental resistances yet. Once the armor enchantments do they get added to the
  //       magical resistances here.
  function summarizeResistances() {
    const summary = { physical:{}, magical:{} };

    hitLocations.forEach(location => {
      summary.physical[location] = {};
      physicalTypes.forEach(type => {
        summary.physical[location][type] = cappedReduction(getDamageReduction(location, type) + getInnateResistance(type));
      });
    });

    Object.values(DamageType).filter(type => physicalTypes.includes(type) === false).forEach(type => {
      const resistance = cappedReduction(getInnateResistance(type));
      if (resistance !== 0) {
        summary.magical[type] = resistance;
      }
    });

    return summary;
  }

  function cappedReduction(reduction) {
    return Math.min(reduction, BattleConstants.maxReduction);
  }

  function getInnateResistance(type) {
    return MonsterComponent.lookup(characterId) != null ?
      Monster(characterId).getResistance(type) :
      Character(characterId).getResistance(type);
  }

  // Real main and off hand weapon damage ranges given the character's strength. A weapon's attack power is the percent
  // of the wielder's strength that a hit deals, the same way the DamageRoll works it out, before any ability, stance,
  // or crit adjustments.
  //   { primary:{ itemId, low, high, dps, attackPower:{ low, high }, damageTypes:[{ type, percent }], speed, reach }, secondary:{ ... } }
  //
  // An entry is only there when the hand holds a weapon, not when it's empty or holding a shield.
  //
  // TODO: Nothing is summarized for an unarmed character. That needs to wait until I figure out how unarmed attacks
  //       work for characters, when they only have a shield equipped for instance.
  function summarizeDamages() {
    const primary = getWeaponIn(EquipmentSlot.primary);
    const secondary = getWeaponIn(EquipmentSlot.secondary);
    const summary = {};

    if (primary) { summary.primary = summarizeWeapon(primary); }
    if (secondary) { summary.secondary = summarizeWeapon(secondary); }

    return summary;
  }

  function getWeaponIn(slot) {
    const itemId = getSlot(slot);
    return (itemId != null && getBase(itemId).isWeapon()) ? itemId : null;
  }

  // TODO: Eventually we'll want to include crit and fumble percentages as well. Because we don't yet have anywhere to
  //       get these values, they're currently hard coded in the skill-check.

  // TODO: We may eventually need to include some kind of accuracy information as well. Attacks are opposed weapon
  //       skill vs defense skill checks though, so it's impossible to say how accurate a weapon is without knowing
  //       who is being attacked. We may one day have accuracy modifiers as part of weapon enchantments that need to
  //       be included as well though. We could also have aspects that effect accuracy as well. All future content that
  //       isn't in the game yet though.

  // The weapon doesn't need to be equipped. The item details use this to show what a candidate would deal. The DPS
  // is the average of the character's damage over the attack time, the same way the appraiser rates a weapon.
  function summarizeWeapon(itemId) {
    const item = Item(itemId);
    const base = item.getBase();
    const range = item.getDamageRange();
    const strength = Attributes(characterId).getStrength();
    const low = Math.round((range.low / 100) * strength);
    const high = Math.round((range.high / 100) * strength);

    return {
      itemId,
      low,
      high,
      dps: Math.round(((low + high) / 2) / (base.getSpeed() / 1000)),
      attackPower: range,
      damageTypes: base.getDamageTypes(),
      speed: base.getSpeed(),
      reach: base.getReach(),
    };
  }

  // The item details show what would change if one item replaced another, so these return the first item's numbers
  // minus the second's, shaped like the summaries so that a diff sits at the same key as the property it belongs to.
  // There's nothing to compare when the two aren't the same kind of thing, like a dagger against a shield.
  //   compareWeapons: { low, high, dps, attackPower:{ low, high }, speed }
  //   compareArmor:   { crush, slash, pierce }
  function compareWeapons(itemId, otherId) {
    if (getBase(itemId).isWeapon() === false || getBase(otherId).isWeapon() === false) { return null; }

    const weapon = summarizeWeapon(itemId);
    const other = summarizeWeapon(otherId);

    return {
      low: weapon.low - other.low,
      high: weapon.high - other.high,
      dps: weapon.dps - other.dps,
      attackPower: {
        low: weapon.attackPower.low - other.attackPower.low,
        high: weapon.attackPower.high - other.attackPower.high,
      },
      speed: weapon.speed - other.speed,
    };
  }

  function compareArmor(itemId, otherId) {
    if (getBase(itemId).hasReduction() === false || getBase(otherId).hasReduction() === false) { return null; }

    const diffs = {};
    physicalTypes.forEach(type => {
      diffs[type] = Item(itemId).getReduction(type) - Item(otherId).getReduction(type);
    });
    return diffs;
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
    summarizeResistances,
    summarizeDamages,
    summarizeWeapon,
    compareWeapons,
    compareArmor,
  };

}
