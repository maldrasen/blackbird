
// Every piece of equipment - weapons, armor, and shields - is a BaseEquipment record carrying whatever fields apply to
// it. A weapon has a damage range, a hands value, and a type that names its skill. Armor names its slot and carries a
// reduction profile authored at steel quality. A shield is typed 'shield' and carries a reduction profile like armor,
// but is held in a hand like a weapon. Materials are listed as { type:amount } using MaterialType, and the factory
// picks the concrete material for each when it builds the item, so the record never knows what it was made from.

global.BaseEquipment = (function() {
  const records = {};

  function register(code, data) {
    records[code] = data;
  }

  function getAllCodes() {
    return Object.keys(records);
  }

  function lookup(code) {
    if (records[code] == null) { throw new Error(`Bad base equipment code [${code}]`); }

    const record = { ...records[code] };

    function isWeapon() { return record.damageRange != null; }
    function isShield() { return record.type === 'shield'; }
    function isLewd() { return record.lewd === true; }
    function hasReduction() { return record.reduction != null; }

    function getSkill() {
      return isShield() ? 'block' : `${record.type}s`;
    }

    // Handed equipment goes in the weapon slots; anything else names its slot outright.
    function getSlots() {
      switch (record.hands) {
        case WeaponHandedness.main: return [EquipmentSlot.primary];
        case WeaponHandedness.two:  return [EquipmentSlot.primary];
        case WeaponHandedness.off:  return [EquipmentSlot.secondary];
        case WeaponHandedness.one:  return [EquipmentSlot.primary, EquipmentSlot.secondary];
      }
      return record.slot ? [record.slot] : [];
    }

    function getDamageTypes() {
      return record.damageTypes ? record.damageTypes : [{ type:record.damageType, percent:100 }];
    }

    function getDamageStat() {
      switch (record.type) {
        case 'whip': return MaterialFactor.lash;
        case 'bow':  return MaterialFactor.tension;
        default:     return MaterialFactor.sharpness;
      }
    }

    function getReduction(type) {
      return (record.reduction || {})[type] || 0;
    }

    function getReductionMap() {
      const map = {};
      [DamageType.crush, DamageType.slash, DamageType.pierce].forEach(type => { map[type] = getReduction(type); });
      return map;
    }

    // The name depends on the materials the item was actually made from, so the factory passes the built item's
    // { material:amount } map in. The name function gets the material names in the same order.
    function getName(materials={}) {
      const names = Object.keys(materials).map(key => Material.lookup(key).getName());
      return record.nameFunction ? record.nameFunction(names, materials) : record.name;
    }

    return {
      getCode: () => { return code; },
      getName,
      getIcon: () => { return record.icon; },
      getType: () => { return record.type; },
      getSkill,
      getSlots,
      getSlot: () => { return record.slot; },
      getHands: () => { return record.hands; },
      getReach: () => { return record.reach || WeaponReach.close; },
      getSpeed: () => { return record.speed; },
      getLow: () => { return record.damageRange[0]; },
      getHigh: () => { return record.damageRange[1]; },
      getDamageTypes,
      getDamageStat,
      getReduction,
      getReductionMap,
      getMaterials: () => { return record.materials; },
      getEffort: () => { return record.effort || 0; },
      getTextKey: () => { return record.textKey; },
      isWeapon,
      isShield,
      isLewd,
      hasReduction,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
